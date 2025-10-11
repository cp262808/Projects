import Client from './threat_modeling_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
