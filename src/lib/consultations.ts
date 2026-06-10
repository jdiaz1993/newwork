import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import { dirname, join } from "path";

export type ConsultationRequest = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: ConsultationStatus;
  isFavorite: boolean;
  createdAt: string;
  readAt: string | null;
  reachedOutAt: string | null;
};

export type ConsultationStatus = "new" | "read" | "reached_out";

export type CreateConsultationInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

let db: Database.Database | null = null;

function columnExists(database: Database.Database, columnName: string): boolean {
  const columns = database.pragma("table_info(consultation_requests)") as {
    name: string;
  }[];
  return columns.some((column) => column.name === columnName);
}

function migrateConsultationRequests(database: Database.Database) {
  if (!columnExists(database, "status")) {
    database.exec(`
      ALTER TABLE consultation_requests
      ADD COLUMN status TEXT NOT NULL DEFAULT 'new'
    `);
  }

  if (!columnExists(database, "read_at")) {
    database.exec(`
      ALTER TABLE consultation_requests
      ADD COLUMN read_at TEXT
    `);
  }

  if (!columnExists(database, "reached_out_at")) {
    database.exec(`
      ALTER TABLE consultation_requests
      ADD COLUMN reached_out_at TEXT
    `);
  }

  if (!columnExists(database, "is_favorite")) {
    database.exec(`
      ALTER TABLE consultation_requests
      ADD COLUMN is_favorite INTEGER NOT NULL DEFAULT 0
    `);
  }
}

function getDbPath(): string {
  if (process.env.CONSULTATIONS_DB_PATH?.trim()) {
    return process.env.CONSULTATIONS_DB_PATH.trim();
  }
  return join(process.cwd(), "data", "consultations.sqlite");
}

function getDb(): Database.Database {
  if (db) return db;

  const dbPath = getDbPath();
  mkdirSync(dirname(dbPath), { recursive: true });

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS consultation_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      is_favorite INTEGER NOT NULL DEFAULT 0,
      read_at TEXT,
      reached_out_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  migrateConsultationRequests(db);

  return db;
}

export function createConsultationRequest(input: CreateConsultationInput): number {
  const stmt = getDb().prepare(`
    INSERT INTO consultation_requests (name, phone, email, message)
    VALUES (@name, @phone, @email, @message)
  `);
  const result = stmt.run(input);
  return Number(result.lastInsertRowid);
}

export function listConsultationRequests(): ConsultationRequest[] {
  const rows = getDb()
    .prepare(
      `
    SELECT
      id,
      name,
      phone,
      email,
      message,
      status,
      is_favorite AS isFavorite,
      created_at AS createdAt,
      read_at AS readAt,
      reached_out_at AS reachedOutAt
    FROM consultation_requests
    ORDER BY
      is_favorite DESC,
      CASE status
        WHEN 'new' THEN 0
        WHEN 'read' THEN 1
        ELSE 2
      END,
      datetime(created_at) DESC
  `,
    )
    .all() as (Omit<ConsultationRequest, "isFavorite"> & { isFavorite: 0 | 1 })[];
  return rows.map((row) => ({ ...row, isFavorite: Boolean(row.isFavorite) }));
}

export function markConsultationRead(id: number): boolean {
  const result = getDb()
    .prepare(
      `
      UPDATE consultation_requests
      SET
        status = CASE WHEN status = 'new' THEN 'read' ELSE status END,
        read_at = COALESCE(read_at, datetime('now'))
      WHERE id = @id
    `,
    )
    .run({ id });
  return result.changes > 0;
}

export function markConsultationReachedOut(id: number): boolean {
  const result = getDb()
    .prepare(
      `
      UPDATE consultation_requests
      SET
        status = 'reached_out',
        read_at = COALESCE(read_at, datetime('now')),
        reached_out_at = COALESCE(reached_out_at, datetime('now'))
      WHERE id = @id
    `,
    )
    .run({ id });
  return result.changes > 0;
}

export function unmarkConsultationReachedOut(id: number): boolean {
  const result = getDb()
    .prepare(
      `
      UPDATE consultation_requests
      SET
        status = 'read',
        read_at = COALESCE(read_at, datetime('now')),
        reached_out_at = NULL
      WHERE id = @id
    `,
    )
    .run({ id });
  return result.changes > 0;
}

export function setConsultationFavorite(id: number, isFavorite: boolean): boolean {
  const result = getDb()
    .prepare(
      `
      UPDATE consultation_requests
      SET is_favorite = @isFavorite
      WHERE id = @id
    `,
    )
    .run({ id, isFavorite: isFavorite ? 1 : 0 });
  return result.changes > 0;
}

export function deleteConsultationRequest(id: number): boolean {
  const result = getDb()
    .prepare(
      `
      DELETE FROM consultation_requests
      WHERE id = @id
    `,
    )
    .run({ id });
  return result.changes > 0;
}
