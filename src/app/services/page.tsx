import type { Metadata } from "next";
import { FigmaServicesPage } from "@/components/services/FigmaServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sofa reupholstery, chair restoration, custom furniture, leather repair, frame work, and commercial upholstery — premium craftsmanship.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <FigmaServicesPage />
    </main>
  );
}
