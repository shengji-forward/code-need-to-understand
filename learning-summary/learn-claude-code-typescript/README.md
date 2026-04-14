# Learn Claude Code TypeScript -- YouTube Video Learning Path

## Overview

A structured learning path through [learn-claude-code-typescript](../../../learn-claude-code-typescript/), producing 21 YouTube tutorial videos using Reveal.js HTML slide presentations and teaching transcripts.

This path follows the **Feynman method**: learn each agent mechanism deeply, then teach it to others through video. Teaching forces real understanding -- if you can't explain it simply, you don't understand it well enough.

---

## Learning Philosophy

### Two Goals at Once

```
1. Learn agent engineering    → Understand how coding agents like Claude Code actually work
2. Teach through video        → Force deeper understanding via Feynman method + practice English
```

### Key Principles

- **The model IS the agent.** Your job is to build the harness -- the world the intelligence inhabits.
- **Learn one mechanism per session.** Never mix sessions.
- **Teach what you just learned.** Each session produces a video-ready slide deck and transcript.
- **All code comes from the repo.** Never invent code for slides -- use the actual implementation.

---

## How It Works

### Three-Agent System

| Agent | Where | Role |
|-------|-------|------|
| **Orchestrator** | Cursor sidebar | Supervises the learning path, provides session prompts, creates slides/transcripts |
| **Teacher** | Claude Code terminal | Teaches each session interactively with checkpoint questions and quizzes |
| **Mentor** | Cursor sidebar (separate chat) | Monitors sessions, assists with quizzes (Socratic method), generates learning reports |

### Workflow per Chapter

```
Orchestrator (Cursor)     You          Teacher (Terminal)     Mentor (Cursor sidebar)
─────────────────────    ─────        ──────────────────     ───────────────────────
1. Gives session prompt → 2. Pastes → 3. Teaches session
                          4. Learns ← (interactive Q&A)
                          5. Shares transcript ──────────→ 6. Monitors + assists
                          7. Gets help ←──────────────────  (Socratic guidance)
                          8. Completes session ──────────→ 9. Generates learning report
10. Reads learning report ←──────────────────────────────── learning-report.md
11. Creates slides/transcript
12. Updates progress
13. Gives next prompt → ...repeat...
```

### What Each Chapter Produces

| Artifact | Created By | Purpose |
|----------|-----------|---------|
| `learning-report.md` | Mentor agent | Detailed record of what was learned, checkpoint/quiz results, areas of confusion |
| `transcript.md` | Orchestrator | Teaching script for the YouTube video (based on the learning report) |
| `slides.html` | Orchestrator | Reveal.js presentation for screen recording |

### How to Use the Mentor Agent

1. Open a **new Cursor sidebar chat** (separate from the orchestrator chat)
2. Paste the prompt from [`MENTOR-SYSTEM-PROMPT.md`](./MENTOR-SYSTEM-PROMPT.md)
3. Tell the Mentor which session you are starting
4. During the session, periodically attach terminal transcript snippets to the Mentor chat
5. Ask the Mentor for help when stuck on checkpoint questions or quizzes -- it will guide you without giving answers
6. When the session ends, say "Session complete" and the Mentor generates `learning-report.md`
7. Return to the orchestrator chat -- the learning report is the input for creating slides and transcripts

---

## Video Collection (21 Videos)

### Stage 1: Core Loop (Videos 00-06)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 00 | Architecture Overview | s00 + bridge docs s00a-s00f | 15-20 min |
| 01 | The Agent Loop | s01 + `s01_agent_loop.ts` | 10-15 min |
| 02 | Tool Use | s02 + s02a, s02b + `s02_tool_use.ts` | 12-18 min |
| 03 | TodoWrite / Planning | s03 + `s03_todo_write.ts` | 10-15 min |
| 04 | Subagent | s04 + `s04_subagent.ts` | 10-15 min |
| 05 | Skill Loading | s05 + `s05_skill_loading.ts` | 10-15 min |
| 06 | Context Compact | s06 + `s06_context_compact.ts` | 10-15 min |

### Stage 2: System Hardening (Videos 07-11)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 07 | Permission System | s07 + `s07_permission_system.ts` | 10-15 min |
| 08 | Hook System | s08 + `s08_hook_system.ts` | 10-15 min |
| 09 | Memory System | s09 + `s09_memory_system.ts` | 10-15 min |
| 10 | System Prompt | s10 + s10a + `s10_system_prompt.ts` | 12-18 min |
| 11 | Error Recovery | s11 + `s11_error_recovery.ts` | 10-15 min |

### Stage 3: Task Runtime (Videos 12-14)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 12 | Task System | s12 + `s12_task_system.ts` | 12-18 min |
| 13 | Background Tasks | s13 + s13a + `s13_background_tasks.ts` | 12-18 min |
| 14 | Cron Scheduler | s14 + `s14_cron_scheduler.ts` | 10-15 min |

### Stage 4: Multi-Agent Platform (Videos 15-19)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 15 | Agent Teams | s15 + `s15_agent_teams.ts` | 12-18 min |
| 16 | Team Protocols | s16 + `s16_team_protocols.ts` | 12-18 min |
| 17 | Autonomous Agents | s17 + `s17_autonomous_agents.ts` | 12-18 min |
| 18 | Worktree Isolation | s18 + `s18_worktree_task_isolation.ts` | 12-18 min |
| 19 | MCP & Plugin | s19 + s19a + `s19_mcp_plugin.ts` | 15-20 min |

### Capstone (Video 20)

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| 20 | Full System Capstone | `s_full.ts` + all bridge docs | 20-30 min |

---

## Source Repositories

| Repo | Language | Role |
|------|----------|------|
| [learn-claude-code-typescript](../../../learn-claude-code-typescript/) | TypeScript | Primary learning target |
| [learn-claude-code](../../../learn-claude-code/) | Python | Original reference |

---

## Directory Structure

```
learn-claude-code-typescript/
├── README.md                        ← you are here
├── PLAN.md                          ← detailed session-by-session breakdown
├── TODO.md                          ← progress tracker
├── SESSION-PROMPTS.md               ← copy-paste prompts for Claude Code
├── MENTOR-SYSTEM-PROMPT.md          ← copy-paste prompt for Cursor Mentor agent
├── 00-architecture-overview/
│   ├── learning-report.md           ← Mentor-generated session report
│   ├── transcript.md
│   └── slides.html
├── 01-agent-loop/
│   ├── learning-report.md
│   ├── transcript.md
│   └── slides.html
├── 02-tool-use/
│   ├── learning-report.md
│   ├── transcript.md
│   └── slides.html
├── ...
├── 19-mcp-plugin/
│   ├── learning-report.md
│   ├── transcript.md
│   └── slides.html
└── 20-capstone-full-system/
    ├── learning-report.md
    ├── transcript.md
    └── slides.html
```

---

## Slide Technology

All slides use **Reveal.js** loaded via CDN. Each `slides.html` is self-contained -- just open in a browser.

Features:
- Syntax-highlighted code blocks (highlight.js)
- Copy button on all code blocks
- Speaker notes (press `S` in Reveal.js to view)
- PDF export (append `?print-pdf` to URL, then Ctrl+P)
- Dark theme optimized for screen recording

---

## How to Record a Video

1. Open `slides.html` in a full-screen browser
2. Open `transcript.md` in a separate window or teleprompter
3. Start screen recording (OBS, QuickTime, etc.)
4. Present slides while following the transcript
5. Use speaker notes (`S` key) as backup prompts

---

## End Goal

By video 20, you should be able to:

- Explain what a coding agent harness is and why the model is the agent
- Rebuild a minimal agent loop from scratch in TypeScript
- Add tools, planning, subagents, context control, and permissions
- Extend the system with hooks, memory, prompt assembly, and error recovery
- Build a persistent task runtime with background execution and scheduling
- Coordinate multiple agents with teams, protocols, and worktree isolation
- Route external capabilities through MCP

**If you can teach all 21 videos clearly, you truly understand agent engineering.**

---

**Last Updated**: 2026-04-14
**Current Focus**: Session 00 -- Architecture Overview
