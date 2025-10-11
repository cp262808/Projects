import Client from './secrets_management_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
