# Learning Report: Session 00 -- Preface (Plan, Schedule Pattern, Repo Framing)

**Date**: Monday, April 20, 2026  
**Session Duration**: Multi-segment session (initial bulk delivery ~2 min, then interactive Steps 1–8 over Claude Code + Mentor sidebar; exact wall clock not captured in transcript)  
**Status**: Completed

---

## Concepts Covered

1. **Agency vs harness** -- Agency (perceive, reason, act) comes from **model training**; the **harness** is tools, knowledge, observation, action interfaces, and permissions—the world the model operates in (brain/driver vs body/vehicle metaphor).

2. **Prompt plumbing (anti-pattern)** -- Fixed if-else / drag-and-node workflows that **route** the LLM instead of giving it a real loop and tools; decides *for* the model rather than letting the model decide.

3. **Core loop pattern** -- `messages[]` as state, **`stop_reason`** as the model’s per-turn outcome signal (`tool_use` → execute tools, append results, loop; otherwise → return text), **`tool_result`** as where the harness feeds execution back into the loop.

4. **12 + 1 roadmap** -- Four ordered phases: THE LOOP (s01–s02), PLANNING & KNOWLEDGE (s03–s06), PERSISTENCE (s07–s08), TEAMS (s09–s12); capstone **`agents/s_full.ts`** composes all twelve mechanisms.

5. **Three-agent workflow** -- Orchestrator (Cursor main), Teacher (Claude Code terminal), Mentor (Cursor separate); artifact order: **`learning-report.md`** → **`transcript.md`** + **`slides.html`**.

6. **Repo layout & commands** -- `agents/`, `docs/en/`, `skills/`, `web/`, `.env`; **`npm run s01`**, **`npm run s:full`** for capstone, `cd web && npm run dev` for the web app.

7. **Scope & extras** -- Teaching repo omits full hook buses, rich permissions, session fork/resume, full MCP transport, etc.; extras live under **`agents/extras/`** and **`docs/extras/en/`**, not on the main video path.

8. **Session 01 preview** -- `docs/en/s01-the-agent-loop.md` + `agents/s01_agent_loop.ts`; motto *"One loop & Bash is all you need"*; focus on `while`, `messages[]`, **`tool_result`** at the center.

---

## Checkpoint Performance

| Checkpoint | Topic | Result | Notes |
|------------|-------|--------|-------|
| 1a | Agent vs harness (own words) | Correct | Brain/driver vs environment/vehicle; teacher confirmed. |
| 1b | Prompt plumbing: example + why not a “real” agent | Correct | Hardcoded rules, “brain in a jar”; teacher highlighted plumbing *decides for* model vs harness *lets model decide*. |
| 2 | Role of `stop_reason`; who decides | Correct | “Bridge with a button”; teacher sharpened: model always decides; `stop_reason` encodes outcome per turn, not negotiation. |
| 3 | Why roadmap order loop → … → teams | Correct | Loop as foundation; “gradual disclosure”; problems appear when needed; mirrors model-only → model+harness history. |
| 4 | Why Orchestrator waits for Mentor report | Excellent | Context limits, role isolation, **human-in-the-loop** truth (memory, mistakes); meta: learning workflow mirrors harness design. |
| 5 | Capstone command + file | Correct | `npm run s:full` → `agents/s_full.ts` (minor typo “wull” in live answer). |
| 6 | Extras on video path? Cron location | Partial / Correct | Correct: not on video path; folders right. Did not name Cron files explicitly (`s14_cron_scheduler.ts`, `s14-cron-scheduler.md`) until Mentor follow-up. Strong reflection on core vs fast-changing surface. |

---

## Quiz Results

| Question | Topic | Result | Notes |
|----------|-------|--------|-------|
| 1 | No-code LLM canvas + if-else | Correct | Rule-based workflow; user-chosen path vs model path; trust intelligence / hands-off product framing. |
| 2 | When `stop_reason` is NOT `tool_use` | Correct | “Saying vs doing”; OpenCoach example (general Q vs data-fetch Q). |
| 3 | One mechanism per session | Correct | Core first, decompose for clarity, align with “learn when you need it,” avoid over-design. |
| 4 | Hotel harness: five README categories | Partial | Named three concrete bundles; missed **Knowledge** and **Permissions** labels until teacher supplied Harness = Tools + Knowledge + Observation + Action + Permissions table. |
| 5 | “Bash is all you need” | Correct | Minimal agent = loop + one shell-execution tool; rest is layered harness. |

**Quiz Score**: 4/5 fully correct; **1 partial** (Q4: conceptual coverage good, formal five-word formula incomplete on first try)

---

## Key Insights

1. **“The agent is intelligence/brain/driver; the harness is environment/body/vehicle.”** (student’s words from README framing.)

2. **Prompt plumbing puts the “brain in a jar”** — hardcoded routing blocks the model from using perceive–reason–act the way a harness-with-tools does.

3. **`stop_reason` is the model’s “button” for this turn** — harness branches on it; model decides, code reacts.

4. **Roadmap order matches dependency and pedagogy** — no loop, no place to hang planning/persistence/teams; “only add when the problem is real.”

5. **Learning report before slides** — preserves *actual* learning (including confusion), not a generic repo summary; parallel drawn to harness/isolation philosophy.

6. **Core patterns outlive specific tools** — extras and industry APIs change; loop + model-decides pattern is the durable lesson.

---

## Areas of Confusion

1. **`stop_reason` wording** -- Initially described as “middleware” / “criteria code”; resolved when teacher clarified: field on API response, model’s final answer for the turn, not a separate negotiation layer.

2. **Harness formula under pressure (Q4)** -- Student mapped rich hotel scenarios to overlapping ideas; gap was explicitly naming **Knowledge** and **Permissions** as the README’s fifth-column guardrails. Resolved via teacher’s table.

3. **Initial Session 00 delivery** -- First teacher pass was “too much at once”; student requested step-by-step; teacher restarted with Steps 1–8. No lingering confusion on pacing after that.

---

## Mentor Interactions

1. **“What does plumbing mean?”** -- Explained metaphor (pipes routing water vs routing prompts); contrast with harness letting model drive the loop.

2. **Step 1 answer improvement** -- Guided to name *who decides next step* (graph vs model) and soften “model can’t do anything” to “architecture doesn’t let model drive.”

3. **`stop_reason` checkpoint (Step 2)** -- Socratic stub: separate model vs API vs harness; sharpen “condition” vs protocol label; who obeys `tool_use`; tools vs *role* of `stop_reason`.

4. **Examples after student answer** -- Production-style two-turn examples (read-then-answer, API lookup); takeaway: `tool_use` = turn incomplete until harness runs tools.

5. **Step 3 / Step 4 “what would you answer?”** -- Reference answers for roadmap order and Orchestrator-waits-for-report (student had already passed checkpoints).

6. **Steps 5–6 transcript** -- Confirmed capstone path; pointed to exact Cron extra files for precision.

7. **Coverage honesty** -- Clarified Mentor only sees pasted transcript + chat, not full silent terminal history.

8. **Quiz reference answers Q1–Q5** -- Supplied compact model answers for student comparison after live quiz.

9. **Bash vs shell** -- Vocabulary: shell = OS command interface; bash = common shell implementation; tied to s01 “one tool” story.

---

## Connections Made

1. **Learning workflow as a harness** -- Three agents, delegated roles, curated context into Orchestrator ≈ same design ideas as agent harness (isolation, right input to right consumer).

2. **Course structure mirrors harness philosophy** -- “One mechanism per session” ↔ learn/act when needed; don’t stack complexity before the problem exists.

3. **OpenCoach** -- Personal project used to illustrate non–`tool_use` turns (knowledge-only answer) vs tool turns (fetch user stats).

4. **History of the field** -- Student linked roadmap order to evolution from model-only to model + harness.

---

## Readiness for Next Session

- [x] All learning objectives met (orientation: agency/harness, phases, capstone file, three agents + commands, scope/extras, artifact order)
- [x] Quiz passed (>= 80%) — **4/5 solid + 1 partial** exceeds threshold if counted as 80%+; Q4 formula now reinforced
- [x] No unresolved confusion — hotel five categories and `stop_reason` phrasing addressed in session
- [x] Ready for Session 01

**Overall Assessment**: Strong conceptual grasp of Session 00 with memorable metaphors and a real product (OpenCoach) used to ground the loop. One formal gap (README harness **five** labels under quiz pressure) closed in-session with teacher feedback. Student advocated for interactive pacing and sustained engagement through Step 8.

**Recommendation**: **Continue to Session 01 — The Agent Loop** (`docs/en/s01-the-agent-loop.md`, `agents/s01_agent_loop.ts`, `npm run s01`). Optionally skim the five harness words once before recording so Q4-style prompts stay automatic.

---
