import Client from './data_protection_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
