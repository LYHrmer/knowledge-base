import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Subject = {
  slug: string;
  title: string;
  icon: string;
  order: string[];
};

export function listSubjects(): Subject[] {
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const meta = JSON.parse(
        fs.readFileSync(path.join(CONTENT_DIR, e.name, "_meta.json"), "utf8"),
      );
      return { slug: e.name, title: meta.title, icon: meta.icon, order: meta.order };
    });
}

export type Lesson = {
  subject: string;
  slug: string;
  title: string;
  difficulty: number;
  prereq: string[];
  content: string; // 原始 MDX 正文(不含 frontmatter)
};

export function getLesson(subject: string, slug: string): Lesson {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, subject, `${slug}.mdx`),
    "utf8",
  );
  const { data, content } = matter(raw);
  return {
    subject,
    slug,
    title: data.title,
    difficulty: data.difficulty ?? 0,
    prereq: data.prereq ?? [],
    content,
  };
}
