import Client from './threat_intelligence_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
