import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";

// Source links also work when reading the .mdx files directly on GitHub.
export function lessonHref(subject: string, href?: string): string | undefined {
  if (!href) return href;
  if (/^[a-z][a-z\d+.-]*:/i.test(href)) return href;
  const match = /^(?:\.\/)?([^/?#]+)\.mdx?([?#].*)?$/.exec(href);
  if (!match) return href;
  const [, slug, suffix = ""] = match;
  const base = `/${encodeURIComponent(subject)}`;
  return `${base}${slug === "README" ? "" : `/${encodeURIComponent(slug)}`}${suffix}`;
}

export async function renderLesson(subject: string, source: string) {
  return compileMDX({
    source,
    components: {
      a: ({ href, ...props }) => <a {...props} href={lessonHref(subject, href)} />,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeSlug, rehypeKatex],
      },
    },
  });
}
