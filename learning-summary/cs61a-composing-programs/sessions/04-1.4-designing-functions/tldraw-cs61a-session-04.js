import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tldraw, toRichText } from 'tldraw'

const VARIANT = window.CS61A_TLDRAW_VARIANT || 'nav'
const STORAGE_KEY = `cs61a-session-04-tldraw-story-${VARIANT}-v1`
const SESSION_ID = 'cs61a-session-04'
const SLIDE_W = 1920
const SLIDE_H = 1080
const GAP = 260

const SLIDES = [
  ['title', '01. Why Design Functions'],
  ['principles', '02. Three Principles'],
  ['oneJob', '03. One Job'],
  ['dry', '04. DRY'],
  ['generality', '05. Generality'],
  ['docs', '06. JSDoc'],
  ['defaults', '07. Default Trap'],
  ['consts', '08. Default or const'],
  ['local', '09. Local Helpers'],
  ['barrier', '10. Abstraction Barrier'],
  ['clamp', '11. Preconditions and clamp'],
  ['recap', '12. Practice Recap'],
].map(([key, name], index) => ({
  key,
  name,
  x: index * (SLIDE_W + GAP),
  y: 0,
  w: SLIDE_W,
  h: SLIDE_H,
}))

let currentSlideIndex = 0

function buildDeck(editor) {
  const boundsByKey = {}
  const frameIds = []

  function remember(key, x, y, w, h) {
    if (key) boundsByKey[key] = { x, y, w, h }
  }

  function lastShapeId() {
    const shapes = editor.getCurrentPageShapes()
    return shapes[shapes.length - 1]?.id
  }

  function slide(index) {
    return SLIDES[index]
  }

  function inSlide(index, x, y) {
    const current = slide(index)
    return { x: current.x + x, y: current.y + y }
  }

  function makeSlide(index) {
    const current = slide(index)
    editor.createShape({
      type: 'frame',
      x: current.x,
      y: current.y,
      props: {
        w: current.w,
        h: current.h,
        name: current.name,
        color: 'black',
      },
    })
    const id = lastShapeId()
    if (id) frameIds.push(id)
    remember(current.key, current.x, current.y, current.w, current.h)
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
    const from = boundsByKey[fromKey]
    const to = boundsByKey[toKey]
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
        dash: opts.dash || 'draw',
        size: opts.size || 'm',
        arrowheadStart: 'none',
        arrowheadEnd: opts.arrowheadEnd || 'arrow',
        font: 'draw',
        richText: toRichText(label),
      },
    })
  }

  function title(index, text, subtext) {
    makeText(index, 120, 90, 1500, text, { size: 'xl', scale: 1.7 })
    if (subtext) makeText(index, 124, 210, 1380, subtext, { size: 'l', scale: 1.05, color: 'grey' })
  }

  SLIDES.forEach((_, index) => makeSlide(index))

  title(0, '1.4 Designing Functions', 'Good functions make generated code readable and trustworthy')
  makeBox(0, 's0-fast', 170, 420, 430, 230, 'fast code\nis not always\nclear code', { fill: 'none', size: 'xl' })
  makeBox(0, 's0-design', 760, 365, 430, 330, 'function design\n\nreadable\ntestable\nreusable', {
    fill: 'semi',
    size: 'xl',
  })
  makeBox(0, 's0-recipe', 1380, 420, 360, 230, 'write a good\nrecipe', { fill: 'none', size: 'xl' })
  makeArrowBetween('s0-fast', 's0-design', 'needs')
  makeArrowBetween('s0-design', 's0-recipe', 'like')
  makeText(0, 355, 795, 1220, 'Session 03: how functions run. Session 04: how to design them.', {
    size: 'xl',
    scale: 1,
  })

  title(1, 'Three design principles', 'One job, no repetition, useful generality')
  const principles = [
    ['s1-one', 'SINGLE\nRESPONSIBILITY\n\none function\none job', 170, 390],
    ['s1-dry', 'DRY\n\nwrite logic once\nreuse the name', 760, 390],
    ['s1-general', 'GENERALITY\n\nargs and defaults\ncover related cases', 1350, 390],
  ]
  principles.forEach(([key, text, x, y], index) => {
    makeBox(1, key, x, y, 400, 270, text, {
      fill: index === 1 ? 'semi' : 'none',
      size: 'l',
      align: 'start',
      verticalAlign: 'start',
    })
  })
  makeArrowBetween('s1-one', 's1-dry')
  makeArrowBetween('s1-dry', 's1-general')
  makeBox(1, 's1-kitchen', 430, 785, 1060, 105, 'one dish -> one sauce recipe -> scalable serving size', {
    fill: 'semi',
    size: 'xl',
  })

  title(2, 'One function, one job', 'A good function can be described in one short sentence.')
  makeCode(2, 's2-good', 180, 310, 540, 205, 'function square(x) {\n  return x * x;\n}')
  makeBox(2, 's2-goodLabel', 240, 650, 420, 120, 'clear job:\nreturn square', { fill: 'semi', size: 'l' })
  makeCode(2, 's2-smell', 980, 330, 650, 130, 'prepareOrderAndPrintReceiptAndUpdateInventory()')
  makeBox(2, 's2-smellLabel', 1090, 650, 420, 120, 'design smell:\ntoo many jobs', { fill: 'none', size: 'l' })
  makeArrow(2, 745, 420, 970, 420, 'compare', { size: 'm' })
  makeText(2, 520, 830, 880, 'If the name needs "and", split the work.', { size: 'xl', scale: 1 })

  title(3, 'DRY means one idea has one home', 'Repeated logic becomes a named helper.')
  makeCode(3, 's3-repeat', 190, 315, 430, 190, 'x * x\n\nr * r\n\n(dx * dx)')
  makeBox(3, 's3-square', 780, 325, 430, 230, 'square(x)\n\none named\nhelper', { fill: 'semi', size: 'xl' })
  makeBox(3, 's3-use1', 1370, 285, 320, 130, 'area\nuses square', { fill: 'none', size: 'l' })
  makeBox(3, 's3-use2', 1370, 535, 320, 130, 'distance\nuses square', { fill: 'none', size: 'l' })
  makeArrow(3, 625, 410, 775, 435, 'extract', { size: 'm' })
  makeArrowBetween('s3-square', 's3-use1', 'reuse')
  makeArrowBetween('s3-square', 's3-use2', 'reuse')
  makeBox(3, 's3-kitchen', 430, 790, 1040, 105, 'write the house sauce recipe once', { fill: 'none', size: 'xl' })

  title(4, 'Generality plus defaults', 'Broad function, common-case default.')
  makeCode(4, 's4-code', 190, 315, 630, 220, 'function pow(base, exp = 2) {\n  return Math.pow(base, exp);\n}\n\npow(5)       // square\npow(5, 3)    // cube')
  makeBox(4, 's4-general', 965, 330, 330, 170, 'general\nany exponent', { fill: 'semi', size: 'xl' })
  makeBox(4, 's4-default', 1395, 330, 330, 170, 'default\ncommon case', { fill: 'none', size: 'xl' })
  makeArrowBetween('s4-general', 's4-default', 'supports')
  makeBox(4, 's4-test', 520, 760, 880, 115, 'Could a caller legitimately want a different value?', {
    fill: 'none',
    size: 'xl',
  })
  makeText(4, 985, 600, 660, 'Serves 4 by default, but can scale.', { size: 'l', scale: 1 })

  title(5, 'JSDoc documents the promise', 'The first reader is a human.')
  makeCode(
    5,
    's5-code',
    165,
    300,
    820,
    340,
    '/**\n * Return val limited to low through high.\n *\n * @param {number} val - Value to limit\n * @param {number} low - Lower bound\n * @param {number} high - Upper bound\n * @returns {number} Limited value\n */\nfunction clamp(val, low, high) { ... }'
  )
  makeBox(5, 's5-job', 1155, 330, 350, 150, 'job summary', { fill: 'semi', size: 'xl' })
  makeBox(5, 's5-params', 1155, 545, 350, 150, 'inputs', { fill: 'none', size: 'xl' })
  makeBox(5, 's5-return', 1155, 760, 350, 150, 'output', { fill: 'none', size: 'xl' })
  makeArrow(5, 990, 380, 1150, 405, '')
  makeArrow(5, 990, 485, 1150, 620, '')
  makeArrow(5, 990, 585, 1150, 835, '')
  makeText(5, 310, 760, 700, 'A good recipe names the result and its ingredients.', { size: 'l', scale: 1 })

  title(6, 'Defaults only handle undefined', 'null is a real value, not missing.')
  makeCode(6, 's6-code', 170, 310, 560, 250, 'function greet(name = "World") {\n  return "Hello, " + name + "!";\n}\n\ngreet()\ngreet(undefined)\ngreet(null)')
  makeBox(6, 's6-undef', 885, 325, 360, 155, 'undefined\nuses default', { fill: 'semi', size: 'l' })
  makeBox(6, 's6-null', 1360, 325, 360, 155, 'null\nkeeps null', { fill: 'none', size: 'l' })
  makeBox(6, 's6-result', 1045, 660, 515, 125, 'greet(null)\n-> "Hello, null!"', {
    fill: 'none',
    size: 'l',
    font: 'mono',
  })
  makeArrowBetween('s6-undef', 's6-result', '', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s6-null', 's6-result', '', { fromSide: 'bottom', toSide: 'top' })
  makeText(6, 310, 800, 620, 'Blank order line uses default. "No sauce" is an instruction.', {
    size: 'l',
    scale: 1,
  })

  title(7, 'Default parameter or const in the body?', 'Decide by variability.')
  makeCode(7, 's7-code', 170, 300, 720, 230, 'function pressure(v, t, n = 6.022e23) {\n  const k = 1.38e-23;\n  return (n * k * t) / v;\n}')
  makeBox(7, 's7-default', 1020, 315, 330, 190, 'n\n\ncaller may\nchoose amount', { fill: 'semi', size: 'l' })
  makeBox(7, 's7-const', 1445, 315, 330, 190, 'k\n\nphysics\nconstant', { fill: 'none', size: 'l' })
  makeArrow(7, 895, 390, 1015, 390, 'varies', { size: 'm' })
  makeArrow(7, 895, 430, 1440, 430, 'fixed', { size: 'm' })
  makeBox(7, 's7-rule', 475, 760, 970, 120, 'caller may override -> default param\ncaller should never choose -> const in body', {
    fill: 'none',
    size: 'l',
  })

  title(8, 'Locally defined functions stay close', 'A helper can live inside the function that uses it.')
  makeCode(
    8,
    's8-code',
    130,
    300,
    760,
    310,
    'function areaBetweenCircles(r1, r2) {\n  function areaOfCircle(r) {\n    return Math.PI * r * r;\n  }\n\n  return areaOfCircle(r1) - areaOfCircle(r2);\n}'
  )
  makeBox(8, 's8-frame', 1060, 315, 520, 260, 'areaBetweenCircles frame\n\nr1 -> 5\nr2 -> 3\nareaOfCircle -> function', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(8, 's8-outside', 1130, 735, 380, 110, 'outside:\nnot visible', { fill: 'none', size: 'l' })
  makeArrowBetween('s8-frame', 's8-outside', 'local only', { fromSide: 'bottom', toSide: 'top' })
  makeText(8, 330, 800, 650, 'A sub-recipe can belong to one dish.', { size: 'l', scale: 1 })

  title(9, 'The abstraction barrier', 'Callers depend on what, not how.')
  makeBox(9, 's9-domain', 210, 390, 380, 210, 'DOMAIN\n\nvalid inputs\nfour numbers', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(9, 's9-range', 770, 390, 380, 210, 'RANGE\n\noutput values\nnon-negative', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(9, 's9-intent', 1330, 390, 380, 210, 'INTENT\n\npromise\ndistance between points', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s9-domain', 's9-range')
  makeArrowBetween('s9-range', 's9-intent')
  makeBox(9, 's9-barrier', 455, 780, 1010, 105, 'implementation can change behind the promise', {
    fill: 'none',
    size: 'xl',
  })

  title(10, 'Preconditions, side effects, and clamp', 'Good design makes the contract visible.')
  makeCode(10, 's10-code', 145, 300, 720, 180, 'function clamp(val, low, high) {\n  return Math.max(low, Math.min(val, high));\n}')
  makeBox(10, 's10-pre', 970, 300, 360, 150, 'precondition\nlow <= high', { fill: 'semi', size: 'l' })
  makeBox(10, 's10-side', 1415, 300, 360, 150, 'side effect\nbeyond return', { fill: 'none', size: 'l' })
  makeBox(10, 's10-min', 410, 620, 330, 140, 'Math.min\nnot too high', { fill: 'none', size: 'l' })
  makeBox(10, 's10-max', 920, 620, 330, 140, 'Math.max\nnot too low', { fill: 'none', size: 'l' })
  makeBox(10, 's10-result', 1430, 620, 260, 140, 'inside\nrange', { fill: 'semi', size: 'xl' })
  makeArrowBetween('s10-min', 's10-max')
  makeArrowBetween('s10-max', 's10-result')
  makeText(10, 350, 820, 970, 'Reuse existing tools before writing new control flow.', { size: 'xl', scale: 1 })

  title(11, 'Session 04 practice map', 'Design first. Control flow comes next.')
  const recap = [
    ['s11-clamp', 'clamp\nrange guard', 130, 420],
    ['s11-area', 'areaBetween\nlocal helper', 430, 420],
    ['s11-distance', 'distance\ncomposition', 730, 420],
    ['s11-prime', 'isPrime\ndesign only', 1030, 420],
    ['s11-control', 'Session 05\ncontrol flow', 1330, 420],
    ['s11-loop', 'finish\nwith loops', 1630, 420],
  ]
  recap.forEach(([key, text, x, y], index) => {
    makeBox(11, key, x, y, 215, 150, text, { fill: index === 3 ? 'semi' : 'none', size: 'm' })
    if (index < recap.length - 1) makeArrow(11, x + 220, y + 75, x + 295, y + 75, '')
  })
  makeCode(11, 's11-code', 345, 730, 1230, 120, 'domain + range + intent\nsingle responsibility + DRY + generality\nJSDoc + defaults + local helpers')
  makeText(11, 400, 255, 1120, 'Know the promise before asking any tool to write the body.', {
    size: 'xl',
    scale: 1.05,
  })

  frameIds.forEach((id) => {
    try {
      editor.sendToBack([id])
    } catch {
      // Non-critical. Frames are still usable if z-order is already correct.
    }
  })
  window.__cs61aSlideBounds = SLIDES.map((s) => ({ ...s }))
}

function resetDeck(editor) {
  const ids = Array.from(editor.getCurrentPageShapeIds())
  if (ids.length > 0) editor.deleteShapes(ids)
  buildDeck(editor)
}

function getEditor() {
  const editor = window.__cs61aTldrawEditor
  if (!editor) window.alert('tldraw editor is not ready yet')
  return editor
}

function updateCounter() {
  const counter = document.querySelector('[data-slide-counter]')
  if (counter) counter.textContent = `${currentSlideIndex + 1} / ${SLIDES.length}`
}

function goToSlide(index, opts = {}) {
  const editor = getEditor()
  if (!editor) return
  currentSlideIndex = Math.max(0, Math.min(SLIDES.length - 1, index))
  const s = SLIDES[currentSlideIndex]
  editor.zoomToBounds(
    { x: s.x, y: s.y, w: s.w, h: s.h },
    { inset: opts.inset ?? 64, animation: opts.immediate ? undefined : { duration: opts.duration ?? 260 } }
  )
  updateCounter()
}

window.gotoSlide = goToSlide
window.nextSlide = function nextSlide() {
  goToSlide(currentSlideIndex + 1)
}
window.prevSlide = function prevSlide() {
  goToSlide(currentSlideIndex - 1)
}
window.zoomAllSlides = function zoomAllSlides() {
  const editor = getEditor()
  if (!editor) return
  const last = SLIDES[SLIDES.length - 1]
  editor.zoomToBounds({ x: 0, y: 0, w: last.x + last.w, h: SLIDE_H }, { inset: 80, animation: { duration: 260 } })
}
window.resetCs61aDeck = function resetCs61aDeck() {
  const editor = getEditor()
  if (!editor) return
  resetDeck(editor)
  goToSlide(0, { immediate: true })
}
window.saveDiagram = function saveDiagram() {
  const editor = getEditor()
  if (!editor) return
  try {
    const snapshot = editor.store.getStoreSnapshot()
    const json = JSON.stringify(snapshot, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${SESSION_ID}.tldr`
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    window.alert(`Save error: ${error.message}`)
  }
}
window.loadDiagram = function loadDiagram() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.tldr,.json'
  input.onchange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (loadEvent) => {
      const editor = getEditor()
      if (!editor) return
      try {
        editor.store.loadStoreSnapshot(JSON.parse(loadEvent.target.result))
      } catch (error) {
        window.alert(`Load error: ${error.message}`)
      }
    }
    reader.readAsText(file)
  }
  input.click()
}
window.exportSvg = function exportSvg() {
  const editor = getEditor()
  if (!editor) return
  try {
    const ids = Array.from(editor.getCurrentPageShapeIds())
    editor.getSvgString(ids).then(({ svg }) => {
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${SESSION_ID}.svg`
      link.click()
      URL.revokeObjectURL(url)
    })
  } catch (error) {
    window.alert(`Export error: ${error.message}`)
  }
}

function shouldUseDeckNav(event) {
  if (!window.CS61A_TLDRAW_NAV) return false
  const target = event.target
  const tagName = target?.tagName
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return false
  if (target?.closest?.('[contenteditable="true"]')) return false
  if (window.__cs61aTldrawEditor?.getSelectedShapeIds?.().length > 0) return false
  return true
}

document.addEventListener('keydown', (event) => {
  if (!shouldUseDeckNav(event)) return
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
    window.__cs61aTldrawEditor = editor
    setTimeout(() => {
      try {
        if (editor.getCurrentPageShapes().length === 0) buildDeck(editor)
        goToSlide(0, { immediate: true })
      } catch (error) {
        console.error('buildDeck error:', error)
      }
    }, 500)
  }, [])

  return React.createElement(
    'div',
    { style: { position: 'fixed', inset: 0 } },
    React.createElement(Tldraw, { persistenceKey: STORAGE_KEY, onMount: handleMount })
  )
}

createRoot(document.getElementById('root')).render(React.createElement(App))

