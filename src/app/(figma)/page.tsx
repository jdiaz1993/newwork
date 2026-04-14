import type { Metadata } from "next";
import { FigmaHomePage } from "@/components/home/FigmaHomePage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Home",
  description: site.tagline,
};

export default function Home() {
  return <FigmaHomePage />;
}
