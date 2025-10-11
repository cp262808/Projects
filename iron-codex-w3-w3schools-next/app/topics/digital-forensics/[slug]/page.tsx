import Client from './digital_forensics_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
