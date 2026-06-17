import { readFileSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const here = dirname(fileURLToPath(import.meta.url))
const tldrawRoot = resolve(here, '../../../../../tldraw-diagram')
const bundle = readFileSync(resolve(here, 'cs61a-session-04-tldraw.bundle.js'), 'utf8')
const css = readFileSync(resolve(tldrawRoot, 'dist/tldraw.css'), 'utf8')

const deckTitle = 'CS61A Session 04 - 1.4 Designing Functions'
const slideCount = 12

function toolbar({ nav }) {
  const navControls = nav
    ? `
  <button onclick="prevSlide()">Prev</button>
  <span class="counter" data-slide-counter>1 / ${slideCount}</span>
  <button class="primary" onclick="nextSlide()">Next</button>
  <button onclick="zoomAllSlides()">All frames</button>
  <button onclick="gotoSlide(${slideCount - 1})">Final map</button>`
    : ''

  const hint = nav
    ? 'Use Prev/Next or arrow keys. Select a shape to edit; arrow keys then move shapes instead.'
    : 'Plain tldraw mode. Drag or pan left-to-right across the 16:9 frames.'

  return `<div id="toolbar">
  <span class="title">${deckTitle}</span>
  <span class="hint">${hint}</span>
  ${navControls}
  <button onclick="saveDiagram()">Save .tldr</button>
  <button onclick="loadDiagram()">Load .tldr</button>
  <button onclick="exportSvg()">Export SVG</button>
  <button onclick="resetCs61aDeck()">Reset template</button>
</div>`
}

function makeHtml({ title, nav, variant }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
${css}
</style>
<style>
  :root {
    color-scheme: light dark;
    --toolbar-bg: #ffffff;
    --toolbar-fg: #0a0a0a;
    --toolbar-muted: #666666;
    --toolbar-line: #d9d9d9;
    --button-bg: #ffffff;
    --button-hover: #f2f2f2;
    --button-primary-bg: #0a0a0a;
    --button-primary-fg: #ffffff;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --toolbar-bg: #0a0a0a;
      --toolbar-fg: #f5f5f5;
      --toolbar-muted: #b5b5b5;
      --toolbar-line: #303030;
      --button-bg: #141414;
      --button-hover: #242424;
      --button-primary-bg: #f5f5f5;
      --button-primary-fg: #0a0a0a;
    }
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; overflow: hidden; }
  body {
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: var(--toolbar-bg);
  }
  #toolbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    gap: 8px;
    align-items: center;
    min-height: 44px;
    padding: 8px 16px;
    background: var(--toolbar-bg);
    color: var(--toolbar-fg);
    border-bottom: 1px solid var(--toolbar-line);
  }
  #toolbar .title {
    color: var(--toolbar-fg);
    font-size: 14px;
    font-weight: 680;
    white-space: nowrap;
  }
  #toolbar .hint {
    margin-right: auto;
    color: var(--toolbar-muted);
    font-size: 12px;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #toolbar .counter {
    min-width: 44px;
    text-align: center;
    color: var(--toolbar-muted);
    font-size: 12px;
  }
  #toolbar button {
    border: 1px solid var(--toolbar-line);
    border-radius: 6px;
    padding: 6px 10px;
    background: var(--button-bg);
    color: var(--toolbar-fg);
    cursor: pointer;
    font-size: 12px;
    white-space: nowrap;
  }
  #toolbar button:hover { background: var(--button-hover); }
  #toolbar button.primary {
    border-color: var(--button-primary-bg);
    background: var(--button-primary-bg);
    color: var(--button-primary-fg);
  }
  #root {
    position: fixed;
    inset: 44px 0 0 0;
  }
</style>
</head>
<body>
${toolbar({ nav })}
<div id="root"></div>
<script>
window.CS61A_TLDRAW_VARIANT = ${JSON.stringify(variant)};
window.CS61A_TLDRAW_NAV = ${JSON.stringify(nav)};
</script>
<script>
${bundle}
</script>
</body>
</html>`
}

const outputs = [
  {
    file: 'slides-tldraw-deck.html',
    title: `${deckTitle} - nav`,
    nav: true,
    variant: 'nav',
  },
  {
    file: 'slides-tldraw-story-nav.html',
    title: `${deckTitle} - nav`,
    nav: true,
    variant: 'nav',
  },
  {
    file: 'slides-tldraw-story-plain.html',
    title: `${deckTitle} - plain`,
    nav: false,
    variant: 'plain',
  },
]

for (const output of outputs) {
  const html = makeHtml(output)
  writeFileSync(resolve(here, output.file), html)
  console.log(`Built ${output.file}`)
  console.log('Size:', (Buffer.byteLength(html) / 1024 / 1024).toFixed(2), 'MB')
}

