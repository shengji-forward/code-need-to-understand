# Mission: CS foundations for the Forwardgrounds renderer

## Why
Forwardgrounds (`forwardgrounds.com`) is a pixel-native **media → people → software → hardware** venture. Its core technical asset is a **recipe engine + grid-native renderer** that turns high-signal ideas into deterministic, reproducible generative "signals" across web, terminal (OpenTUI), and LED (ESP32/HUB75) surfaces. Owning that renderer — designing recipes as pure functions, holding the scene↔adapter abstraction barrier, debugging determinism — requires exactly the CS fundamentals this course teaches. The goal is to be the founding engineer who **owns and ships** the renderer, not a vibe-coder who can't.

## Success looks like
- Read the renderer contract + recipe engine in `technical-architecture.md` and reason about *why* it's structured that way (pure `prepare`/`render`, seeded `rngFor`, adapter composition, abstraction barrier).
- Design a new generative recipe as a **pure, deterministic, seekable** function with a reproducibility manifest.
- Debug renderer/state bugs by **tracing frames and values**, not guessing.
- Choose the right tool — recursion vs iteration vs HOF — for a given generative composition, and justify it.

## Constraints
- PhD workload → intermittent, multi-day gaps; **spaced review required** (mastery decays after ~1-week gaps).
- Pragmatic, production-first learner with **strong math aversion** — reframe math examples as "how Forwardgrounds pixels compose" (recursion *is* the generative medium).
- Solo founder, building in public; AI-native, human-directed.
- Forwardgrounds internal docs (manifesto, technical-architecture, design specs) are **private** — never expose internals in public artifacts.

## Out of scope
- Competitive programming or math theory for its own sake.
- The hardware/electronics bring-up (ESP32/HUB75 wiring, DMA) — separate from CS foundations.
- Chapter 2+ until the Chapter 1 recap is locked.
