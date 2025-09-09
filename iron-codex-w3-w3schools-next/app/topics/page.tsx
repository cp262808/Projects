import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TopicsPage() {
  const allTopics = [
    // Beginner
    {
      slug: "security-fundamentals",
      title: "Security Fundamentals",
      description: "Core security concepts, CIA triad, defense in depth, and security principles",
      level: "beginner",
      controls: 12
    },
    {
      slug: "network-security",
      title: "Network Security",
      description: "Firewalls, IDS/IPS, VPNs, network segmentation, and secure protocols",
      level: "beginner",
      controls: 15
    },
    {
      slug: "endpoint-security",
      title: "Endpoint Security",
      description: "EDR, antivirus, device encryption, patch management, and BYOD security",
      level: "beginner",
      controls: 16
    },
    {
      slug: "email-security",
      title: "Email Security",
      description: "SPF, DKIM, DMARC, phishing protection, and email gateway security",
      level: "beginner",
      controls: 13
    },
    {
      slug: "data-protection",
      title: "Data Protection",
      description: "Data classification, DLP, privacy regulations (GDPR, CCPA), and backup security",
      level: "beginner",
      controls: 18
    },
    {
      slug: "physical-security",
      title: "Physical Security",
      description: "Access control, surveillance, environmental controls, and secure disposal",
      level: "beginner",
      controls: 11
    },
    {
      slug: "mobile-security",
      title: "Mobile Security",
      description: "MDM, app security, BYOD policies, mobile threat defense, and secure development",
      level: "beginner",
      controls: 14
    },
    {
      slug: "business-continuity",
      title: "Business Continuity",
      description: "Disaster recovery, backup strategies, incident response, and crisis management",
      level: "beginner",
      controls: 9
    },
    // Intermediate
    {
      slug: "web-application-security",
      title: "Web Application Security",
      description: "OWASP Top 10, XSS, SQL injection, CSRF, secure coding, and WAF configuration",
      level: "intermediate",
      controls: 20
    },
    {
      slug: "api-security",
      title: "API Security",
      description: "REST/GraphQL security, authentication, rate limiting, and API gateway protection",
      level: "intermediate",
      controls: 24
    },
    {
      slug: "cloud-security",
      title: "Cloud Security",
      description: "AWS/Azure/GCP security, shared responsibility, cloud IAM, and workload protection",
      level: "intermediate",
      controls: 22
    },
    {
      slug: "identity-access",
      title: "Identity & Access Management",
      description: "SSO, MFA, PAM, identity governance, and zero trust identity",
      level: "intermediate",
      controls: 17
    },
    {
      slug: "container-security",
      title: "Container Security",
      description: "Docker security, Kubernetes hardening, image scanning, and runtime protection",
      level: "intermediate",
      controls: 19
    },
    {
      slug: "database-security",
      title: "Database Security",
      description: "Encryption at rest, access controls, audit logging, and SQL injection prevention",
      level: "intermediate",
      controls: 16
    },
    {
      slug: "iot-security",
      title: "IoT Security",
      description: "Device authentication, firmware security, secure communication, and OT security",
      level: "intermediate",
      controls: 15
    },
    {
      slug: "supply-chain-security",
      title: "Supply Chain Security",
      description: "SBOM, dependency scanning, vendor risk management, and software composition",
      level: "intermediate",
      controls: 13
    },
    {
      slug: "devsecops",
      title: "DevSecOps",
      description: "CI/CD security, SAST/DAST, infrastructure as code, and shift-left security",
      level: "intermediate",
      controls: 18
    },
    {
      slug: "cryptography",
      title: "Cryptography",
      description: "Encryption algorithms, hashing, digital signatures, PKI, and key management",
      level: "intermediate",
      controls: 16
    },
    // Advanced
    {
      slug: "zero-trust",
      title: "Zero Trust Architecture",
      description: "Zero trust principles, micro-segmentation, continuous verification, and SASE",
      level: "advanced",
      controls: 16
    },
    {
      slug: "threat-intelligence",
      title: "Threat Intelligence",
      description: "Threat hunting, IOCs, MITRE ATT&CK, threat feeds, and intelligence sharing",
      level: "advanced",
      controls: 14
    },
    {
      slug: "ai-ml-security",
      title: "AI/ML Security",
      description: "Model security, adversarial attacks, data poisoning, and AI governance",
      level: "advanced",
      controls: 12
    },
    {
      slug: "blockchain-security",
      title: "Blockchain Security",
      description: "Smart contract security, consensus mechanisms, wallet security, and DeFi risks",
      level: "advanced",
      controls: 10
    }
  ];

  return (
    <>
      <NavBar />
      <main className="container py-16" id="main">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Security Topics</h1>
          <p className="text-xl text-gray-600 mb-12">
            Master cybersecurity with 22 comprehensive topics covering {allTopics.reduce((sum, t) => sum + t.controls, 0)} security controls.
          </p>

          {/* Filter buttons - for future functionality */}
          <div className="flex gap-2 mb-8 flex-wrap">
            <button className="px-4 py-2 rounded-lg bg-slate-800 text-white">All Topics</button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Beginner</button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Intermediate</button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Advanced</button>
          </div>

          {/* Topics Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {allTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold group-hover:text-cyan-600 transition-colors">
                    {topic.title}
                  </h2>
                  <span className={`badge-${topic.level}`}>
                    {topic.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">
                    {topic.controls} controls
                  </span>
                  <span className="text-cyan-600 group-hover:translate-x-2 transition-transform">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}