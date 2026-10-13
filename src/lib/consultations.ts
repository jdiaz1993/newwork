import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import { request as httpsRequest } from "https";
import { dirname, join } from "path";
import { URL } from "url";

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

type ConsultationRow = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: ConsultationStatus;
  is_favorite: boolean;
  created_at: string;
  read_at: string | null;
  reached_out_at: string | null;
};

function mapRow(row: ConsultationRow): ConsultationRequest {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    message: row.message,
    status: row.status,
    isFavorite: Boolean(row.is_favorite),
    createdAt: row.created_at,
    readAt: row.read_at,
    reachedOutAt: row.reached_out_at,
  };
}

function useSupabase(): boolean {
  return Boolean(
    process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw new Error("Supabase is not configured.");
  }

  if (/publishable|anon/i.test(key)) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY must be the service_role key from Supabase (Project Settings → API), not the publishable/anon key.",
    );
  }

  return { url: url.replace(/\/$/, ""), key };
}

function allowInsecureTls(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.SUPABASE_INSECURE_TLS === "true"
  );
}

async function insecureHttpsFetch(
  requestUrl: string,
  init: RequestInit = {},
): Promise<Response> {
  const parsed = new URL(requestUrl);
  const method = (init.method ?? "GET").toUpperCase();
  const headers = new Headers(init.headers);
  const body =
    typeof init.body === "string"
      ? init.body
      : init.body
        ? String(init.body)
        : undefined;

  if (body && !headers.has("content-length")) {
    headers.set("content-length", Buffer.byteLength(body).toString());
  }

  return new Promise((resolve, reject) => {
    const req = httpsRequest(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: `${parsed.pathname}${parsed.search}`,
        method,
        headers: Object.fromEntries(headers.entries()),
        rejectUnauthorized: false,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        res.on("end", () => {
          const responseHeaders = new Headers();
          for (const [key, value] of Object.entries(res.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const item of value) responseHeaders.append(key, item);
            } else {
              responseHeaders.set(key, value);
            }
          }

          resolve(
            new Response(Buffer.concat(chunks), {
              status: res.statusCode ?? 500,
              statusText: res.statusMessage,
              headers: responseHeaders,
            }),
          );
        });
      },
    );

    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function supabaseFetch(url: string, init: RequestInit = {}): Promise<Response> {
  if (allowInsecureTls()) {
    return insecureHttpsFetch(url, init);
  }
  return fetch(url, init);
}

async function supabaseRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const { url, key } = getSupabaseConfig();

  let response: Response;
  try {
    response = await supabaseFetch(`${url}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown fetch error";
    const hint =
      message.includes("unable to verify") || message.includes("certificate")
        ? " On Windows, this is often a local SSL issue. For local dev only, add SUPABASE_INSECURE_TLS=true to .env.local and restart the dev server."
        : "";
    throw new Error(`Could not reach Supabase: ${message}.${hint}`);
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${body}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

async function createConsultationRequestSupabase(
  input: CreateConsultationInput,
): Promise<number> {
  const rows = await supabaseRequest<ConsultationRow[]>("consultation_requests", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name: input.name,
      phone: input.phone,
      email: input.email,
      message: input.message,
    }),
  });

  const id = rows[0]?.id;
  if (!id) {
    throw new Error("Supabase insert did not return an id.");
  }
  return id;
}

async function listConsultationRequestsSupabase(): Promise<ConsultationRequest[]> {
  const rows = await supabaseRequest<ConsultationRow[]>(
    "consultation_requests?select=id,name,phone,email,message,status,is_favorite,created_at,read_at,reached_out_at&order=is_favorite.desc,status.asc,created_at.desc",
  );
  return rows.map(mapRow);
}

async function markConsultationReadSupabase(id: number): Promise<boolean> {
  const rows = await supabaseRequest<ConsultationRow[]>(
    `consultation_requests?select=status,read_at&id=eq.${id}&limit=1`,
  );
  const row = rows[0];
  if (!row) return false;

  const updates: Record<string, string> = {
    read_at: row.read_at ?? new Date().toISOString(),
  };
  if (row.status === "new") {
    updates.status = "read";
  }

  await supabaseRequest(`consultation_requests?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(updates),
  });
  return true;
}

async function markConsultationReachedOutSupabase(id: number): Promise<boolean> {
  const rows = await supabaseRequest<ConsultationRow[]>(
    `consultation_requests?select=read_at,reached_out_at&id=eq.${id}&limit=1`,
  );
  const row = rows[0];
  if (!row) return false;

  const now = new Date().toISOString();
  await supabaseRequest(`consultation_requests?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status: "reached_out",
      read_at: row.read_at ?? now,
      reached_out_at: row.reached_out_at ?? now,
    }),
  });
  return true;
}

async function unmarkConsultationReachedOutSupabase(id: number): Promise<boolean> {
  const rows = await supabaseRequest<ConsultationRow[]>(
    `consultation_requests?select=read_at&id=eq.${id}&limit=1`,
  );
  const row = rows[0];
  if (!row) return false;

  await supabaseRequest(`consultation_requests?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status: "read",
      read_at: row.read_at ?? new Date().toISOString(),
      reached_out_at: null,
    }),
  });
  return true;
}

async function setConsultationFavoriteSupabase(
  id: number,
  isFavorite: boolean,
): Promise<boolean> {
  await supabaseRequest(`consultation_requests?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      is_favorite: isFavorite,
    }),
  });
  return true;
}

async function deleteConsultationRequestSupabase(id: number): Promise<boolean> {
  await supabaseRequest(`consultation_requests?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      Prefer: "return=minimal",
    },
  });
  return true;
}

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

function createConsultationRequestSqlite(input: CreateConsultationInput): number {
  const stmt = getDb().prepare(`
    INSERT INTO consultation_requests (name, phone, email, message)
    VALUES (@name, @phone, @email, @message)
  `);
  const result = stmt.run(input);
  return Number(result.lastInsertRowid);
}

function listConsultationRequestsSqlite(): ConsultationRequest[] {
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

function markConsultationReadSqlite(id: number): boolean {
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

function markConsultationReachedOutSqlite(id: number): boolean {
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

function unmarkConsultationReachedOutSqlite(id: number): boolean {
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

function setConsultationFavoriteSqlite(id: number, isFavorite: boolean): boolean {
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

function deleteConsultationRequestSqlite(id: number): boolean {
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

export async function createConsultationRequest(
  input: CreateConsultationInput,
): Promise<number> {
  if (useSupabase()) {
    return createConsultationRequestSupabase(input);
  }
  return createConsultationRequestSqlite(input);
}

export async function listConsultationRequests(): Promise<ConsultationRequest[]> {
  if (useSupabase()) {
    return listConsultationRequestsSupabase();
  }
  return listConsultationRequestsSqlite();
}

export async function markConsultationRead(id: number): Promise<boolean> {
  if (useSupabase()) {
    return markConsultationReadSupabase(id);
  }
  return markConsultationReadSqlite(id);
}

export async function markConsultationReachedOut(id: number): Promise<boolean> {
  if (useSupabase()) {
    return markConsultationReachedOutSupabase(id);
  }
  return markConsultationReachedOutSqlite(id);
}

export async function unmarkConsultationReachedOut(id: number): Promise<boolean> {
  if (useSupabase()) {
    return unmarkConsultationReachedOutSupabase(id);
  }
  return unmarkConsultationReachedOutSqlite(id);
}

export async function setConsultationFavorite(
  id: number,
  isFavorite: boolean,
): Promise<boolean> {
  if (useSupabase()) {
    return setConsultationFavoriteSupabase(id, isFavorite);
  }
  return setConsultationFavoriteSqlite(id, isFavorite);
}

export async function deleteConsultationRequest(id: number): Promise<boolean> {
  if (useSupabase()) {
    return deleteConsultationRequestSupabase(id);
  }
  return deleteConsultationRequestSqlite(id);
}
