export default function Hero(){
  return (
    <section className="bg-gradient-to-tr from-blue-900 to-blue-500 text-white text-center py-16">
      <div className="container">
        <h1 className="font-extralight tracking-tight text-4xl md:text-5xl mb-3">Learn Cybersecurity</h1>
        <p className="opacity-90 text-lg mb-6">The world's largest cybersecurity reference platform</p>

        <form action="/search" className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
          <input
            name="q"
            type="search"
            placeholder="Search 500+ security refs, controls, vendors…"
            className="px-4 py-4 rounded-md text-black outline outline-2 outline-transparent focus:outline-blue-300"
          />
          <button className="btn btn-primary">Search</button>
          <div className="text-white/90 md:col-span-2 text-sm">Examples: “JWT best practices”, “FedRAMP AC‑2”, “Cloudflare mTLS”</div>
        </form>

        <div className="flex gap-3 justify-center mt-5 flex-wrap">
          <a className="btn btn-primary" href="/topics">Explore References</a>
          <a className="btn btn-outline" href="/guides">Search Technologies</a>
        </div>
      </div>
    </section>
  )
}
