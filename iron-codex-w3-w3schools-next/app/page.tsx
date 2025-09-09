import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import stats from "@/content/index.json";

export default function HomePage() {
  // Data for the guides
  const featuredGuides = [
    {
      href: "/guides/api-security",
      icon: "🔐",
      title: "API Security Expanded",
      description: "Complete API security framework with authentication, authorization, rate limiting, and more.",
      controls: "74"
    },
    {
      href: "/guides/cloud-security",
      icon: "☁️",
      title: "Cloud Security & CDN",
      description: "Comprehensive cloud infrastructure protection for AWS, Azure, GCP, and CDN services.",
      controls: "59"
    },
    {
      href: "/guides/saas-security",
      icon: "🏢",
      title: "SaaS Security",
      description: "Enterprise SaaS platform security with tenant isolation and compliance controls.",
      controls: "59"
    },
    {
      href: "/guides/iam",
      icon: "🔑",
      title: "Identity & Access Management",
      description: "Complete IAM implementation covering SSO, MFA, and privileged access management.",
      controls: "47"
    },
    {
      href: "/guides/containers",
      icon: "📦",
      title: "Containers & Kubernetes",
      description: "Container security from build to runtime with Kubernetes hardening.",
      controls: "29"
    },
    {
      href: "/guides/incident-response",
      icon: "🚨",
      title: "Logging & Incident Response",
      description: "Security monitoring, logging, and incident response procedures.",
      controls: "25"
    }
  ];

  // Topics organized by difficulty
  const beginnerTopics = [
    { href: "/topics/security-fundamentals", title: "Security Fundamentals", controls: "12" },
    { href: "/topics/network-security", title: "Network Security", controls: "15" },
    { href: "/topics/endpoint-security", title: "Endpoint Security", controls: "16" },
    { href: "/topics/email-security", title: "Email Security", controls: "13" },
    { href: "/topics/data-protection", title: "Data Protection", controls: "18" },
    { href: "/topics/physical-security", title: "Physical Security", controls: "11" },
    { href: "/topics/mobile-security", title: "Mobile Security", controls: "14" },
    { href: "/topics/business-continuity", title: "Business Continuity", controls: "9" }
  ];

  const intermediateTopics = [
    { href: "/topics/web-application-security", title: "Web Application Security", controls: "20" },
    { href: "/topics/api-security", title: "API Security", controls: "24" },
    { href: "/topics/cloud-security", title: "Cloud Security", controls: "22" },
    { href: "/topics/identity-access", title: "Identity & Access", controls: "17" },
    { href: "/topics/container-security", title: "Container Security", controls: "19" },
    { href: "/topics/database-security", title: "Database Security", controls: "16" },
    { href: "/topics/iot-security", title: "IoT Security", controls: "15" },
    { href: "/topics/supply-chain-security", title: "Supply Chain Security", controls: "13" },
    { href: "/topics/devsecops", title: "DevSecOps", controls: "18" },
    { href: "/topics/cryptography", title: "Cryptography", controls: "16" }
  ];

  const advancedTopics = [
    { href: "/topics/zero-trust", title: "Zero Trust Architecture", controls: "16" },
    { href: "/topics/threat-intelligence", title: "Threat Intelligence", controls: "14" },
    { href: "/topics/ai-ml-security", title: "AI/ML Security", controls: "12" },
    { href: "/topics/blockchain-security", title: "Blockchain Security", controls: "10" }
  ];

  return (
    <>
      <NavBar />
      <main id="main">
        {/* Hero Section - Cyber focused */}
        <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white text-center py-20">
          <div className="container">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Cyber Cheat Sheet
            </h1>
            <p className="text-xl md:text-2xl text-cyan-300 font-semibold mb-8">
              Your W3Schools-style hub for practical security architecture & controls
            </p>
            
            <div className="flex gap-4 justify-center mb-12 flex-wrap">
              <Link href="/topics" className="btn bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg">
                Browse {stats.topics_count} Topics →
              </Link>
              <Link href="/guides" className="btn border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg">
                Deep Dive Guides
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-xl">
                <div className="text-4xl font-bold text-cyan-400">{stats.topics_count}</div>
                <div className="text-gray-300">Security Topics</div>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <div className="text-4xl font-bold text-purple-400">{stats.controls_count}+</div>
                <div className="text-gray-300">Security Controls</div>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <div className="text-4xl font-bold text-pink-400">{stats.guides_count}</div>
                <div className="text-gray-300">Deep Dive Guides</div>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <div className="text-4xl font-bold text-green-400">100%</div>
                <div className="text-gray-300">Free & Open</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Guides Section */}
        <section className="py-16 bg-slate-50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">
              Featured Security Guides
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-purple-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform" />
                  <div className="relative">
                    <div className="text-4xl mb-4">{guide.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800">{guide.title}</h3>
                    <p className="text-slate-600 mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-purple-600">{guide.controls} controls</span>
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold rounded-full">
                        Deep Dive
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Topics */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
              Security Topics by Difficulty
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Start with fundamentals and progress through advanced topics. Each topic includes practical controls and implementation examples.
            </p>

            {/* Beginner Topics */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-green-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Beginner (8 topics)
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {beginnerTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="p-4 rounded-lg border border-green-200 bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <h4 className="font-semibold text-slate-800">{topic.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{topic.controls} controls</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Intermediate Topics */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                Intermediate (10 topics)
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {intermediateTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="p-4 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <h4 className="font-semibold text-slate-800">{topic.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{topic.controls} controls</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Advanced Topics */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full"></span>
                Advanced (4 topics)
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {advancedTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="p-4 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <h4 className="font-semibold text-slate-800">{topic.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{topic.controls} controls</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Future Features Placeholder */}
        <section className="py-16 bg-gradient-to-r from-slate-900 to-purple-900 text-white">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Coming Soon: Interactive Features
            </h2>
            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="text-xl font-bold mb-2">Try It Yourself</h3>
                <p className="text-gray-300">Interactive code editors for security configurations</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                <p className="text-gray-300">Track your learning journey with personalized dashboards</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="text-xl font-bold mb-2">Certifications</h3>
                <p className="text-gray-300">Earn certificates for completed security topics</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}