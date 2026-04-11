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
  "Governance",
  "Operations",
] as const;

export const topics: Topic[] = [
  {
    title: "Security Fundamentals",
    slug: "security-fundamentals",
    description: "Core security principles, governance frameworks, and foundational concepts every security professional should know.",
    level: "Beginner",
    controls: 24,
    category: "Fundamentals",
  },
  {
    title: "Identity & Access Management",
    slug: "identity-access-management",
    description: "Authentication, authorization, SSO, privileged access management, and identity governance.",
    level: "Intermediate",
    controls: 32,
    category: "Fundamentals",
  },
  {
    title: "Application Security",
    slug: "application-security",
    description: "SAST, DAST, secure coding practices, vulnerability management, and application security testing.",
    level: "Intermediate",
    controls: 28,
    category: "AppSec",
  },
  {
    title: "API Security",
    slug: "api-security",
    description: "API authentication, rate limiting, input validation, and protection against OWASP API Top 10.",
    level: "Intermediate",
    controls: 22,
    category: "AppSec",
  },
  {
    title: "Cloud Security",
    slug: "cloud-security",
    description: "AWS, Azure, GCP security controls, cloud-native security, and multi-cloud governance.",
    level: "Advanced",
    controls: 45,
    category: "Infrastructure",
  },
  {
    title: "Network Security",
    slug: "network-security",
    description: "Firewalls, IDS/IPS, network segmentation, VPNs, and network monitoring.",
    level: "Intermediate",
    controls: 35,
    category: "Infrastructure",
  },
  {
    title: "Endpoint Security",
    slug: "endpoint-security",
    description: "EDR, antivirus, device encryption, patch management, and BYOD security.",
    level: "Beginner",
    controls: 16,
    category: "Infrastructure",
  },
  {
    title: "Container Security",
    slug: "container-security",
    description: "Docker, Kubernetes security, image scanning, runtime protection, and container hardening.",
    level: "Advanced",
    controls: 38,
    category: "Infrastructure",
  },
  {
    title: "Cryptography",
    slug: "cryptography",
    description: "Encryption algorithms, key management, PKI, digital signatures, and cryptographic protocols.",
    level: "Advanced",
    controls: 20,
    category: "Fundamentals",
  },
  {
    title: "Risk Management",
    slug: "governance-risk-compliance",
    description: "Risk assessment, business impact analysis, third-party risk, and security metrics.",
    level: "Intermediate",
    controls: 18,
    category: "Governance",
  },
  {
    title: "Compliance & Governance",
    slug: "compliance-audit",
    description: "SOC 2, ISO 27001, NIST frameworks, audit preparation, and regulatory compliance.",
    level: "Advanced",
    controls: 42,
    category: "Governance",
  },
  {
    title: "Incident Response",
    slug: "incident-response",
    description: "Incident handling procedures, forensics, threat hunting, and crisis management.",
    level: "Advanced",
    controls: 25,
    category: "Operations",
  },
];
