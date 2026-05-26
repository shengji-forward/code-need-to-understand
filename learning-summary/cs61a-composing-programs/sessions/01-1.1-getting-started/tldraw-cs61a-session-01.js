import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tldraw, toRichText } from 'tldraw'

const VARIANT = window.CS61A_TLDRAW_VARIANT || 'nav'
const STORAGE_KEY = `cs61a-session-01-tldraw-story-${VARIANT}-v1`
const SESSION_ID = 'cs61a-session-01'
const SLIDE_W = 1920
const SLIDE_H = 1080
const GAP = 260

const SLIDES = [
  ['title', '01. Getting Started'],
  ['precision', '02. Precision'],
  ['repl', '03. REPL Cycle'],
  ['exprStmt', '04. Expressions vs Statements'],
  ['functions', '05. Functions'],
  ['objects', '06. Objects'],
  ['typeof', '07. typeof'],
  ['errors', '08. Error Types'],
  ['concepts', '09. Five Concepts'],
  ['shakespeare', '10. Shakespeare Trace'],
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

  title(0, '1.1 Getting Started', 'Precision, the REPL, expressions, functions, objects, and errors')
  makeBox(0, 'ticket', 170, 390, 380, 230, 'program\nas kitchen ticket', { fill: 'semi', size: 'xl' })
  makeText(0, 690, 365, 980, 'The computer follows exactly what you write.', {
    size: 'xl',
    scale: 1.55,
  })
  makeBox(0, 'goal', 910, 760, 540, 100, 'build the first mental map', { fill: 'none', size: 'l' })
  makeArrow(0, 610, 600, 905, 810, '', { size: 'm' })

  title(1, 'Programming languages remove ambiguity', 'Human language guesses. Code does not.')
  makeBox(1, 'spokenOrder', 220, 355, 560, 260, '"Bring the sauce\nfrom the table\nnear the window"', {
    fill: 'none',
    size: 'l',
  })
  makeBox(1, 'programTicket', 1120, 355, 560, 260, 'table = 7\nitem = "hot sauce"\naction = "bring"', {
    fill: 'semi',
    size: 'l',
    font: 'mono',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrow(1, 805, 485, 1115, 485, 'make exact', { size: 'm' })
  makeText(1, 330, 760, 1220, 'A program is a precise ticket for the kitchen.', { size: 'xl', scale: 1.1 })

  title(2, 'The REPL is a tasting spoon', 'Read -> Eval -> Print -> Loop')
  const cycle = [
    ['Read', 'take the input', 260, 380],
    ['Eval', 'compute it', 765, 380],
    ['Print', 'show result', 765, 675],
    ['Loop', 'wait again', 260, 675],
  ]
  cycle.forEach(([heading, body, x, y], index) => {
    makeBox(2, `cycle${index}`, x, y, 340, 140, `${heading}\n${body}`, { fill: 'semi', size: 'l' })
  })
  makeArrowBetween('cycle0', 'cycle1')
  makeArrow(2, 935, 525, 935, 670, '')
  makeArrow(2, 765, 745, 605, 745, '')
  makeArrow(2, 430, 675, 430, 525, '')
  makeCode(2, 'replCode', 1260, 405, 420, 230, '> 2 + 2\n4\n\n> Math.sqrt(144)\n12')
  makeText(2, 1235, 710, 500, 'Prediction first. Run second.', { size: 'l', scale: 1.05 })

  title(3, 'Expression vs statement', 'One produces a value. One tells the computer to act.')
  makeBox(3, 'expression', 205, 390, 590, 270, 'EXPRESSION\n\n2 + 3\ntypeof 42\nMath.sqrt(144)\n\nproduces a value', {
    fill: 'semi',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeBox(3, 'statement', 1125, 390, 590, 270, 'STATEMENT\n\nconst radius = 5;\nconsole.log("hi");\n\ncarries out an action', {
    fill: 'none',
    size: 'l',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrow(3, 800, 520, 1120, 520, 'often inside', { size: 'm' })
  makeCode(3, 'areaCode', 565, 780, 760, 110, 'const area = Math.PI * 5 * 5;')

  title(4, 'Functions hide the messy process', 'Input goes in. A result comes out.')
  makeBox(4, 'input', 245, 485, 260, 150, '144', { geo: 'ellipse', fill: 'none', size: 'xl' })
  makeBox(4, 'station', 770, 405, 420, 300, 'Math.sqrt\n\nkitchen station', { fill: 'semi', size: 'xl' })
  makeBox(4, 'output', 1460, 485, 260, 150, '12', { geo: 'ellipse', fill: 'none', size: 'xl' })
  makeArrowBetween('input', 'station', 'input')
  makeArrowBetween('station', 'output', 'output')
  makeText(4, 410, 790, 1100, 'Encapsulation means callers do not need every internal step.', {
    size: 'xl',
    scale: 1,
  })

  title(5, 'Objects bundle data with tools', 'A value can carry useful operations with it.')
  makeBox(5, 'stringObj', 210, 385, 420, 250, '"hello"\n\ncharacters', { fill: 'semi', size: 'xl' })
  makeBox(5, 'tools', 870, 345, 650, 330, '.length\n.toUpperCase()\n.includes("ell")\n.split("")', {
    font: 'mono',
    size: 'm',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrowBetween('stringObj', 'tools', 'comes with')
  makeBox(5, 'propertyMethod', 390, 785, 1120, 105, 'property = stored value, method() = function call', {
    fill: 'none',
    size: 'l',
  })

  title(6, 'typeof is an operator', 'Parentheses can group without making a function call.')
  makeCode(6, 'typeofCode', 210, 360, 520, 310, 'typeof 42\n// "number"\n\ntypeof(42)\n// also "number"')
  makeBox(6, 'operator', 860, 420, 360, 180, 'operator\nnot function', { fill: 'semi', size: 'xl' })
  makeBox(6, 'quirks', 1350, 345, 390, 320, 'typeof null\n// "object"\n\n7 / 0\n// Infinity', {
    font: 'mono',
    size: 'm',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrow(6, 735, 510, 855, 510, '')
  makeArrow(6, 1225, 510, 1345, 510, 'test assumptions', { size: 'm' })
  makeText(6, 390, 780, 1100, 'Do not guess language details. Try them in the REPL.', { size: 'xl', scale: 1 })

  title(7, 'Three error types', 'When does the problem appear?')
  const errorCards = [
    ['Syntax', 'grammar broken\nbefore program runs', 170, 380, 'red'],
    ['Runtime', 'valid grammar\nfails while running', 760, 380, 'orange'],
    ['Semantic', 'program runs\nanswer is wrong', 1350, 380, 'violet'],
  ]
  errorCards.forEach(([heading, body, x, y, color], index) => {
    makeBox(7, `error${index}`, x, y, 400, 230, `${heading}\n${body}`, { fill: 'semi', color, size: 'l' })
  })
  makeCode(7, 'errorExamples', 250, 740, 1430, 150, 'function greet(name { }      // syntax\nconsolle.log("hi")          // runtime ReferenceError\nf - 32 * 5 / 9              // semantic if you meant Celsius')
  makeText(7, 560, 660, 760, 'Wrong recipe, faithfully cooked, is still wrong.', { size: 'l', scale: 1 })

  title(8, 'The five-concept map', 'These are roles, not rigid boxes.')
  const concepts = [
    ['data', 'DATA\nraw material', 170, 430],
    ['expr', 'EXPRESSION\nproduces data', 505, 430],
    ['func', 'FUNCTION\nreusable logic', 840, 430],
    ['obj', 'OBJECT\ndata + methods', 1175, 430],
    ['stmt', 'STATEMENT\ndoes work', 1510, 430],
  ]
  concepts.forEach(([key, text, x, y], index) => {
    makeBox(8, key, x, y, 250, 160, text, { fill: index === 1 ? 'semi' : 'none', size: 'm' })
    if (index < concepts.length - 1) makeArrow(8, x + 255, y + 80, x + 330, y + 80, '')
  })
  makeBox(8, 'conceptLine', 410, 745, 1100, 110, 'Ask: what value? what action? what tool?', {
    fill: 'semi',
    size: 'xl',
  })

  title(9, 'Trace one real line slowly', 'Split text, deduplicate with Set, then make an array.')
  makeCode(9, 'shakespeareCode', 210, 310, 760, 120, 'const words = [...new Set(text.split(/\\s+/))];')
  makeBox(9, 'text', 180, 610, 270, 130, 'text\nbig string', { fill: 'none', size: 'l' })
  makeBox(9, 'split', 560, 610, 300, 130, '.split(/\\s+/)\narray with repeats', { fill: 'semi', size: 'm' })
  makeBox(9, 'set', 970, 610, 300, 130, 'new Set(...)\nunique words', { fill: 'semi', size: 'm' })
  makeBox(9, 'array', 1380, 610, 300, 130, '[...set]\narray again', { fill: 'none', size: 'm' })
  makeArrowBetween('text', 'split')
  makeArrowBetween('split', 'set')
  makeArrowBetween('set', 'array')
  makeBox(9, 'warning', 465, 825, 990, 85, 'Set holds unique words, not the original whole text.', {
    fill: 'none',
    size: 'l',
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

