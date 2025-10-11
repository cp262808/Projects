import Client from './incident_response_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
