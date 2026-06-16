import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tldraw, toRichText } from 'tldraw'

const VARIANT = window.CS61A_TLDRAW_VARIANT || 'nav'
const STORAGE_KEY = `cs61a-session-03-tldraw-story-${VARIANT}-v1`
const SESSION_ID = 'cs61a-session-03'
const SLIDE_W = 1920
const SLIDE_H = 1080
const GAP = 260

const SLIDES = [
  ['title', '01. Why Define Functions'],
  ['defineCall', '02. Define vs Call'],
  ['parts', '03. Function Parts'],
  ['localFrame', '04. Fresh Local Frame'],
  ['environment', '05. Global and Local'],
  ['callSteps', '06. Call Procedure'],
  ['lookup', '07. Name Lookup'],
  ['scope', '08. Scope Wall'],
  ['passValue', '09. Pass by Value'],
  ['composition', '10. Composition'],
  ['abstraction', '11. Function Abstraction'],
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

  title(0, '1.3 Defining New Functions', 'A name can stand for a whole process')
  makeBox(0, 's0-lines', 170, 410, 430, 230, 'many generated\nlines of code', { fill: 'none', size: 'xl' })
  makeBox(0, 's0-function', 750, 360, 440, 330, 'function\n\nnamed process\nreusable tool', { fill: 'semi', size: 'xl' })
  makeBox(0, 's0-recipe', 1375, 410, 360, 230, '"make salsa"\nrecipe name', { fill: 'none', size: 'xl' })
  makeArrowBetween('s0-lines', 's0-function', 'organize')
  makeArrowBetween('s0-function', 's0-recipe', 'like')
  makeText(0, 355, 795, 1200, 'Functions package meaning so code is readable.', { size: 'xl', scale: 1.15 })

  title(1, 'Defining is not calling', 'Writing the recipe is not cooking the order.')
  makeCode(1, 's1-code', 170, 320, 590, 260, 'function square(x) {\n  return x * x;\n}\n\nsquare(5)')
  makeBox(1, 's1-define', 900, 335, 340, 180, 'DEFINE\nstore recipe', { fill: 'semi', size: 'xl' })
  makeBox(1, 's1-call', 1395, 335, 340, 180, 'CALL\nrun recipe', { fill: 'none', size: 'xl' })
  makeArrowBetween('s1-define', 's1-call', 'later')
  makeBox(1, 's1-note', 620, 740, 820, 110, 'body runs only when the function is called', { fill: 'none', size: 'xl' })
  makeArrow(1, 460, 580, 770, 740, 'not yet', { size: 'm' })

  title(2, 'Read a function in four parts', 'Name, parameters, body, return value')
  makeCode(2, 's2-code', 155, 315, 610, 260, 'function square(x) {\n  return x * x;\n}')
  const parts = [
    ['s2-name', 'name\nsquare', 860, 300],
    ['s2-param', 'parameter\nx', 1250, 300],
    ['s2-body', 'body\nx * x', 860, 590],
    ['s2-return', 'return\nsend value back', 1250, 590],
  ]
  parts.forEach(([key, text, x, y], index) => {
    makeBox(2, key, x, y, 300, 150, text, { fill: index === 0 ? 'semi' : 'none', size: 'l' })
  })
  makeBox(2, 's2-kitchen', 360, 800, 1210, 95, 'recipe title + blank ticket line + cooking steps + finished dish', {
    fill: 'semi',
    size: 'l',
  })

  title(3, 'Every call gets a fresh local frame', 'A new order gets a new ticket.')
  makeCode(3, 's3-code', 185, 310, 520, 230, 'square(-2)\n\nfunction square(x) {\n  return x * x;\n}')
  makeBox(3, 's3-call', 835, 330, 300, 140, 'call\nsquare(-2)', { fill: 'none', size: 'l' })
  makeBox(3, 's3-frame', 1335, 300, 360, 220, 'local frame\n\nx -> -2', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s3-call', 's3-frame', 'creates')
  makeBox(3, 's3-body', 730, 690, 430, 130, '(-2) * (-2)', { fill: 'none', size: 'xl' })
  makeBox(3, 's3-return', 1395, 690, 230, 130, 'return 4', { fill: 'semi', size: 'xl' })
  makeArrowBetween('s3-body', 's3-return', '')
  makeText(3, 320, 760, 400, 'return clears the ticket', { size: 'l', scale: 1 })

  title(4, 'Environment = global frame + local frames', 'Wall board plus order tickets.')
  makeBox(4, 's4-global', 190, 330, 620, 380, 'GLOBAL FRAME\nshared recipe board\n\nsquare -> function\nMath -> built-in object\ncube -> function', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(4, 's4-local1', 1030, 330, 300, 180, 'local frame\nsquare call\n\nx -> 5', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(4, 's4-local2', 1410, 530, 300, 180, 'local frame\ncube call\n\nx -> 3', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s4-local1', 's4-global', 'can look up')
  makeArrowBetween('s4-local2', 's4-global', 'can look up')
  makeBox(4, 's4-note', 510, 810, 930, 95, 'global is shared; local belongs to one call', { fill: 'none', size: 'xl' })

  title(5, 'A user-defined call has three steps', 'Evaluate, bind, run body.')
  const steps = [
    ['s5-step1', '1\nEvaluate\noperator + operands', 195, 410],
    ['s5-step2', '2\nCreate local frame\nbind params to args', 750, 410],
    ['s5-step3', '3\nEvaluate body\nreturn value', 1305, 410],
  ]
  steps.forEach(([key, text, x, y], index) => {
    makeBox(5, key, x, y, 390, 230, text, { fill: index === 1 ? 'semi' : 'none', size: 'l' })
    if (index < steps.length - 1) makeArrow(5, x + 395, y + 115, x + 550, y + 115, '')
  })
  makeCode(5, 's5-example', 525, 765, 870, 110, 'square(5) -> x -> 5 -> return x * x -> 25')
  makeText(5, 430, 285, 1060, 'This cycle is the engine under every function call.', { size: 'xl', scale: 1 })

  title(6, 'Name lookup is local first, then global', 'Own ticket first. Wall board second.')
  makeCode(6, 's6-code', 150, 305, 670, 230, 'function areaOfCircle(radius) {\n  return Math.PI * square(radius);\n}')
  makeBox(6, 's6-local', 935, 315, 330, 200, 'local frame\n\nradius -> 10', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(6, 's6-global', 1390, 315, 330, 250, 'global frame\n\nMath -> object\nsquare -> function', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrow(6, 825, 450, 930, 415, 'radius', { size: 'm' })
  makeArrow(6, 825, 455, 1385, 440, 'Math, square', { size: 'm' })
  makeBox(6, 's6-rule', 535, 765, 850, 110, 'lookup rule: local frame -> global frame', { fill: 'none', size: 'xl' })

  title(7, 'Scope is the wall between frames', 'Same name, different tickets.')
  makeCode(7, 's7-code', 135, 300, 560, 255, 'function square(x) {\n  return x * x;\n}\n\nfunction cube(x) {\n  return x * square(x);\n}')
  makeBox(7, 's7-cube', 835, 335, 330, 210, 'cube frame\n\nx -> 3', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(7, 's7-wall', 1245, 300, 45, 500, '', { fill: 'none', size: 'xl' })
  makeBox(7, 's7-square', 1375, 335, 330, 210, 'square frame\n\nx -> 3', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s7-cube', 's7-square', 'value 3')
  makeText(7, 925, 700, 690, 'The frames can both say x. They do not collide.', { size: 'xl', scale: 1 })
  makeText(7, 1205, 825, 140, 'wall', { size: 'l', scale: 1, textAlign: 'middle' })

  title(8, 'Pass by value', 'Values cross the wall. Frames do not.')
  makeBox(8, 's8-caller', 195, 390, 390, 250, 'caller frame\ncube\n\nx -> 3', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(8, 's8-value', 785, 450, 240, 125, 'value\n3', { geo: 'ellipse', fill: 'none', size: 'xl' })
  makeBox(8, 's8-callee', 1235, 390, 390, 250, 'callee frame\nsquare\n\nx -> 3', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s8-caller', 's8-value', 'evaluate x')
  makeArrowBetween('s8-value', 's8-callee', 'copy')
  makeCode(8, 's8-code', 455, 760, 1010, 105, 'return x * square(x);  // square gets the value, not cube frame')
  makeText(8, 520, 285, 880, 'One cook shouts "3"; another writes it on a new ticket.', { size: 'xl', scale: 1 })

  title(9, 'Composition builds bigger work', 'Small functions call other small functions.')
  makeCode(9, 's9-code', 140, 285, 720, 260, 'function hypotenuse(a, b) {\n  return Math.sqrt(square(a) + square(b));\n}')
  makeBox(9, 's9-hyp', 910, 300, 330, 160, 'hypotenuse\nframe\na -> 3, b -> 4', { fill: 'semi', size: 'm' })
  makeBox(9, 's9-squareA', 760, 610, 260, 140, 'square\nx -> 3', { fill: 'none', size: 'l' })
  makeBox(9, 's9-squareB', 1130, 610, 260, 140, 'square\nx -> 4', { fill: 'none', size: 'l' })
  makeBox(9, 's9-sqrt', 1500, 465, 250, 140, 'Math.sqrt\nreturn 5', { fill: 'none', size: 'l' })
  makeArrowBetween('s9-hyp', 's9-squareA', 'a', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s9-hyp', 's9-squareB', 'b', { fromSide: 'bottom', toSide: 'top' })
  makeArrowBetween('s9-squareB', 's9-sqrt', '')
  makeArrowBetween('s9-squareA', 's9-sqrt', '')
  makeBox(9, 's9-note', 455, 830, 970, 90, 'multiple frames can be alive, but each is isolated', { fill: 'none', size: 'l' })

  title(10, 'A function is an abstraction', 'Callers need what, not every how.')
  makeBox(10, 's10-domain', 210, 395, 380, 210, 'DOMAIN\n\nallowed inputs\none number', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(10, 's10-range', 770, 395, 380, 210, 'RANGE\n\npossible outputs\nnon-negative number', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(10, 's10-intent', 1330, 395, 380, 210, 'INTENT\n\npromise\ninput times itself', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('s10-domain', 's10-range')
  makeArrowBetween('s10-range', 's10-intent')
  makeBox(10, 's10-house', 500, 785, 920, 100, '"house salsa" hides steps behind a useful name', {
    fill: 'none',
    size: 'xl',
  })

  title(11, 'Session 03 practice map', 'Define, call, frame, return.')
  const recap = [
    ['s11-define', 'define\nfunction', 130, 430],
    ['s11-call', 'call\nsquare(5)', 430, 430],
    ['s11-frame', 'fresh\nlocal frame', 730, 430],
    ['s11-lookup', 'lookup\nlocal -> global', 1030, 430],
    ['s11-return', 'return\nvalue', 1330, 430],
    ['s11-clear', 'destroy\nframe', 1630, 430],
  ]
  recap.forEach(([key, text, x, y], index) => {
    makeBox(11, key, x, y, 215, 150, text, { fill: index === 2 ? 'semi' : 'none', size: 'm' })
    if (index < recap.length - 1) makeArrow(11, x + 220, y + 75, x + 295, y + 75, '')
  })
  makeCode(11, 's11-practice', 310, 735, 1300, 135, 'square(x)    cube(x)    areaOfCircle(radius)\ngreet(name, greeting = "Hello")\nhypotenuse(a, b)')
  makeText(11, 395, 255, 1130, 'Next: design functions deliberately.', { size: 'xl', scale: 1.15 })

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

