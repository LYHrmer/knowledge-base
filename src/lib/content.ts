import fs from "node:fs";
import path from "node:path";

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
