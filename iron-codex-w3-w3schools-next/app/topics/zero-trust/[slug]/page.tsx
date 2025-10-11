import Client from './zero_trust_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
