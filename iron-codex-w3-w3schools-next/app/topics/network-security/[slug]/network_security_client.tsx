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
  | "intro" | "ngfw" | "dmz" | "nac" | "waf"
  | "segmentation" | "acls" | "isolation"
  | "ids" | "traffic-analysis" | "siem" | "honeypots"
  | "vpn" | "encryption" | "wireless" | "protocols"
  | "hardening" | "redundancy" | "change-mgmt"
  | "quiz" | "snippets";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Perimeter Defense", children: [
    { id: "ngfw", label: "Next-Gen Firewalls" },
    { id: "dmz", label: "DMZ Architecture" },
    { id: "nac", label: "Network Access Control" },
    { id: "waf", label: "Web App Firewalls" },
  ]},
  { label: "Segmentation", children: [
    { id: "segmentation", label: "Network Segmentation" },
    { id: "acls", label: "Access Control Lists" },
    { id: "isolation", label: "Network Isolation" },
  ]},
  { label: "Monitoring & Detection", children: [
    { id: "ids", label: "IDS / IPS" },
    { id: "traffic-analysis", label: "Traffic Analysis" },
    { id: "siem", label: "SIEM Integration" },
    { id: "honeypots", label: "Honeypots" },
  ]},
  { label: "Secure Communications", children: [
    { id: "vpn", label: "VPN Solutions" },
    { id: "encryption", label: "Network Encryption" },
    { id: "wireless", label: "Wireless Security" },
    { id: "protocols", label: "Protocol Security" },
  ]},
  { label: "Management", children: [
    { id: "hardening", label: "Device Hardening" },
    { id: "redundancy", label: "Redundancy" },
    { id: "change-mgmt", label: "Change Management" },
  ]},
  { id: "quiz", label: "Quiz" },
  { id: "snippets", label: "Snippets" },
];

// Code snippets
const iptablesCode = `# iptables — Block all inbound, allow established + SSH
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT`;

const snortRuleCode = `# Snort IDS Rule — detect SQL injection attempts
alert tcp $EXTERNAL_NET any -> $HOME_NET $HTTP_PORTS (
  msg:"SQL Injection Attempt";
  flow:to_server,established;
  content:"UNION"; nocase;
  content:"SELECT"; nocase;
  sid:1000001; rev:1;
)`;

const aclCode = `# Cisco ACL — restrict inter-VLAN traffic
access-list 100 permit tcp 10.10.10.0 0.0.0.255 10.20.20.0 0.0.0.255 eq 443
access-list 100 permit tcp 10.10.10.0 0.0.0.255 10.20.20.0 0.0.0.255 eq 22
access-list 100 deny   ip  10.10.10.0 0.0.0.255 10.20.20.0 0.0.0.255
access-list 100 permit ip  any any`;

const wireguardCode = `# WireGuard VPN — server config
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <server-private-key>
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT

[Peer]
PublicKey = <client-public-key>
AllowedIPs = 10.0.0.2/32`;

// ---------- Nav + Search helpers --------------------------------------------
const hrefFor = (slug: Slug) => `/topics/network-security/${slug}`;

const ALL_SLUGS: Slug[] = [
  "intro","ngfw","dmz","nac","waf","segmentation","acls","isolation",
  "ids","traffic-analysis","siem","honeypots",
  "vpn","encryption","wireless","protocols",
  "hardening","redundancy","change-mgmt","quiz","snippets"
];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "network security overview perimeter segmentation monitoring encryption",
  ngfw: "next generation firewall deep packet inspection application awareness threat intelligence",
  dmz: "demilitarized zone public facing services isolation",
  nac: "network access control device compliance identity verification 802.1x",
  waf: "web application firewall sql injection xss owasp",
  segmentation: "vlan subnet micro-segmentation zero trust",
  acls: "access control lists traffic rules filtering",
  isolation: "critical systems sensitive data separation air gap",
  ids: "intrusion detection prevention system snort suricata",
  "traffic-analysis": "network flow anomaly detection netflow",
  siem: "security information event management correlation",
  honeypots: "deception technology honeynet canary",
  vpn: "virtual private network ipsec wireguard openvpn tunnel",
  encryption: "tls ssl ipsec macsec network encryption",
  wireless: "wifi wpa3 wireless segmentation rogue ap",
  protocols: "disable insecure telnet ftp snmpv3 ssh",
  hardening: "network device router switch configuration cis benchmark",
  redundancy: "failover redundant path high availability",
  "change-mgmt": "change management configuration control rollback",
  quiz: "quiz",
  snippets: "snippets iptables acl wireguard snort",
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

  // --- Section bodies --------------------------------------------------------
  function SectionBody() {
    switch (slug) {
      case "intro":
        return (
          <Card title="Introduction">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <p>
                  Network security forms the <b>first line of defense</b> against cyber threats.
                  It encompasses the technologies, policies, and practices designed to protect
                  network infrastructure, monitor traffic, and ensure secure communications.
                </p>
                <div className="flex flex-wrap gap-2">
                  {"Perimeter Segmentation Monitoring Encryption".split(" ").map((p) => (
                    <span key={p} className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">{p}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">18</b>
                  <div className="text-xs text-slate-400">Controls</div>
                </div>
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">5</b>
                  <div className="text-xs text-slate-400">Domains</div>
                </div>
              </div>
            </div>
          </Card>
        );

      case "ngfw":
        return (
          <Card title="Next-Generation Firewalls">
            <p>Implement advanced firewalls with deep packet inspection, application awareness, and threat intelligence integration.</p>
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3">
              <b>Implementation:</b>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Application-layer filtering and control</li>
                <li>Intrusion prevention capabilities</li>
                <li>SSL/TLS inspection and decryption</li>
                <li>Threat intelligence feeds integration</li>
              </ul>
            </div>
            <CodeBlock id="iptables" code={iptablesCode} />
          </Card>
        );

      case "dmz":
        return (
          <Card title="DMZ Architecture">
            <p>Establish demilitarized zones to isolate public-facing services from internal networks.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Place web servers, email gateways, and DNS in the DMZ</li>
              <li>Use dual-firewall architecture for maximum isolation</li>
              <li>Restrict DMZ-to-internal traffic to specific ports and protocols</li>
              <li>Monitor all traffic crossing DMZ boundaries</li>
            </ul>
          </Card>
        );

      case "nac":
        return (
          <Card title="Network Access Control (NAC)">
            <p>Control device access to network resources based on device compliance and identity verification.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Implement 802.1X port-based authentication</li>
              <li>Check device posture (patches, AV, encryption) before granting access</li>
              <li>Quarantine non-compliant devices to remediation VLANs</li>
              <li>Integrate with identity providers for user-based policies</li>
            </ul>
          </Card>
        );

      case "waf":
        return (
          <Card title="Web Application Firewalls">
            <p>Protect web applications from common attacks like SQL injection, XSS, and OWASP Top 10 vulnerabilities.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Deploy in blocking mode after tuning false positives</li>
              <li>Create custom rules for application-specific threats</li>
              <li>Enable bot detection and rate limiting</li>
              <li>Integrate with CI/CD to update rules on deployments</li>
            </ul>
          </Card>
        );

      case "segmentation":
        return (
          <Card title="Network Segmentation">
            <p>Divide networks into smaller segments to limit attack spread and improve security monitoring.</p>
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3">
              <b>Implementation:</b>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>VLAN configuration and management</li>
                <li>Subnet isolation and routing controls</li>
                <li>Micro-segmentation for critical assets</li>
                <li>Zero trust network architecture</li>
              </ul>
            </div>
          </Card>
        );

      case "acls":
        return (
          <Card title="Access Control Lists (ACLs)">
            <p>Define and enforce network traffic rules at various network layers.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Follow <b>deny-by-default</b> — only allow explicitly permitted traffic</li>
              <li>Place most specific rules first; order matters</li>
              <li>Log denied traffic for threat detection</li>
              <li>Review and audit ACLs quarterly</li>
            </ul>
            <CodeBlock id="acl-code" code={aclCode} />
          </Card>
        );

      case "isolation":
        return (
          <Card title="Network Isolation">
            <p>Separate critical systems and sensitive data networks from general user networks.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Air-gap networks for highest-sensitivity environments</li>
              <li>Dedicated management networks for infrastructure devices</li>
              <li>Separate guest WiFi from corporate networks</li>
              <li>Use jump boxes / bastion hosts for admin access to isolated segments</li>
            </ul>
          </Card>
        );

      case "ids":
        return (
          <Card title="Intrusion Detection / Prevention Systems">
            <p>Monitor network traffic for suspicious activities and known attack patterns.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Deploy IDS at network perimeter and between segments</li>
              <li>Keep signatures updated daily</li>
              <li>Tune rules to reduce false positives</li>
              <li>Use IPS inline for automatic blocking of known threats</li>
            </ul>
            <CodeBlock id="snort-rule" code={snortRuleCode} />
          </Card>
        );

      case "traffic-analysis":
        return (
          <Card title="Network Traffic Analysis">
            <p>Continuously analyze network flows to detect anomalies and potential threats.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Collect NetFlow/IPFIX data from routers and switches</li>
              <li>Establish baselines for normal traffic patterns</li>
              <li>Alert on deviations: unusual volumes, new destinations, off-hours activity</li>
              <li>Use deep packet inspection for encrypted traffic analysis where permitted</li>
            </ul>
          </Card>
        );

      case "siem":
        return (
          <Card title="SIEM Integration">
            <p>Integrate network security devices with SIEM for centralized monitoring and correlation.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Forward firewall, IDS, and NAC logs to SIEM</li>
              <li>Create correlation rules for multi-stage attacks</li>
              <li>Configure real-time alerting for critical events</li>
              <li>Build dashboards for network security posture visibility</li>
            </ul>
          </Card>
        );

      case "honeypots":
        return (
          <Card title="Honeypots & Honeynets">
            <p>Use deception technology to detect and analyze attack methods.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Deploy low-interaction honeypots on unused IP addresses</li>
              <li>Any traffic to a honeypot is inherently suspicious — alert immediately</li>
              <li>Use canary tokens in documents, credentials, and DNS</li>
              <li>Feed honeypot intelligence into threat hunting workflows</li>
            </ul>
          </Card>
        );

      case "vpn":
        return (
          <Card title="VPN Solutions">
            <p>Provide secure remote access through encrypted tunnels and strong authentication.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Prefer WireGuard or IKEv2/IPsec over legacy PPTP/L2TP</li>
              <li>Require MFA for all VPN connections</li>
              <li>Implement split tunneling carefully — audit what bypasses the tunnel</li>
              <li>Monitor for compromised VPN credentials</li>
            </ul>
            <CodeBlock id="wireguard" code={wireguardCode} />
          </Card>
        );

      case "encryption":
        return (
          <Card title="Network Encryption">
            <p>Encrypt sensitive network communications using strong cryptographic protocols.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enforce TLS 1.2+ for all web traffic; prefer TLS 1.3</li>
              <li>Use IPsec for site-to-site tunnels</li>
              <li>Implement MACsec (802.1AE) for LAN encryption where supported</li>
              <li>Disable SSLv3, TLS 1.0, TLS 1.1 and weak cipher suites</li>
            </ul>
          </Card>
        );

      case "wireless":
        return (
          <Card title="Wireless Security">
            <p>Implement WPA3 encryption and proper wireless network segmentation.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use WPA3-Enterprise with 802.1X authentication</li>
              <li>Segment guest WiFi from corporate networks</li>
              <li>Deploy wireless intrusion detection for rogue AP detection</li>
              <li>Disable WPS; use strong, unique PSKs where WPA3-Enterprise isn&rsquo;t feasible</li>
            </ul>
          </Card>
        );

      case "protocols":
        return (
          <Card title="Protocol Security">
            <p>Disable insecure protocols and implement secure alternatives.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-3 py-2 text-left text-slate-300">Insecure</th>
                    <th className="px-3 py-2 text-left text-slate-300">Replace With</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr><td className="px-3 py-2 text-rose-300">Telnet</td><td className="px-3 py-2 text-emerald-300">SSH</td></tr>
                  <tr><td className="px-3 py-2 text-rose-300">FTP</td><td className="px-3 py-2 text-emerald-300">SFTP / SCP</td></tr>
                  <tr><td className="px-3 py-2 text-rose-300">SNMPv1/v2c</td><td className="px-3 py-2 text-emerald-300">SNMPv3</td></tr>
                  <tr><td className="px-3 py-2 text-rose-300">HTTP</td><td className="px-3 py-2 text-emerald-300">HTTPS (TLS 1.3)</td></tr>
                  <tr><td className="px-3 py-2 text-rose-300">PPTP</td><td className="px-3 py-2 text-emerald-300">WireGuard / IKEv2</td></tr>
                </tbody>
              </table>
            </div>
          </Card>
        );

      case "hardening":
        return (
          <Card title="Network Device Hardening">
            <p>Secure network infrastructure devices with proper configuration and access controls.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Change all default credentials immediately</li>
              <li>Disable unused ports and services</li>
              <li>Apply CIS benchmarks for routers, switches, and firewalls</li>
              <li>Use out-of-band management networks for admin access</li>
              <li>Keep firmware updated and track CVEs</li>
            </ul>
          </Card>
        );

      case "redundancy":
        return (
          <Card title="Network Redundancy">
            <p>Implement redundant network paths and failover mechanisms for availability.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Deploy redundant switches and routers in critical paths</li>
              <li>Use link aggregation (LACP) for bandwidth and resilience</li>
              <li>Configure automatic failover with VRRP/HSRP</li>
              <li>Test failover scenarios regularly</li>
            </ul>
          </Card>
        );

      case "change-mgmt":
        return (
          <Card title="Network Change Management">
            <p>Establish controlled processes for network configuration changes.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Require change requests with risk assessment and rollback plan</li>
              <li>Use version control for all device configurations</li>
              <li>Schedule maintenance windows for impactful changes</li>
              <li>Verify changes don&rsquo;t break security controls post-deployment</li>
            </ul>
          </Card>
        );

      case "quiz":
        return (
          <Card title="Quick Quiz">
            <Quiz
              question="What is the primary benefit of network segmentation?"
              options={["Faster internet speed", "Limiting lateral movement of attackers", "Reducing hardware costs"]}
              answerIndex={1}
            />
            <div className="mt-4" />
            <Quiz
              question="Which protocol should replace Telnet for secure device management?"
              options={["FTP", "SSH", "SNMP"]}
              answerIndex={1}
            />
          </Card>
        );

      case "snippets":
        return (
          <Card title="Copy-Paste Snippets">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <b>iptables baseline</b>
                <CodeBlock id="snip-iptables" code={iptablesCode} />
              </div>
              <div>
                <b>Cisco ACL template</b>
                <CodeBlock id="snip-acl" code={aclCode} />
              </div>
            </div>
          </Card>
        );
    }
  }

  // -------------------------------- Render ----------------------------------
  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide">Iron‑Codex • Network Security</h1>
        </div>
        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">
          <input
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"
            placeholder="Search topics… (e.g., VPN, IDS)"
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

      {/* Content */}
      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Network Security</div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold">
            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}
          </h2>
          <Badge>18 Controls</Badge>
        </div>
        <SectionBody />
      </main>
    </div>
  );
}
