import Client from './identity_access_management_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
