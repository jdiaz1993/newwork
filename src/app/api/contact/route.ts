import { NextResponse } from "next/server";
import { Resend } from "resend";

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Resend only sends from domains you verify; personal inboxes are rejected as `from`. */
const PERSONAL_MAILBOX = /@(gmail|googlemail|yahoo|hotmail|outlook|live|msn|icloud|aol)\./i;

function resolveFromAddress(): string {
  const raw = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!raw) return "New Work <onboarding@resend.dev>";

  const addrInBrackets = raw.match(/<([^>]+)>\s*$/);
  const emailPart = (addrInBrackets?.[1] ?? raw).trim();

  if (PERSONAL_MAILBOX.test(emailPart)) {
    console.warn(
      "[contact] CONTACT_FROM_EMAIL looks like a personal address. Resend requires a verified domain for `from`. Using onboarding@resend.dev instead.",
    );
    return "New Work <onboarding@resend.dev>";
  }
  return raw;
}

function visitorEmailLooksValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resendErrorMessage(error: unknown): string {
  if (error == null) return "Unknown Resend error";
  if (typeof error === "string") return error.slice(0, 500);
  if (typeof error === "object" && "message" in error) {
    const m = (error as { message: unknown }).message;
    if (typeof m === "string") return m.slice(0, 500);
    if (Array.isArray(m)) return m.map(String).join("; ").slice(0, 500);
  }
  try {
    return JSON.stringify(error).slice(0, 500);
  } catch {
    return String(error).slice(0, 500);
  }
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = resolveFromAddress();

  if (!apiKey || !to) {
    console.warn(
      "[contact] Set RESEND_API_KEY and CONTACT_TO_EMAIL in .env.local (see .env.example).",
    );
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Consultation: ${name}`,
    html: `
      <h2 style="font-family:system-ui,sans-serif">New inquiry</h2>
      <p style="font-family:system-ui,sans-serif"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="font-family:system-ui,sans-serif"><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p style="font-family:system-ui,sans-serif"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="font-family:system-ui,sans-serif"><strong>Project details:</strong></p>
      <p style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
    `,
  });

  if (error) {
    const detail = resendErrorMessage(error);
    console.error("[contact] Resend error:", detail);

    const testingRecipientBlock =
      /only send testing emails to your own email address/i.test(detail);

    const hint = testingRecipientBlock
      ? "To receive leads at a different inbox than your Resend login: (1) Verify your domain at resend.com/domains. (2) Set CONTACT_FROM_EMAIL in .env.local to an address @that domain (e.g. Studio <hello@yourdomain.com>). (3) Set CONTACT_TO_EMAIL to the inbox that should receive messages (any address). Restart the dev server."
      : "If this mentions domain or verification: remove CONTACT_FROM_EMAIL from .env.local (use Resend test sender) or add your domain in Resend and set CONTACT_FROM_EMAIL to an address on that domain. With onboarding@resend.dev, CONTACT_TO_EMAIL must usually be the same email as your Resend account.";

    return NextResponse.json(
      {
        ok: false,
        error: "send_failed",
        detail,
        hint,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
