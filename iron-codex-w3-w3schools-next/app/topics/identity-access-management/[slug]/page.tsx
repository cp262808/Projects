import type { Metadata } from "next";
import IAMClient from "./IAMClient";

const TITLES: Record<string,string> = {
  intro:"Introduction", "auth-basics":"Authentication Basics", mfa:"Multi-Factor Authentication",
  adaptive:"Adaptive Auth", sso:"Single Sign-On", federation:"Identity Federation", oauth:"OAuth 2.0 & OIDC",
  rbac:"Role-Based Access Control", abac:"ABAC / Policy-Based", least:"Least Privilege & JIT",
  lifecycle:"Identity Lifecycle", pam:"Privileged Access Management", monitoring:"Monitoring & Governance",
  quiz:"Quiz", snippets:"Snippets"
};

export function generateMetadata({ params }:{ params:{ slug:string } }): Metadata {
  const title = TITLES[params.slug] ?? "Identity & Access Management";
  return {
    title: `${title} · IAM · Topics`,
    description: `IAM topic: ${title}`,
  };
}

export default function Page({ params }:{ params:{ slug: string } }) {
  return <IAMClient slug={params.slug as any} />;
}