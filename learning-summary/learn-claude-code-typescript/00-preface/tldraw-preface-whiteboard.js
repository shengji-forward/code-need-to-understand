import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tldraw, toRichText } from 'tldraw'

const VARIANT = window.PREFACE_TLDRAW_VARIANT || 'nav'
const STORAGE_KEY = `preface-tldraw-story-${VARIANT}-v3`
const SLIDE_W = 1920
const SLIDE_H = 1080
const GAP = 260

const SLIDES = [
  ['title', '01. Preface'],
  ['agency', '02. Agency vs Harness'],
  ['formula', '03. Harness Formula'],
  ['evolution', '04. Agent Evolution'],
  ['loop', '05. The Agent Loop'],
  ['architecture', '06. Claude Code Architecture'],
  ['repo', '07. Repo and Quick Start'],
  ['path', '08. Learning Path'],
  ['overview', '09. Overview Map'],
].map(([key, name], i) => ({
  key,
  name,
  x: i * (SLIDE_W + GAP),
  y: 0,
  w: SLIDE_W,
  h: SLIDE_H,
}))

let currentSlideIndex = 0

function buildPrefaceStory(editor) {
  const pos = {}
  const frameIds = []

  function remember(key, x, y, w, h) {
    if (key) pos[key] = { x, y, w, h }
  }

  function lastShapeId() {
    const shapes = editor.getCurrentPageShapes()
    return shapes[shapes.length - 1]?.id
  }

  function slide(index) {
    return SLIDES[index]
  }

  function inSlide(index, x, y) {
    const s = slide(index)
    return { x: s.x + x, y: s.y + y }
  }

  function makeSlide(index) {
    const s = slide(index)
    editor.createShape({
      type: 'frame',
      x: s.x,
      y: s.y,
      props: {
        w: s.w,
        h: s.h,
        name: s.name,
        color: 'black',
      },
    })
    const id = lastShapeId()
    if (id) frameIds.push(id)
    remember(s.key, s.x, s.y, s.w, s.h)
  }

  function makeText(index, x, y, w, text, opts = {}) {
    const p = inSlide(index, x, y)
    editor.createShape({
      type: 'text',
      x: p.x,
      y: p.y,
      props: {
        color: opts.color || 'black',
        size: opts.size || 'xl',
        font: opts.font || 'draw',
        textAlign: opts.textAlign || 'start',
        w,
        richText: toRichText(text),
        scale: opts.scale || 1,
        autoSize: opts.autoSize ?? false,
      },
    })
  }

  function makeBox(index, key, x, y, w, h, text, opts = {}) {
    const p = inSlide(index, x, y)
    editor.createShape({
      type: 'geo',
      x: p.x,
      y: p.y,
      props: {
        geo: opts.geo || 'rectangle',
        w,
        h,
        color: opts.color || 'black',
        fill: opts.fill || 'none',
        dash: opts.dash || 'draw',
        size: opts.size || 'xl',
        richText: toRichText(text || ''),
        align: opts.align || 'middle',
        verticalAlign: opts.verticalAlign || 'middle',
        font: opts.font || 'draw',
        labelColor: opts.labelColor || 'black',
      },
    })
    remember(key, p.x, p.y, w, h)
  }

  function makeCode(index, key, x, y, w, h, text) {
    makeBox(index, key, x, y, w, h, text, {
      fill: 'none',
      size: 'm',
      font: 'mono',
      align: 'start',
      verticalAlign: 'start',
    })
  }

  function makeArrow(index, x1, y1, x2, y2, label = '', opts = {}) {
    const p1 = inSlide(index, x1, y1)
    const p2 = inSlide(index, x2, y2)
    editor.createShape({
      type: 'arrow',
      x: p1.x,
      y: p1.y,
      props: {
        kind: opts.kind || 'arc',
        start: { x: 0, y: 0 },
        end: { x: p2.x - p1.x, y: p2.y - p1.y },
        color: opts.color || 'black',
        dash: opts.dash || 'draw',
        size: opts.size || 'l',
        arrowheadStart: opts.arrowheadStart || 'none',
        arrowheadEnd: opts.arrowheadEnd || 'arrow',
        font: 'draw',
        richText: toRichText(label),
      },
    })
  }

  function makeArrowBetween(fromKey, toKey, label = '', opts = {}) {
    const from = pos[fromKey]
    const to = pos[toKey]
    if (!from || !to) return
    const start = {
      x: opts.fromSide === 'bottom' ? from.x + from.w / 2 : from.x + from.w,
      y: opts.fromSide === 'bottom' ? from.y + from.h : from.y + from.h / 2,
    }
    const end = {
      x: opts.toSide === 'top' ? to.x + to.w / 2 : to.x,
      y: opts.toSide === 'top' ? to.y : to.y + to.h / 2,
    }
    editor.createShape({
      type: 'arrow',
      x: start.x,
      y: start.y,
      props: {
        kind: opts.kind || 'arc',
        start: { x: 0, y: 0 },
        end: { x: end.x - start.x, y: end.y - start.y },
        color: opts.color || 'black',
        dash: 'draw',
        size: opts.size || 'm',
        arrowheadStart: 'none',
        arrowheadEnd: 'arrow',
        font: 'draw',
        richText: toRichText(label),
      },
    })
  }

  function title(index, text, subtext) {
    makeText(index, 120, 90, 1440, text, { size: 'xl', scale: 1.7 })
    if (subtext) makeText(index, 124, 210, 1300, subtext, { size: 'l', scale: 1.1, color: 'grey' })
  }

  SLIDES.forEach((_, index) => makeSlide(index))

  // 01. Preface
  title(0, 'learn-claude-code-typescript', 'Preface: what you are really learning to build')
  makeBox(0, 'logo', 150, 350, 180, 180, ';', {
    color: 'black',
    fill: 'solid',
    labelColor: 'white',
    size: 'xl',
  })
  makeText(0, 410, 335, 1120, 'The model is the agent.', { size: 'xl', scale: 1.9 })
  makeText(0, 414, 520, 1120, 'Your job is to build the harness.', { size: 'xl', scale: 1.25 })
  makeBox(0, 'titleOne', 1330, 760, 360, 90, 'one idea per frame', { fill: 'none', size: 'l' })
  makeArrow(0, 1120, 720, 1325, 805, '', { size: 'm' })

  // 02. Agency vs Harness
  title(1, 'Agency is trained. Harness is engineered.', 'Do not code the mind. Build the world it can act inside.')
  makeBox(1, 'agencyModel', 175, 405, 360, 240, 'model\nagency', { geo: 'ellipse', fill: 'semi' })
  makeBox(1, 'perceive', 720, 335, 300, 100, 'perceive', { size: 'l' })
  makeBox(1, 'reason', 1130, 335, 300, 100, 'reason', { size: 'l' })
  makeBox(1, 'act', 1130, 610, 300, 100, 'act', { size: 'l' })
  makeBox(1, 'observe', 720, 610, 300, 100, 'observe', { size: 'l' })
  makeArrow(1, 530, 525, 710, 385, '')
  makeArrow(1, 1020, 385, 1125, 385, '')
  makeArrow(1, 1280, 440, 1280, 605, '')
  makeArrow(1, 1125, 660, 1025, 660, '')
  makeArrow(1, 720, 660, 540, 550, '')
  makeBox(1, 'harnessRail', 250, 815, 1310, 110, 'harness = tools + knowledge + observation + action + permissions', {
    fill: 'none',
    size: 'l',
  })

  // 03. Harness Formula
  title(2, 'The harness formula', 'An agent becomes useful when the environment has the right affordances.')
  makeText(2, 195, 330, 1500, 'Tools + Knowledge + Observation + Action + Permissions', {
    size: 'xl',
    scale: 1.15,
  })
  makeArrow(2, 835, 445, 835, 570, '')
  makeBox(2, 'formulaHarness', 560, 580, 560, 180, 'working harness', { fill: 'semi' })
  const formulaCards = [
    ['Tools', 'file, shell, APIs'],
    ['Knowledge', 'docs, conventions'],
    ['Observation', 'diffs, logs, browser'],
    ['Action', 'commands, edits, UI'],
    ['Permissions', 'sandbox, trust'],
  ]
  formulaCards.forEach(([h, b], i) => {
    makeBox(2, `formula${i}`, 210 + i * 310, 810, 255, 105, `${h}\n${b}`, { size: 'm' })
  })

  // 04. Agent Evolution
  title(3, 'Agents evolved by changing the world around them', 'The same pattern moves from games into software engineering.')
  const timeline = [
    ['2013', 'Atari\nDQN'],
    ['2019', 'Dota / StarCraft'],
    ['2024-25', 'LLM agents'],
    ['now', 'your repo'],
  ]
  timeline.forEach(([year, text], i) => {
    const x = 230 + i * 430
    makeBox(3, `era${i}`, x, 390, 260, 160, `${year}\n${text}`, { fill: i === 3 ? 'semi' : 'none', size: 'l' })
    if (i < timeline.length - 1) makeArrow(3, x + 265, 470, x + 420, 470, '')
  })
  makeBox(3, 'evoEnv', 325, 705, 1190, 130, 'agency did not disappear; the environment changed', {
    fill: 'none',
    size: 'xl',
  })
  makeArrow(3, 1260, 555, 1220, 700, 'software is the new environment', { size: 'm' })

  // 05. Agent Loop
  title(4, 'The agent loop is small', 'The power comes from repeating the loop against real tools.')
  makeBox(4, 'llm', 780, 345, 360, 190, 'LLM', { geo: 'ellipse', fill: 'semi' })
  makeBox(4, 'messages', 215, 405, 330, 120, 'messages[]', { size: 'l' })
  makeBox(4, 'toolUse', 775, 715, 370, 120, 'tool_use?', { size: 'l' })
  makeBox(4, 'tools', 1350, 405, 330, 120, 'tools', { size: 'l' })
  makeBox(4, 'results', 1325, 715, 380, 120, 'observation', { size: 'l' })
  makeArrow(4, 545, 465, 775, 435, 'ask')
  makeArrow(4, 970, 545, 960, 710, 'decide')
  makeArrow(4, 1145, 775, 1320, 775, 'run')
  makeArrow(4, 1510, 710, 1510, 530, 'read')
  makeArrow(4, 1325, 460, 1145, 435, 'respond')
  makeArrow(4, 1320, 785, 550, 510, 'append result')
  makeCode(4, 'loopCode1', 235, 795, 410, 130, 'if stop_reason === "tool_use"\n  runTools(response)')
  makeCode(4, 'loopCode2', 710, 875, 510, 90, 'messages.push(tool_result)')

  // 06. Claude Code Architecture
  title(5, 'Claude Code is a harness around one loop', 'The architecture is practical engineering, not mystery.')
  const layers = [
    ['agent loop', 'messages in, decisions out'],
    ['tools', 'bash, read, write, edit, glob, grep'],
    ['skills + context', 'load only what matters'],
    ['subagents + tasks', 'parallel work with boundaries'],
    ['permissions', 'sandbox, approvals, trust'],
  ]
  layers.forEach(([h, b], i) => {
    makeBox(5, `arch${i}`, 255, 300 + i * 115, 820, 85, `${h}  /  ${b}`, {
      fill: i === 0 ? 'semi' : 'none',
      size: 'm',
      align: 'start',
    })
  })
  makeBox(5, 'archShell', 1285, 320, 330, 120, 'shell', { size: 'l' })
  makeBox(5, 'archFiles', 1285, 510, 330, 120, 'files', { size: 'l' })
  makeBox(5, 'archBrowser', 1285, 700, 330, 120, 'browser', { size: 'l' })
  makeArrow(5, 1080, 515, 1280, 380, '')
  makeArrow(5, 1080, 560, 1280, 570, '')
  makeArrow(5, 1080, 605, 1280, 760, '')
  makeText(5, 260, 910, 1200, 'Trust the model. Engineer the harness.', { size: 'xl', scale: 1.05 })

  // 07. Repo and Quick Start
  title(6, 'The repo is the training ground', 'Start with one loop, then grow the harness deliberately.')
  makeCode(6, 'tree', 180, 320, 600, 450, 'learn-claude-code-typescript/\n  agents/   s01-s12 + s_full\n  docs/en/  mental models\n  skills/   skill files\n  web/      Next.js platform')
  makeCode(6, 'quick', 1040, 320, 560, 340, 'git clone <repo>\ncd learn-...-typescript\nnpm install\ncp .env.example .env\n\nnpm run s01')
  makeArrow(6, 790, 545, 1035, 500, 'start here', { size: 'l' })
  makeBox(6, 'quickLoop', 1010, 760, 620, 120, 's_full = the full harness assembled', { fill: 'none', size: 'l' })

  // 08. Learning Path
  title(7, 'The learning path is a harness-building path', 'Each section adds one capability to the environment.')
  const phases = [
    ['Phase 1\nTHE LOOP', ['s01 Agent Loop', 's02 Tool Use']],
    ['Phase 2\nPLANNING', ['s03 TodoWrite', 's04 Subagents', 's05 Skills', 's06 Compact']],
    ['Phase 3\nPERSISTENCE', ['s07 Tasks', 's08 Background']],
    ['Phase 4\nTEAMS', ['s09 Teams', 's10 Protocols', 's11 Autonomous', 's12 Worktree']],
  ]
  phases.forEach(([phase, items], i) => {
    const x = 145 + i * 435
    makeText(7, x, 295, 360, phase, { size: 'm', scale: 1.12 })
    items.forEach((item, j) => {
      makeBox(7, `path${i}${j}`, x, 410 + j * 100, 330, 70, item, { size: 'm' })
    })
  })
  makeBox(7, 'domains', 220, 850, 1440, 105, 'Beyond code: estate / agriculture / hotel / medical / manufacturing / education', {
    fill: 'none',
    size: 'l',
  })

  // 09. Overview Map
  title(8, 'The whole preface in one map', 'One center idea, eight surrounding questions.')
  makeBox(8, 'hub', 700, 430, 520, 190, 'model = agent\nharness = product', { fill: 'semi', size: 'l' })
  const clusters = [
    ['Agency', 190, 310],
    ['Formula', 695, 290],
    ['Evolution', 1260, 310],
    ['Loop', 190, 625],
    ['Architecture', 1290, 625],
    ['Repo', 390, 815],
    ['Beyond code', 735, 815],
    ['Path', 1080, 815],
  ]
  clusters.forEach(([label, x, y], i) => {
    makeBox(8, `cluster${i}`, x, y, 250, 105, label, { fill: 'none', size: 'l' })
  })
  makeArrow(8, 700, 480, 440, 365, '', { size: 'm', arrowheadEnd: 'none' })
  makeArrow(8, 850, 430, 820, 395, '', { size: 'm', arrowheadEnd: 'none' })
  makeArrow(8, 1220, 480, 1260, 365, '', { size: 'm', arrowheadEnd: 'none' })
  makeArrow(8, 700, 560, 440, 675, '', { size: 'm', arrowheadEnd: 'none' })
  makeArrow(8, 1220, 560, 1290, 675, '', { size: 'm', arrowheadEnd: 'none' })
  makeArrow(8, 820, 620, 515, 815, '', { size: 'm', arrowheadEnd: 'none' })
  makeArrow(8, 960, 620, 860, 815, '', { size: 'm', arrowheadEnd: 'none' })
  makeArrow(8, 1100, 620, 1080, 815, '', { size: 'm', arrowheadEnd: 'none' })
  makeBox(8, 'overviewLine', 410, 950, 1080, 70, 'Build environments where useful agency can act.', {
    fill: 'none',
    size: 'l',
  })

  frameIds.forEach((id) => {
    try {
      editor.sendToBack([id])
    } catch (e) {
      // Ignore z-order failures; the deck is still editable.
    }
  })

  window.__prefaceSlideBounds = SLIDES.map((s) => ({ ...s }))
}

function clearAndBuild(editor) {
  const ids = Array.from(editor.getCurrentPageShapeIds())
  if (ids.length > 0) editor.deleteShapes(ids)
  buildPrefaceStory(editor)
}

function getEditorOrAlert() {
  const editor = window.__prefaceTldrawEditor
  if (!editor) window.alert('tldraw editor is not ready yet')
  return editor
}

function updateSlideUi() {
  const label = document.querySelector('[data-slide-counter]')
  if (label) label.textContent = `${currentSlideIndex + 1} / ${SLIDES.length}`
}

function goToSlide(index, opts = {}) {
  const editor = getEditorOrAlert()
  if (!editor) return
  currentSlideIndex = Math.max(0, Math.min(SLIDES.length - 1, index))
  const s = SLIDES[currentSlideIndex]
  editor.zoomToBounds(
    { x: s.x, y: s.y, w: s.w, h: s.h },
    {
      inset: opts.inset ?? 64,
      animation: opts.immediate ? undefined : { duration: opts.duration ?? 260 },
    }
  )
  updateSlideUi()
}

window.gotoSlide = goToSlide
window.nextSlide = function () {
  goToSlide(currentSlideIndex + 1)
}
window.prevSlide = function () {
  goToSlide(currentSlideIndex - 1)
}
window.zoomAllSlides = function () {
  const editor = getEditorOrAlert()
  if (!editor) return
  const last = SLIDES[SLIDES.length - 1]
  editor.zoomToBounds(
    { x: 0, y: 0, w: last.x + last.w, h: SLIDE_H },
    { inset: 80, animation: { duration: 260 } }
  )
}
window.resetPrefaceStory = function () {
  const editor = getEditorOrAlert()
  if (!editor) return
  clearAndBuild(editor)
  goToSlide(0, { immediate: true })
}
window.resetPrefaceMap = window.resetPrefaceStory

window.saveDiagram = function () {
  const editor = getEditorOrAlert()
  if (!editor) return
  try {
    const snapshot = editor.store.getStoreSnapshot()
    const json = JSON.stringify(snapshot, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'preface-tldraw-story.tldr'
    a.click()
    URL.revokeObjectURL(url)
  } catch (e) {
    window.alert('Save error: ' + e.message)
  }
}

window.loadDiagram = function () {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.tldr,.json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const editor = getEditorOrAlert()
      if (!editor) return
      try {
        const snapshot = JSON.parse(ev.target.result)
        editor.store.loadStoreSnapshot(snapshot)
      } catch (err) {
        window.alert('Load error: ' + err.message)
      }
    }
    reader.readAsText(file)
  }
  input.click()
}

window.exportSvg = function () {
  const editor = getEditorOrAlert()
  if (!editor) return
  try {
    const shapeIds = editor.getCurrentPageShapeIds()
    editor.getSvgString(shapeIds).then(({ svg }) => {
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'preface-tldraw-story.svg'
      a.click()
      URL.revokeObjectURL(url)
    })
  } catch (e) {
    window.alert('Export error: ' + e.message)
  }
}

function shouldIgnoreDeckKey(event) {
  if (!window.PREFACE_TLDRAW_NAV) return true
  const target = event.target
  const tag = target?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (target?.closest?.('[contenteditable="true"]')) return true
  const editor = window.__prefaceTldrawEditor
  if (editor?.getSelectedShapeIds?.().length > 0) return true
  return false
}

document.addEventListener('keydown', (event) => {
  if (shouldIgnoreDeckKey(event)) return
  if (event.key === 'ArrowRight' || event.key === 'PageDown') {
    event.preventDefault()
    window.nextSlide()
  }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault()
    window.prevSlide()
  }
})

function App() {
  const handleMount = React.useCallback((editor) => {
    window.__prefaceTldrawEditor = editor
    setTimeout(() => {
      try {
        if (editor.getCurrentPageShapes().length === 0) buildPrefaceStory(editor)
        goToSlide(0, { immediate: true })
      } catch (e) {
        console.error('buildPrefaceStory error:', e)
      }
    }, 500)
  }, [])

  return React.createElement(
    'div',
    { style: { position: 'fixed', inset: 0 } },
    React.createElement(Tldraw, {
      persistenceKey: STORAGE_KEY,
      onMount: handleMount,
    })
  )
}

const root = createRoot(document.getElementById('root'))
root.render(React.createElement(App))
