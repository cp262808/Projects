import Client from './compliance_audit_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
