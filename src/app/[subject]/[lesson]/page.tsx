import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson } from "@/lib/content";
import { renderLesson } from "@/lib/render-lesson";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ subject: string; lesson: string }>;
}) {
  const { subject, lesson } = await params;
  const data = getLesson(subject, lesson);
  if (!data) notFound();
  const { content } = await renderLesson(subject, data.content);
  return (
    <main className="prose dark:prose-invert mx-auto max-w-3xl p-8">
      <Link href={`/${subject}`} className="text-sm text-blue-600 no-underline">← 返回</Link>
      {content}
    </main>
  );
}
