import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tldraw, toRichText } from 'tldraw'

const VARIANT = window.CS61A_TLDRAW_VARIANT || 'nav'
const STORAGE_KEY = `cs61a-session-02-tldraw-story-${VARIANT}-v1`
const SESSION_ID = 'cs61a-session-02'
const SLIDE_W = 1920
const SLIDE_H = 1080
const GAP = 260

const SLIDES = [
  ['title', '01. Why Elements Matter'],
  ['mechanisms', '02. Three Tools'],
  ['primitives', '03. Primitive Expressions'],
  ['combination', '04. Combining Expressions'],
  ['call', '05. Call Expressions'],
  ['nested', '06. Expression Trees'],
  ['environment', '07. Names and Environment'],
  ['bindings', '08. const, let, Snapshots'],
  ['libraries', '09. Library Functions'],
  ['purity', '10. Pure vs Non-Pure'],
  ['recap', '11. Practice Recap'],
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

  title(0, '1.2 Elements of Programming', 'Small pieces, combined pieces, named pieces')
  makeBox(0, 's0-ai', 165, 420, 420, 230, 'AI can draft\ncode quickly', { fill: 'none', size: 'xl' })
  makeBox(0, 's0-map', 750, 375, 440, 320, 'CS grounding\nmeans you can\nread the recipe', { fill: 'semi', size: 'xl' })
  makeBox(0, 's0-kitchen', 1370, 420, 380, 230, 'kitchen basics\nbefore banquet', { fill: 'none', size: 'xl' })
  makeArrowBetween('s0-ai', 's0-map', 'understand')
  makeArrowBetween('s0-map', 's0-kitchen', 'build')
  makeText(0, 385, 790, 1170, 'The goal is not magic. The goal is a mental map.', { size: 'xl', scale: 1.15 })

  title(1, 'Every language gives three tools', 'Primitives, combination, abstraction')
  makeBox(1, 's1-primitive', 175, 405, 410, 250, 'PRIMITIVE\n\nsingle ingredient\n42\n"hello"\ntrue', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(1, 's1-combine', 755, 405, 410, 250, 'COMBINATION\n\ncook pieces together\n2 + 3\nMath.max(...)', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(1, 's1-abstract', 1335, 405, 410, 250, 'ABSTRACTION\n\nname the result\nconst sauce = ...', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s1-primitive', 's1-combine')
  makeArrowBetween('s1-combine', 's1-abstract')
  makeBox(1, 's1-summary', 450, 775, 1020, 110, 'raw ingredients -> cooked dish -> recipe name', {
    fill: 'semi',
    size: 'xl',
  })

  title(2, 'Primitive expressions are simple values', 'Ask: what value does this become?')
  makeCode(2, 's2-code', 185, 335, 460, 330, '42\n\n"hello"\n\ntrue\n\n/\\s+/')
  const primitives = [
    ['number', 'number\n42', 825, 335],
    ['string', 'string\n"hello"', 1225, 335],
    ['boolean', 'boolean\ntrue', 825, 620],
    ['regex', 'regex\n/\\s+/', 1225, 620],
  ]
  primitives.forEach(([key, text, x, y], index) => {
    makeBox(2, `s2-${key}`, x, y, 280, 150, text, { fill: index === 0 ? 'semi' : 'none', size: 'l' })
  })
  makeArrow(2, 650, 500, 820, 500, 'values', { size: 'm' })
  makeText(2, 315, 800, 1280, 'Salt is salt. A number is a number. Start with the ingredients.', {
    size: 'xl',
    scale: 1,
  })

  title(3, 'Combination builds bigger expressions', 'Small values become useful results.')
  makeCode(3, 's3-code', 190, 315, 530, 350, '2 + 3\n// 5\n\n3 > 2\n// true\n\ntrue && false\n// false')
  makeBox(3, 's3-left', 845, 395, 250, 150, 'flour', { fill: 'none', size: 'xl' })
  makeBox(3, 's3-right', 1255, 395, 250, 150, 'water', { fill: 'none', size: 'xl' })
  makeBox(3, 's3-result', 1050, 710, 250, 150, 'dough', { fill: 'semi', size: 'xl' })
  makeArrowBetween('s3-left', 's3-result', '', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s3-right', 's3-result', '', { fromSide: 'bottom', toSide: 'top' })
  makeText(3, 885, 615, 580, 'Combination changes the shape of the idea.', { size: 'l', scale: 1.05 })

  title(4, 'A call expression applies a function', 'operator + operands -> return value')
  makeCode(4, 's4-code', 220, 305, 670, 145, 'Math.max(7.5, 9.5)\n// 9.5')
  makeBox(4, 's4-operator', 230, 590, 350, 155, 'operator\nMath.max', { fill: 'semi', size: 'l' })
  makeBox(4, 's4-operands', 785, 590, 350, 155, 'operands\n7.5, 9.5', { fill: 'none', size: 'l' })
  makeBox(4, 's4-return', 1340, 590, 350, 155, 'return value\n9.5', { fill: 'none', size: 'l' })
  makeArrowBetween('s4-operator', 's4-operands', 'gets')
  makeArrowBetween('s4-operands', 's4-return', 'returns')
  makeBox(4, 's4-kitchen', 990, 315, 640, 105, 'kitchen station + ticket items -> finished item', {
    fill: 'semi',
    size: 'l',
  })

  title(5, 'Nested expressions form a tree', 'Evaluate inside first. Values move upward.')
  makeCode(5, 's5-code', 180, 300, 760, 120, 'Math.pow(2, 1 + 10) - Math.pow(2, 5)')
  makeBox(5, 's5-root', 855, 310, 210, 105, '-', { fill: 'semi', size: 'xl' })
  makeBox(5, 's5-leftpow', 595, 515, 220, 105, 'Math.pow', { fill: 'none', size: 'l' })
  makeBox(5, 's5-rightpow', 1115, 515, 220, 105, 'Math.pow', { fill: 'none', size: 'l' })
  makeBox(5, 's5-twoa', 440, 725, 120, 90, '2', { fill: 'none', size: 'xl' })
  makeBox(5, 's5-plus', 650, 725, 150, 90, '1 + 10', { fill: 'none', size: 'l' })
  makeBox(5, 's5-twob', 1065, 725, 120, 90, '2', { fill: 'none', size: 'xl' })
  makeBox(5, 's5-five', 1275, 725, 120, 90, '5', { fill: 'none', size: 'xl' })
  makeArrowBetween('s5-root', 's5-leftpow', '', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s5-root', 's5-rightpow', '', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s5-leftpow', 's5-twoa', '', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s5-leftpow', 's5-plus', '', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s5-rightpow', 's5-twob', '', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s5-rightpow', 's5-five', '', { fromSide: 'bottom', toSide: 'top' })
  makeText(5, 245, 780, 570, 'Draw the tree when the code feels crowded.', { size: 'xl', scale: 1 })

  title(6, 'Names live in an environment', 'A name binds to a value while the program runs.')
  makeCode(6, 's6-code', 210, 315, 520, 140, 'const radius = 10;')
  makeBox(6, 's6-name', 235, 610, 300, 145, 'name\nradius', { fill: 'none', size: 'l' })
  makeBox(6, 's6-env', 810, 560, 390, 245, 'environment\n\nin-memory\nlookup table', {
    fill: 'semi',
    size: 'l',
  })
  makeBox(6, 's6-value', 1460, 610, 240, 145, 'value\n10', { fill: 'none', size: 'l' })
  makeArrowBetween('s6-name', 's6-env', 'lookup')
  makeArrowBetween('s6-env', 's6-value', 'gets')
  makeBox(6, 's6-board', 1010, 315, 640, 100, 'prep board: table7Sauce = "chili oil"', {
    fill: 'none',
    size: 'l',
    font: 'mono',
  })

  title(7, 'Use const first. Use let when it must change.', 'Bindings store snapshots, not live links.')
  makeCode(7, 's7-code', 175, 300, 660, 310, 'let r = 10;\nlet area = Math.PI * r * r;\n\nr = 11;\n\n// area is still the old value')
  makeBox(7, 's7-r10', 1000, 315, 280, 130, 'r = 10', { fill: 'semi', size: 'xl' })
  makeBox(7, 's7-area', 1430, 315, 300, 130, 'area = 314...', { fill: 'none', size: 'l' })
  makeBox(7, 's7-r11', 1000, 600, 280, 130, 'r = 11', { fill: 'none', size: 'xl' })
  makeBox(7, 's7-oldarea', 1430, 600, 300, 130, 'area stays\n314...', { fill: 'none', size: 'l' })
  makeArrowBetween('s7-r10', 's7-area', 'compute')
  makeArrowBetween('s7-r11', 's7-oldarea', 'no auto update')
  makeCode(7, 's7-swap', 450, 790, 510, 95, '[a, b] = [b, a];')
  makeText(7, 1015, 805, 660, 'The board changes only when someone writes a new value.', { size: 'l', scale: 1 })

  title(8, 'Library functions are ready-made tools', 'Math is a built-in toolbox.')
  makeBox(8, 's8-math', 180, 380, 430, 330, 'Math\n\n.sqrt()\n.abs()\n.round()\n.max()', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
    font: 'mono',
  })
  makeCode(8, 's8-code', 820, 355, 570, 230, 'Math.sqrt(256)\n// 16\n\nconst f = Math.max;\nf(2, 3, 4)\n// 4')
  makeBox(8, 's8-value', 1495, 405, 260, 150, 'function\nas value', { fill: 'none', size: 'l' })
  makeArrowBetween('s8-code', 's8-value', 'name can bind')
  makeBox(8, 's8-kitchen', 520, 800, 900, 105, 'Do not build the oven before baking bread.', {
    fill: 'none',
    size: 'xl',
  })

  title(9, 'Pure functions compose cleanly', 'Non-pure functions can have side effects.')
  makeBox(9, 's9-pure', 210, 350, 620, 280, 'PURE\n\nMath.sqrt(16)\nreturns 4\nno outside effect', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(9, 's9-nonpure', 1090, 350, 620, 280, 'NON-PURE\n\nconsole.log(2)\nprints 2\nreturns undefined', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeCode(9, 's9-trap', 520, 760, 880, 105, 'const two = console.log(2);  // two is undefined')
  makeText(9, 425, 665, 1080, 'Calling out "Order ready!" is not the food.', { size: 'xl', scale: 1 })

  title(10, 'Session 02 practice map', 'Read the recipe before trusting generated code.')
  const recap = [
    ['s10-prim', 'primitive\n42', 170, 430],
    ['s10-combine', 'combine\n2 + 3', 500, 430],
    ['s10-call', 'call\nMath.max(...)', 830, 430],
    ['s10-name', 'name\nconst x = ...', 1160, 430],
    ['s10-return', 'return\nvalue', 1490, 430],
  ]
  recap.forEach(([key, text, x, y], index) => {
    makeBox(10, key, x, y, 250, 160, text, { fill: index === 2 ? 'semi' : 'none', size: 'm' })
    if (index < recap.length - 1) makeArrow(10, x + 255, y + 80, x + 330, y + 80, '')
  })
  makeCode(10, 's10-practice', 325, 715, 1270, 135, 'Math.max(3, 7, 1)\nMath.pow(2 + 3, 4 - 1)\ntypeof Math.sqrt(16) === "number"')
  makeText(10, 395, 255, 1120, 'Next: define your own functions.', { size: 'xl', scale: 1.15 })

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

