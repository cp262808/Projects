import Client from './supply_chain_security_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
