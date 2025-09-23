export default function Featured(){
  const cards = [
    { icon:"🔐", title:"API Security Expanded", desc:"74 essential controls for securing APIs." },
    { icon:"☁️", title:"Cloud Security & CDN", desc:"59 controls for cloud infrastructure." },
    { icon:"🏢", title:"SaaS Security", desc:"59 controls for SaaS platforms." },
    { icon:"🔑", title:"Identity & Access Management", desc:"47 controls for IAM systems." },
    { icon:"📦", title:"Containers & Kubernetes", desc:"29 controls for container security." },
    { icon:"🚨", title:"Logging & Incident Response", desc:"25 controls for incident management." },
  ];
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-2xl md:text-3xl text-blue-900 font-medium text-center mb-6">Featured Guides</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(c => (
            <div key={c.title} className="card">
              <div className="text-2xl">{c.icon}</div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="text-gray-600">{c.desc}</p>
              <span className="mt-2 inline-block text-sm font-bold px-2 py-1 rounded bg-w3yellow">Deep dive guide</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
