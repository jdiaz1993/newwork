import { NextResponse } from "next/server";
import { createConsultationRequest } from "@/lib/consultations";

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

function visitorEmailLooksValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !phone || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  if (!visitorEmailLooksValid(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  try {
    const id = createConsultationRequest({ name, phone, email, message });
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error("[contact] Failed to save consultation request:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "save_failed",
        message: "We could not save your request. Please try again or call us directly.",
      },
      { status: 500 },
    );
  }
}
