import Client from './zero_trust_architecture_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
