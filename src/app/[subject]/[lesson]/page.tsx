import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getLesson } from "@/lib/content";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ subject: string; lesson: string }>;
}) {
  const { subject, lesson } = await params;
  const data = getLesson(subject, lesson);
  return (
    <main className="prose mx-auto max-w-3xl p-8">
      <Link href={`/${subject}`} className="text-sm text-blue-600 no-underline">← 返回</Link>
      <h1>{data.title}</h1>
      <MDXRemote
        source={data.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        }}
      />
    </main>
  );
}
