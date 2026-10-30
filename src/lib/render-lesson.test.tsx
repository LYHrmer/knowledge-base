import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it } from "vitest";
import { getLesson, listSubjects } from "@/lib/content";
import { lessonHref, renderLesson } from "@/lib/render-lesson";

const lessons = listSubjects().flatMap((subject) =>
  subject.order.map((slug) => ({ subject: subject.slug, slug })),
);
const rendered = new Map<string, Document>();

beforeAll(async () => {
  for (const { subject, slug } of lessons) {
    const lesson = getLesson(subject, slug);
    if (!lesson) throw new Error(`Missing lesson: ${subject}/${slug}`);
    const { content } = await renderLesson(subject, lesson.content);
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(content), "text/html");
    rendered.set(`/${subject}/${slug}`, doc);
  }
}, 30_000);

describe("课程正文渲染与导航", () => {
  it.each(lessons)("$subject/$slug 的正文、公式和课程链接可用", ({ subject, slug }) => {
    const doc = rendered.get(`/${subject}/${slug}`)!;
    expect(doc.querySelectorAll("h1")).toHaveLength(1);
    expect(doc.querySelectorAll(".katex-error")).toHaveLength(0);
    for (const link of doc.querySelectorAll<HTMLAnchorElement>("a[href]")) {
      const href = link.getAttribute("href")!;
      if (!href.startsWith(`/${subject}`) && !href.startsWith("#")) continue;
      const url = new URL(href, `https://example.test/${subject}/${slug}`);
      if (url.pathname === `/${subject}`) continue;
      const target = rendered.get(decodeURIComponent(url.pathname));
      expect(target, `${slug}: ${href}`).toBeDefined();
      if (url.hash) {
        expect(target?.getElementById(decodeURIComponent(url.hash.slice(1))), `${slug}: ${href}`).not.toBeNull();
      }
    }
    // The same links must resolve to files when reading the source on GitHub.
    const source = getLesson(subject, slug)!.content;
    for (const [, href] of source.matchAll(/\]\(([^\s)]+)\)/g)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(href)) continue;
      const filename = href.split(/[?#]/, 1)[0];
      expect(fs.existsSync(path.join("content", subject, filename)), `${slug}: ${href}`).toBe(true);
    }
  });

  it("数学准备的表格、代码块与中文小节锚点保留", () => {
    const doc = rendered.get("/rl/00b_math_primer")!;
    expect(doc.querySelector("table thead")).not.toBeNull();
    expect(doc.querySelector("pre code")?.textContent).toContain("f(x)");
    expect(doc.getElementById("10-重要性采样importance-sampling")).not.toBeNull();
  });
});

describe("课程链接转换", () => {
  it.each([
    ["./06_ppo.mdx#例子", "/rl/06_ppo#例子"],
    ["06_ppo.md?view=full#例子", "/rl/06_ppo?view=full#例子"],
    ["README.md", "/rl"],
    ["#例子", "#例子"],
    ["https://example.com/guide.md", "https://example.com/guide.md"],
    ["mailto:notes@example.md", "mailto:notes@example.md"],
    ["//example.com/guide.md", "//example.com/guide.md"],
    ["../other/guide.md", "../other/guide.md"],
    ["/rl/06_ppo", "/rl/06_ppo"],
  ])("%s → %s", (href, expected) => {
    expect(lessonHref("rl", href)).toBe(expected);
  });
});
