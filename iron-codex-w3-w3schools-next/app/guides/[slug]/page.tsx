import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export default function GuidePage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "content", "guides", `${params.slug}.html`);
  let mainClass = "";
  let contentHtml: string | null = null;
  let styleHtml = "";
  try {
    const rawHtml = fs.readFileSync(filePath, "utf-8");
    const mainMatch = rawHtml.match(/<main[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/main>/i);
    const styleMatch = rawHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    mainClass = mainMatch ? mainMatch[1] : "";
    contentHtml = mainMatch ? mainMatch[2] : null;
    styleHtml = styleMatch ? styleMatch[1] : "";
  } catch {
    contentHtml = null;
  }

  if (!contentHtml) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <main id="main" className={mainClass} dangerouslySetInnerHTML={{ __html: contentHtml }} />
      {styleHtml && <style dangerouslySetInnerHTML={{ __html: styleHtml }} />}
      <Footer />
    </>
  );
}
