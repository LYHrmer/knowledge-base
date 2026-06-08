import { describe, it, expect } from "vitest";
import { listSubjects, getLesson } from "@/lib/content";

describe("listSubjects", () => {
  it("返回含 rl 学科及其标题", () => {
    const subjects = listSubjects();
    const rl = subjects.find((s) => s.slug === "rl");
    expect(rl).toBeDefined();
    expect(rl?.title).toBe("强化学习");
  });
});

describe("getLesson", () => {
  it("返回课文正文与 frontmatter", () => {
    const lesson = getLesson("rl", "01_mdp_basics");
    expect(lesson.title).toBe("第 1 课：MDP 与 RL 五要素");
    expect(lesson.difficulty).toBe(1);
    expect(lesson.content).toContain("MDP");
  });
});
