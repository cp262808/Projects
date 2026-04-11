"use client";
import React, { useMemo, useState } from "react";
import { PromoFlare } from "@/components/PromoFlare";
import { useRouter } from "next/navigation";

// ---------- Small UI bits ----------------------------------------------------
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-100">
      {children}
    </span>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 shadow-xl overflow-hidden mb-5">
      <div className="px-4 sm:px-5 py-3 border-b border-slate-700/60 font-semibold tracking-tight">
        {title}
      </div>
      <div className="p-4 sm:p-5 space-y-3">{children}</div>
    </section>
  );
}

function CodeBlock({ id, code }: { id: string; code: string }) {
  return (
    <div className="relative">
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            const btn = document.getElementById(id + "-btn");
            if (btn) {
              const old = btn.textContent;
              btn.textContent = "Copied!";
              setTimeout(() => (btn.textContent = old), 1200);
            }
          } catch {}
        }}
        id={id + "-btn"}
        className="absolute top-2 right-2 text-xs px-2 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700"
        aria-label="Copy code"
      >
        Copy
      </button>
      <pre className="text-[13px] leading-6 overflow-x-auto p-3 rounded-xl border border-slate-800 bg-[#0b0e15] text-sky-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Quiz({
  question,
  options,
  answerIndex,
}: {
  question: string;
  options: string[];
  answerIndex: number;
}) {
  const [sel, setSel] = useState<number | null>(null);
  const [status, setStatus] = useState<"" | "right" | "wrong">("");
  return (
    <div className="space-y-3" data-quiz>
      <div className="font-semibold" id={`q-${question}`}>{question}</div>
      <div role="radiogroup" aria-labelledby={`q-${question}`} className="grid gap-2">
        {options.map((opt, i) => (
          <label
            key={i}
            className={
              "flex items-center gap-2 border rounded-xl px-3 py-2 cursor-pointer bg-slate-800/60 hover:bg-slate-800 " +
              (sel === i
                ? status === "right"
                  ? "outline outline-2 outline-emerald-400/80"
                  : status === "wrong"
                  ? "outline outline-2 outline-rose-400/80"
                  : ""
                : "")
            }
          >
            <input type="radio" name={question} onChange={() => setSel(i)} className="accent-emerald-400" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-2 rounded-xl bg-indigo-400/90 text-slate-900 font-bold"
          onClick={() => {
            if (sel === null) return;
            setStatus(sel === answerIndex ? "right" : "wrong");
          }}
        >
          Check
        </button>
        <button
          className="px-3 py-2 rounded-xl border border-slate-700"
          onClick={() => {
            setSel(null);
            setStatus("");
          }}
        >
          Reset
        </button>
      </div>
      {status === "right" && <div className="text-emerald-300">✓ Correct</div>}
      {status === "wrong" && <div className="text-rose-300">✗ Try again</div>}
    </div>
  );
}

// ---------- Content Model ----------------------------------------------------
export type Slug =
  | "intro"
  | "cloud-iam" | "cloud-mfa" | "service-accounts" | "cross-account"
  | "vpc-security" | "network-segmentation" | "cloud-vpn" | "cloud-waf"
  | "encryption-at-rest" | "encryption-in-transit" | "key-management" | "data-classification"
  | "instance-hardening" | "container-security" | "serverless-security"
  | "object-storage" | "database-security" | "backup-security"
  | "cloud-trail" | "security-monitoring" | "log-analysis-siem"
  | "compliance-framework" | "config-management" | "security-assessment"
  | "quiz" | "snippets";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Identity & Access Management", children: [
    { id: "cloud-iam", label: "Cloud IAM" },
    { id: "cloud-mfa", label: "Multi-Factor Auth" },
    { id: "service-accounts", label: "Service Accounts" },
    { id: "cross-account", label: "Cross-Account Access" },
  ]},
  { label: "Network Security", children: [
    { id: "vpc-security", label: "VPC Security" },
    { id: "network-segmentation", label: "Segmentation" },
    { id: "cloud-vpn", label: "VPN & Connectivity" },
    { id: "cloud-waf", label: "Web App Firewall" },
  ]},
  { label: "Data Protection", children: [
    { id: "encryption-at-rest", label: "Encryption at Rest" },
    { id: "encryption-in-transit", label: "Encryption in Transit" },
    { id: "key-management", label: "Key Management" },
    { id: "data-classification", label: "Data Classification" },
  ]},
  { label: "Compute Security", children: [
    { id: "instance-hardening", label: "Instance Hardening" },
    { id: "container-security", label: "Container Security" },
    { id: "serverless-security", label: "Serverless Security" },
  ]},
  { label: "Storage Security", children: [
    { id: "object-storage", label: "Object Storage" },
    { id: "database-security", label: "Database Security" },
    { id: "backup-security", label: "Backup Security" },
  ]},
  { label: "Monitoring & Logging", children: [
    { id: "cloud-trail", label: "Cloud Trail Logging" },
    { id: "security-monitoring", label: "Security Monitoring" },
    { id: "log-analysis-siem", label: "Log Analysis & SIEM" },
  ]},
  { label: "Compliance & Governance", children: [
    { id: "compliance-framework", label: "Compliance Framework" },
    { id: "config-management", label: "Config Management" },
    { id: "security-assessment", label: "Security Assessment" },
  ]},
  { id: "quiz", label: "Quiz" },
  { id: "snippets", label: "Snippets" },
];

const awsS3BucketPolicyCode = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RequireEncryptedTransport",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::my-secure-bucket/*",
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}`;

const azurePolicyCode = `{
  "if": {
    "field": "type",
    "equals": "Microsoft.Storage/storageAccounts"
  },
  "then": {
    "effect": "auditIfNotExists",
    "details": {
      "type": "Microsoft.Storage/storageAccounts/blobServices",
      "existenceCondition": {
        "field": "Microsoft.Storage/storageAccounts/blobServices/cors.corsRules[*].allowedOrigins[*]",
        "notEquals": "*"
      }
    }
  }
}`;

const hrefFor = (slug: Slug) => `/topics/cloud-security/${slug}`;

const ALL_SLUGS: Slug[] = [
  "intro", "cloud-iam", "cloud-mfa", "service-accounts", "cross-account",
  "vpc-security", "network-segmentation", "cloud-vpn", "cloud-waf",
  "encryption-at-rest", "encryption-in-transit", "key-management", "data-classification",
  "instance-hardening", "container-security", "serverless-security",
  "object-storage", "database-security", "backup-security",
  "cloud-trail", "security-monitoring", "log-analysis-siem",
  "compliance-framework", "config-management", "security-assessment",
  "quiz", "snippets"
];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "cloud security infrastructure aws azure gcp serverless multi-cloud",
  "cloud-iam": "cloud identity access management roles users permissions policies",
  "cloud-mfa": "multi-factor authentication privileged access root account",
  "service-accounts": "service accounts non-human identity key rotation iam roles",
  "cross-account": "cross-account access trust relationships assume role federation",
  "vpc-security": "virtual private cloud vpc subnets security groups nACLs networking",
  "network-segmentation": "network segmentation limit lateral movement isolation",
  "cloud-vpn": "vpn private connectivity direct connect expressroute ipsec peering",
  "cloud-waf": "web application firewall ddos protection shield aws waf appgw",
  "encryption-at-rest": "encryption at rest ebs rds s3 disk encryption kms",
  "encryption-in-transit": "encryption in transit tls ssl certificates acm",
  "key-management": "key management kms hsm rotation cmk customer managed keys",
  "data-classification": "data classification tagging labeling sensitive information macie",
  "instance-hardening": "instance hardening ami images patching ec2 vm agent",
  "container-security": "container security orchestration kubernetes eks aks gke images",
  "serverless-security": "serverless security lambda azure functions least privilege event injection",
  "object-storage": "object storage s3 blob storage public access block policies",
  "database-security": "database security rds dynamo cosmosdb sql authentication encryption",
  "backup-security": "backup security disaster recovery snapshots immutable vaults cross-region",
  "cloud-trail": "cloudtrail logging api calls activity monitoring audit logs",
  "security-monitoring": "security monitoring guardduty security center real-time events anomalies",
  "log-analysis-siem": "log analysis siem cloudwatch event hubs splunk sentinel qradar correlation",
  "compliance-framework": "compliance framework pci hipaa soc2 cloud control matrix csa",
  "config-management": "configuration management posture cspm aws config azure policy insecure configs",
  "security-assessment": "security assessment penetration testing vulnerability scanning inspector",
  quiz: "quiz",
  snippets: "snippets policy json s3 azure",
};

function findFirstMatchingSlug(q: string): Slug | null {
  const needle = q.trim().toLowerCase();
  if (!needle) return null;
  for (const s of ALL_SLUGS) {
    if (SEARCH_TEXT[s].includes(needle)) return s;
  }
  return null;
}

export default function Client({ slug }: { slug: Slug }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const filteredToc = useMemo(() => {
    const f = (label: string) => label.toLowerCase().includes(q.toLowerCase());
    return TOC
      .map((item) => {
        if ("id" in item) return f(item.label) ? item : null;
        const kids = item.children.filter((c) => f(c.label));
        return kids.length ? { ...item, children: kids } : f(item.label) ? item : null;
      })
      .filter(Boolean) as TocItem[];
  }, [q]);

  function runSearch() {
    const s = findFirstMatchingSlug(q);
    if (s) router.push(hrefFor(s));
  }

  function SectionBody() {
    switch (slug) {
      case "intro":
        return (
          <Card title="Introduction">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <p>
                  Cloud security demands a shift from traditional perimeter defense to a dynamic, 
                  identity-first approach. Protecting infrastructure and services in AWS, Azure, 
                  and GCP requires securing compute, storage, and networking layers through the Shared Responsibility Model.
                </p>
                <div className="flex flex-wrap gap-2">
                  {"IAM Infrastructure Serverless Multi-Cloud Workloads".split(" ").map((p) => (
                    <span key={p} className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">{p}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">25</b>
                  <div className="text-xs text-slate-400">Controls</div>
                </div>
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">7</b>
                  <div className="text-xs text-slate-400">Domains</div>
                </div>
              </div>
            </div>
          </Card>
        );

      case "cloud-iam":
        return (
          <Card title="Cloud IAM Implementation">
            <p>Implement proper identity and access management across all cloud platforms to govern access securely.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Follow the principle of least privilege for IAM policies and roles</li>
              <li>Avoid inline policies; use managed policies for reusability and tracking</li>
              <li>Regularly review access using cloud access analyzers</li>
              <li>Enforce strong password policies for console users</li>
            </ul>
          </Card>
        );

      case "cloud-mfa":
        return (
          <Card title="Multi-Factor Authentication">
            <p>Enforce MFA for all administrative and privileged cloud access.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Require MFA for the root/global admin account immediately</li>
              <li>Enforce MFA for console access for all human identities</li>
              <li>Consider hardware tokens for high-privileged roles</li>
              <li>Use condition keys in policies to mandate MFA for API access when assuming critical roles</li>
            </ul>
          </Card>
        );

      case "service-accounts":
        return (
          <Card title="Service Account Security">
            <p>Secure service accounts with proper permissions and key rotation.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Avoid long-lived access keys whenever possible</li>
              <li>Use instance profiles or managed identities (e.g., IAM roles for EC2, Azure Managed Identities) for applications</li>
              <li>If keys must be used, implement automated rotation every 90 days</li>
              <li>Scope service account permissions tightly to specific resources</li>
            </ul>
          </Card>
        );

      case "cross-account":
        return (
          <Card title="Cross-Account Access Control">
            <p>Secure cross-account access with proper trust relationships.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use role assumption instead of sharing credentials</li>
              <li>Define strict trust policies limiting which principals can assume the role</li>
              <li>Require an External ID when granting access to third-party accounts</li>
            </ul>
          </Card>
        );

      case "vpc-security":
        return (
          <Card title="Virtual Private Cloud (VPC) Security">
            <p>Implement proper VPC configuration with subnets, security groups, and routing.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Keep databases and internal services in private subnets without public IPs</li>
              <li>Use Security Groups to model stateful application-tier boundaries</li>
              <li>Use Network ACLs for stateless, subnet-level deny rules</li>
              <li>Route outbound external traffic through NAT Gateways, avoiding direct IGW access where not needed</li>
            </ul>
          </Card>
        );

      case "network-segmentation":
        return (
          <Card title="Network Segmentation">
            <p>Segment cloud networks to limit attack spread and improve monitoring.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use multi-account/multi-subscription strategies to separate environments (e.g., Prod vs Dev)</li>
              <li>Isolate blast radiuses using VPC peering selectively or Transit Gateways</li>
              <li>Log accepted and rejected traffic (VPC Flow Logs)</li>
            </ul>
          </Card>
        );

      case "cloud-vpn":
        return (
          <Card title="VPN and Private Connectivity">
            <p>Secure connectivity between on-premises and cloud environments.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use managed VPN services or dedicated private connections (AWS Direct Connect, Azure ExpressRoute) for hybrid architectures</li>
              <li>Encrypt traffic over these connections using IPsec</li>
            </ul>
          </Card>
        );

      case "cloud-waf":
        return (
          <Card title="Web Application Firewall (WAF)">
            <p>Deploy cloud WAF to protect web applications from attacks.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Attach WAF to Load Balancers, API Gateways, and CDNs</li>
              <li>Deploy managed rulesets (like OWASP Top 10 mitigations)</li>
              <li>Integrate with cloud DDoS protection services (e.g., AWS Shield, Azure DDoS Protection)</li>
            </ul>
          </Card>
        );

      case "encryption-at-rest":
        return (
          <Card title="Encryption at Rest">
            <p>Encrypt all data stored in cloud services using strong encryption algorithms.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enable default encryption for all block storage (EBS, Managed Disks) and object storage</li>
              <li>Encrypt relational databases and data warehouses</li>
              <li>Secure backups and snapshots with separate keys</li>
            </ul>
          </Card>
        );

      case "encryption-in-transit":
        return (
          <Card title="Encryption in Transit">
            <p>Ensure all data transmission uses TLS/SSL encryption.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Terminate TLS at the load balancer or API Gateway</li>
              <li>Use Managed Certificate Managers (ACM, Azure Key Vault) for automated rotation</li>
              <li>Enforce HTTPS-only communication via load balancer redirects or CloudFront viewer policies</li>
            </ul>
          </Card>
        );

      case "key-management":
        return (
          <Card title="Key Management">
            <p>Implement proper cryptographic key management and rotation.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use Cloud Key Management Services (AWS KMS, Azure Key Vault, Google Cloud KMS)</li>
              <li>Prefer Customer Managed Keys (CMKs) for critical data to control access policies and rotation schedules</li>
              <li>Enable automatic annual key rotation for symmetric keys</li>
            </ul>
          </Card>
        );

      case "data-classification":
        return (
          <Card title="Data Classification">
            <p>Classify and label data based on sensitivity and regulatory requirements.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enforce tagging policies for all cloud resources to track data sensitivity</li>
              <li>Use cloud-native discovery tools (AWS Macie, GCP DLP) to identify PII/PHI in storage</li>
              <li>Apply differential IAM policies based on resource tags</li>
            </ul>
          </Card>
        );

      case "instance-hardening":
        return (
          <Card title="Instance Security Hardening">
            <p>Harden cloud compute instances with proper configuration and patching.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Build golden AMIs / base images with hardened benchmarks (CIS)</li>
              <li>Automate OS patching using tools like AWS Systems Manager</li>
              <li>Remove unnecessary services and default accounts</li>
            </ul>
          </Card>
        );

      case "container-security":
        return (
          <Card title="Container Security">
            <p>Secure containerized applications and orchestration platforms.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Scan container images for vulnerabilities in registries (ECR, ACR)</li>
              <li>Implement Kubernetes RBAC and restrict cluster admin access</li>
              <li>Use managed orchestration (EKS, AKS, GKE) to avoid managing the control plane</li>
            </ul>
          </Card>
        );

      case "serverless-security":
        return (
          <Card title="Serverless Security">
            <p>Implement security controls for serverless functions and applications.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Apply least privilege execution roles per function</li>
              <li>Validate and sanitize all event inputs to prevent injection attacks</li>
              <li>Monitor for timeouts and unexpected concurrency indicative of DoS attacks</li>
            </ul>
          </Card>
        );

      case "object-storage":
        return (
          <Card title="Object Storage Security">
            <p>Secure cloud object storage with proper access controls and encryption.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enable &quot;Block Public Access&quot; at the account level if public buckets are not required</li>
              <li>Write bucket policies to enforce encryption and secure transport</li>
              <li>Enable versioning and object locks for ransomware resilience</li>
            </ul>
          </Card>
        );

      case "database-security":
        return (
          <Card title="Database Security">
            <p>Implement security controls for cloud database services.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Disable public accessibility for RDS/managed databases</li>
              <li>Use IAM database authentication instead of static passwords</li>
              <li>Enable transparent data encryption (TDE)</li>
            </ul>
          </Card>
        );

      case "backup-security":
        return (
          <Card title="Backup Security">
            <p>Secure backup data with encryption and access controls.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Implement cross-region or cross-account backups for disaster recovery</li>
              <li>Use immutable backup vaults where supported to prevent tampering</li>
              <li>Encrypt backup data using different keys than the primary data</li>
            </ul>
          </Card>
        );

      case "cloud-trail":
        return (
          <Card title="Cloud Trail Logging">
            <p>Enable comprehensive logging of all cloud API calls and activities.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enable AWS CloudTrail, Azure Activity Log, or GCP Cloud Audit Logs globally</li>
              <li>Store logs in a centralized, secure bucket with tightly restricted access</li>
              <li>Enable log file integrity validation</li>
            </ul>
          </Card>
        );

      case "security-monitoring":
        return (
          <Card title="Security Monitoring">
            <p>Implement real-time monitoring for security events and anomalies.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enable native threat detection services (AWS GuardDuty, Microsoft Defender for Cloud)</li>
              <li>Configure alerts for root account usage or unauthorized access attempts</li>
            </ul>
          </Card>
        );

      case "log-analysis-siem":
        return (
          <Card title="Log Analysis and SIEM">
            <p>Aggregate and analyze cloud logs for security insights.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Forward logs (VPC flow logs, API logs, DNS logs) to a SIEM or central logging account</li>
              <li>Correlate cloud infrastructure logs with application logs</li>
            </ul>
          </Card>
        );

      case "compliance-framework":
        return (
          <Card title="Cloud Compliance Framework">
            <p>Implement compliance controls for relevant regulations and standards.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Leverage cloud provider compliance programs and artifacts</li>
              <li>Map controls to frameworks like CIS Foundations Benchmark, SOC 2, or PCI-DSS</li>
            </ul>
          </Card>
        );

      case "config-management":
        return (
          <Card title="Configuration Management">
            <p>Ensure cloud resources are configured according to security policies.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use Cloud Security Posture Management (CSPM) tools like AWS Config or Azure Policy</li>
              <li>Implement auto-remediation for critical misconfigurations (e.g., closing public SSH ports)</li>
              <li>Deploy infrastructure as code (Terraform, CloudFormation) with integrated security scanning</li>
            </ul>
          </Card>
        );

      case "security-assessment":
        return (
          <Card title="Security Assessment">
            <p>Regular security assessments and penetration testing of cloud infrastructure.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use continuous vulnerability scanning on instances and containers (e.g., AWS Inspector)</li>
              <li>Perform approved penetration testing on cloud environments</li>
            </ul>
          </Card>
        );

      case "quiz":
        return (
          <Card title="Quick Quiz">
            <Quiz
              question="What is the most secure way to grant a third-party application access to your AWS account?"
              options={["Create an IAM user and share the Access Key", "Use Cross-Account Role Assumption with an External ID", "Allow public access to the resources"]}
              answerIndex={1}
            />
            <div className="mt-4" />
            <Quiz
              question="To protect against public data exposure in S3, what feature should be enabled at the account level?"
              options={["EventBridge", "S3 Block Public Access", "CloudFront"]}
              answerIndex={1}
            />
          </Card>
        );

      case "snippets":
        return (
          <Card title="Copy-Paste Snippets">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <b>AWS S3 Bucket Policy (Require HTTPS)</b>
                <CodeBlock id="s3-https" code={awsS3BucketPolicyCode} />
              </div>
              <div>
                <b>Azure Policy (Audit unrestricted CORS on Storage)</b>
                <CodeBlock id="azure-policy" code={azurePolicyCode} />
              </div>
            </div>
          </Card>
        );
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide">Iron‑Codex • Cloud Security</h1>
        </div>
        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">
          <input
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"
            placeholder="Search topics… (e.g., IAM, VPC)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') runSearch(); }}
            aria-label="Filter sidebar topics"
          />
          <button
            type="button"
            aria-label="Run search"
            title="Search"
            onClick={runSearch}
            className="shrink-0 grid place-items-center rounded-l-none rounded-r-lg bg-emerald-400 text-slate-900 w-10 h-auto"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <nav className="p-2 text-sm">
          <h4 className="px-2 mt-2 mb-1 text-xs uppercase tracking-widest text-slate-400">Chapters</h4>
          <div className="space-y-2">
            {filteredToc.map((item, idx) => (
              <div key={idx}>
                {"id" in item ? (
                  <PromoFlare label={item.label} tone={slug === item.id ? "active" : "default"} eyebrow="Lesson" href={hrefFor(item.id)} size="sm" />
                ) : (
                  <details open className="rounded-xl border border-slate-800 bg-slate-900/40">
                    <summary className="cursor-pointer px-3 py-2 font-semibold">{item.label}</summary>
                    <div className="px-2 pb-2 space-y-1">
                      {item.children.map((c) => (
                        <PromoFlare key={c.id} label={c.label} tone={slug === c.id ? "active" : "default"} size="sm" eyebrow="Lesson" href={hrefFor(c.id)} />
                      ))}
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
          <h4 className="px-2 mt-4 mb-1 text-xs uppercase tracking-widest text-slate-400">Practice</h4>
          <PromoFlare label="Section Quiz" eyebrow="Practice" href={hrefFor("quiz")} size="sm" />
          <PromoFlare label="Snippets" eyebrow="Practice" href={hrefFor("snippets")} size="sm" />
        </nav>
      </aside>

      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Cloud Security</div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold">
            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}
          </h2>
          <Badge>25 Controls</Badge>
        </div>
        <SectionBody />
      </main>
    </div>
  );
}
