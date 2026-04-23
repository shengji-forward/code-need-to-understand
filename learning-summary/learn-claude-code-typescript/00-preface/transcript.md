# Transcript: Video 00 — Preface (YouTube)

**Audience**: Viewers learning **[learn-claude-code-typescript](https://github.com/shengji-forward/learn-claude-code-typescript)** from this playlist — Session 00 through the capstone.  
**Voice**: Mentor / instructor — speak to **you** on the other side of the screen.  
**Sources**: [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) `README.md` (Python original, shared mental model) + **TypeScript edition** `README.md` + this learning path’s `README.md` / `PLAN.md`.  
**Length**: About twelve to sixteen minutes.

---

## Cold open

If you want to understand how **coding agents** like Claude Code actually work — not as magic prompts, but as **engineering** — you are in the right playlist.

This video is **Session 00**, the map before we open the first TypeScript file. The repo we teach is **learn-claude-code-typescript**. The ideas come from the same story as the **Python** project **learn-claude-code**: one is the original, one is the TypeScript mirror. Same harness philosophy; this playlist walks the **TypeScript** tree session by session.

---

## Two meanings of “building an agent”

From the READMEs: **agency** — perceive, reason, act — comes from **training**, not from wiring `if` statements around an API. A product still needs **two** pieces: the **model** and the **harness**.

Most of us are **harness engineers**: we implement **tools**, curate **knowledge**, wire **observation**, expose **action** interfaces, and set **permissions**. The model decides; the harness executes. Think **driver and vehicle** — intelligence vs the world it moves in.

---

## What “agent” is not — prompt plumbing

Both READMEs warn about the same anti-pattern: drag-and-drop canvases, giant node graphs, and **prompt plumbing** that routes the LLM like a shell script. That stack **decides for** the model instead of giving it a real loop, real tools, and real feedback.

What we build in this course is the opposite: trust the model to choose **when** to act, and build the **environment** — the harness — so those choices matter.

---

## The harness formula (memorize these five words)

The Python and TypeScript READMEs spell it out the same way:

**Harness = Tools + Knowledge + Observation + Action interfaces + Permissions.**

In one breath: **tools** are hands; **knowledge** is docs and domain references; **observation** is diffs, logs, state you show the model; **action** is how changes get applied; **permissions** are sandboxes and approvals. Every later session hangs details on one of these ideas.

---

## Why Claude Code as the skeleton

The TypeScript README strips Claude Code to a list: **one agent loop**, tools, skill loading, context compression, subagents, task graph, team mailboxes, worktree isolation, permission governance. Each **mainline** chapter in this repo adds **one** of those mechanisms in code you can run.

The lesson is not “ship a clone of Anthropic’s product.” The lesson is: **focus engineering on the harness**, not on pretending procedural glue is intelligence.

---

## The minimal pattern every agent needs

Walk through the ASCII diagram in the TypeScript README: **user → messages → model → response**. If **`stop_reason`** says the model wants **tools**, the harness runs them, appends **`tool_result`**, and loops. Otherwise the model answers in **text**. The model chooses; the code executes.

Then connect to the sample **`agentLoop`** in the same README: a `while (true)`, one `messages.create`, push assistant content, branch on **`stop_reason !== "tool_use"`**, build **`tool_result`** blocks, push a user message with results. **Video 01** opens the real `s01_agent_loop.ts` line by line — here we only anchor the picture.

---

## Lineage: Python repo → TypeScript repo

State clearly: **learn-claude-code** is the **Python** reference. **learn-claude-code-typescript** is the **TypeScript edition**, aligned with the same twelve-session mainline. If you already read the Python README, you have seen this story; here we execute it in **Node**, **async/await**, and the Anthropic TypeScript SDK.

---

## What you will watch in this playlist

After this preface:

1. **Videos 01–02** — THE LOOP: the agent loop, then tool dispatch.  
2. **Videos 03–06** — Planning and knowledge: todos, subagents, skills, context compaction.  
3. **Videos 07–08** — Persistence: task graph, background work.  
4. **Videos 09–12** — Teams: teammates, protocols, autonomy, worktree isolation.  
5. **Capstone** — **`agents/s_full.ts`** with **`npm run s:full`**: all twelve mechanisms composed.

One mechanism per video. Same rhythm as the **Learning Path** diagram in the TypeScript README.

---

## Repo layout (where to click)

Point viewers at **`docs/en/`** for mental-model docs and **`agents/`** for runnable scripts **`s01`…`s12`** plus **`s_full`**. **`skills/`** matters when we hit skill loading. **`web/`** is an optional Next.js UI. **`agents/extras/`** and **`docs/extras/en/`** hold **extra** chapters — **not** on this main playlist; use them for self-study after you understand the core.

---

## Scope — what this teaching repo simplifies

Read the **Scope** section calmly: full hook buses, rich permission workflows, session fork and resume, full MCP transport details — simplified or omitted on purpose. The team JSONL protocol is a **teaching** shape, not a claim about anyone’s private production stack.

---

## Quick start (clone and first commands)

Tell viewers to clone the TypeScript repo, **`npm install`**, copy **`.env.example`** to **`.env`**, add **`ANTHROPIC_API_KEY`**, then **`npm run s01`** to start the path and **`npm run s:full`** when they reach the capstone. Optional: **`cd web && npm install && npm run dev`** for the interactive site.

---

## For people *making* this playlist (ten seconds)

If you are the course author: you learn each session with **Teacher** (Claude Code) and **Mentor** (Cursor) and keep a private **`learning-report.md`**. The **Orchestrator** turns **repository curriculum** into the **YouTube transcript and slides** — what you are reading now — so viewers get a clean mentor narrative, not a personal quiz transcript.

---

## Close

You now know **why** this repo exists, **how** the playlist is ordered, and **where** to run code. Next video: **Session 01 — The Agent Loop** — **`docs/en/s01-the-agent-loop.md`**, **`agents/s01_agent_loop.ts`**, motto *One loop & Bash is all you need*. Open the repo, run **`npm run s01`**, and I will see you there.

---
