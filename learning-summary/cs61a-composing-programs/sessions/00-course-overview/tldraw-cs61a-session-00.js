import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tldraw, toRichText } from 'tldraw'

const VARIANT = window.CS61A_TLDRAW_VARIANT || 'nav'
const STORAGE_KEY = `cs61a-session-00-tldraw-story-${VARIANT}-v1`
const SESSION_ID = 'cs61a-session-00'
const SLIDE_W = 1920
const SLIDE_H = 1080
const GAP = 260

const SLIDES = [
  ['title', '01. Course Overview'],
  ['chapters', '02. Four Chapters'],
  ['abstraction', '03. Abstraction'],
  ['node', '04. Node.js Setup'],
  ['repl', '05. REPL'],
  ['workflow', '06. Learning Workflow'],
  ['functionCall', '07. Function Call'],
  ['mistakes', '08. Common Mistakes'],
  ['next', '09. Next Session'],
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
    if (subtext) makeText(index, 124, 210, 1350, subtext, { size: 'l', scale: 1.05, color: 'grey' })
  }

  SLIDES.forEach((_, index) => makeSlide(index))

  title(0, 'CS61A Composing Programs', 'Session 00: the course map before the first line of code')
  makeBox(0, 'chef', 150, 370, 210, 210, 'CS', { geo: 'ellipse', fill: 'semi', size: 'xl' })
  makeText(0, 440, 345, 1120, 'Computer science is clear thinking with tools.', {
    size: 'xl',
    scale: 1.65,
  })
  makeText(0, 445, 525, 1180, 'We start like a cooking class: small skills first, full kitchen later.', {
    size: 'xl',
    scale: 1.05,
  })
  makeBox(0, 'titleRule', 1190, 790, 430, 95, 'one idea per frame', { fill: 'none', size: 'l' })
  makeArrow(0, 1040, 725, 1185, 835, '', { size: 'm' })

  title(1, 'The course has four layers', 'Each chapter hides more detail behind better names.')
  const chapters = [
    ['Chapter 1', 'Functions\nname a process', 170, 'light-blue'],
    ['Chapter 2', 'Data\norganize information', 560, 'light-green'],
    ['Chapter 3', 'Interpreters\nread program tickets', 950, 'orange'],
    ['Chapter 4', 'Data Processing\nrun the full service', 1340, 'violet'],
  ]
  chapters.forEach(([heading, body, x, color], index) => {
    makeBox(1, `chapter${index}`, x, 380, 310, 255, `${heading}\n${body}`, { fill: 'semi', color, size: 'l' })
    if (index < chapters.length - 1) makeArrow(1, x + 315, 510, x + 380, 510, '')
  })
  makeBox(1, 'chapterLine', 340, 765, 1240, 110, 'processes -> information -> languages -> systems', {
    fill: 'none',
    size: 'xl',
  })

  title(2, 'Abstraction means: name the useful thing', 'A short name can hide many careful steps.')
  makeBox(2, 'rawSteps', 190, 360, 440, 360, 'boil water\nadd noodles\nwait\ndrain\nmix sauce\nplate', {
    font: 'mono',
    size: 'm',
    align: 'start',
    verticalAlign: 'start',
  })
  makeArrow(2, 660, 535, 850, 535, 'hide detail', { size: 'm' })
  makeBox(2, 'order', 875, 430, 360, 210, 'make noodles', { fill: 'semi', size: 'xl' })
  makeArrow(2, 1260, 535, 1450, 535, 'reuse name', { size: 'm' })
  makeBox(2, 'programName', 1480, 430, 300, 210, 'function', { fill: 'none', size: 'xl' })
  makeText(2, 330, 790, 1250, 'Good programs are built from names that carry meaning.', {
    size: 'xl',
    scale: 1.05,
  })

  title(3, 'Node.js is the practice kitchen', 'It lets JavaScript run outside the browser.')
  makeCode(3, 'nodeVersion', 210, 355, 520, 130, '$ node --version\nv24.14.0')
  makeBox(3, 'replBox', 215, 610, 520, 170, 'node\nopens the REPL', { fill: 'semi', size: 'l' })
  makeBox(3, 'fileBox', 1130, 610, 520, 170, 'node file.js\nruns a script', { fill: 'semi', size: 'l' })
  makeBox(3, 'spoon', 860, 355, 300, 150, 'REPL\ntasting spoon', { fill: 'none', size: 'l' })
  makeBox(3, 'recipe', 1260, 355, 300, 150, 'file\nfull recipe', { fill: 'none', size: 'l' })
  makeArrow(3, 735, 690, 1125, 690, 'same language, two modes', { size: 'm' })

  title(4, 'The REPL loop gives fast feedback', 'Read, evaluate, print, then wait again.')
  const replCards = [
    ['Read', 'Node reads what you typed', 290, 350],
    ['Eval', 'It computes the value', 760, 350],
    ['Print', 'It shows the result', 760, 665],
    ['Loop', 'It waits for more', 290, 665],
  ]
  replCards.forEach(([heading, body, x, y], index) => {
    makeBox(4, `repl${index}`, x, y, 330, 150, `${heading}\n${body}`, { fill: 'semi', size: 'l' })
  })
  makeArrowBetween('repl0', 'repl1')
  makeArrow(4, 925, 505, 925, 660, '')
  makeArrow(4, 760, 740, 625, 740, '')
  makeArrow(4, 455, 665, 455, 505, '')
  makeCode(4, 'replExample', 1250, 390, 420, 250, '> 2 + 3\n5\n\n> \"hi\" + \"!\"\n' + "'hi!'")
  makeText(4, 1225, 710, 520, 'In a file, use console.log when you want visible output.', {
    size: 'l',
    scale: 1,
  })

  title(5, 'The study loop is also a system', 'Read, try, check, then explain it back.')
  const workflow = [
    ['knowledge', 'knowledge/*.md\nread the idea'],
    ['practice', 'practice.js\ntry the move'],
    ['solutions', 'solutions.js\ncheck after trying'],
    ['report', 'learning-report.md\nrecord the lesson'],
  ]
  workflow.forEach(([key, text], index) => {
    const x = 175 + index * 415
    makeBox(5, key, x, 430, 330, 190, text, { fill: index === 1 ? 'semi' : 'none', size: 'l' })
    if (index < workflow.length - 1) makeArrow(5, x + 335, 525, x + 405, 525, '')
  })
  makeBox(5, 'videoArtifacts', 470, 760, 980, 100, 'video artifacts = transcript + visual tldraw deck', {
    fill: 'none',
    size: 'l',
  })
  makeText(5, 450, 300, 980, 'Do not start with answers. Taste the problem first.', { size: 'xl', scale: 1.05 })

  title(6, 'A function name is not a function call', 'Parentheses mean: do the work now.')
  makeCode(6, 'squareDef', 170, 360, 550, 260, 'function square(x) {\n  return x * x;\n}')
  makeBox(6, 'recipeCard', 850, 350, 360, 210, 'square\nrecipe card', { fill: 'none', size: 'xl' })
  makeBox(6, 'cookDish', 850, 665, 360, 210, 'square(7)\ncook now', { fill: 'semi', size: 'xl' })
  makeArrow(6, 725, 490, 845, 450, 'reference', { size: 'm' })
  makeArrow(6, 725, 490, 845, 760, 'call', { size: 'm' })
  makeBox(6, 'result49', 1380, 665, 270, 140, '49', { geo: 'ellipse', fill: 'semi', size: 'xl' })
  makeArrowBetween('cookDish', 'result49', 'returns')

  title(7, 'Mistakes are useful signals', 'A mistake shows how the language is reading your ticket.')
  makeBox(7, 'mistake1', 175, 360, 420, 150, 'clear\nis JavaScript name lookup', { fill: 'none', size: 'l' })
  makeBox(7, 'fix1', 175, 590, 420, 150, '.clear\nis the REPL command', { fill: 'semi', size: 'l' })
  makeArrow(7, 385, 515, 385, 585, 'fix', { size: 'm' })
  makeBox(7, 'mistake2', 740, 360, 420, 150, 'knowledge file\nis not practice file', { fill: 'none', size: 'l' })
  makeBox(7, 'fix2', 740, 590, 420, 150, 'read in knowledge\ncode in practice', { fill: 'semi', size: 'l' })
  makeArrow(7, 950, 515, 950, 585, 'separate', { size: 'm' })
  makeBox(7, 'mistake3', 1305, 360, 420, 150, 'square\nno parentheses', { fill: 'none', size: 'l' })
  makeBox(7, 'fix3', 1305, 590, 420, 150, 'square(7)\nfunction call', { fill: 'semi', size: 'l' })
  makeArrow(7, 1515, 515, 1515, 585, 'call', { size: 'm' })
  makeText(7, 260, 835, 1340, 'The point is not to avoid mistakes. The point is to learn from them quickly.', {
    size: 'xl',
    scale: 1,
  })

  title(8, 'Next: Getting Started', 'We begin with the smallest mental map for code.')
  const nextItems = [
    ['data', 'DATA\nraw ingredient', 170, 430],
    ['expr', 'EXPRESSION\nproduces value', 515, 430],
    ['func', 'FUNCTION\nreusable logic', 860, 430],
    ['obj', 'OBJECT\ndata + tools', 1205, 430],
    ['stmt', 'STATEMENT\ncomputer action', 1550, 430],
  ]
  nextItems.forEach(([key, text, x, y], index) => {
    makeBox(8, key, x, y, 260, 160, text, { fill: index === 1 ? 'semi' : 'none', size: 'm' })
    if (index < nextItems.length - 1) makeArrow(8, x + 265, y + 80, x + 340, y + 80, '')
  })
  makeBox(8, 'finalLine', 420, 750, 1080, 110, 'Clear tickets make clear dishes.', { fill: 'semi', size: 'xl' })

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

