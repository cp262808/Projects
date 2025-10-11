import Client from './logging_and_monitoring_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
