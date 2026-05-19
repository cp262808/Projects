export type Topic = {
  title: string;
  slug: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  controls: number;
  category: string;
};

export const topicCategories = [
  "Fundamentals",
  "AppSec",
  "Infrastructure",
  "Operations",
  "Governance",
  "Data Security",
  "Offensive Security",
  "Emerging Tech",
] as const;

export const topics: Topic[] = [
  // Fundamentals
  { title: "Security Fundamentals", slug: "security-fundamentals", description: "Core security principles, CIA triad, defense in depth, and foundational concepts.", level: "Beginner", controls: 24, category: "Fundamentals" },
  { title: "Identity & Access Management", slug: "identity-access-management", description: "Authentication, authorization, SSO, privileged access management, and identity governance.", level: "Intermediate", controls: 32, category: "Fundamentals" },
  { title: "Cryptography", slug: "cryptography", description: "Encryption algorithms, key management, PKI, digital signatures, and cryptographic protocols.", level: "Advanced", controls: 20, category: "Fundamentals" },
  { title: "Zero Trust Architecture", slug: "zero-trust-architecture", description: "Continuous verification, micro-segmentation, and assuming breach methodologies.", level: "Advanced", controls: 35, category: "Fundamentals" },
  { title: "Security Awareness", slug: "security-awareness", description: "Phishing prevention, social engineering defense, and building a security culture.", level: "Beginner", controls: 15, category: "Fundamentals" },

  // AppSec
  { title: "Application Security", slug: "application-security", description: "SAST, DAST, secure coding practices, vulnerability management, and app security testing.", level: "Intermediate", controls: 28, category: "AppSec" },
  { title: "API Security", slug: "api-security", description: "API authentication, rate limiting, input validation, and protection against OWASP API Top 10.", level: "Intermediate", controls: 22, category: "AppSec" },
  { title: "Web Application Security", slug: "web-application-security", description: "Defending against XSS, CSRF, SQLi, and securing modern web frontend and backends.", level: "Intermediate", controls: 30, category: "AppSec" },
  { title: "DevSecOps", slug: "devsecops", description: "Integrating security into CI/CD pipelines, infrastructure as code scanning, and automation.", level: "Advanced", controls: 25, category: "AppSec" },
  { title: "Threat Modeling", slug: "threat-modeling", description: "STRIDE, DREAD, attack trees, and proactive system design review techniques.", level: "Intermediate", controls: 18, category: "AppSec" },
  { title: "Secrets Management", slug: "secrets-management", description: "Vaulting, key rotation, preventing secret leakage, and dynamic credential generation.", level: "Intermediate", controls: 15, category: "AppSec" },
  { title: "Supply Chain Security", slug: "supply-chain-security", description: "SBOMs, dependency scanning, package provenance, and mitigating third-party risks.", level: "Advanced", controls: 24, category: "AppSec" },

  // Infrastructure
  { title: "Cloud Security", slug: "cloud-security", description: "AWS, Azure, GCP security controls, cloud-native security, and multi-cloud governance.", level: "Advanced", controls: 45, category: "Infrastructure" },
  { title: "Network Security", slug: "network-security", description: "Firewalls, IDS/IPS, network segmentation, VPNs, and deep packet inspection.", level: "Intermediate", controls: 35, category: "Infrastructure" },
  { title: "Endpoint Security", slug: "endpoint-security", description: "EDR, antivirus, device encryption, patch management, and BYOD security policies.", level: "Beginner", controls: 16, category: "Infrastructure" },
  { title: "Container Security", slug: "container-security", description: "Docker, Kubernetes security, image scanning, runtime protection, and container hardening.", level: "Advanced", controls: 38, category: "Infrastructure" },
  { title: "Mobile Security", slug: "mobile-security", description: "MDM, iOS/Android sandboxing, app vetting, and mobile threat defense.", level: "Intermediate", controls: 20, category: "Infrastructure" },
  { title: "Physical Security", slug: "physical-security", description: "Access controls, surveillance, environmental controls, and facility hardening.", level: "Beginner", controls: 22, category: "Infrastructure" },

  // Operations
  { title: "Incident Response", slug: "incident-response", description: "Incident handling procedures, forensics, threat hunting, and crisis management playbook.", level: "Advanced", controls: 25, category: "Operations" },
  { title: "Security Operations", slug: "security-operations", description: "SOC structure, SIEM, SOAR, runbooks, and continuous threat monitoring.", level: "Intermediate", controls: 30, category: "Operations" },
  { title: "Logging and Monitoring", slug: "logging-and-monitoring", description: "Centralized logging, audit trails, metrics collection, and alerting strategies.", level: "Beginner", controls: 18, category: "Operations" },
  { title: "Vulnerability Management", slug: "vulnerability-management", description: "Scanning, prioritization, patching lifecycles, and risk-based remediation.", level: "Intermediate", controls: 22, category: "Operations" },
  { title: "Threat Intelligence", slug: "threat-intelligence", description: "IOCs, TTPs, MITRE ATT&CK framework mapping, and OSINT gathering.", level: "Advanced", controls: 16, category: "Operations" },

  // Governance
  { title: "Governance, Risk, and Compliance", slug: "governance-risk-compliance", description: "Risk assessment, business impact analysis, third-party risk, and security metrics.", level: "Intermediate", controls: 18, category: "Governance" },
  { title: "Compliance Audit", slug: "compliance-audit", description: "SOC 2, ISO 27001, PCI-DSS preparation, evidence collection, and regulatory mapping.", level: "Advanced", controls: 42, category: "Governance" },
  { title: "Business Continuity", slug: "business-continuity", description: "Disaster recovery planning, RTO/RPO, backups, and resilience strategies.", level: "Intermediate", controls: 26, category: "Governance" },

  // Data Security
  { title: "Data Security", slug: "data-security", description: "Data classification, DLP, tokenization, masking, and data lifecycle management.", level: "Intermediate", controls: 28, category: "Data Security" },
  { title: "Data Protection", slug: "data-protection", description: "Privacy regulations (GDPR/CCPA), consent management, and right-to-be-forgotten implementation.", level: "Advanced", controls: 30, category: "Data Security" },
  { title: "Database Security", slug: "database-security", description: "SQL hardening, DAM, auditing, access controls, and database encryption.", level: "Intermediate", controls: 24, category: "Data Security" },
  { title: "Email Security", slug: "email-security", description: "SPF, DKIM, DMARC, anti-spam, malware filtering, and secure email gateways.", level: "Beginner", controls: 12, category: "Data Security" },

  // Offensive Security
  { title: "Red Team Operations", slug: "red-team-operations", description: "Adversary simulation, penetration testing, social engineering, and evasion tactics.", level: "Advanced", controls: 20, category: "Offensive Security" },
  { title: "Digital Forensics", slug: "digital-forensics", description: "Evidence acquisition, memory analysis, disk forensics, and chain of custody.", level: "Advanced", controls: 18, category: "Offensive Security" },

  // Emerging Tech
  { title: "AI/ML Security", slug: "ai-ml-security", description: "Adversarial machine learning, model inversion, data poisoning, and secure ML pipelines.", level: "Advanced", controls: 15, category: "Emerging Tech" },
  { title: "Blockchain Security", slug: "blockchain-security", description: "Smart contract auditing, 51% attacks, consensus mechanisms, and wallet security.", level: "Advanced", controls: 22, category: "Emerging Tech" },
  { title: "IoT Security", slug: "iot-security", description: "Embedded device security, firmware analysis, side-channel attacks, and protocol vulnerabilities.", level: "Advanced", controls: 30, category: "Emerging Tech" },
];
