import Client from './cryptography_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
