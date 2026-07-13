import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tldraw, toRichText } from 'tldraw'

const VARIANT = window.CS61A_TLDRAW_VARIANT || 'nav'
const STORAGE_KEY = `cs61a-session-06-tldraw-story-${VARIANT}-v1`
const SESSION_ID = 'cs61a-session-06'
const SLIDE_W = 1920
const SLIDE_H = 1080
const GAP = 260

const SLIDES = [
  ['title', '01. Why HOFs Matter'],
  ['values', '02. Functions Are Values'],
  ['hof', '03. Higher-Order Functions'],
  ['callbacks', '04. Callbacks'],
  ['improve', '05. improve Loop'],
  ['birthplace', '06. Lexical Scope'],
  ['wall', '07. The Wall'],
  ['closures', '08. Closures'],
  ['factoryProduct', '09. Factory vs Product'],
  ['currying', '10. Currying'],
  ['decorators', '11. Decorators'],
  ['recap', '12. 1.6 Concept Map'],
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

  title(0, '1.6 Higher-Order Functions', 'Functions become values: pass them, return them, wrap them.')
  makeBox(0, 's0-before', 140, 400, 390, 220, 'function\n\ntakes values\nreturns value', { fill: 'none', size: 'l' })
  makeBox(0, 's0-center', 720, 330, 480, 360, 'FUNCTIONS\nARE\nVALUES', { fill: 'semi', size: 'xl' })
  makeBox(0, 's0-after', 1390, 400, 390, 220, 'recipe\nas ingredient\nor product', { fill: 'none', size: 'l' })
  makeArrowBetween('s0-before', 's0-center', 'upgrade')
  makeArrowBetween('s0-center', 's0-after', 'kitchen view')
  makeText(0, 315, 790, 1290, 'AI can draft callbacks and closures. CS fundamentals let you understand them.', {
    size: 'xl',
    scale: 1,
  })

  title(1, 'First-class functions', 'A function has the same rights as other values.')
  makeBox(1, 's1-bind', 135, 325, 340, 180, 'bind\n\nto a name', { fill: 'semi', size: 'l' })
  makeBox(1, 's1-pass', 585, 325, 340, 180, 'pass\n\nas input', { fill: 'none', size: 'l' })
  makeBox(1, 's1-return', 1035, 325, 340, 180, 'return\n\nas output', { fill: 'none', size: 'l' })
  makeBox(1, 's1-store', 1485, 325, 340, 180, 'store\n\nin data', { fill: 'none', size: 'l' })
  makeArrowBetween('s1-bind', 's1-pass')
  makeArrowBetween('s1-pass', 's1-return')
  makeArrowBetween('s1-return', 's1-store')
  makeCode(
    1,
    's1-code',
    430,
    690,
    1060,
    135,
    'const double = x => x * 2;\n[1, 2, 3].map(double);\nconst ops = { add: (a, b) => a + b };'
  )
  makeText(1, 470, 860, 980, 'A recipe card can be named, handed over, returned, or filed away.', {
    size: 'l',
    scale: 1,
  })

  title(2, 'Higher-order functions', 'A function that takes or returns another function.')
  makeBox(2, 's2-input', 150, 370, 370, 210, 'recipe\ncard', { fill: 'none', size: 'xl' })
  makeBox(2, 's2-hof', 710, 315, 500, 320, 'HIGHER-ORDER\nFUNCTION\n\nuses another\nfunction', { fill: 'semi', size: 'xl' })
  makeBox(2, 's2-output', 1400, 370, 370, 210, 'result\nor new recipe', { fill: 'none', size: 'xl' })
  makeArrowBetween('s2-input', 's2-hof', 'take fn')
  makeArrowBetween('s2-hof', 's2-output', 'return fn/value')
  makeCode(2, 's2-code', 500, 760, 920, 95, 'function applyTwice(fn, x) {\n  return fn(fn(x));\n}')
  makeText(2, 430, 895, 1060, 'The pattern stays the same. The action can change.', { size: 'l', scale: 1 })

  title(3, 'Callbacks: `fn` vs `fn()`', 'Callback means the receiver calls it.')
  makeCode(3, 's3-pass', 170, 310, 620, 180, 'arr.map(fn);\n\n// pass the recipe\n// receiver calls it')
  makeCode(3, 's3-call', 1130, 310, 620, 180, 'arr.map(fn());\n\n// cook now\n// pass the result')
  makeBox(3, 's3-sync', 330, 655, 430, 165, 'sync\n\nmap calls now\nand waits', { fill: 'semi', size: 'l' })
  makeBox(3, 's3-async', 1160, 655, 430, 165, 'async\n\ntimer stores it\ncalls later', { fill: 'none', size: 'l' })
  makeArrowBetween('s3-pass', 's3-sync', 'often', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s3-call', 's3-async', 'not this', { fromSide: 'bottom', toSide: 'top' })
  makeText(3, 380, 865, 1160, 'No parentheses: hand over the recipe. Parentheses: run it right now.', {
    size: 'xl',
    scale: 1,
  })

  title(4, 'improve(update, close, guess)', 'A reusable loop: check, update, check again.')
  makeBox(4, 's4-guess', 170, 360, 330, 170, 'guess\n\ncurrent sauce', { fill: 'semi', size: 'l' })
  makeBox(4, 's4-close', 795, 330, 330, 230, 'close\n\ntaste test\n\ndone?', { fill: 'none', size: 'l' })
  makeBox(4, 's4-update', 1420, 360, 330, 170, 'update\n\nadjust sauce', { fill: 'none', size: 'l' })
  makeArrowBetween('s4-guess', 's4-close', 'test')
  makeArrowBetween('s4-close', 's4-update', 'not yet')
  makeArrow(4, 1480, 560, 325, 560, 'new guess', { kind: 'arc', size: 'm' })
  makeCode(
    4,
    's4-code',
    510,
    730,
    900,
    135,
    'while (!close(guess)) {\n  guess = update(guess);\n}\nreturn guess;'
  )
  makeText(4, 405, 890, 1110, 'Newton math is a showcase. The structure is the lesson.', { size: 'l', scale: 1 })

  title(5, 'Lexical scope: birthplace', 'A function looks up names where it was defined.')
  makeBox(5, 's5-global', 155, 325, 420, 170, 'Global frame\n\naverage\napproxEq\nimprove', {
    fill: 'none',
    size: 'm',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(5, 's5-sqrt', 750, 300, 420, 230, 'sqrt frame\n\na = 256\n\nbirthplace of\nsqrtUpdate', {
    fill: 'semi',
    size: 'm',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(5, 's5-update', 1345, 325, 420, 170, 'sqrtUpdate frame\n\nx = ...\n\nuses a', {
    fill: 'none',
    size: 'm',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s5-update', 's5-sqrt', 'parent', { arrowheadEnd: 'arrow' })
  makeArrowBetween('s5-sqrt', 's5-global', 'parent', { arrowheadEnd: 'arrow' })
  makeCode(5, 's5-code', 425, 715, 1070, 140, 'function sqrt(a) {\n  function sqrtUpdate(x) { return average(x, a / x); }\n  return improve(sqrtUpdate, sqrtClose);\n}')
  makeText(5, 395, 885, 1130, 'A recipe carries the kitchen where it was written.', { size: 'xl', scale: 1 })

  title(6, 'The wall', 'Caller frames are not on the lookup path.')
  makeBox(6, 's6-caller', 165, 345, 430, 250, 'improve frame\n\nupdate\nclose\nguess\n\nCALLER', {
    fill: 'none',
    size: 'm',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(6, 's6-wall', 805, 300, 310, 340, 'WALL\n\nlookup\ncannot\ncross', { fill: 'semi', size: 'xl' })
  makeBox(6, 's6-callee', 1325, 345, 430, 250, 'sqrtUpdate frame\n\nx\nparent -> sqrt\n\nCALLEE', {
    fill: 'none',
    size: 'm',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrow(6, 590, 470, 805, 470, 'argument values')
  makeArrow(6, 1325, 565, 1115, 565, 'lookup blocked', { arrowheadEnd: 'none' })
  makeBox(6, 's6-rule', 390, 760, 1140, 110, 'arguments cross. name lookup follows birthplace links.', {
    fill: 'semi',
    size: 'xl',
  })

  title(7, 'Closures', 'A closure is a function plus captured birthplace names.')
  makeCode(
    7,
    's7-code',
    145,
    300,
    700,
    260,
    'function makeAdder(n) {\n  return x => x + n;\n}\n\nconst addFive = makeAdder(5);\naddFive(3); // 8'
  )
  makeBox(7, 's7-x', 1040, 320, 280, 160, 'x = 3\n\ncall-time', { fill: 'none', size: 'l' })
  makeBox(7, 's7-n', 1440, 320, 280, 160, 'n = 5\n\ncaptured', { fill: 'semi', size: 'l' })
  makeBox(7, 's7-closure', 1040, 620, 680, 140, 'addFive = inner function + birthplace frame', {
    fill: 'none',
    size: 'l',
  })
  makeArrowBetween('s7-x', 's7-closure', 'argument', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s7-n', 's7-closure', 'memory', { fromSide: 'bottom', toSide: 'top' })
  makeText(7, 400, 850, 1120, 'The product remembers what the factory set up.', { size: 'xl', scale: 1 })

  title(8, 'Factory vs product', 'Do not confuse the maker with the thing it makes.')
  makeBox(8, 's8-factory', 145, 360, 410, 220, 'makeAdder\n\nfactory\n\nneeds n', { fill: 'semi', size: 'l' })
  makeBox(8, 's8-product', 755, 360, 410, 220, 'addFive\n\nproduct\n\nneeds x', { fill: 'none', size: 'l' })
  makeBox(8, 's8-newton', 1365, 360, 410, 220, 'newtonUpdate\n-> update\n\nsame pattern', { fill: 'none', size: 'l' })
  makeArrowBetween('s8-factory', 's8-product', 'returns')
  makeArrowBetween('s8-product', 's8-newton', 'parallel')
  makeCode(8, 's8-code', 425, 720, 1070, 135, 'newtonUpdate(f, df) -> update\nupdate(x) uses captured f and df\nfactory builds. product runs.')
  makeText(8, 440, 890, 1040, 'The sauce recipe is not the sauce-recipe factory.', { size: 'l', scale: 1 })

  title(9, 'Currying and partial application', 'Split many inputs into one-input steps.')
  makeBox(9, 's9-normal', 160, 350, 400, 170, 'normal\n\nadd(5, 3)', { fill: 'none', size: 'xl' })
  makeBox(9, 's9-curried', 760, 320, 400, 230, 'curried\n\nadd(5)(3)\n\ntwo calls', { fill: 'semi', size: 'xl' })
  makeBox(9, 's9-partial', 1360, 350, 400, 170, 'partial\n\naddFive', { fill: 'none', size: 'xl' })
  makeArrowBetween('s9-normal', 's9-curried', 'transform')
  makeArrowBetween('s9-curried', 's9-partial', 'preload')
  makeCode(9, 's9-code', 470, 720, 980, 105, 'const add = a => b => a + b;\nconst addFive = add(5);\naddFive(3); // 8')
  makeText(9, 425, 870, 1070, 'Preload "large" once. Reuse the large-coffee builder.', {
    size: 'xl',
    scale: 1,
  })

  title(10, 'Decorators', 'Wrap a function with before, after, or around behavior.')
  makeBox(10, 's10-original', 145, 365, 360, 190, 'original\nfunction', { fill: 'none', size: 'xl' })
  makeBox(10, 's10-wrapper', 780, 315, 360, 290, 'wrapper\n\nlogs\ncalls original\nreturns result', {
    fill: 'semi',
    size: 'l',
  })
  makeBox(10, 's10-enhanced', 1415, 365, 360, 190, 'enhanced\nfunction', { fill: 'none', size: 'xl' })
  makeArrowBetween('s10-original', 's10-wrapper', 'capture fn')
  makeArrowBetween('s10-wrapper', 's10-enhanced', 'return')
  makeCode(10, 's10-code', 405, 720, 1110, 135, 'function trace(fn) {\n  return function wrapped(x) {\n    console.log(fn.name);\n    return fn(x);\n  };\n}')
  makeText(10, 415, 895, 1090, 'Setup builds the wrapper. Calling runs the wrapper.', { size: 'l', scale: 1 })

  title(11, 'Session 06 concept map', 'Closures power factories, currying, and decorators.')
  makeBox(11, 's11-first', 105, 395, 230, 140, 'first-class\nfunctions', { fill: 'semi', size: 'm' })
  makeBox(11, 's11-hof', 425, 395, 230, 140, 'higher-order\nfunctions', { fill: 'none', size: 'm' })
  makeBox(11, 's11-callbacks', 745, 245, 230, 140, 'callbacks\nfn as input', { fill: 'none', size: 'm' })
  makeBox(11, 's11-closure', 745, 545, 230, 140, 'closures\nfn as output', { fill: 'semi', size: 'm' })
  makeBox(11, 's11-scope', 1065, 545, 230, 140, 'lexical\nscope', { fill: 'none', size: 'm' })
  makeBox(11, 's11-wall', 1065, 245, 230, 140, 'the wall\nargs only', { fill: 'none', size: 'm' })
  makeBox(11, 's11-patterns', 1385, 395, 390, 140, 'factory\ncurrying\ndecorator', { fill: 'semi', size: 'm' })
  makeArrowBetween('s11-first', 's11-hof', 'enables')
  makeArrowBetween('s11-hof', 's11-callbacks', 'takes fn')
  makeArrowBetween('s11-hof', 's11-closure', 'returns fn')
  makeArrowBetween('s11-closure', 's11-scope', 'birthplace')
  makeArrowBetween('s11-wall', 's11-patterns', 'keeps clear')
  makeArrowBetween('s11-scope', 's11-patterns', 'powers')
  makeText(11, 360, 750, 1200, 'Next: recursion. One function calls itself, and frames stack up.', {
    size: 'xl',
    scale: 1,
  })
  makeText(11, 440, 865, 1040, 'The environment model from 1.6 becomes the map for 1.7.', {
    size: 'l',
    scale: 1,
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

