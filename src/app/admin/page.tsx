import type { Metadata } from "next";
import { AdminConsultationInbox } from "@/components/admin/AdminConsultationInbox";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { listConsultationRequests } from "@/lib/consultations";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="flex flex-1 items-center justify-center bg-black px-6 py-16">
        <AdminLoginForm />
      </main>
    );
  }

  const requests = await listConsultationRequests().catch((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "Could not load consultation requests.";
    return { error: message } as const;
  });

  if ("error" in requests) {
    return (
      <main className="flex flex-1 items-center justify-center bg-black px-6 py-16 text-[#F5F5DC]">
        <div className="max-w-lg rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-center">
          <h1 className="text-xl font-semibold text-red-200">Could not load messages</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#F5F5DC]/80">{requests.error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-black px-6 py-16 text-[#F5F5DC]">
      <AdminConsultationInbox requests={requests} />
    </main>
  );
}
