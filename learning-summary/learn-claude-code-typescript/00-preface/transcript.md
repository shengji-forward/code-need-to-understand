# Transcript: Video 00 - Why Learn `learn-claude-code-typescript`

**Audience**: YouTube viewers who want to understand coding agents by studying `learn-claude-code-typescript`.
**Deck**: `slides-tldraw-story-nav.html`
**Voice**: Clear mentor / instructor.
**Length**: About eight to ten minutes.

---

## Frame 01 - Preface

Welcome to Video 00.

This is the preface for `learn-claude-code-typescript`.

Before opening the first TypeScript file, we need one idea:

**The model is the agent. Your job is to build the harness.**

This sentence explains the whole course.

A coding agent is not just a prompt. It is also not a pile of workflow nodes. The model brings the agency. It can read, reason, plan, and decide what to do next.

The harness is the system around the model. It gives the model tools. It gives the model context. It shows the model results. It decides what actions are allowed.

This repo teaches that harness.

The value is not only the code. The value is the mental model. If you understand the harness, Claude Code becomes less mysterious. You can see the system as normal software.

This video is the map. The next videos walk through the code one mechanism at a time.

## Frame 02 - Agency vs Harness

The second frame separates two ideas: **agency** and **harness**.

Agency means the ability to perceive, reason, and act.

For modern language models, agency comes from training. The model has learned how to read a situation, choose a next step, and respond.

The harness is different.

The harness is engineered. It is the environment where the model works.

It contains the message history. It defines the tools. It returns observations. It exposes actions. It applies permissions.

This separation matters.

If you think the code creates the intelligence, you may build too many rules. You may route the model through fixed branches. You may decide for the model.

That is prompt plumbing.

Harness engineering is different. The model decides. The harness executes. Then the harness reports what happened.

That is the pattern this repo teaches.

## Frame 03 - Harness Formula

The third frame gives the formula:

```text
Tools + Knowledge + Observation + Action + Permissions
```

These five words describe a useful agent environment.

**Tools** are what the model can call.

Examples include shell commands, file reads, file writes, search, APIs, and browser access.

**Knowledge** is what the model can load.

This can include documentation, project rules, API references, style guides, and skill files.

**Observation** is what the model sees after something happens.

Examples include command output, test results, diffs, logs, browser state, and task state.

**Action** is how the model changes the world.

It may edit a file. It may run a command. It may call an API. It may interact with a UI.

**Permissions** are the boundaries.

They decide what is allowed, what needs approval, and what must stay blocked.

Most agent systems become confusing when these parts are mixed together.

This repo keeps the ideas small. Each session adds one harness capability. That makes the system easier to understand.

## Frame 04 - Agent Evolution

The fourth frame zooms out.

Agents existed before coding agents.

Game agents learned to act inside game environments. They saw a state. They chose an action. The environment changed. Then they observed the result.

The domain has changed. The pattern has not.

For a game agent, the environment might be pixels, scores, and controller actions.

For a coding agent, the environment is software.

It sees files, tests, docs, diffs, terminal output, browser state, issues, and tasks.

It acts by editing code, running commands, reading files, delegating work, and asking for permission.

This is why Claude Code is worth studying.

The important lesson is not just that it uses a powerful model. The important lesson is how the model is connected to a working software environment.

`learn-claude-code-typescript` gives a small version of that environment. The pieces are visible. The code is runnable. The architecture can be learned step by step.

## Frame 05 - The Agent Loop

The fifth frame shows the smallest useful mechanism: **the agent loop**.

The loop starts with `messages[]`.

The harness sends those messages to the model.

The model returns a response.

Sometimes the response is text. In that case, the harness can show the answer to the user.

Sometimes the response asks for a tool. In that case, the harness runs the tool.

Then the harness appends the tool result back into `messages[]`.

Then it calls the model again.

The loop is:

```text
messages -> model -> tool_use -> tool_result -> messages
```

This is the core of the whole course.

The model decides when it needs a tool. The harness runs the tool. The result becomes the next observation.

Tool use is not a side feature. It is how the model gets new information. It is also how the model takes useful action.

Session 01 starts here. It opens `s01_agent_loop.ts` and follows this loop line by line.

## Frame 06 - Claude Code Architecture

The sixth frame shows how Claude Code grows from the loop.

Start with one agent loop.

Then add tools.

The model can use bash, read, write, edit, glob, and grep.

Then add skills and context.

The model can load useful knowledge when needed. The harness can also compress context when the conversation gets too large.

Then add subagents and tasks.

Larger work can be split into smaller pieces. Work can have state. Work can continue beyond one immediate answer.

Then add permissions.

The harness can sandbox actions. It can ask for approval. It can enforce trust boundaries.

Seen this way, Claude Code is not magic.

It is a capable model inside a carefully designed harness.

That is the key lesson:

**Trust the model. Engineer the harness.**

## Frame 07 - Repo and Quick Start

The seventh frame connects the idea to the repo.

`learn-claude-code-typescript` is the training ground.

The `agents/` directory contains runnable TypeScript scripts.

They go from `s01` to `s12`. There is also `s_full`, which assembles the full system.

The `docs/en/` directory explains the mental model for each session.

The `skills/` directory is used when the course reaches skill loading.

The `web/` directory contains an optional learning platform.

The quick start is simple:

```bash
git clone <repo>
cd learn-claude-code-typescript
npm install
cp .env.example .env
npm run s01
```

The simplicity matters.

A coding-agent harness is built from ordinary parts. It uses messages, functions, files, commands, and feedback.

The course starts small so each part can be understood clearly.

## Frame 08 - Learning Path

The eighth frame shows the path through the course.

Phase 1 is **The Loop**.

Session 01 builds the agent loop. Session 02 adds tool use.

Phase 2 is **Planning and Knowledge**.

The repo adds `TodoWrite`, subagents, skills, and context compaction.

These mechanisms help the agent handle longer work.

Phase 3 is **Persistence**.

The repo adds tasks and background work.

Now work can be stored as state. Slow operations can run without blocking the main loop.

Phase 4 is **Teams**.

The repo adds agent teams, team protocols, autonomous claiming, and worktree isolation.

This shows how one agent loop can grow into coordinated multi-agent work.

The capstone is `s_full.ts`.

It brings the mechanisms together into one larger harness.

The order matters. Each step solves a problem created by the previous step.

Start with one loop. Then add tools. Then add structure. Then add teams.

## Frame 09 - Overview Map

The final frame combines the whole preface.

At the center:

```text
model = agent
harness = product
```

Around that center are the main questions.

What is agency?

What is a harness?

What does the harness formula mean?

How did agents move from game environments to software environments?

What is the agent loop?

How does Claude Code architecture grow from that loop?

How is the repo organized?

What path turns a simple loop into a full system?

This is why the repo is useful.

It teaches a durable pattern:

**Build environments where useful agency can act.**

Next is Session 01: **The Agent Loop**.

Open `docs/en/s01-the-agent-loop.md`.

Open `agents/s01_agent_loop.ts`.

Run:

```bash
npm run s01
```

Look for one idea:

The model decides. The harness executes. The result goes back into the loop.

That is where the course begins.
