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
// TODO: Implement Frame with define(name, value), lookup(name) walking parent chain, and assign(name, value) updating nearest frame.
class Frame {
  constructor(parent = null) {}
  define(name, value) {}
  lookup(name) { return undefined; }
  assign(name, value) { return undefined; }
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
// TODO: Split source into an array of token objects with { type, value }.
//       Types: "number", "string", "identifier", "keyword", "operator", "punctuation".
function tokenize(source) { return []; }
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
// TODO: Handle multi-character operators (===, !==, &&, ||, =>), double-quoted strings, and // comments.
//       Throw SyntaxError for unsupported characters.
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
// TODO: Closure stores params, body, and env. ReturnSignal stores value.
class Closure {
  constructor(params, body, env) {}
}
class ReturnSignal {
  constructor(value) {}
}
const env4 = new Frame();
const body4 = { type: "BlockStatement", body: [] };
const closure4 = new Closure(["x", "y"], body4, env4);
assertEqual("Exercise 4: closure params", closure4.params, ["x", "y"]);
assertEqual("Exercise 4: closure body", closure4.body, body4);
const signal4 = new ReturnSignal(42);
assertEqual("Exercise 4: return signal", signal4.value, 42);

// Exercise 5: Operator helpers
// TODO: applyOperator handles +, -, *, /, %, ===, !==, <, <=, >, >=.
//       applyUnaryOperator handles -, !.
//       Throw Error for unsupported operators.
function applyOperator(op, left, right) { return 0; }
function applyUnaryOperator(op, operand) { return false; }
assertEqual("Exercise 5: add", applyOperator("+", 3, 4), 7);
assertEqual("Exercise 5: mul", applyOperator("*", 3, 4), 12);
assertEqual("Exercise 5: strict equal", applyOperator("===", 3, 3), true);
assertEqual("Exercise 5: less than", applyOperator("<", 3, 5), true);
await assertThrows("Exercise 5: unsupported op", () => applyOperator("^", 1, 2), "unsupported operator");
assertEqual("Exercise 5: negate", applyUnaryOperator("-", 5), -5);
assertEqual("Exercise 5: not", applyUnaryOperator("!", true), false);

// Exercise 6: Evaluator basics
// TODO: evaluate(node, env) dispatches on node.type.
//       Handle: Program, ExpressionStatement, Literal, Identifier, BinaryExpression,
//       UnaryExpression, LogicalExpression, LetDeclaration, AssignmentExpression.
function evaluate(node, env) { return null; }
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
// TODO: Add cases for BlockStatement, IfStatement, ReturnStatement,
//       FunctionDeclaration, ArrowFunction, CallExpression.
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
// TODO: run(source, env) composes tokenize → parse → evaluate.
function run(source, env = new Frame()) { return undefined; }
assertEqual("Exercise 8: factorial", run("function f(n) { if (n === 0) { return 1; } else { return n * f(n - 1); } } f(5);"), 120);
assertEqual("Exercise 8: closure", run("function makeAdder(base) { return (x) => base + x; } let add5 = makeAdder(5); add5(3);"), 8);
assertEqual("Exercise 8: block scope", run("let x = 1; { let x = 10; } x;"), 1);
await assertThrows("Exercise 8: unbound", () => run("y;"), "unbound name");
