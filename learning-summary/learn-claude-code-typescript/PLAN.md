# Learning Plan: Learn Claude Code TypeScript

## Overview

21 sessions covering agent harness engineering from zero to a multi-agent platform. Each session learns one mechanism, then produces a YouTube-ready Reveal.js slide deck and teaching transcript.

---

## Prerequisites

- Basic TypeScript / JavaScript (functions, classes, async/await, Promises)
- Node.js installed
- The repo cloned and `npm install` completed
- An API key configured in `.env`

---

## Stage 1: Core Loop (Sessions 00-06)

### Session 00: Architecture Overview

**Source files:**
- `docs/en/s00-architecture-overview.md`
- `docs/en/s00a-query-control-plane.md`
- `docs/en/s00b-one-request-lifecycle.md`
- `docs/en/s00c-query-transition-model.md`
- `docs/en/s00d-chapter-order-rationale.md`
- `docs/en/s00e-reference-module-map.md`
- `docs/en/s00f-code-reading-order.md`
- `docs/en/glossary.md`
- `docs/en/teaching-scope.md`
- `docs/en/data-structures.md`
- `docs/en/entity-map.md`

**Learning objectives:**
- Understand the full system map before diving into any mechanism
- Learn what "the model is the agent" and "harness vs agent" mean
- Memorize the four stages and why the order matters
- Know what data structures the system uses
- Understand the query lifecycle: user message -> model -> tool_use -> tool_result -> loop

**Video output:** The global map video -- sets the stage for everything that follows.

---

### Session 01: The Agent Loop

**Source files:**
- `docs/en/s01-the-agent-loop.md`
- `agents/s01_agent_loop.ts`

**Learning objectives:**
- Build the minimal working agent loop: `while (true)` + `stop_reason`
- Understand why `tool_result` is the center of the loop
- Know the minimum state: `messages[]`, one model call, one tool

**Video output:** "One loop & Bash is all you need"

---

### Session 02: Tool Use

**Source files:**
- `docs/en/s02-tool-use.md`
- `docs/en/s02a-tool-control-plane.md`
- `docs/en/s02b-tool-execution-runtime.md`
- `agents/s02_tool_use.ts`

**Learning objectives:**
- Understand the tool dispatch pattern: `name -> handler` map
- Know what a tool definition looks like (name, description, input_schema)
- Understand tool_use and tool_result message flow
- See how adding a new tool does NOT change the loop

**Video output:** "Adding a tool means adding one handler"

---

### Session 03: TodoWrite / Planning

**Source files:**
- `docs/en/s03-todo-write.md`
- `agents/s03_todo_write.ts`

**Learning objectives:**
- Understand why agents drift without a plan
- See how a simple todo list tool keeps multi-step work on track
- Know where the plan state lives and how it updates

**Video output:** "An agent without a plan drifts"

---

### Session 04: Subagent

**Source files:**
- `docs/en/s04-subagent.md`
- `agents/s04_subagent.ts`

**Learning objectives:**
- Understand why one long context gets polluted
- See how a subagent gets a fresh `messages[]`
- Know when to spawn a subagent vs keep using the main context

**Video output:** "Break big tasks down; each subtask gets a clean context"

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

**Video output:** "Load knowledge when you need it, not upfront"

---

### Session 06: Context Compact

**Source files:**
- `docs/en/s06-context-compact.md`
- `agents/s06_context_compact.ts`

**Learning objectives:**
- Understand the context window limit problem
- Learn the three-layer compression strategy
- Know when to trigger compaction and what gets preserved

**Video output:** "Context will fill up; you need a way to make room"

---

## Stage 2: System Hardening (Sessions 07-11)

### Session 07: Permission System

**Source files:**
- `docs/en/s07-permission-system.md`
- `agents/s07_permission_system.ts`

**Learning objectives:**
- Understand why dangerous tools need a gate
- See the allow/deny check before tool execution
- Know the difference between model intent and safe execution

**Video output:** "Dangerous tools need a gate"

---

### Session 08: Hook System

**Source files:**
- `docs/en/s08-hook-system.md`
- `agents/s08_hook_system.ts`

**Learning objectives:**
- Understand lifecycle hooks (pre/post tool call, session events)
- See how hooks extend behavior without changing the loop
- Know where hooks register and how they fire

**Video output:** "Extend behavior without rewriting the loop"

---

### Session 09: Memory System

**Source files:**
- `docs/en/s09-memory-system.md`
- `agents/s09_memory_system.ts`

**Learning objectives:**
- Understand durable key-value memory that survives sessions
- Know the difference between context (session) and memory (cross-session)
- See the memory read/write tool interface

**Video output:** "Some facts must survive the session"

---

### Session 10: System Prompt

**Source files:**
- `docs/en/s10-system-prompt.md`
- `docs/en/s10a-message-prompt-pipeline.md`
- `agents/s10_system_prompt.ts`

**Learning objectives:**
- Understand section-based prompt assembly vs one monolithic string
- See how stable rules and runtime state combine into the system message
- Know the message and prompt pipeline end to end

**Video output:** "Assemble the prompt from stable rules and runtime state"

---

### Session 11: Error Recovery

**Source files:**
- `docs/en/s11-error-recovery.md`
- `agents/s11_error_recovery.ts`

**Learning objectives:**
- Understand continuation and retry branches
- See how the loop handles API errors, tool failures, and partial results
- Know the graceful degradation strategy

**Video output:** "When the loop breaks, continue from where you left off"

---

## Stage 3: Task Runtime (Sessions 12-14)

### Session 12: Task System

**Source files:**
- `docs/en/s12-task-system.md`
- `agents/s12_task_system.ts`

**Learning objectives:**
- Understand persistent task graph with dependencies
- See file-based CRUD for task state
- Know how tasks differ from session-only planning (s03)

**Video output:** "Break big goals into small tasks, order them, persist to disk"

---

### Session 13: Background Tasks

**Source files:**
- `docs/en/s13-background-tasks.md`
- `docs/en/s13a-runtime-task-model.md`
- `agents/s13_background_tasks.ts`
- `agents/task-worker.ts`

**Learning objectives:**
- Understand worker threads for non-blocking execution
- See the notification queue pattern
- Know the runtime task model

**Video output:** "Run slow operations in the background; the agent keeps thinking"

---

### Session 14: Cron Scheduler

**Source files:**
- `docs/en/s14-cron-scheduler.md`
- `agents/s14_cron_scheduler.ts`

**Learning objectives:**
- Understand time-based task triggers
- See the Node.js event loop scheduler implementation
- Know how cron completes the task runtime

**Video output:** "When the time comes, the agent wakes itself"

---

## Stage 4: Multi-Agent Platform (Sessions 15-19)

### Session 15: Agent Teams

**Source files:**
- `docs/en/s15-agent-teams.md`
- `agents/s15_agent_teams.ts`
- `agents/teammate-worker.ts`

**Learning objectives:**
- Understand persistent teammates with async JSONL mailboxes
- See how the lead agent delegates to teammates
- Know the teammate worker architecture

**Video output:** "When the task is too big for one, delegate to teammates"

---

### Session 16: Team Protocols

**Source files:**
- `docs/en/s16-team-protocols.md`
- `docs/en/team-task-lane-model.md`
- `agents/s16_team_protocols.ts`

**Learning objectives:**
- Understand request-response coordination patterns
- See shutdown and plan approval FSM
- Know the team-task-lane model

**Video output:** "Teammates need shared communication rules"

---

### Session 17: Autonomous Agents

**Source files:**
- `docs/en/s17-autonomous-agents.md`
- `agents/s17_autonomous_agents.ts`
- `agents/autonomous-worker.ts`

**Learning objectives:**
- Understand idle polling and automatic task claiming
- See how agents self-organize without lead assignment
- Know the autonomous worker lifecycle

**Video output:** "Teammates scan the board and claim tasks themselves"

---

### Session 18: Worktree Isolation

**Source files:**
- `docs/en/s18-worktree-task-isolation.md`
- `agents/s18_worktree_task_isolation.ts`

**Learning objectives:**
- Understand isolated execution lanes via git worktrees
- See how task IDs bind to worktree directories
- Know when isolation prevents interference

**Video output:** "Each works in its own directory, no interference"

---

### Session 19: MCP & Plugin

**Source files:**
- `docs/en/s19-mcp-plugin.md`
- `docs/en/s19a-mcp-capability-layers.md`
- `agents/s19_mcp_plugin.ts`

**Learning objectives:**
- Understand the Model Context Protocol for external capability routing
- See the plugin system architecture
- Know the MCP capability layers

**Video output:** "Route capabilities through a standard interface"

---

## Capstone (Session 20)

### Session 20: Full System

**Source files:**
- `agents/s_full.ts`
- All bridge docs for cross-reference
- `docs/en/entity-map.md`
- `docs/en/data-structures.md`

**Learning objectives:**
- See all 19 mechanisms combined in one file
- Trace a full request through the complete system
- Identify which mechanism handles which concern
- Be able to rebuild the system from scratch

**Video output:** "The complete agent harness -- all mechanisms in one system"

---

## After Completion

By the end you should be able to:

1. Explain the agent loop and why `tool_result` is its center
2. Add tools, planning, subagents, and context control to any agent
3. Harden an agent with permissions, hooks, memory, and prompt assembly
4. Build a persistent task runtime with background execution
5. Coordinate multiple agents with teams, protocols, and autonomy
6. Isolate parallel work and route external capabilities via MCP
7. **Teach all of the above clearly to others**

---

**Last Updated**: 2026-04-12
