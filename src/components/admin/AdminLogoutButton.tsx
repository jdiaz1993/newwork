"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-full border border-[#D4AF37]/30 px-4 py-2 text-sm font-medium text-[#F5F5DC]/80 transition hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:cursor-wait disabled:opacity-70"
    >
      {loading ? "Signing out…" : "Sign Out"}
    </button>
  );
}
