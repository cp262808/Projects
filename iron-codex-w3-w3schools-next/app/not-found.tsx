import Link from "next/link";

export default function NotFound(){
  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-emerald-400 mb-2">404</h1>
        <p className="text-slate-300 mb-6">We couldn&rsquo;t find that page.</p>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
