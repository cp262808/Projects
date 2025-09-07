"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavBar(){
  const [open, setOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="border-b">
        <nav className="h-13 max-h-13 container flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight text-black flex items-center gap-2">
            <span className="inline-flex -mt-0.5 text-w3green">🛡️</span> Iron Codex
          </Link>

          <button
            className="md:hidden p-2"
            aria-expanded={open}
            aria-controls="navmenu"
            onClick={()=>setOpen(v=>!v)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black"></div>
          </button>

          <ul id="navmenu" className={`md:flex hidden items-center h-13`}>
            <li><Link className="px-4 h-13 flex items-center text-sm font-medium hover:bg-gray-100" href="/">Home</Link></li>

            <li className="relative group">
              <button
                className="px-4 h-13 flex items-center text-sm font-medium hover:bg-gray-100"
                onMouseEnter={()=>setOpenMega("refs")}
                onFocus={()=>setOpenMega("refs")}
                onMouseLeave={()=>setOpenMega(null)}
              >
                References ▾
              </button>
              <div
                onMouseEnter={()=>setOpenMega("refs")}
                onMouseLeave={()=>setOpenMega(null)}
                className={`absolute left-0 top-full bg-white border rounded-xl shadow-soft p-4 w-[760px] grid grid-cols-1 md:grid-cols-3 gap-4 ${openMega==="refs" ? "block" : "hidden"}`}
              >
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Core</h4>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/api-security">API Security</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/cloud-security">Cloud Security</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/identity-access">Identity & Access</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/network-security">Network Security</Link>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Build & Run</h4>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/container-security">Container Security</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/devsecops">DevSecOps</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/saas-security">SaaS Security</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/zero-trust">Zero Trust</Link>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Assurance</h4>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/vuln-mgmt">Vulnerability Mgmt</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/incident-response">Incident Response</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/compliance">Compliance</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/topics/risk">Risk Management</Link>
                </div>
              </div>
            </li>

            <li className="relative group">
              <button
                className="px-4 h-13 flex items-center text-sm font-medium hover:bg-gray-100"
                onMouseEnter={()=>setOpenMega("guides")}
                onFocus={()=>setOpenMega("guides")}
                onMouseLeave={()=>setOpenMega(null)}
              >
                Guides ▾
              </button>
              <div
                onMouseEnter={()=>setOpenMega("guides")}
                onMouseLeave={()=>setOpenMega(null)}
                className={`absolute left-0 top-full bg-white border rounded-xl shadow-soft p-4 w-[760px] grid grid-cols-1 md:grid-cols-3 gap-4 ${openMega==="guides" ? "block" : "hidden"}`}
              >
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Quickstarts</h4>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/guides/jwt-hardening">JWT Hardening</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/guides/s3-least-privilege">S3 Least Privilege</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/guides/k8s-network-policies">K8s Network Policies</Link>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Patterns</h4>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/guides/mtls-e2e">mTLS End‑to‑End</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/guides/oidc-b2b">OIDC for B2B</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/guides/siem-pipeline">SIEM Pipeline</Link>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Compliance Maps</h4>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/maps/nist-800-53">NIST 800‑53</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/maps/iso-27001">ISO 27001</Link>
                  <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/maps/soc2">SOC 2</Link>
                </div>
              </div>
            </li>

            <li><Link className="px-4 h-13 flex items-center text-sm font-medium hover:bg-gray-100" href="/tools">Tools</Link></li>
            <li><Link className="px-4 h-13 flex items-center text-sm font-medium hover:bg-gray-100" href="/examples">Examples</Link></li>
            <li><Link className="px-4 h-13 flex items-center text-sm font-medium hover:bg-gray-100" href="/search">Search</Link></li>
          </ul>
        </nav>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="md:hidden border-b bg-white">
          <ul className="container py-2">
            <li><Link className="block px-2 py-2" href="/">Home</Link></li>
            <li><Link className="block px-2 py-2" href="/topics">References</Link></li>
            <li><Link className="block px-2 py-2" href="/guides">Guides</Link></li>
            <li><Link className="block px-2 py-2" href="/tools">Tools</Link></li>
            <li><Link className="block px-2 py-2" href="/examples">Examples</Link></li>
            <li><Link className="block px-2 py-2" href="/search">Search</Link></li>
          </ul>
        </div>
      )}

      <div className="bg-w3dark text-w3yellow whitespace-nowrap overflow-x-auto">
        <div className="container h-9 flex items-center gap-2 *:px-3 *:h-9 *:flex *:items-center *:rounded hover:*:bg-black">
          <Link href="#" className="bg-w3green text-white">API Security</Link>
          <Link href="#">Cloud</Link>
          <Link href="#">Identity</Link>
          <Link href="#">Containers</Link>
          <Link href="#">Network</Link>
          <Link href="#">SaaS</Link>
          <Link href="#">IR</Link>
          <Link href="#">Encryption</Link>
          <Link href="#">DevSecOps</Link>
          <Link href="#">Threat Intel</Link>
          <Link href="#">Mobile</Link>
          <Link href="#">Web App</Link>
          <Link href="#">Database</Link>
          <Link href="#">IoT</Link>
          <Link href="#">AI/ML</Link>
          <Link href="#">Supply Chain</Link>
          <Link href="#">Zero Trust</Link>
          <Link href="#">Compliance</Link>
          <Link href="#">Risk</Link>
          <Link href="#">Architecture</Link>
          <Link href="#">Vuln Mgmt</Link>
          <Link href="#">Pentest</Link>
        </div>
      </div>
    </header>
  )
}
