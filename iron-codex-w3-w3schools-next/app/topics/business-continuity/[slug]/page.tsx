import Client from './business_continuity_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
