import Client from './iam_client';

export default function Page({ params }: { params: { slug: string } }) {
  return <Client params={params} />;
}
