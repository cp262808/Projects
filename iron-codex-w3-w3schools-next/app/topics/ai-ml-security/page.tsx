import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TopicPage() {
  return (
    <>
      <NavBar />
      <main className="container py-12" id="main">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm mb-6">
            <Link href="/topics" className="text-cyan-600">Topics</Link>
            <span className="mx-2">/</span>
            <span>Ai Ml Security</span>
          </nav>

          <h1 className="text-4xl font-bold mb-4">Ai Ml Security</h1>
          <p className="text-xl text-gray-600 mb-8">
            Topic description here...
          </p>

          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-600 mb-4">Full content coming soon!</p>
            <p className="text-sm text-gray-500">
              This topic will include detailed security controls, implementation examples, and best practices.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
