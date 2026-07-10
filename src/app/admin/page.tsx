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

  const requests = await listConsultationRequests();

  return (
    <main className="flex-1 bg-black px-6 py-16 text-[#F5F5DC]">
      <AdminConsultationInbox requests={requests} />
    </main>
  );
}
