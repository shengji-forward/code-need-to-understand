import { assertEqual, assertThrows } from "../../shared/helpers.js";

// ---- Provided: Parser class (not an exercise) ----
const KEYWORDS = new Set(["let", "function", "if", "else", "return", "true", "false", "null"]);
const PUNCTUATION = new Set(["(", ")", "{", "}", ";", ","]);
class Parser {
  constructor(tokens) { this.tokens = tokens; this.pos = 0; }
  peek() { return this.pos < this.tokens.length ? this.tokens[this.pos] : null; }
  advance() { return this.tokens[this.pos++]; }
  match(type, value = null) {
    const t = this.peek();
    if (t && t.type === type && (value === null || t.value === value)) { this.advance(); return true; }
    return false;
  }
  expect(type, value = null) {
    const t = this.peek();
    if (!t) throw new SyntaxError(`unexpected end of input, expected ${value || type}`);
    if (t.type !== type || (value !== null && t.value !== value))
      throw new SyntaxError(`expected ${value || type}, got '${t.value}'`);
    return this.advance();
  }
  check(type, value = null) {
    const t = this.peek();
    return t && t.type === type && (value === null || t.value === value);
  }
  parse() {
    const body = [];
    while (this.peek() !== null) body.push(this.parseStatement());
    return { type: "Program", body };
  }
  parseStatement() {
    if (this.check("keyword", "let")) return this.parseLetDeclaration();
    if (this.check("keyword", "function")) return this.parseFunctionDeclaration();
    if (this.check("keyword", "if")) return this.parseIfStatement();
    if (this.check("keyword", "return")) return this.parseReturnStatement();
    if (this.check("punctuation", "{")) return this.parseBlock();
    const expr = this.parseExpression();
    this.expect("punctuation", ";");
    return { type: "ExpressionStatement", expression: expr };
  }
  parseLetDeclaration() {
    this.expect("keyword", "let");
    const name = this.expect("identifier").value;
    let init = null;
    if (this.match("operator", "=")) init = this.parseExpression();
    this.expect("punctuation", ";");
    return { type: "LetDeclaration", name, init };
  }
  parseFunctionDeclaration() {
    this.expect("keyword", "function");
    const name = this.expect("identifier").value;
    this.expect("punctuation", "(");
    const params = this.parseParamList();
    this.expect("punctuation", ")");
    const body = this.parseBlock();
    return { type: "FunctionDeclaration", name, params, body };
  }
  parseIfStatement() {
    this.expect("keyword", "if");
    this.expect("punctuation", "(");
    const test = this.parseExpression();
    this.expect("punctuation", ")");
    const consequent = this.parseBlock();
    let alternate = null;
    if (this.match("keyword", "else")) {
      alternate = this.check("keyword", "if") ? this.parseIfStatement() : this.parseBlock();
    }
    return { type: "IfStatement", test, consequent, alternate };
  }
  parseReturnStatement() {
    this.expect("keyword", "return");
    let argument = null;
    if (!this.check("punctuation", ";")) argument = this.parseExpression();
    this.expect("punctuation", ";");
    return { type: "ReturnStatement", argument };
  }
  parseBlock() {
    this.expect("punctuation", "{");
    const body = [];
    while (!this.check("punctuation", "}")) body.push(this.parseStatement());
    this.expect("punctuation", "}");
    return { type: "BlockStatement", body };
  }
  parseParamList() {
    const params = [];
    if (!this.check("punctuation", ")")) {
      params.push(this.expect("identifier").value);
      while (this.match("punctuation", ",")) params.push(this.expect("identifier").value);
    }
    return params;
  }
  parseExpression() { return this.parseAssignment(); }
  parseAssignment() {
    const expr = this.parseOr();
    if (this.match("operator", "=")) {
      if (expr.type !== "Identifier") throw new SyntaxError("invalid assignment target");
      return { type: "AssignmentExpression", name: expr.name, value: this.parseAssignment() };
    }
    return expr;
  }
  parseOr() {
    let left = this.parseAnd();
    while (this.match("operator", "||"))
      left = { type: "LogicalExpression", operator: "||", left, right: this.parseAnd() };
    return left;
  }
  parseAnd() {
    let left = this.parseEquality();
    while (this.match("operator", "&&"))
      left = { type: "LogicalExpression", operator: "&&", left, right: this.parseEquality() };
    return left;
  }
  parseEquality() {
    let left = this.parseComparison();
    while (this.check("operator", "===") || this.check("operator", "!==")) {
      const op = this.advance().value;
      left = { type: "BinaryExpression", operator: op, left, right: this.parseComparison() };
    }
    return left;
  }
  parseComparison() {
    let left = this.parseAdditive();
    while (["<", "<=", ">", ">="].some(op => this.check("operator", op))) {
      const op = this.advance().value;
      left = { type: "BinaryExpression", operator: op, left, right: this.parseAdditive() };
    }
    return left;
  }
  parseAdditive() {
    let left = this.parseMultiplicative();
    while (this.check("operator", "+") || this.check("operator", "-")) {
      const op = this.advance().value;
      left = { type: "BinaryExpression", operator: op, left, right: this.parseMultiplicative() };
    }
    return left;
  }
  parseMultiplicative() {
    let left = this.parseUnary();
    while (["*", "/", "%"].some(op => this.check("operator", op))) {
      const op = this.advance().value;
      left = { type: "BinaryExpression", operator: op, left, right: this.parseUnary() };
    }
    return left;
  }
  parseUnary() {
    if (this.check("operator", "-") || this.check("operator", "!")) {
      const op = this.advance().value;
      return { type: "UnaryExpression", operator: op, operand: this.parseUnary() };
    }
    return this.parseCall();
  }
  parseCall() {
    let expr = this.parsePrimary();
    while (this.check("punctuation", "(")) {
      this.advance();
      const args = [];
      if (!this.check("punctuation", ")")) {
        args.push(this.parseExpression());
        while (this.match("punctuation", ",")) args.push(this.parseExpression());
      }
      this.expect("punctuation", ")");
      expr = { type: "CallExpression", callee: expr, arguments: args };
    }
    return expr;
  }
  parsePrimary() {
    if (this.check("number")) return { type: "Literal", value: this.advance().value };
    if (this.check("string")) return { type: "Literal", value: this.advance().value };
    if (this.check("keyword", "true")) { this.advance(); return { type: "Literal", value: true }; }
    if (this.check("keyword", "false")) { this.advance(); return { type: "Literal", value: false }; }
    if (this.check("keyword", "null")) { this.advance(); return { type: "Literal", value: null }; }
    if (this.check("identifier")) {
      const name = this.advance().value;
      if (this.check("operator", "=>")) {
        this.advance();
        return { type: "ArrowFunction", params: [name], body: this.parseArrowBody() };
      }
      return { type: "Identifier", name };
    }
    if (this.match("punctuation", "(")) {
      const saved = this.pos;
      try {
        const params = this.parseParamList();
        if (this.match("punctuation", ")") && this.match("operator", "=>"))
          return { type: "ArrowFunction", params, body: this.parseArrowBody() };
      } catch (_) {}
      this.pos = saved;
      const expr = this.parseExpression();
      this.expect("punctuation", ")");
      return expr;
    }
    const t = this.peek();
    throw new SyntaxError(`unsupported syntax: unexpected '${t ? t.value : "end of input"}'`);
  }
  parseArrowBody() {
    if (this.check("punctuation", "{")) return this.parseBlock();
    const expr = this.parseExpression();
    return { type: "BlockStatement", body: [{ type: "ReturnStatement", argument: expr }] };
  }
}

// Exercise 1: Frame class
// Implement Frame with define(name, value), lookup(name) walking parent chain, and assign(name, value) updating nearest frame.
class Frame {
  constructor(parent = null) {
    this.bindings = Object.create(null);
    this.parent = parent;
  }
  define(name, value) {
    this.bindings[name] = value;
  }
  lookup(name) {
    if (name in this.bindings) return this.bindings[name];
    if (this.parent !== null) return this.parent.lookup(name);
    throw new Error(`unbound name: '${name}'`);
  }
  assign(name, value) {
    if (name in this.bindings) { this.bindings[name] = value; return value; }
    if (this.parent !== null) return this.parent.assign(name, value);
    throw new Error(`assignment to unbound name: '${name}'`);
  }
}
const g1 = new Frame();
g1.define("x", 10);
g1.define("y", 20);
assertEqual("Exercise 1: lookup", g1.lookup("x"), 10);
const child1 = new Frame(g1);
child1.define("x", 99);
assertEqual("Exercise 1: shadow", child1.lookup("x"), 99);
assertEqual("Exercise 1: parent lookup", child1.lookup("y"), 20);
child1.assign("x", 100);
assertEqual("Exercise 1: assign local", child1.lookup("x"), 100);
child1.assign("y", 50);
assertEqual("Exercise 1: assign parent", g1.lookup("y"), 50);
await assertThrows("Exercise 1: unbound", () => g1.lookup("z"), "unbound name");

// Exercise 2: Tokenizer basics
// Split source into an array of token objects with { type, value }.
// Types: "number", "string", "identifier", "keyword", "operator", "punctuation".
function tokenize(source) {
  const tokens = [];
  let pos = 0;
  while (pos < source.length) {
    if (/\s/.test(source[pos])) { pos++; continue; }
    if (source[pos] === "/" && source[pos + 1] === "/") {
      while (pos < source.length && source[pos] !== "\n") pos++;
      continue;
    }
    if (/[0-9]/.test(source[pos])) {
      let start = pos;
      while (pos < source.length && /[0-9]/.test(source[pos])) pos++;
      if (source[pos] === "." && /[0-9]/.test(source[pos + 1])) {
        pos++;
        while (pos < source.length && /[0-9]/.test(source[pos])) pos++;
      }
      tokens.push({ type: "number", value: parseFloat(source.slice(start, pos)) });
      continue;
    }
    if (source[pos] === '"') {
      pos++;
      let value = "";
      while (pos < source.length && source[pos] !== '"') {
        if (source[pos] === "\\") {
          pos++;
          if (source[pos] === "n") value += "\n";
          else if (source[pos] === "t") value += "\t";
          else if (source[pos] === "\\") value += "\\";
          else if (source[pos] === '"') value += '"';
          else value += source[pos];
        } else {
          value += source[pos];
        }
        pos++;
      }
      pos++;
      tokens.push({ type: "string", value });
      continue;
    }
    if (/[a-zA-Z_]/.test(source[pos])) {
      let start = pos;
      while (pos < source.length && /[a-zA-Z0-9_]/.test(source[pos])) pos++;
      const word = source.slice(start, pos);
      tokens.push({ type: KEYWORDS.has(word) ? "keyword" : "identifier", value: word });
      continue;
    }
    if (source[pos] === "=" && source[pos + 1] === "=" && source[pos + 2] === "=") {
      tokens.push({ type: "operator", value: "===" }); pos += 3; continue;
    }
    if (source[pos] === "!" && source[pos + 1] === "=" && source[pos + 2] === "=") {
      tokens.push({ type: "operator", value: "!==" }); pos += 3; continue;
    }
    if (source[pos] === "=" && source[pos + 1] === "=") {
      tokens.push({ type: "operator", value: "==" }); pos += 2; continue;
    }
    if (source[pos] === "!" && source[pos + 1] === "=") {
      tokens.push({ type: "operator", value: "!=" }); pos += 2; continue;
    }
    if (source[pos] === "<" && source[pos + 1] === "=") {
      tokens.push({ type: "operator", value: "<=" }); pos += 2; continue;
    }
    if (source[pos] === ">" && source[pos + 1] === "=") {
      tokens.push({ type: "operator", value: ">=" }); pos += 2; continue;
    }
    if (source[pos] === "&" && source[pos + 1] === "&") {
      tokens.push({ type: "operator", value: "&&" }); pos += 2; continue;
    }
    if (source[pos] === "|" && source[pos + 1] === "|") {
      tokens.push({ type: "operator", value: "||" }); pos += 2; continue;
    }
    if (source[pos] === "=" && source[pos + 1] === ">") {
      tokens.push({ type: "operator", value: "=>" }); pos += 2; continue;
    }
    if (["+", "-", "*", "/", "%", "=", "<", ">", "!"].includes(source[pos])) {
      tokens.push({ type: "operator", value: source[pos] }); pos++; continue;
    }
    if (PUNCTUATION.has(source[pos])) {
      tokens.push({ type: "punctuation", value: source[pos] }); pos++; continue;
    }
    throw new SyntaxError(`unsupported character: '${source[pos]}'`);
  }
  return tokens;
}
assertEqual("Exercise 2: let statement", tokenize("let x = 10 + 20;"), [
  { type: "keyword", value: "let" }, { type: "identifier", value: "x" },
  { type: "operator", value: "=" }, { type: "number", value: 10 },
  { type: "operator", value: "+" }, { type: "number", value: 20 },
  { type: "punctuation", value: ";" }
]);
assertEqual("Exercise 2: function decl", tokenize("function f(n) { return n; }"), [
  { type: "keyword", value: "function" }, { type: "identifier", value: "f" },
  { type: "punctuation", value: "(" }, { type: "identifier", value: "n" },
  { type: "punctuation", value: ")" }, { type: "punctuation", value: "{" },
  { type: "keyword", value: "return" }, { type: "identifier", value: "n" },
  { type: "punctuation", value: ";" }, { type: "punctuation", value: "}" }
]);
assertEqual("Exercise 2: number only", tokenize("42"), [{ type: "number", value: 42 }]);

// Exercise 3: Tokenizer edge cases
// Handle multi-character operators (===, !==, &&, ||, =>), double-quoted strings, and // comments.
// Throw SyntaxError for unsupported characters.
assertEqual("Exercise 3: multi-char ops", tokenize("a === b && c !== d;"), [
  { type: "identifier", value: "a" }, { type: "operator", value: "===" },
  { type: "identifier", value: "b" }, { type: "operator", value: "&&" },
  { type: "identifier", value: "c" }, { type: "operator", value: "!==" },
  { type: "identifier", value: "d" }, { type: "punctuation", value: ";" }
]);
assertEqual("Exercise 3: string", tokenize('"hello"'), [{ type: "string", value: "hello" }]);
assertEqual("Exercise 3: comment", tokenize("10 // ignore\n+ 5;"), [
  { type: "number", value: 10 }, { type: "operator", value: "+" },
  { type: "number", value: 5 }, { type: "punctuation", value: ";" }
]);
await assertThrows("Exercise 3: bad char", () => tokenize("@"), "unsupported character");

// Exercise 4: Closure and ReturnSignal
// Closure stores params, body, and env. ReturnSignal stores value.
class Closure {
  constructor(params, body, env) {
    this.params = params;
    this.body = body;
    this.env = env;
  }
}
class ReturnSignal {
  constructor(value) {
    this.value = value;
  }
}
const env4 = new Frame();
const body4 = { type: "BlockStatement", body: [] };
const closure4 = new Closure(["x", "y"], body4, env4);
assertEqual("Exercise 4: closure params", closure4.params, ["x", "y"]);
assertEqual("Exercise 4: closure body", closure4.body, body4);
const signal4 = new ReturnSignal(42);
assertEqual("Exercise 4: return signal", signal4.value, 42);

// Exercise 5: Operator helpers
// applyOperator handles +, -, *, /, %, ===, !==, <, <=, >, >=.
// applyUnaryOperator handles -, !.
// Throw Error for unsupported operators.
function applyOperator(op, left, right) {
  switch (op) {
    case "+": return left + right;
    case "-": return left - right;
    case "*": return left * right;
    case "/": return left / right;
    case "%": return left % right;
    case "===": return left === right;
    case "!==": return left !== right;
    case "<": return left < right;
    case "<=": return left <= right;
    case ">": return left > right;
    case ">=": return left >= right;
    default: throw new Error(`unsupported operator: '${op}'`);
  }
}
function applyUnaryOperator(op, operand) {
  switch (op) {
    case "-": return -operand;
    case "!": return !operand;
    default: throw new Error(`unsupported unary operator: '${op}'`);
  }
}
assertEqual("Exercise 5: add", applyOperator("+", 3, 4), 7);
assertEqual("Exercise 5: mul", applyOperator("*", 3, 4), 12);
assertEqual("Exercise 5: strict equal", applyOperator("===", 3, 3), true);
assertEqual("Exercise 5: less than", applyOperator("<", 3, 5), true);
await assertThrows("Exercise 5: unsupported op", () => applyOperator("^", 1, 2), "unsupported operator");
assertEqual("Exercise 5: negate", applyUnaryOperator("-", 5), -5);
assertEqual("Exercise 5: not", applyUnaryOperator("!", true), false);

// Exercise 6: Evaluator basics
// evaluate(node, env) dispatches on node.type.
// Handle: Program, ExpressionStatement, Literal, Identifier, BinaryExpression,
// UnaryExpression, LogicalExpression, LetDeclaration, AssignmentExpression.
function evaluate(node, env) {
  switch (node.type) {
    case "Program": {
      let result;
      for (const stmt of node.body) result = evaluate(stmt, env);
      return result;
    }
    case "ExpressionStatement":
      return evaluate(node.expression, env);
    case "Literal":
      return node.value;
    case "Identifier":
      return env.lookup(node.name);
    case "BinaryExpression":
      return applyOperator(node.operator, evaluate(node.left, env), evaluate(node.right, env));
    case "UnaryExpression":
      return applyUnaryOperator(node.operator, evaluate(node.operand, env));
    case "LogicalExpression": {
      const left = evaluate(node.left, env);
      if (node.operator === "&&") return left ? evaluate(node.right, env) : left;
      if (node.operator === "||") return left ? left : evaluate(node.right, env);
      throw new Error(`unsupported logical operator: '${node.operator}'`);
    }
    case "LetDeclaration": {
      const value = node.init !== null ? evaluate(node.init, env) : null;
      env.define(node.name, value);
      return value;
    }
    case "AssignmentExpression": {
      const value = evaluate(node.value, env);
      env.assign(node.name, value);
      return value;
    }
    case "BlockStatement": {
      const blockEnv = new Frame(env);
      let result;
      for (const stmt of node.body) {
        result = evaluate(stmt, blockEnv);
        if (result instanceof ReturnSignal) return result;
      }
      return result;
    }
    case "IfStatement": {
      if (evaluate(node.test, env)) return evaluate(node.consequent, env);
      if (node.alternate) return evaluate(node.alternate, env);
      return null;
    }
    case "ReturnStatement": {
      const value = node.argument !== null ? evaluate(node.argument, env) : null;
      return new ReturnSignal(value);
    }
    case "FunctionDeclaration": {
      const closure = new Closure(node.params, node.body, env);
      env.define(node.name, closure);
      return closure;
    }
    case "ArrowFunction":
      return new Closure(node.params, node.body, env);
    case "CallExpression": {
      const callee = evaluate(node.callee, env);
      if (!(callee instanceof Closure)) throw new Error("cannot call non-function value");
      if (node.arguments.length !== callee.params.length)
        throw new Error(`arity mismatch: expected ${callee.params.length} arguments, got ${node.arguments.length}`);
      const argValues = node.arguments.map(arg => evaluate(arg, env));
      const callFrame = new Frame(callee.env);
      for (let i = 0; i < callee.params.length; i++) callFrame.define(callee.params[i], argValues[i]);
      const result = evaluate(callee.body, callFrame);
      return result instanceof ReturnSignal ? result.value : result;
    }
    default:
      throw new Error(`unsupported AST node type: '${node.type}'`);
  }
}
const g6 = new Frame();
g6.define("x", 10);
assertEqual("Exercise 6: literal", evaluate({ type: "Literal", value: 42 }, g6), 42);
assertEqual("Exercise 6: identifier", evaluate({ type: "Identifier", name: "x" }, g6), 10);
assertEqual("Exercise 6: binary", evaluate({
  type: "BinaryExpression", operator: "+",
  left: { type: "Literal", value: 3 }, right: { type: "Literal", value: 4 }
}, g6), 7);
const g6b = new Frame();
evaluate({ type: "LetDeclaration", name: "y", init: { type: "Literal", value: 99 } }, g6b);
assertEqual("Exercise 6: let then lookup", evaluate({ type: "Identifier", name: "y" }, g6b), 99);
evaluate({ type: "AssignmentExpression", name: "y", value: { type: "Literal", value: 100 } }, g6b);
assertEqual("Exercise 6: assign then lookup", evaluate({ type: "Identifier", name: "y" }, g6b), 100);

// Exercise 7: Evaluator - functions, closures, and recursion
// Add cases for BlockStatement, IfStatement, ReturnStatement,
// FunctionDeclaration, ArrowFunction, CallExpression.
const g7a = new Frame();
assertEqual("Exercise 7: function call", evaluate(
  new Parser(tokenize("function double(x) { return x * 2; } double(5);")).parse(), g7a), 10);
const g7b = new Frame();
assertEqual("Exercise 7: arrow function", evaluate(
  new Parser(tokenize("let add1 = (x) => x + 1; add1(10);")).parse(), g7b), 11);
const g7c = new Frame();
assertEqual("Exercise 7: if true", evaluate(
  new Parser(tokenize("if (3 > 2) { 100; } else { 200; }")).parse(), g7c), 100);
const g7d = new Frame();
assertEqual("Exercise 7: closure", evaluate(
  new Parser(tokenize("function makeAdder(base) { return (x) => base + x; } let add5 = makeAdder(5); add5(3);")).parse(), g7d), 8);
const g7e = new Frame();
assertEqual("Exercise 7: recursion", evaluate(
  new Parser(tokenize("function f(n) { if (n === 0) { return 1; } else { return n * f(n - 1); } } f(5);")).parse(), g7e), 120);

// Exercise 8: Full pipeline
// run(source, env) composes tokenize → parse → evaluate.
function run(source, env = new Frame()) {
  return evaluate(new Parser(tokenize(source)).parse(), env);
}
assertEqual("Exercise 8: factorial", run("function f(n) { if (n === 0) { return 1; } else { return n * f(n - 1); } } f(5);"), 120);
assertEqual("Exercise 8: closure", run("function makeAdder(base) { return (x) => base + x; } let add5 = makeAdder(5); add5(3);"), 8);
assertEqual("Exercise 8: block scope", run("let x = 1; { let x = 10; } x;"), 1);
await assertThrows("Exercise 8: unbound", () => run("y;"), "unbound name");
