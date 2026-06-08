import { describe, it, expect } from "vitest";
import { listSubjects } from "@/lib/content";

describe("listSubjects", () => {
  it("返回含 rl 学科及其标题", () => {
    const subjects = listSubjects();
    const rl = subjects.find((s) => s.slug === "rl");
    expect(rl).toBeDefined();
    expect(rl?.title).toBe("强化学习");
  });
});
