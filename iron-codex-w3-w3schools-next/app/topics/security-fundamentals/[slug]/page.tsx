import Client from './security_fundamentals_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
