import { PromoBadge } from "@/components/PromoFlare";

export default function NotFound(){
  return (
    <main className="container py-24 text-center">
      <h1 className="text-4xl font-extrabold mb-2">404</h1>
      <p className="text-gray-600 mb-6">We couldn&rsquo;t find that page.</p>
      <PromoBadge label="Back to Home" tone="active" className="btn btn-primary inline-flex justify-center" />
    </main>
  )
}
