(function () {
  const BOARD = { width: 2400, height: 1650 };

  const palette = {
    blue: { stroke: "#4a9eed", fill: "#dbe4ff", title: "#2563eb" },
    violet: { stroke: "#8b5cf6", fill: "#e5dbff", title: "#6d28d9" },
    yellow: { stroke: "#f59e0b", fill: "#fff3bf", title: "#b45309" },
    orange: { stroke: "#f59e0b", fill: "#ffd8a8", title: "#c2410c" },
    green: { stroke: "#22c55e", fill: "#d3f9d8", title: "#15803d" },
    cyan: { stroke: "#06b6d4", fill: "#a5d8ff", title: "#0e7490" },
    lime: { stroke: "#84cc16", fill: "#d3f9d8", title: "#4d7c0f" },
    red: { stroke: "#ef4444", fill: "#ffc9c9", title: "#b91c1c" },
    grey: { stroke: "#868e96", fill: "#f8fafc", title: "#424750" },
    ink: { stroke: "#171717", fill: "#ffffff", title: "#171717" },
  };

  const clusters = [
    { id: "c1", title: "Agency vs Harness", x: 80, y: 70, w: 520, h: 330, color: "blue" },
    { id: "c2", title: "Harness Formula", x: 690, y: 70, w: 560, h: 360, color: "violet" },
    { id: "c3", title: "Agent Evolution", x: 1370, y: 70, w: 940, h: 360, color: "yellow" },
    { id: "c4", title: "The Agent Loop", x: 80, y: 530, w: 680, h: 500, color: "orange" },
    { id: "c5", title: "Claude Code Architecture", x: 1510, y: 500, w: 800, h: 520, color: "green" },
    { id: "c7", title: "Repo & Quick Start", x: 80, y: 1160, w: 620, h: 370, color: "cyan" },
    { id: "c8", title: "Beyond Code -- Every Domain", x: 820, y: 1160, w: 570, h: 370, color: "lime" },
    { id: "c6", title: "Learning Path", x: 1510, y: 1120, w: 880, h: 430, color: "red" },
  ];

  const boxes = [
    { x: 130, y: 150, w: 420, h: 72, color: "blue", text: "Agency\nperceive -> reason -> act\n(from training)", font: 24 },
    { x: 130, y: 245, w: 420, h: 84, color: "blue", fill: "#e8f2ff", text: "Harness\ntools + knowledge + observation\naction + permissions", font: 22 },
    { x: 130, y: 350, w: 420, h: 34, color: "blue", fill: "#ffffff", text: "The model decides. The harness executes.", font: 20 },

    { x: 730, y: 145, w: 480, h: 88, color: "violet", text: "Harness = Tools + Knowledge\n+ Observation + Action\n+ Permissions", font: 23 },
    { x: 730, y: 260, w: 480, h: 135, color: "violet", fill: "#ffffff", kind: "code", text: "Tools:       file I/O, shell, network, DB\nKnowledge:   docs, APIs, style guides\nObservation: diffs, logs, browser state\nAction:      CLI, APIs, UI\nPermissions: sandbox, approval, trust", font: 20 },

    { x: 1395, y: 155, w: 150, h: 82, color: "yellow", text: "2013\nDeepMind DQN\nAtari", font: 20 },
    { x: 1565, y: 155, w: 150, h: 82, color: "yellow", text: "2019\nOpenAI Five\nDota 2", font: 20 },
    { x: 1735, y: 155, w: 150, h: 82, color: "yellow", text: "2019\nAlphaStar\nStarCraft II", font: 19 },
    { x: 1905, y: 155, w: 150, h: 82, color: "yellow", text: "2019\nJueyu\nHonor of Kings", font: 18 },
    { x: 2075, y: 155, w: 205, h: 82, color: "yellow", text: "2024-25\nLLM Agents\nSoftware Eng", font: 20 },
    { x: 1430, y: 285, w: 820, h: 95, color: "yellow", fill: "#ffffff", text: "Agency -- perceive, reason, act -- is trained, not coded.\nBut every agent needed an environment to operate in.", font: 25 },

    { x: 115, y: 610, w: 300, h: 370, color: "orange", kind: "code", text: "User -> messages[] -> LLM\n              |\n stop_reason == tool_use?\n       /              \\\n     yes              no\n      |               |\n execute tools    return text\n append results\n loop back -> messages[]", font: 20 },
    { x: 445, y: 610, w: 280, h: 370, color: "orange", fill: "#ffffff", kind: "code", text: "async function agentLoop(messages) {\n  while (true) {\n    const response = await client\n      .messages.create({...});\n\n    messages.push(response.content);\n\n    if (response.stop_reason !==\n        \"tool_use\") return;\n\n    const results = await runTools(response);\n    messages.push({ role: \"user\",\n      content: results });\n  }\n}", font: 17 },

    { x: 890, y: 630, w: 520, h: 160, color: "ink", kind: "hub", html: "learn-claude-code-typescript<small>The model IS the agent.<br>Your job is to build the harness.</small>" },

    { x: 1545, y: 585, w: 730, h: 305, color: "green", kind: "code", text: "Claude Code = one agent loop\n + tools: bash, read, write, edit, glob, grep\n + on-demand skill loading\n + context compression\n + subagent spawning\n + task system + dependency graph\n + team coordination + async mailboxes\n + worktree isolation for parallel execution\n + permission governance", font: 24 },
    { x: 1545, y: 925, w: 730, h: 70, color: "green", fill: "#ffffff", text: "Trust the model. Focus engineering on the harness.", font: 28 },

    { x: 115, y: 1245, w: 270, h: 240, color: "cyan", kind: "code", text: "learn-claude-code-typescript/\n|- agents/  s01-s12 + s_full\n|- docs/en/ mental models\n|- skills/  SKILL.md files\n`- web/     Next.js platform", font: 20 },
    { x: 415, y: 1245, w: 250, h: 240, color: "cyan", fill: "#ffffff", kind: "code", text: "git clone <repo>\ncd learn-...-typescript\nnpm install\ncp .env.example .env\n\nnpm run s01\nnpm run s:full", font: 20 },

    { x: 850, y: 1245, w: 240, h: 60, color: "lime", text: "Estate\nsensors + maintenance + tenant comms", font: 18 },
    { x: 1120, y: 1245, w: 240, h: 60, color: "lime", text: "Agriculture\nsoil/weather + irrigation + crops", font: 18 },
    { x: 850, y: 1320, w: 240, h: 60, color: "lime", text: "Hotel\nbooking + guest comms + facility APIs", font: 18 },
    { x: 1120, y: 1320, w: 240, h: 60, color: "lime", text: "Medical\nliterature + lab instruments + protocols", font: 18 },
    { x: 850, y: 1395, w: 240, h: 60, color: "lime", text: "Manufacturing\nline sensors + quality + logistics", font: 18 },
    { x: 1120, y: 1395, w: 240, h: 60, color: "lime", text: "Education\ncurriculum + progress + assessments", font: 18 },
    { x: 850, y: 1475, w: 510, h: 38, color: "lime", fill: "#ffffff", text: "After this course, build agents in YOUR domain.", font: 21 },

    { x: 1540, y: 1270, w: 180, h: 42, color: "red", text: "s01 Agent Loop [1]", font: 18 },
    { x: 1540, y: 1330, w: 180, h: 42, color: "red", text: "s02 Tool Use [4]", font: 18 },
    { x: 1750, y: 1270, w: 180, h: 42, color: "red", text: "s03 TodoWrite [5]", font: 18 },
    { x: 1750, y: 1330, w: 180, h: 42, color: "red", text: "s04 Subagents [5]", font: 18 },
    { x: 1750, y: 1390, w: 180, h: 42, color: "red", text: "s05 Skills [5]", font: 18 },
    { x: 1750, y: 1450, w: 180, h: 42, color: "red", text: "s06 Compact [5]", font: 18 },
    { x: 1960, y: 1270, w: 180, h: 42, color: "red", text: "s07 Tasks [8]", font: 18 },
    { x: 1960, y: 1330, w: 180, h: 42, color: "red", text: "s08 Background [6]", font: 18 },
    { x: 2170, y: 1270, w: 180, h: 42, color: "red", text: "s09 Teams [9]", font: 18 },
    { x: 2170, y: 1330, w: 180, h: 42, color: "red", text: "s10 Protocols [12]", font: 17 },
    { x: 2170, y: 1390, w: 180, h: 42, color: "red", text: "s11 Autonomous [14]", font: 17 },
    { x: 2170, y: 1450, w: 180, h: 42, color: "red", text: "s12 Worktree [16]", font: 17 },
    { x: 1540, y: 1505, w: 810, h: 30, color: "red", fill: "#ffffff", text: "Capstone: s_full.ts -- npm run s:full", font: 19 },
  ];

  const phaseLabels = [
    { x: 1540, y: 1205, text: "Phase 1\nTHE LOOP", font: 22 },
    { x: 1750, y: 1205, text: "Phase 2\nPLANNING + KNOWLEDGE", font: 19 },
    { x: 1960, y: 1205, text: "Phase 3\nPERSISTENCE", font: 22 },
    { x: 2170, y: 1205, text: "Phase 4\nTEAMS", font: 22 },
  ];

  const arrows = [
    ["grey", 890, 710, 600, 235],
    ["grey", 1150, 630, 970, 430],
    ["grey", 1410, 660, 1370, 250],
    ["grey", 890, 710, 760, 780],
    ["grey", 1410, 710, 1510, 760],
    ["grey", 1410, 790, 1510, 1335],
    ["grey", 1150, 790, 390, 1160],
    ["grey", 1150, 790, 1105, 1160],
    ["blue", 600, 330, 690, 270, "formula", 632, 292],
    ["orange", 420, 1030, 390, 1160, "start here", 410, 1100],
    ["green", 1840, 430, 1910, 500, "environment", 1864, 463],
    ["yellow", 1545, 196, 1565, 196],
    ["yellow", 1715, 196, 1735, 196],
    ["yellow", 1885, 196, 1905, 196],
    ["yellow", 2055, 196, 2075, 196],
    ["red", 1630, 1312, 1630, 1330],
    ["red", 1840, 1312, 1840, 1330],
    ["red", 1840, 1372, 1840, 1390],
    ["red", 1840, 1432, 1840, 1450],
    ["red", 2050, 1312, 2050, 1330],
    ["red", 2260, 1312, 2260, 1330],
    ["red", 2260, 1372, 2260, 1390],
    ["red", 2260, 1432, 2260, 1450],
  ];

  const revealViews = {
    overview: { scale: 0.39, x: 172, y: 38 },
    topLeft: { scale: 0.92, x: -35, y: -40 },
    evolution: { scale: 1.05, x: -1335, y: -45 },
    loopHub: { scale: 0.88, x: -40, y: -440 },
    claude: { scale: 0.92, x: -1370, y: -430 },
    repoDomain: { scale: 0.88, x: -40, y: -1035 },
    learning: { scale: 0.9, x: -1390, y: -1035 },
  };

  function div(className, parent) {
    const node = document.createElement("div");
    node.className = className;
    parent.appendChild(node);
    return node;
  }

  function setRect(node, item) {
    Object.assign(node.style, {
      left: item.x + "px",
      top: item.y + "px",
      width: item.w + "px",
      height: item.h + "px",
    });
  }

  function renderArrows(board) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "preface-board__arrows");
    svg.setAttribute("viewBox", `0 0 ${BOARD.width} ${BOARD.height}`);

    const defs = document.createElementNS(svg.namespaceURI, "defs");
    Object.entries(palette).forEach(([name, color]) => {
      const marker = document.createElementNS(svg.namespaceURI, "marker");
      marker.setAttribute("id", "arrow-" + name);
      marker.setAttribute("markerWidth", "12");
      marker.setAttribute("markerHeight", "10");
      marker.setAttribute("refX", "10");
      marker.setAttribute("refY", "5");
      marker.setAttribute("orient", "auto");
      const path = document.createElementNS(svg.namespaceURI, "path");
      path.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
      path.setAttribute("fill", color.stroke);
      marker.appendChild(path);
      defs.appendChild(marker);
    });
    svg.appendChild(defs);

    arrows.forEach(([colorName, x1, y1, x2, y2, label, labelX, labelY]) => {
      const color = palette[colorName] || palette.ink;
      const path = document.createElementNS(svg.namespaceURI, "path");
      path.setAttribute("d", `M ${x1} ${y1} L ${x2} ${y2}`);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", color.stroke);
      path.setAttribute("stroke-width", colorName === "grey" ? "4" : "5");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("marker-end", `url(#arrow-${colorName})`);
      path.setAttribute("opacity", colorName === "grey" ? "0.74" : "0.9");
      svg.appendChild(path);

      if (label) {
        const text = document.createElementNS(svg.namespaceURI, "text");
        text.setAttribute("x", labelX);
        text.setAttribute("y", labelY);
        text.setAttribute("class", "arrow-label");
        text.setAttribute("fill", color.title || color.stroke);
        text.textContent = label;
        svg.appendChild(text);
      }
    });

    board.appendChild(svg);
  }

  function renderPrefaceBoard(target, options = {}) {
    target.textContent = "";
    const board = div("preface-board", target);
    renderArrows(board);

    clusters.forEach((cluster) => {
      const color = palette[cluster.color];
      const frame = div("preface-cluster", board);
      setRect(frame, cluster);
      frame.style.setProperty("--cluster-stroke", color.stroke);
      frame.style.setProperty("--cluster-fill", color.fill);

      const title = div("preface-title", board);
      title.textContent = cluster.title;
      title.style.left = cluster.x + 35 + "px";
      title.style.top = cluster.y + 25 + "px";
      title.style.setProperty("--title-color", color.title);
    });

    phaseLabels.forEach((item) => {
      const label = div("preface-title", board);
      label.textContent = item.text;
      label.style.left = item.x + "px";
      label.style.top = item.y + "px";
      label.style.fontSize = item.font + "px";
      label.style.setProperty("--title-color", palette.red.title);
    });

    boxes.forEach((box) => {
      const color = palette[box.color] || palette.ink;
      const node = div("preface-box", board);
      if (box.kind === "code") node.classList.add("is-code");
      if (box.kind === "hub") node.classList.add("is-hub");
      setRect(node, box);
      node.style.setProperty("--box-stroke", color.stroke);
      node.style.setProperty("--box-fill", box.fill || color.fill);
      if (box.font) node.style.setProperty("--box-font", box.font + "px");
      if (box.html) node.innerHTML = box.html;
      else node.textContent = box.text;
    });

    if (options.view) {
      const view = revealViews[options.view] || revealViews.overview;
      target.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.scale})`;
    }

    if (options.fitWidth) {
      const applyFit = () => {
        const available = Math.max(360, window.innerWidth - 48);
        const scale = Math.min(0.66, Math.max(0.42, available / BOARD.width));
        board.style.transform = `scale(${scale})`;
        target.style.width = BOARD.width * scale + "px";
        target.style.height = BOARD.height * scale + "px";
      };
      applyFit();
      window.addEventListener("resize", applyFit, { passive: true });
    }

    return board;
  }

  window.renderPrefaceBoard = renderPrefaceBoard;
})();
