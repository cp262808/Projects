import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";

export default function AboutPage(){
  const rawHtml = fs.readFileSync(path.join(process.cwd(), "content", "about.html"), "utf-8");
  const match = rawHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const contentHtml = match ? match[1] : "";

  return (
    <>
      <NavBar />
      <main className="container py-12" id="main">
        <div className="max-w-4xl mx-auto prose">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </main>
      <Footer />
    </>
  )
}
