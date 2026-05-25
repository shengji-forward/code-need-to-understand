# CS61A 1.1 — Concept Map: Data, Expression, Function, Object, Statement

**Not strict nesting** — these are **roles** that connect. Use the flowchart for general thinking; use the “one line” peel for reading a single statement.

---

## 1. Role map (main diagram)

```mermaid
flowchart TB
    subgraph roles["Five roles — how they connect"]
        DATA["DATA<br/>The raw materials<br/>e.g. 42, true, 'hello', [1,2,3]"]
        EXPR["EXPRESSION<br/>Code that evaluates TO a value<br/>e.g. 2+2, Math.sqrt(9), new Set(arr)"]
        FUNC["FUNCTION<br/>Reusable logic<br/>A call like f(x) IS an expression"]
        OBJ["OBJECT<br/>A value that bundles data + methods<br/>e.g. string, Set, Math"]
        STMT["STATEMENT<br/>A command — does work<br/>Often uses expressions inside"]
    end

    EXPR -->|"produces"| DATA
    STMT -->|"contains / uses"| EXPR
    FUNC -->|"when you call it"| EXPR
    OBJ -->|"is a kind of"| DATA
    OBJ -->|"methods are"| FUNC

    note1["Statement ≠ always 'has a useful result'<br/>Expression → always has a value (or undefined)"]
    STMT -.-> note1
```

**Arrows in plain English:**

| From | To | Meaning |
|------|-----|---------|
| Expression | Data | Running the expression **gives you** a value |
| Statement | Expression | Statements **use** expressions (especially on the right of `=`) |
| Function call | Expression | `Math.sqrt(9)` is an expression whose value is `3` |
| Object | Data | An object **is** a value sitting in memory |
| Object | Function | `.split`, `.has`, `.sqrt` are **functions attached** to that object (methods) |

---

## 2. Reading one line inside → out (optional lens)

Good for: `const x = Math.sqrt(9);` — **not** “every program layer must exist.”

```mermaid
flowchart LR
    D1["9<br/><i>data</i>"]
    E1["Math.sqrt(9)<br/><i>expression</i>"]
    F1["Math.sqrt<br/><i>function (method)</i>"]
    O1["Math<br/><i>object</i>"]
    S1["const x = ...<br/><i>statement</i>"]

    D1 --> E1 --> F1 --> O1 --> S1
```

Peel order: **data → expression → function call → object that owns the method → whole line is a statement.**

---

## 3. Shakespeare line — all roles on one statement

```javascript
const words = [...new Set(text.split(/\s+/))];
```

```mermaid
flowchart TB
    ST["STATEMENT: const words = ...<br/>Action: store result in words"]

    ST --> E3["EXPRESSION: [...set]<br/>→ Array of unique words"]
    E3 --> E2["EXPRESSION: new Set(split)<br/>→ Set object"]
    E2 --> E1["EXPRESSION: text.split(/\\s+/)<br/>→ Array with duplicates"]
    E1 --> D0["DATA: text<br/>String — whole play text"]

    E2 --> SET["OBJECT: Set<br/>Data: unique word strings<br/>Ops: .has(), .size, .add()"]
    E1 --> METH["METHOD: .split on string OBJECT<br/>Function tied to text"]

    SET --> D2["DATA: unique words inside Set"]
    E3 --> D3["DATA: final array in words"]
```

**Set does NOT hold `text`.** It holds **unique word strings** after `split` already chopped the string.

---

## 4. Quick reference card

| Concept | One sentence | Test question |
|---------|--------------|---------------|
| **Data** | Stuff the program works with | What value ended up in memory? |
| **Expression** | Asks “what is this?” → gets a value | Would the REPL print a result? |
| **Function** | Named reusable computation | Can I call it again with different inputs? |
| **Object** | Data + tools bundled together | What methods does this value have? |
| **Statement** | Tells the computer to **do** something | Is it mainly an action, not a value to reuse? |

---

## 5. Nested-box diagram vs this map

| Teaching nested boxes | This role map |
|----------------------|---------------|
| Looks like Object ⊃ Function ⊃ Expression ⊃ Data always | **Relationships** — not always all layers |
| Easy to read one line | Also works for lines with no object (`const n = 5`) |
| Can imply “text lives inside Set” | Set holds **words from split**, not the whole string |

---

## 6. Agent loop tie-in (optional)

From `learn-claude-code-typescript/agents/s01_agent_loop.ts`:

| Piece | Role |
|-------|------|
| `query` (user string) | **Data** |
| `client.messages.create(...)` | **Expression-like** — input → model output value |
| `history.push({ role, content })` | **Statement** — record turn |
| `history` array | **Object/data** — conversation context (not Set-deduped queries) |

KV / prompt cache = inference optimization, **not** the Shakespeare `Set` dedup pattern.
