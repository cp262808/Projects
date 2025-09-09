import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export default function TopicPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "content", "topics", `${params.slug}.html`);
  let contentHtml: string | null = null;
  let mainClass = "w3-container";
  try {
    const rawHtml = fs.readFileSync(filePath, "utf-8");
    const match = rawHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (match) {
      contentHtml = match[1];
      const classMatch = match[0].match(/class=["']([^"']+)["']/i);
      if (classMatch) {
        mainClass = classMatch[1];
      }
    } else {
      contentHtml = null;
    }
  } catch {
    contentHtml = null;
  }

  if (!contentHtml) {
    notFound();
  }

  const hasCodeBlocks = /<pre|<code/i.test(contentHtml);

  return (
    <>
      <NavBar />
      <div className="w3-content w3-margin-top">
        <main className={mainClass} id="main" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
      {hasCodeBlocks && (
        <>
          <script src="https://www.w3schools.com/lib/w3codecolor.js" />
          <script dangerouslySetInnerHTML={{ __html: "w3CodeColor();" }} />
        </>
      )}
      <Footer />
    </>
  );
}
