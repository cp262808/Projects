import Client from './governance_risk_compliance_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
