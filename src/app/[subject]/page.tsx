import Link from "next/link";
import { getSubject, getLesson } from "@/lib/content";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const meta = getSubject(subject);
  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link href="/" className="text-sm text-blue-600">← 返回</Link>
      <h1 className="my-4 text-2xl font-bold">{meta.icon} {meta.title}</h1>
      <ol className="space-y-2">
        {meta.order.map((slug, i) => {
          const lesson = getLesson(subject, slug);
          return (
            <li key={slug}>
              <Link href={`/${subject}/${slug}`} className="text-blue-600 hover:underline">
                {i + 1}. {lesson.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
