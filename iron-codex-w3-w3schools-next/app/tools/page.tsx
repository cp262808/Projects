'use client';
import React from "react";
import Link from "next/link";

const allTools = [
  // Vulnerability Assessment
  { name: "Nmap", slug: "nmap", category: "Vulnerability Assessment", description: "Network discovery and security auditing", type: "Open Source", platform: "Cross-platform" },
  { name: "OpenVAS", slug: "openvas", category: "Vulnerability Assessment", description: "Comprehensive vulnerability scanner", type: "Open Source", platform: "Linux" },
  { name: "Nuclei", slug: "nuclei", category: "Vulnerability Assessment", description: "Fast and customizable vulnerability scanner", type: "Open Source", platform: "Cross-platform" },
  { name: "Nessus", slug: "nessus", category: "Vulnerability Assessment", description: "Professional vulnerability assessment", type: "Commercial", platform: "Cross-platform" },
  
  // Web Application Security
  { name: "OWASP ZAP", slug: "owasp-zap", category: "Web Application Security", description: "Web application security scanner", type: "Open Source", platform: "Cross-platform" },
  { name: "Burp Suite", slug: "burp-suite", category: "Web Application Security", description: "Web vulnerability scanner and proxy", type: "Freemium", platform: "Cross-platform" },
  { name: "Nikto", slug: "nikto", category: "Web Application Security", description: "Web server scanner", type: "Open Source", platform: "Cross-platform" },
  { name: "SQLmap", slug: "sqlmap", category: "Web Application Security", description: "Automatic SQL injection testing tool", type: "Open Source", platform: "Cross-platform" },
  
  // Network Security
  { name: "Wireshark", slug: "wireshark", category: "Network Security", description: "Network protocol analyzer", type: "Open Source", platform: "Cross-platform" },
  { name: "Snort", slug: "snort", category: "Network Security", description: "Network intrusion detection system", type: "Open Source", platform: "Cross-platform" },
  { name: "Suricata", slug: "suricata", category: "Network Security", description: "High performance network IDS/IPS", type: "Open Source", platform: "Linux" },
  { name: "pfSense", slug: "pfsense", category: "Network Security", description: "Open source firewall and router", type: "Open Source", platform: "FreeBSD" },
  
  // Digital Forensics
  { name: "Autopsy", slug: "autopsy", category: "Digital Forensics", description: "Digital forensics platform", type: "Open Source", platform: "Cross-platform" },
  { name: "Volatility", slug: "volatility", category: "Digital Forensics", description: "Memory forensics framework", type: "Open Source", platform: "Cross-platform" },
  { name: "YARA", slug: "yara", category: "Digital Forensics", description: "Malware identification and classification", type: "Open Source", platform: "Cross-platform" },
  { name: "Sleuth Kit", slug: "sleuth-kit", category: "Digital Forensics", description: "Disk image analysis tools", type: "Open Source", platform: "Cross-platform" },
  
  // Cloud Security
  { name: "Scout Suite", slug: "scout-suite", category: "Cloud Security", description: "Multi-cloud security auditing tool", type: "Open Source", platform: "Cross-platform" },
  { name: "Prowler", slug: "prowler", category: "Cloud Security", description: "AWS security best practices assessment", type: "Open Source", platform: "Cross-platform" },
  { name: "CloudMapper", slug: "cloudmapper", category: "Cloud Security", description: "AWS environment analysis", type: "Open Source", platform: "Cross-platform" },
  { name: "Pacu", slug: "pacu", category: "Cloud Security", description: "AWS exploitation framework", type: "Open Source", platform: "Cross-platform" },
  
  // Container Security
  { name: "Trivy", slug: "trivy", category: "Container Security", description: "Vulnerability scanner for containers", type: "Open Source", platform: "Cross-platform" },
  { name: "Falco", slug: "falco", category: "Container Security", description: "Runtime security monitoring", type: "Open Source", platform: "Linux" },
  { name: "Clair", slug: "clair", category: "Container Security", description: "Static analysis of container vulnerabilities", type: "Open Source", platform: "Cross-platform" },
  { name: "Docker Bench", slug: "docker-bench", category: "Container Security", description: "Docker security configuration checker", type: "Open Source", platform: "Linux" },
  
  // SIEM & Monitoring
  { name: "ELK Stack", slug: "elk-stack", category: "SIEM & Monitoring", description: "Elasticsearch, Logstash, and Kibana", type: "Open Source", platform: "Cross-platform" },
  { name: "Wazuh", slug: "wazuh", category: "SIEM & Monitoring", description: "Security monitoring platform", type: "Open Source", platform: "Cross-platform" },
  { name: "OSSEC", slug: "ossec", category: "SIEM & Monitoring", description: "Host-based intrusion detection", type: "Open Source", platform: "Cross-platform" },
  { name: "Graylog", slug: "graylog", category: "SIEM & Monitoring", description: "Log management and analysis", type: "Open Source", platform: "Cross-platform" },
  
  // Cryptography & PKI
  { name: "OpenSSL", slug: "openssl", category: "Cryptography & PKI", description: "Cryptography and SSL/TLS toolkit", type: "Open Source", platform: "Cross-platform" },
  { name: "HashiCorp Vault", slug: "vault", category: "Cryptography & PKI", description: "Secrets management platform", type: "Open Source", platform: "Cross-platform" },
  { name: "Let's Encrypt", slug: "lets-encrypt", category: "Cryptography & PKI", description: "Free SSL/TLS certificates", type: "Free Service", platform: "Web-based" },
  { name: "GnuPG", slug: "gnupg", category: "Cryptography & PKI", description: "GNU Privacy Guard", type: "Open Source", platform: "Cross-platform" }
];

const categories = ["All", "Vulnerability Assessment", "Web Application Security", "Network Security", "Digital Forensics", "Cloud Security", "Container Security", "SIEM & Monitoring", "Cryptography & PKI"];
const types = ["All", "Open Source", "Commercial", "Freemium", "Free Service"];

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedType, setSelectedType] = React.useState("All");
  
  const filteredTools = allTools.filter(tool => {
    const categoryMatch = selectedCategory === "All" || tool.category === selectedCategory;
    const typeMatch = selectedType === "All" || tool.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const toolsByCategory = categories.slice(1).map(category => ({
    name: category,
    tools: allTools.filter(tool => tool.category === category),
    count: allTools.filter(tool => tool.category === category).length
  }));

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Security Tools
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              Curated collection of essential cybersecurity tools for professionals, from vulnerability scanners to incident response platforms.
            </p>
            
            {/* Search */}
            <form action="/search" role="search" className="mt-6 flex w-full max-w-xl gap-2">
              <input
                name="q"
                type="search"
                aria-label="Search tools"
                placeholder="Search security tools..."
                className="h-11 flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              />
              <button className="h-11 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Filters */}
        <div className="space-y-4 mb-8">
          {/* Category Filters */}
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Category</h3>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition ${
                    selectedCategory === category
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Type</h3>
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition ${
                    selectedType === type
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{allTools.length}</div>
            <div className="text-sm text-slate-400">Total Tools</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{categories.length - 1}</div>
            <div className="text-sm text-slate-400">Categories</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{allTools.filter(tool => tool.type === "Open Source").length}</div>
            <div className="text-sm text-slate-400">Open Source</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">100%</div>
            <div className="text-sm text-slate-400">Vetted</div>
          </div>
        </div>

        {/* Tools Grid */}
        {selectedCategory === "All" ? (
          // Show by categories when "All" is selected
          <div className="space-y-12">
            {toolsByCategory.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-emerald-400">
                    {category.name}
                  </h2>
                  <span className="text-sm text-slate-400">
                    {category.count} tools
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools
                    .filter(tool => selectedType === "All" || tool.type === selectedType)
                    .map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold group-hover:text-emerald-400 transition-colors">
                          {tool.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded ${
                          tool.type === 'Open Source' ? 'bg-green-900 text-green-200' :
                          tool.type === 'Commercial' ? 'bg-blue-900 text-blue-200' :
                          tool.type === 'Freemium' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-purple-900 text-purple-200'
                        }`}>
                          {tool.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">
                        {tool.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">
                          {tool.platform}
                        </span>
                        <span className="text-emerald-400 group-hover:translate-x-1 transition-transform text-sm">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show filtered results when specific category is selected
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold group-hover:text-emerald-400 transition-colors">
                    {tool.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    tool.type === 'Open Source' ? 'bg-green-900 text-green-200' :
                    tool.type === 'Commercial' ? 'bg-blue-900 text-blue-200' :
                    tool.type === 'Freemium' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-purple-900 text-purple-200'
                  }`}>
                    {tool.type}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  {tool.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">
                    {tool.platform}
                  </span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform text-sm">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Community Section */}
        <section className="mt-16 rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
          <h2 className="text-xl font-semibold mb-3">Missing a Tool?</h2>
          <p className="text-slate-300 mb-6">
            Help us expand our collection with community recommendations.
          </p>
          <Link
            href="https://github.com/iron-codex"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
          >
            Submit on GitHub
          </Link>
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.</p>
      </footer>
    </main>
  );
}