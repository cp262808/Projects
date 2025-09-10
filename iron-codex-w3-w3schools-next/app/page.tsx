import Link from "next/link";

const topics = [
  { name: "API Security", slug: "api-security", description: "Protect APIs from abuse and data leaks." },
  { name: "Identity & Access Management", slug: "identity-access-management", description: "Control user identities and permissions." },
  { name: "Zero Trust", slug: "zero-trust", description: "Never trust, always verify." }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Cybersecurity Reference</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="rounded-lg border border-gray-200 p-6 hover:shadow-lg transition duration-200"
          >
            <h2 className="text-xl font-semibold mb-2">{topic.name}</h2>
            <p className="text-gray-600 text-sm">{topic.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
