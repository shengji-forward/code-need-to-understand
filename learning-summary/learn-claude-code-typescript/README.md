# Learn Claude Code TypeScript -- YouTube Video Learning Path

## Overview

A structured learning path through [learn-claude-code-typescript](../../../learn-claude-code-typescript/), producing 13 YouTube tutorial videos (12 mainline + 1 capstone) using Reveal.js HTML slide presentations and teaching transcripts.

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

## Video Collection (13 Videos)

### Phase 1: THE LOOP (Videos 01-02)

| Video | Title | Source | Motto | Duration Target |
|-------|-------|--------|-------|-----------------|
| 01 | The Agent Loop | `s01-the-agent-loop.md` + `s01_agent_loop.ts` | *One loop & Bash is all you need* | 10-15 min |
| 02 | Tool Use | `s02-tool-use.md` + `s02_tool_use.ts` | *Adding a tool means adding one handler* | 12-18 min |

### Phase 2: PLANNING & KNOWLEDGE (Videos 03-06)

| Video | Title | Source | Motto | Duration Target |
|-------|-------|--------|-------|-----------------|
| 03 | TodoWrite / Planning | `s03-todo-write.md` + `s03_todo_write.ts` | *An agent without a plan drifts* | 10-15 min |
| 04 | Subagent | `s04-subagent.md` + `s04_subagent.ts` | *Break big tasks down; each subtask gets a clean context* | 10-15 min |
| 05 | Skill Loading | `s05-skill-loading.md` + `s05_skill_loading.ts` | *Load knowledge when you need it, not upfront* | 10-15 min |
| 06 | Context Compact | `s06-context-compact.md` + `s06_context_compact.ts` | *Context will fill up; you need a way to make room* | 10-15 min |

### Phase 3: PERSISTENCE (Videos 07-08)

| Video | Title | Source | Motto | Duration Target |
|-------|-------|--------|-------|-----------------|
| 07 | Task System | `s07-task-system.md` + `s07_task_system.ts` | *Break big goals into small tasks, order them, persist to disk* | 12-18 min |
| 08 | Background Tasks | `s08-background-tasks.md` + `s08_background_tasks.ts` | *Run slow operations in the background; the agent keeps thinking* | 12-18 min |

### Phase 4: TEAMS (Videos 09-12)

| Video | Title | Source | Motto | Duration Target |
|-------|-------|--------|-------|-----------------|
| 09 | Agent Teams | `s09-agent-teams.md` + `s09_agent_teams.ts` | *When the task is too big for one, delegate to teammates* | 12-18 min |
| 10 | Team Protocols | `s10-team-protocols.md` + `s10_team_protocols.ts` | *Teammates need shared communication rules* | 12-18 min |
| 11 | Autonomous Agents | `s11-autonomous-agents.md` + `s11_autonomous_agents.ts` | *Teammates scan the board and claim tasks themselves* | 12-18 min |
| 12 | Worktree & Task Isolation | `s12-worktree-task-isolation.md` + `s12_worktree_task_isolation.ts` | *Each works in its own directory, no interference* | 12-18 min |

### Capstone

| Video | Title | Source | Duration Target |
|-------|-------|--------|-----------------|
| Capstone | Full System | `s_full.ts` + entity-map + data-structures | 20-30 min |

### Extras (Reference Only)

The following topics are archived in the source repo under `agents/extras/` and `docs/extras/en/`. They are NOT part of the video learning path but available for self-study:

| Topic | Source |
|-------|--------|
| Permission System | `extras/en/s07-permission-system.md` + `s07_permission_system.ts` |
| Hook System | `extras/en/s08-hook-system.md` + `s08_hook_system.ts` |
| Memory System | `extras/en/s09-memory-system.md` + `s09_memory_system.ts` |
| System Prompt | `extras/en/s10-system-prompt.md` + `s10_system_prompt.ts` |
| Error Recovery | `extras/en/s11-error-recovery.md` + `s11_error_recovery.ts` |
| Cron Scheduler | `extras/en/s14-cron-scheduler.md` + `s14_cron_scheduler.ts` |
| MCP & Plugin | `extras/en/s19-mcp-plugin.md` + `s19_mcp_plugin.ts` |

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
├── README.md                        <- you are here
├── PLAN.md                          <- detailed session-by-session breakdown
├── TODO.md                          <- progress tracker
├── SESSION-PROMPTS.md               <- copy-paste prompts for Claude Code
├── MENTOR-SYSTEM-PROMPT.md          <- copy-paste prompt for Cursor Mentor agent
├── 01-agent-loop/
│   ├── learning-report.md
│   ├── transcript.md
│   └── slides.html
├── 02-tool-use/
├── 03-todo-planning/
├── 04-subagent/
├── 05-skill-loading/
├── 06-context-compact/
├── 07-task-system/
├── 08-background-tasks/
├── 09-agent-teams/
├── 10-team-protocols/
├── 11-autonomous-agents/
├── 12-worktree-task-isolation/
├── capstone-full-system/
│   ├── learning-report.md
│   ├── transcript.md
│   └── slides.html
└── extras/
    ├── permission-system/
    ├── hook-system/
    ├── memory-system/
    ├── system-prompt/
    ├── error-recovery/
    ├── cron-scheduler/
    └── mcp-plugin/
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

By the capstone, you should be able to:

- Explain what a coding agent harness is and why the model is the agent
- Rebuild a minimal agent loop from scratch in TypeScript
- Add tools, planning, subagents, and context control to any agent
- Build a persistent task runtime with background execution
- Coordinate multiple agents with teams, protocols, and autonomy
- Isolate parallel work via git worktrees

**If you can teach all 13 videos clearly, you truly understand agent engineering.**

---

**Last Updated**: 2026-04-19
**Current Focus**: Session 01 -- The Agent Loop
