import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="text-center px-4 animate-fadeIn">
        <div className="text-7xl md:text-8xl font-extrabold gradient-text mb-4">404</div>
        <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-600/20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
