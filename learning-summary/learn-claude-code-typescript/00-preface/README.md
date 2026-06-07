# Session 00 (Preface) -- artifacts

- **`learning-report.md`** -- From the **Mentor** after your private Session 00 Teacher run (your checkpoints, quiz, notes). Not the YouTube script.
- **`transcript.md`** -- From the **Orchestrator** for **YouTube viewers**: an 8-10 minute mentor-style narration of the **curriculum** ([learn-claude-code](../../../learn-claude-code/README.md) + [learn-claude-code-typescript](../../../learn-claude-code-typescript/README.md) + learning-summary `README.md` / `PLAN.md`), now organized around the Preface Whiteboard Map.
- **`slides.html`** -- Option A: single whiteboard canvas version of the Preface Whiteboard Map.
- **`slides-reveal-map.html`** -- Option B: Reveal.js walkthrough that pans across the same whiteboard map.
- **`preface-whiteboard-map.css`** / **`preface-whiteboard-map.js`** -- Shared map renderer used by both slide options.
- **`slides-tldraw-map.html`** -- Option C: editable tldraw story deck with Prev/Next, arrow-key slide navigation, Save `.tldr`, Load `.tldr`, Export SVG, and Reset template.
- **`slides-tldraw-story-nav.html`** -- Same as `slides-tldraw-map.html`; kept as an explicit nav-named variant.
- **`slides-tldraw-story-plain.html`** -- Option D: same editable 16:9 left-to-right tldraw deck, but without slide navigation controls; pan/zoom manually like normal tldraw.
- **`tldraw-preface-whiteboard.js`** / **`build-tldraw-map-html.mjs`** -- Source and local builder for the editable tldraw story deck, using the sibling `tldraw-diagram` package.

Regenerate transcript/slides whenever those READMEs change or you want a fresher take; they do not need to mirror `learning-report.md`.
