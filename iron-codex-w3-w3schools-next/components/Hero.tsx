import { PromoBadge } from "./PromoFlare";

export default function Hero(){
  return (
    <section className="bg-w3dark-hero text-white text-center py-16 md:py-24">
      <div className="container">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Learn Cybersecurity</h1>
        <p className="text-w3yellow text-lg md:text-xl font-semibold mb-6">With the world&rsquo;s largest cybersecurity reference site.</p>

        {/* Big W3-style search pill */}
        <form action="/search" className="mx-auto max-w-3xl">
          <div className="flex items-stretch rounded-full overflow-hidden shadow-lg">
            <input
              name="q"
              type="search"
              placeholder="Search our tutorials, e.g. JWT"
              className="flex-1 px-5 py-4 text-gray-900 placeholder-gray-500"
              aria-label="Search our tutorials"
            />
            <button className="px-6 btn-w3 font-semibold"> 
              <span className="inline-flex items-center gap-2">
                <svg aria-hidden className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Search
              </span>
            </button>
          </div>
        </form>

        <div className="mt-6 flex justify-center">
          <PromoBadge label="Not Sure Where To Begin?" tone="active" className="text-base px-5 py-2" />
        </div>
      </div>
    </section>
  )
}
