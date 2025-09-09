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
      