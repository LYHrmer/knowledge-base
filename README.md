# 强化学习知识库

从 MDP、价值函数到 PPO，再连接机器人环境、Sim2Real 与模仿学习的中文课程。正文放在 `content/rl/`，可以直接在 GitHub 阅读，也可以启动 Next.js 网站阅读公式与课文。

## 从哪里开始

| 当前目标 | 建议顺序 |
| --- | --- |
| 第一次接触强化学习 | [RL 是什么](content/rl/00a_what_is_rl.mdx) → [数学准备](content/rl/00b_math_primer.mdx) → [MDP 五要素](content/rl/01_mdp_basics.mdx) |
| 理解 Actor、Critic 与 PPO | [REINFORCE](content/rl/04_reinforce.mdx) → [A2C](content/rl/05_a2c.mdx) → [PPO](content/rl/06_ppo.mdx) |
| 把策略接到机器人 | [自定义环境](content/rl/07_custom_gym_env.mdx) → [域随机化与 ROS2](content/rl/08_domain_rand_ros2.mdx) → [LQR/MPC](content/rl/09_lqr_mpc.mdx) |
| 了解操作策略与具身模型 | [模仿学习](content/rl/11_imitation_learning.mdx) → [Diffusion Policy](content/rl/13_diffusion_policy.mdx) → [世界模型](content/rl/14_world_models.mdx) → [VLA](content/rl/15_vla.mdx) |
| 回查概念或训练问题 | [算法对照](content/rl/algorithms_at_a_glance.mdx) · [符号表](content/rl/notation_cheatsheet.mdx) · [排障指南](content/rl/debugging_guide.mdx) |

完整顺序由 [`content/rl/_meta.json`](content/rl/_meta.json) 维护；所有课文见 [`content/rl/`](content/rl/)。运行训练代码前先读[环境准备](content/rl/00_linux_setup.mdx)，[习题解答](content/rl/solutions.mdx)留到自答后核对。教程练习不等于已经完成机器人实机验证。

## 在本机阅读

需要能运行当前锁定依赖的 Node.js 与 npm，版本以 [`package.json`](package.json) 和 [`package-lock.json`](package-lock.json) 为准。训练用的 Python 环境按具体课文单独准备。

```bash
git clone https://github.com/LYHrmer/knowledge-base.git
cd knowledge-base
npm ci
npm run dev
```

打开 <http://localhost:3000>，选择“强化学习”；课程目录也可从 <http://localhost:3000/rl> 进入。单课地址为 `/rl/课文文件名`，不带 `.mdx` 后缀，例如 `/rl/06_ppo`。

生产构建与本机运行：

```bash
npm run build
npm start
```

直接在 GitHub 阅读不需要安装依赖。本仓库使用服务端读取 MDX，不是双击 HTML 即可运行的离线站点。

## 修改课程

| 文件 | 职责 |
| --- | --- |
| [`content/rl/`](content/rl/) | MDX 正文与课程元数据 |
| [`src/lib/content.ts`](src/lib/content.ts) | 读取学科、课文与 frontmatter |
| [`src/app/page.tsx`](src/app/page.tsx) | 学科入口 |
| [`src/app/[subject]/page.tsx`](src/app/[subject]/page.tsx) | 学科课程目录 |
| [`src/app/[subject]/[lesson]/page.tsx`](src/app/[subject]/[lesson]/page.tsx) | 单课正文与数学渲染 |

新增课文时参考现有 frontmatter，填写 `title`，按需要填写 `difficulty` 与 `prereq`，并把不带扩展名的文件名加入 `_meta.json` 的 `order`。只添加 MDX 文件而不更新目录，课文不会出现在正常课程列表里。

```bash
npm test
npm run lint
npm run build
```

已有单元测试覆盖内容读取的基本行为；通过它不代表所有课文、公式或训练示例已经验证。修改课文后仍需打开对应页面检查公式与链接；修改算法示例后按课文条件运行。涉及 API、模型能力或工具版本时核对原始来源并记录适用版本。
