import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tldraw, toRichText } from 'tldraw'

const VARIANT = window.CS61A_TLDRAW_VARIANT || 'nav'
const STORAGE_KEY = `cs61a-session-05-tldraw-story-${VARIANT}-v1`
const SESSION_ID = 'cs61a-session-05'
const SLIDE_W = 1920
const SLIDE_H = 1080
const GAP = 260

const SLIDES = [
  ['title', '01. Why Control Flow'],
  ['statements', '02. Statements vs Expressions'],
  ['discard', '03. Discarded Values'],
  ['compound', '04. Compound Statements'],
  ['conditionals', '05. Conditionals'],
  ['booleans', '06. Boolean Operators'],
  ['whileRule', '07. While Rule'],
  ['loopRecipe', '08. Loop Recipe'],
  ['accumulator', '09. Accumulator'],
  ['slidingWindow', '10. Sliding Window'],
  ['truthiness', '11. Truthiness'],
  ['recap', '12. Tests and Next Step'],
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

  title(0, '1.5 Control', 'Programs learn to choose and repeat')
  makeBox(0, 's0-straight', 160, 420, 390, 210, 'straight-line\ncode', { fill: 'none', size: 'xl' })
  makeBox(0, 's0-control', 730, 355, 460, 330, 'CONTROL FLOW\n\nchoose\n+\nrepeat', {
    fill: 'semi',
    size: 'xl',
  })
  makeBox(0, 's0-kitchen', 1380, 420, 390, 210, 'recipe with\nif + until', { fill: 'none', size: 'xl' })
  makeArrowBetween('s0-straight', 's0-control', 'adds')
  makeArrowBetween('s0-control', 's0-kitchen', 'like')
  makeText(0, 330, 790, 1250, 'AI can draft code. CS fundamentals let you debug the branch and the loop.', {
    size: 'xl',
    scale: 1,
  })

  title(1, 'Statements vs expressions', 'Expressions make values. Statements direct execution.')
  makeBox(1, 's1-expression', 220, 330, 520, 330, 'EXPRESSION\n\nevaluated\n\nproduces a value\n\n2 + 3\nx * x', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(1, 's1-statement', 1180, 330, 520, 330, 'STATEMENT\n\nexecuted\n\nchanges control or state\n\nconst x = 5\nreturn x\nif (...) { }', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s1-expression', 's1-statement', 'inside')
  makeBox(1, 's1-kitchen', 455, 800, 1010, 105, 'value question -> kitchen instruction', { fill: 'none', size: 'xl' })

  title(2, 'Expression statements discard values', 'Computing is not the same as keeping.')
  makeCode(2, 's2-bug', 170, 310, 520, 245, 'function square(x) {\n  x * x;\n}\n\nsquare(4)  // undefined')
  makeBox(2, 's2-discard', 835, 335, 310, 190, '16\n\ncomputed\nthen lost', { fill: 'semi', size: 'xl' })
  makeCode(2, 's2-fix', 1290, 310, 470, 190, 'function square(x) {\n  return x * x;\n}')
  makeArrowBetween('s2-bug', 's2-discard', 'value')
  makeArrowBetween('s2-discard', 's2-fix', 'keep it')
  makeCode(2, 's2-counter', 560, 720, 810, 105, 'counter + 1;        // lost\ncounter = counter + 1;  // saved')
  makeText(2, 430, 850, 1000, 'Thinking it is not writing it on the kitchen board.', { size: 'l', scale: 1 })

  title(3, 'Compound statements have clauses', 'A header controls a block.')
  makeCode(3, 's3-shape', 160, 315, 520, 245, '<header> {\n  <statement>\n  <statement>\n}')
  makeBox(3, 's3-header', 835, 300, 330, 150, 'header\n\ncontrol rule', { fill: 'semi', size: 'l' })
  makeBox(3, 's3-block', 835, 555, 330, 150, '{ block }\n\ncontrolled work', { fill: 'none', size: 'l' })
  makeBox(3, 's3-if', 1315, 310, 340, 145, 'if\nruns 0 or 1 time', { fill: 'none', size: 'l' })
  makeBox(3, 's3-while', 1315, 575, 340, 145, 'while\nruns many times', { fill: 'none', size: 'l' })
  makeArrow(3, 685, 355, 830, 375, 'names')
  makeArrow(3, 685, 485, 830, 630, 'groups')
  makeArrowBetween('s3-header', 's3-if')
  makeArrowBetween('s3-block', 's3-while')
  makeBox(3, 's3-kitchen', 455, 815, 1010, 95, 'normal recipe: top to bottom. control recipe: branch or repeat.', {
    fill: 'semi',
    size: 'l',
  })

  title(4, 'if / else if / else', 'Clauses are checked in order. First match wins.')
  makeCode(
    4,
    's4-code',
    145,
    295,
    690,
    340,
    'if (degrees < 90) {\n  return "acute";\n} else if (degrees === 90) {\n  return "right";\n} else if (degrees < 180) {\n  return "obtuse";\n} else {\n  return "straight";\n}'
  )
  makeBox(4, 's4-first', 1040, 315, 330, 150, '< 90\nacute', { fill: 'semi', size: 'xl' })
  makeBox(4, 's4-second', 1450, 315, 330, 150, '=== 90\nright', { fill: 'none', size: 'xl' })
  makeBox(4, 's4-edge', 1040, 630, 330, 150, 'boundary\nbelongs here', { fill: 'none', size: 'l' })
  makeBox(4, 's4-skip', 1450, 630, 330, 150, 'then skip\nthe rest', { fill: 'semi', size: 'l' })
  makeArrowBetween('s4-first', 's4-second', 'else')
  makeArrowBetween('s4-second', 's4-skip', 'match', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s4-first', 's4-edge', '< not <=', { fromSide: 'bottom', toSide: 'top' })
  makeText(4, 395, 840, 1120, 'Restaurant rule book: send the ticket to the first matching station.', {
    size: 'xl',
    scale: 1,
  })

  title(5, 'Boolean operators short-circuit', 'Combine conditions without always checking everything.')
  makeBox(5, 's5-and', 170, 330, 380, 190, 'a && b\n\nand\nstop if a fails', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(5, 's5-or', 760, 330, 380, 190, 'a || b\n\nor\nstop if a passes', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(5, 's5-not', 1350, 330, 380, 190, '!a\n\nnot\nflip truthiness', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s5-and', 's5-or')
  makeArrowBetween('s5-or', 's5-not')
  makeCode(5, 's5-bugs', 380, 700, 1160, 135, 'degrees === 90   // compare\nif (degrees = 90) // assigns\n!n flips truthiness, -n flips sign')
  makeText(5, 420, 590, 1080, 'No rice means stop checking sauce. Paid cash means no card needed.', {
    size: 'l',
    scale: 1,
  })

  title(6, 'while repeats a block', 'Check condition, run block, check again.')
  makeBox(6, 's6-check1', 180, 360, 320, 160, 'check\ncondition', { fill: 'semi', size: 'xl' })
  makeBox(6, 's6-run', 790, 330, 340, 220, 'run whole\nblock', { fill: 'none', size: 'xl' })
  makeBox(6, 's6-check2', 1410, 360, 320, 160, 'check\nagain', { fill: 'none', size: 'xl' })
  makeArrowBetween('s6-check1', 's6-run', 'truthy')
  makeArrowBetween('s6-run', 's6-check2', 'then')
  makeArrow(6, 1515, 560, 350, 560, 'repeat while truthy', { kind: 'arc', size: 'm' })
  makeCode(6, 's6-code', 555, 725, 810, 115, 'while (sauceIsLumpy) {\n  stir();\n}')
  makeText(6, 455, 875, 1040, 'A loop must change something, or it never stops.', { size: 'xl', scale: 1 })

  title(7, 'The loop recipe', 'Every while loop needs init, condition, and update.')
  makeCode(7, 's7-code', 160, 300, 620, 275, 'let k = 1;          // init\n\nwhile (k <= 5) {    // condition\n  console.log(k);\n  k = k + 1;        // update\n}')
  makeBox(7, 's7-init', 950, 300, 300, 150, 'INIT\nstart state', { fill: 'semi', size: 'l' })
  makeBox(7, 's7-condition', 1370, 300, 300, 150, 'CONDITION\nkeep going?', { fill: 'none', size: 'l' })
  makeBox(7, 's7-update', 1160, 610, 300, 150, 'UPDATE\nmove forward', { fill: 'none', size: 'l' })
  makeArrowBetween('s7-init', 's7-condition')
  makeArrow(7, 1520, 455, 1310, 605, 'do')
  makeArrow(7, 1160, 685, 950, 380, 'again')
  makeBox(7, 's7-bug', 495, 810, 930, 95, 'forget update -> infinite loop', { fill: 'semi', size: 'xl' })

  title(8, 'Accumulator pattern', 'One variable remembers the running answer.')
  makeCode(
    8,
    's8-code',
    145,
    300,
    700,
    300,
    'let total = 0;\nlet k = 1;\n\nwhile (k <= n) {\n  total = total + k;\n  k = k + 1;\n}\nreturn total;'
  )
  makeBox(8, 's8-total', 1015, 310, 350, 170, 'total\n\nrunning answer', { fill: 'semi', size: 'l' })
  makeBox(8, 's8-k', 1435, 310, 300, 170, 'k\n\ncounter', { fill: 'none', size: 'l' })
  makeBox(8, 's8-list', 1015, 610, 720, 120, '1 + 2 + 3 + 4 + 5 = 15', { fill: 'none', size: 'xl' })
  makeArrowBetween('s8-total', 's8-list', 'adds', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s8-k', 's8-list', 'walks', { fromSide: 'bottom', toSide: 'top' })
  makeText(8, 390, 840, 1140, 'Cashier starts at zero, adds each dish, then returns the bill.', {
    size: 'xl',
    scale: 1,
  })

  title(9, 'Sliding window pattern', 'Two nearby values move together.')
  makeCode(
    9,
    's9-code',
    130,
    285,
    745,
    350,
    'let pred = 0;\nlet curr = 1;\nlet k = 1;\n\nwhile (k < n) {\n  let next = pred + curr;\n  pred = curr;\n  curr = next;\n  k = k + 1;\n}'
  )
  makeBox(9, 's9-pred', 1010, 320, 260, 145, 'pred\n0', { fill: 'none', size: 'xl' })
  makeBox(9, 's9-curr', 1350, 320, 260, 145, 'curr\n1', { fill: 'semi', size: 'xl' })
  makeBox(9, 's9-next', 1180, 620, 260, 145, 'next\n1', { fill: 'none', size: 'xl' })
  makeArrowBetween('s9-pred', 's9-next', 'sum', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s9-curr', 's9-next', 'sum', { fromSide: 'bottom', toSide: 'top' })
  makeArrow(9, 1245, 465, 1410, 465, 'slide', { size: 'm' })
  makeBox(9, 's9-warning', 445, 815, 1030, 100, 'one step off? check init and < vs <=', { fill: 'semi', size: 'xl' })

  title(10, 'Truthiness in boolean context', 'JavaScript decides true-like or false-like.')
  makeBox(10, 's10-falsy', 135, 315, 590, 325, 'FALSY\n\nfalse\n0, -0, 0n\n""\nnull\nundefined\nNaN', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(10, 's10-truthy', 815, 315, 430, 235, 'TRUTHY\n\neverything else', { fill: 'none', size: 'xl' })
  makeBox(10, 's10-array', 1360, 315, 390, 235, '[] and {}\nare truthy\nin JS', { fill: 'none', size: 'xl' })
  makeArrowBetween('s10-falsy', 's10-truthy', 'not in list')
  makeArrowBetween('s10-truthy', 's10-array', 'gotcha')
  makeCode(10, 's10-code', 560, 725, 800, 115, 'if (items.length > 0) { ... }\n// ask how many, not whether tray exists')
  makeText(10, 385, 850, 1150, 'An empty tray is still a tray. Check how much food is on it.', {
    size: 'l',
    scale: 1,
  })

  title(11, 'Session 05 control map', 'Test the branch, test the loop, then move to higher-order functions.')
  const recap = [
    ['s11-statements', 'statements\nexecute', 120, 405],
    ['s11-expressions', 'expressions\nvalue', 380, 405],
    ['s11-if', 'if\nchoose', 640, 405],
    ['s11-while', 'while\nrepeat', 900, 405],
    ['s11-truth', 'truthiness\ncontext', 1160, 405],
    ['s11-tests', 'tests\ntrust', 1420, 405],
    ['s11-next', '1.6\nfunctions as values', 1680, 405],
  ]
  recap.forEach(([key, text, x, y], index) => {
    makeBox(11, key, x, y, 190, 145, text, { fill: index === 3 ? 'semi' : 'none', size: 'm' })
    if (index < recap.length - 1) makeArrow(11, x + 195, y + 72, x + 255, y + 72, '')
  })
  makeCode(
    11,
    's11-code',
    310,
    715,
    1300,
    135,
    'console.assert(expr, "message")  // logs and keeps running\nassertEqual(actual, expected, "msg") // throws and stops'
  )
  makeText(11, 410, 245, 1100, 'Control flow is the foundation under map, filter, and reduce.', {
    size: 'xl',
    scale: 1.05,
  })
  makeText(11, 455, 890, 1010, 'Taste the dish before it leaves the pass.', { size: 'l', scale: 1 })

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

