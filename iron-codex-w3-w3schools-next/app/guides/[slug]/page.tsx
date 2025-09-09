import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export default function GuidePage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "content", "guides", `${params.slug}.html`);
  let contentHtml: string | null = null;
  try {
    const rawHtml = fs.readFileSync(filePath, "utf-8");
    const match = rawHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    contentHtml = match ? match[1] : null;
    if (contentHtml) {
      contentHtml = contentHtml.replace(/<pre>/g, '<pre class="w3-code">');
    }
  } catch {
    contentHtml = null;
  }

  if (!contentHtml) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <main id="main">
        <div className="w3-content w3-margin-top">
          <div className="w3-row">
            <div className="w3-col l12 s12">
              <div className="w3-panel">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
