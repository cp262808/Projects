import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export default function TopicPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "content", "topics", `${params.slug}.html`);
  let contentHtml: string | null = null;
  try {
    const rawHtml = fs.readFileSync(filePath, "utf-8");
    const match = rawHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    contentHtml = match ? match[1] : null;
  } catch {
    contentHtml = null;
  }

  if (!contentHtml) {
    notFound();
  }

  return (
    <>
      <main className="container py-12" id="main">
        <div className="max-w-4xl mx-auto prose">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </main>
      <Footer />
    </>
  );
}