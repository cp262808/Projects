export const toolCategories = [
  "Vulnerability Assessment",
  "Web Application Security",
  "Network Security",
  "Digital Forensics",
  "Cloud Security",
  "Container Security",
  "SIEM & Monitoring",
  "Cryptography & PKI",
] as const;

export const toolTypes = [
  "Open Source",
  "Commercial",
  "Freemium",
  "Free Service",
] as const;

export type ToolCategory = (typeof toolCategories)[number];
export type ToolType = (typeof toolTypes)[number];

export type Tool = {
  name: string;
  slug: string;
  category: ToolCategory;
  description: string;
  type: ToolType;
  platform: string;
};

export const tools: Tool[] = [
  { name: "Nmap", slug: "nmap", category: "Vulnerability Assessment", description: "Network discovery and security auditing", type: "Open Source", platform: "Cross-platform" },
  { name: "OpenVAS", slug: "openvas", category: "Vulnerability Assessment", description: "Comprehensive vulnerability scanner", type: "Open Source", platform: "Linux" },
  { name: "Nuclei", slug: "nuclei", category: "Vulnerability Assessment", description: "Fast and customizable vulnerability scanner", type: "Open Source", platform: "Cross-platform" },
  { name: "Nessus", slug: "nessus", category: "Vulnerability Assessment", description: "Professional vulnerability assessment", type: "Commercial", platform: "Cross-platform" },

  { name: "OWASP ZAP", slug: "owasp-zap", category: "Web Application Security", description: "Web application security scanner", type: "Open Source", platform: "Cross-platform" },
  { name: "Burp Suite", slug: "burp-suite", category: "Web Application Security", description: "Web vulnerability scanner and proxy", type: "Freemium", platform: "Cross-platform" },
  { name: "Nikto", slug: "nikto", category: "Web Application Security", description: "Web server scanner", type: "Open Source", platform: "Cross-platform" },
  { name: "SQLmap", slug: "sqlmap", category: "Web Application Security", description: "Automatic SQL injection testing tool", type: "Open Source", platform: "Cross-platform" },

  { name: "Wireshark", slug: "wireshark", category: "Network Security", description: "Network protocol analyzer", type: "Open Source", platform: "Cross-platform" },
  { name: "Snort", slug: "snort", category: "Network Security", description: "Network intrusion detection system", type: "Open Source", platform: "Cross-platform" },
  { name: "Suricata", slug: "suricata", category: "Network Security", description: "High performance network IDS/IPS", type: "Open Source", platform: "Linux" },
  { name: "pfSense", slug: "pfsense", category: "Network Security", description: "Open source firewall and router", type: "Open Source", platform: "FreeBSD" },

  { name: "Autopsy", slug: "autopsy", category: "Digital Forensics", description: "Digital forensics platform", type: "Open Source", platform: "Cross-platform" },
  { name: "Volatility", slug: "volatility", category: "Digital Forensics", description: "Memory forensics framework", type: "Open Source", platform: "Cross-platform" },
  { name: "YARA", slug: "yara", category: "Digital Forensics", description: "Malware identification and classification", type: "Open Source", platform: "Cross-platform" },
  { name: "Sleuth Kit", slug: "sleuth-kit", category: "Digital Forensics", description: "Disk image analysis tools", type: "Open Source", platform: "Cross-platform" },

  { name: "Scout Suite", slug: "scout-suite", category: "Cloud Security", description: "Multi-cloud security auditing tool", type: "Open Source", platform: "Cross-platform" },
  { name: "Prowler", slug: "prowler", category: "Cloud Security", description: "AWS security best practices assessment", type: "Open Source", platform: "Cross-platform" },
  { name: "CloudMapper", slug: "cloudmapper", category: "Cloud Security", description: "AWS environment analysis", type: "Open Source", platform: "Cross-platform" },
  { name: "Pacu", slug: "pacu", category: "Cloud Security", description: "AWS exploitation framework", type: "Open Source", platform: "Cross-platform" },

  { name: "Trivy", slug: "trivy", category: "Container Security", description: "Vulnerability scanner for containers", type: "Open Source", platform: "Cross-platform" },
  { name: "Falco", slug: "falco", category: "Container Security", description: "Runtime security monitoring", type: "Open Source", platform: "Linux" },
  { name: "Clair", slug: "clair", category: "Container Security", description: "Static analysis of container vulnerabilities", type: "Open Source", platform: "Cross-platform" },
  { name: "Docker Bench", slug: "docker-bench", category: "Container Security", description: "Docker security configuration checker", type: "Open Source", platform: "Linux" },

  { name: "ELK Stack", slug: "elk-stack", category: "SIEM & Monitoring", description: "Elasticsearch, Logstash, and Kibana", type: "Open Source", platform: "Cross-platform" },
  { name: "Wazuh", slug: "wazuh", category: "SIEM & Monitoring", description: "Security monitoring platform", type: "Open Source", platform: "Cross-platform" },
  { name: "OSSEC", slug: "ossec", category: "SIEM & Monitoring", description: "Host-based intrusion detection", type: "Open Source", platform: "Cross-platform" },
  { name: "Graylog", slug: "graylog", category: "SIEM & Monitoring", description: "Log management and analysis", type: "Open Source", platform: "Cross-platform" },

  { name: "OpenSSL", slug: "openssl", category: "Cryptography & PKI", description: "Cryptography and SSL/TLS toolkit", type: "Open Source", platform: "Cross-platform" },
  { name: "HashiCorp Vault", slug: "vault", category: "Cryptography & PKI", description: "Secrets management platform", type: "Open Source", platform: "Cross-platform" },
  { name: "Let's Encrypt", slug: "lets-encrypt", category: "Cryptography & PKI", description: "Free SSL/TLS certificates", type: "Free Service", platform: "Web-based" },
  { name: "GnuPG", slug: "gnupg", category: "Cryptography & PKI", description: "GNU Privacy Guard", type: "Open Source", platform: "Cross-platform" },
];

export const toolRecord = Object.fromEntries(tools.map((tool) => [tool.slug, tool]));

export function getToolBySlug(slug: string) {
  return toolRecord[slug];
}
