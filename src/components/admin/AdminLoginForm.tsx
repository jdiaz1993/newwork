"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorHint, setErrorHint] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorHint(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };

      if (!res.ok) {
        if (res.status === 503 && data.error === "not_configured") {
          setErrorHint(
            data.message ??
              "Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in .env.local.",
          );
        } else if (data.error === "invalid_credentials") {
          setErrorHint("Incorrect password. Please try again.");
        } else {
          setErrorHint("Login failed. Please try again.");
        }
        setStatus("error");
        return;
      }

      router.refresh();
    } catch {
      setErrorHint("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-black p-8">
      <h1 className="text-3xl font-bold text-[#F5F5DC]">Admin Login</h1>
      <p className="mt-2 text-sm text-[#F5F5DC]/60">
        Sign in to view consultation requests.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm text-[#F5F5DC]/70">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/50 px-4 py-3 text-[#F5F5DC] transition-all duration-300 placeholder:text-[#F5F5DC]/30 focus:border-[#D4AF37] focus:outline-none"
            placeholder="Enter admin password"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8930A] py-3 font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? "Signing in…" : "Sign In"}
        </button>

        {status === "error" && errorHint ? (
          <p className="text-center text-sm text-red-300/90">{errorHint}</p>
        ) : null}
      </form>
    </div>
  );
}
