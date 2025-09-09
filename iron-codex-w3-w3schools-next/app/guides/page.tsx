import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function GuidesPage() {
  const guides = [
    {
      slug: "api-security",
      title: "API Security Expanded",
      icon: "🔐",
      controls: 74,
      level: "Expert",
      description: "Complete API security framework covering REST, GraphQL, authentication, authorization, rate limiting, and API gateway configuration with practical implementation examples.",
      topics: ["OAuth 2.0/OIDC", "JWT Management", "Rate Limiting", "Input Validation", "API Gateway", "Monitoring"]
    },
    {
      slug: "cloud-security",
      title: "Cloud Security & CDN",
      icon: "☁️",
      controls: 59,
      level: "Advanced",
      description: "Comprehensive cloud security framework covering infrastructure protection, identity management, data security, and CDN hardening across AWS, Azure, and GCP platforms.",
      topics: ["Cloud IAM", "Network Security", "Data Protection", "Container Security", "CDN Protection", "Compliance"]
    },
    {
      slug: "saas-security",
      title: "SaaS Security",
      icon: "🏢",
      controls: 59,
      level: "Intermediate",
      description: "Enterprise SaaS platform security including tenant isolation, data protection, compliance frameworks, and third-party integrations.",
      topics: ["Multi-tenancy", "Data Isolation", "Access Control", "API Security", "Compliance", "Monitoring"]
    },
    {
      slug: "iam",
      title: "Identity & Access Management",
      icon: "🔑",
      controls: 47,
      level: "Advanced",
      description: "Complete IAM implementation covering RBAC, PBAC, SSO, MFA, privileged access management, and identity governance frameworks.",
      topics: ["Zero Trust IAM", "SSO/SAML", "MFA", "PAM Solutions", "Identity Governance", "Access Reviews"]
    },
    {
      slug: "containers",
      title: "Containers & Kubernetes",
      icon: "📦",
      controls: 29,
      level: "Intermediate",
      description: "Container security from build to runtime, including Docker hardening, Kubernetes security, and orchestration best practices.",
      topics: ["Image Security", "Runtime Protection", "K8s Hardening", "Network Policies", "RBAC", "Secrets Management"]
    },
    {
      slug: "incident-response",
      title: "Logging & Incident Response",
      icon: "🚨",
      controls: 25,
      level: "Intermediate",
      description: "Security monitoring, centralized logging, SIEM integration, and incident response procedures for effective threat detection and response.",
      topics: ["Log Collection", "SIEM Integration", "Alert Rules", "IR Procedures", "Forensics", "Recovery"]
    }
  ];

  const totalControls = guides.reduce((sum, g) => sum + g.controls, 0);

  return (
    <>
      <NavBar />
      <main className="container py-16" id="main">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Deep Dive Security Guides</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive implementation guides with <span className="font-bold text-cyan-600">{totalControls}+</span> practical security controls
            </p>
            
            {/* Quick stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">6</div>
                <div className="text-sm text-gray-500">Detailed Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">{totalControls}</div>
                <div className="text-sm text-gray-500">Security Controls</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-500">Implementation Ready</div>
              </div>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {guides.map(guide => (
              <Link 
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group border-2 rounded-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 hover:border-cyan-400"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-5xl">{guide.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    guide.level === 'Expert' ? 'bg-purple-100 text-purple-800' :
                    guide.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {guide.level}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold mb-2 group-hover:text-cyan-600 transition-colors">
                  {guide.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {guide.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {guide.topics.slice(0, 4).map(topic => (
                      <span key={topic} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {topic}
                      </span>
                    ))}
                    {guide.topics.length > 4 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        +{guide.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-cyan-600">
                    {guide.controls} controls
                  </span>
                  <span className="text-cyan-600 group-hover:translate-x-2 transition-transform">
                    View Guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* What's Included Section */}
          <section className="mt-16 bg-gradient-to-r from-slate-900 to-purple-900 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">What's Included in Each Guide</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-bold mb-2">Detailed Controls</h3>
                <p className="text-gray-300">Step-by-step implementation for every security control</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-bold mb-2">Code Examples</h3>
                <p className="text-gray-300">Production-ready code snippets and configurations</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Validation Steps</h3>
                <p className="text-gray-300">Testing procedures to verify your implementation</p>
              </div>
            </div>
          </section>

          {/* Coming Soon */}
          <section className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              🚀 <strong>Coming Soon:</strong> Interactive code examples, progress tracking, and certification paths
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
      