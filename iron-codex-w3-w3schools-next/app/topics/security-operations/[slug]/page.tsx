import Client from './security_operations_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
