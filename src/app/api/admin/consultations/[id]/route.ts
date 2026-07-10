import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  deleteConsultationRequest,
  markConsultationReachedOut,
  markConsultationRead,
  setConsultationFavorite,
  unmarkConsultationReachedOut,
} from "@/lib/consultations";

type Body = {
  action?: string;
  isFavorite?: boolean;
};

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const updated =
    body.action === "mark_read"
      ? await markConsultationRead(id)
      : body.action === "mark_reached_out"
        ? await markConsultationReachedOut(id)
        : body.action === "unmark_reached_out"
          ? await unmarkConsultationReachedOut(id)
          : body.action === "set_favorite" && typeof body.isFavorite === "boolean"
            ? await setConsultationFavorite(id, body.isFavorite)
            : null;

  if (updated === null) {
    return NextResponse.json({ ok: false, error: "invalid_action" }, { status: 400 });
  }

  if (!updated) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  if (!(await deleteConsultationRequest(id))) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
