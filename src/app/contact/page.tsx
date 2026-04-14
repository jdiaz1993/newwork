import type { Metadata } from "next";
import { ContactStudio } from "@/components/contact/ContactStudio";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to book a consultation for custom upholstery and restoration in Los Angeles.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <ContactStudio />
    </main>
  );
}
