import Link from "next/link";
import { listSubjects } from "@/lib/content";

export default function Home() {
  const subjects = listSubjects();
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">知识库</h1>
      <ul className="grid grid-cols-2 gap-4">
        {subjects.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${s.slug}`}
              className="block rounded-lg border p-6 hover:bg-gray-50"
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="ml-2 text-lg font-medium">{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
