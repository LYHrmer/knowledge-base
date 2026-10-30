import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-4 text-2xl font-bold">没有找到这份课程</h1>
      <p className="mb-4">链接可能已失效，请从知识库目录重新选择。</p>
      <Link href="/" className="text-blue-600 underline">返回知识库</Link>
    </main>
  );
}
