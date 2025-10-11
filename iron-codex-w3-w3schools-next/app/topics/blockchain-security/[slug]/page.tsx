import Client from './blockchain_security_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
