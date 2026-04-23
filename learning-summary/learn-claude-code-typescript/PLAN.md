# Learning Plan: Learn Claude Code TypeScript

## Overview

12 mainline sessions + 1 capstone covering agent harness engineering from zero to a multi-agent platform. Each session learns one mechanism. **Session 00** is a public preface video for the playlist. Mirrors the Python repo's 12-session mainline structure.

### YouTube vs private learning artifacts

- **`transcript.md` and `slides.html`** are **for YouTube viewers** learning [learn-claude-code-typescript](../../../learn-claude-code-typescript/) session by session. The Orchestrator writes them in a **mentor / instructor** voice from the **session’s curriculum sources** — the files named in `SESSION-PROMPTS.md` (“READ THESE FILES”) plus, for Session 00, the shared framing in [learn-claude-code/README.md](../../../learn-claude-code/README.md) and the TypeScript repo README. They are **not** meant to be a verbatim retelling of one student’s `learning-report.md`.
- **`learning-report.md`** remains valuable for **you**: what you understood, quiz results, gaps. The Mentor creates it after each Teacher session. You may attach it when asking the Orchestrator for slides, but **curriculum repos are the primary source of truth** for public video wording.

---

## Prerequisites

- Basic TypeScript / JavaScript (functions, classes, async/await, Promises)
- Node.js installed
- The repo cloned and `npm install` completed
- An API key configured in `.env`

---

## Three-Agent Workflow

Each session follows the same workflow with three cooperating agents:

### Agent Roles

| Agent | Platform | Responsibilities |
|-------|----------|-----------------|
| **Orchestrator** | Cursor sidebar (main chat) | Provides session prompts, creates **YouTube** slides/transcripts from **curriculum sources** (and optional learning report), tracks progress |
| **Teacher** | Claude Code terminal | Teaches the session interactively, asks checkpoint questions, gives quizzes |
| **Mentor** | Cursor sidebar (separate chat) | Monitors the terminal session, assists with quizzes via Socratic method, generates learning reports |

### Per-Session Flow

1. Orchestrator provides the session prompt (from `SESSION-PROMPTS.md`)
2. Student pastes the prompt into the Claude Code terminal
3. Student opens a Mentor chat (from `MENTOR-SYSTEM-PROMPT.md`) and tells the Mentor which session is starting
4. Teacher teaches the session; student periodically attaches transcript snippets to the Mentor
5. Mentor monitors progress, assists when the student is stuck (guides, never answers directly)
6. When the session ends, Mentor generates `learning-report.md` in the chapter folder
7. Student returns to the orchestrator; Orchestrator generates **YouTube** `transcript.md` and `slides.html` from **session curriculum files** (see `SESSION-PROMPTS.md`). Optionally attach `learning-report.md` for extra context.

### Learning Report

The Mentor-generated learning report is the key **private** artifact for **your** learning. It contains:
- Concepts covered and how well they were understood
- Checkpoint question and quiz performance
- Key insights in the student's own words
- Areas of confusion and how they were resolved
- Readiness assessment for the next session

**Public videos** should follow **repository curriculum**, not the report as the main script. The report can still inform tone or emphasis when the Orchestrator merges it with the canonical sources.

---

## Phase 1: THE LOOP (Sessions 01-02)

### Session 01: The Agent Loop

**Source files:**
- `docs/en/s01-the-agent-loop.md`
- `agents/s01_agent_loop.ts`

**Learning objectives:**
- Build the minimal working agent loop: `while (true)` + `stop_reason`
- Understand why `tool_result` is the center of the loop
- Know the minimum state: `messages[]`, one model call, one tool

**Motto:** *"One loop & Bash is all you need"*

---

### Session 02: Tool Use

**Source files:**
- `docs/en/s02-tool-use.md`
- `docs/extras/en/s02a-tool-control-plane.md`
- `docs/extras/en/s02b-tool-execution-runtime.md`
- `agents/s02_tool_use.ts`

**Learning objectives:**
- Understand the tool dispatch pattern: `name -> handler` map
- Know what a tool definition looks like (name, description, input_schema)
- Understand tool_use and tool_result message flow
- See how adding a new tool does NOT change the loop

**Motto:** *"Adding a tool means adding one handler"*

---

## Phase 2: PLANNING & KNOWLEDGE (Sessions 03-06)

### Session 03: TodoWrite / Planning

**Source files:**
- `docs/en/s03-todo-write.md`
- `agents/s03_todo_write.ts`

**Learning objectives:**
- Understand why agents drift without a plan
- See how a simple todo list tool keeps multi-step work on track
- Know where the plan state lives and how it updates

**Motto:** *"An agent without a plan drifts"*

---

### Session 04: Subagent

**Source files:**
- `docs/en/s04-subagent.md`
- `agents/s04_subagent.ts`

**Learning objectives:**
- Understand why one long context gets polluted
- See how a subagent gets a fresh `messages[]`
- Know when to spawn a subagent vs keep using the main context

**Motto:** *"Break big tasks down; each subtask gets a clean context"*

---

### Session 05: Skill Loading

**Source files:**
- `docs/en/s05-skill-loading.md`
- `agents/s05_skill_loading.ts`
- `skills/` directory

**Learning objectives:**
- Understand on-demand knowledge injection via `tool_result`
- Know why loading everything into the system prompt is wasteful
- See the skill file format and how the agent discovers skills

**Motto:** *"Load knowledge when you need it, not upfront"*

---

### Session 06: Context Compact

**Source files:**
- `docs/en/s06-context-compact.md`
- `agents/s06_context_compact.ts`

**Learning objectives:**
- Understand the context window limit problem
- Learn the three-layer compression strategy
- Know when to trigger compaction and what gets preserved

**Motto:** *"Context will fill up; you need a way to make room"*

---

## Phase 3: PERSISTENCE (Sessions 07-08)

### Session 07: Task System

**Source files:**
- `docs/en/s07-task-system.md`
- `agents/s07_task_system.ts`

**Learning objectives:**
- Understand persistent task graph with dependencies
- See file-based CRUD for task state
- Know how tasks differ from session-only planning (s03)

**Motto:** *"Break big goals into small tasks, order them, persist to disk"*

---

### Session 08: Background Tasks

**Source files:**
- `docs/en/s08-background-tasks.md`
- `docs/extras/en/s13a-runtime-task-model.md`
- `agents/s08_background_tasks.ts`
- `agents/task-worker.ts`

**Learning objectives:**
- Understand worker threads for non-blocking execution
- See the notification queue pattern
- Know the runtime task model

**Motto:** *"Run slow operations in the background; the agent keeps thinking"*

---

## Phase 4: TEAMS (Sessions 09-12)

### Session 09: Agent Teams

**Source files:**
- `docs/en/s09-agent-teams.md`
- `agents/s09_agent_teams.ts`
- `agents/teammate-worker.ts`

**Learning objectives:**
- Understand persistent teammates with async JSONL mailboxes
- See how the lead agent delegates to teammates
- Know the teammate worker architecture

**Motto:** *"When the task is too big for one, delegate to teammates"*

---

### Session 10: Team Protocols

**Source files:**
- `docs/en/s10-team-protocols.md`
- `docs/extras/en/team-task-lane-model.md`
- `agents/s10_team_protocols.ts`

**Learning objectives:**
- Understand request-response coordination patterns
- See shutdown and plan approval FSM
- Know the team-task-lane model

**Motto:** *"Teammates need shared communication rules"*

---

### Session 11: Autonomous Agents

**Source files:**
- `docs/en/s11-autonomous-agents.md`
- `agents/s11_autonomous_agents.ts`
- `agents/autonomous-worker.ts`

**Learning objectives:**
- Understand idle polling and automatic task claiming
- See how agents self-organize without lead assignment
- Know the autonomous worker lifecycle

**Motto:** *"Teammates scan the board and claim tasks themselves"*

---

### Session 12: Worktree & Task Isolation

**Source files:**
- `docs/en/s12-worktree-task-isolation.md`
- `agents/s12_worktree_task_isolation.ts`

**Learning objectives:**
- Understand isolated execution lanes via git worktrees
- See how task IDs bind to worktree directories
- Know when isolation prevents interference

**Motto:** *"Each works in its own directory, no interference"*

---

## Capstone: Full System

**Source files:**
- `agents/s_full.ts`
- `docs/extras/en/entity-map.md`
- `docs/en/data-structures.md`
- `docs/extras/en/teaching-scope.md`

**Learning objectives:**
- See all 12 mechanisms combined in one file
- Trace a full request through the complete system
- Identify which mechanism handles which concern
- Be able to rebuild the system from scratch

**Video output:** "The complete agent harness -- all 12 mechanisms in one system"

---

## Extras (Reference Only)

The following topics are archived in the source repo under `agents/extras/` and `docs/extras/en/`. They are NOT part of the mainline learning path but available for self-study:

| Topic | Source Files | Motto |
|-------|-------------|-------|
| Permission System | `docs/extras/en/s07-permission-system.md`, `agents/extras/s07_permission_system.ts` | *A safety gate before execution* |
| Hook System | `docs/extras/en/s08-hook-system.md`, `agents/extras/s08_hook_system.ts` | *Extension points around the loop* |
| Memory System | `docs/extras/en/s09-memory-system.md`, `agents/extras/s09_memory_system.ts` | *Durable cross-session knowledge* |
| System Prompt | `docs/extras/en/s10-system-prompt.md`, `agents/extras/s10_system_prompt.ts` | *Section-based prompt assembly* |
| Error Recovery | `docs/extras/en/s11-error-recovery.md`, `agents/extras/s11_error_recovery.ts` | *Continuation and retry branches* |
| Cron Scheduler | `docs/extras/en/s14-cron-scheduler.md`, `agents/extras/s14_cron_scheduler.ts` | *Time-based triggers* |
| MCP & Plugin | `docs/extras/en/s19-mcp-plugin.md`, `agents/extras/s19_mcp_plugin.ts` | *External capability routing* |

The 19-mechanism capstone combining all mainline + extras is preserved at `agents/extras/s_full_all19.ts`.

---

## After Completion

By the end you should be able to:

1. Explain the agent loop and why `tool_result` is its center
2. Add tools, planning, subagents, and context control to any agent
3. Build a persistent task runtime with background execution
4. Coordinate multiple agents with teams, protocols, and autonomy
5. Isolate parallel work via git worktrees
6. **Teach all 12 mechanisms clearly to others**

---

**Last Updated**: 2026-04-21
