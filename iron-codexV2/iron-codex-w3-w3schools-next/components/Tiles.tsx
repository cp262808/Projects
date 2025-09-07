export default function Tiles(){
  const tiles = [
    { href: "/topics/api-security", title: "API Security", desc: "JWT, scopes, rate‑limits", color: "bg-lime-200" },
    { href: "/topics/cloud-security", title: "Cloud Security", desc: "S3, KMS, IAM, VPC", color: "bg-blue-200" },
    { href: "/topics/identity-access", title: "Identity & Access", desc: "OIDC, SSO, MFA, RBAC", color: "bg-yellow-200" },
    { href: "/topics/container-security", title: "Container Security", desc: "Images, runtime, policies", color: "bg-pink-200" },
    { href: "/topics/saas-security", title: "SaaS Security", desc: "DLP, SSO, SCIM", color: "bg-purple-200" },
    { href: "/topics/zero-trust", title: "Zero Trust", desc: "mTLS, device trust", color: "bg-teal-200" },
  ];
  return (
    <section className="py-14 bg-white">
      <div className="container">
        <h2 className="text-2xl md:text-3xl text-blue-900 font-medium text-center mb-6">Explore Major Topics</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map(t => (
            <a key={t.title} href={t.href} className={`tile ${t.color}`}>
              <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
              <p className="opacity-90">{t.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
