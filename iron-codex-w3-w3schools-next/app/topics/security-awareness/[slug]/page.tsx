import Client from './security_awareness_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
