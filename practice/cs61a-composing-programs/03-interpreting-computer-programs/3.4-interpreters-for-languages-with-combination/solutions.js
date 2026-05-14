import { assertEqual, assertThrows } from "../../shared/helpers.js";

// Exercise 1: Tokenizer basics
// Split source into token array. Numbers become JS number values, parens and operators stay as strings.
function tokenize(source) {
  function isDigit(c) { return c >= "0" && c <= "9"; }
  const tokens = [];
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") { i++; continue; }
    if (ch === "(" || ch === ")") { tokens.push(ch); i++; continue; }
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/") { tokens.push(ch); i++; continue; }
    if (isDigit(ch) || (ch === "." && i + 1 < source.length && isDigit(source[i + 1]))) {
      let numStr = "";
      let hasDot = false;
      while (i < source.length && (isDigit(source[i]) || (source[i] === "." && !hasDot))) {
        if (source[i] === ".") hasDot = true;
        numStr += source[i];
        i++;
      }
      if (i < source.length && source[i] === ".") {
        throw new SyntaxError("invalid numeral: " + numStr + source.slice(i).match(/^[0-9.]*/)[0]);
      }
      tokens.push(parseFloat(numStr));
      continue;
    }
    throw new SyntaxError("unexpected character: '" + ch + "'");
  }
  return tokens;
}
assertEqual("Exercise 1: basic call", tokenize("(+ 1 2)"), ["(", "+", 1, 2, ")"]);
assertEqual("Exercise 1: bare number", tokenize("42"), [42]);
assertEqual("Exercise 1: nested tokens", tokenize("(* (+ 1 2) 4)"), ["(", "*", "(", "+", 1, 2, ")", 4, ")"]);

// Exercise 2: Tokenizer edge cases
// Handle whitespace, floats, and throw SyntaxError for malformed numbers or invalid characters.
assertEqual("Exercise 2: whitespace", tokenize("  (+  1   2)  "), ["(", "+", 1, 2, ")"]);
assertEqual("Exercise 2: float", tokenize("3.14"), [3.14]);
await assertThrows("Exercise 2: malformed number", () => tokenize("2.3.4"), "invalid numeral");
await assertThrows("Exercise 2: unsupported char", () => tokenize("(% 1 2)"), "unexpected character");

// Exercise 3: AST node helpers
// numberLiteral(v) returns { type: "NumberLiteral", value: v }.
// callExpr(op, operands) returns { type: "CallExpression", operator: op, operands }.
function numberLiteral(v) { return { type: "NumberLiteral", value: v }; }
function callExpr(op, operands) { return { type: "CallExpression", operator: op, operands: operands }; }
assertEqual("Exercise 3: numberLiteral", numberLiteral(42), { type: "NumberLiteral", value: 42 });
assertEqual("Exercise 3: callExpr", callExpr("+", [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }]), { type: "CallExpression", operator: "+", operands: [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }] });

// Exercise 4: Operator check
// Return true if token is one of "+", "-", "*", "/".
function isOperator(token) { return token === "+" || token === "-" || token === "*" || token === "/"; }
assertEqual("Exercise 4: plus", isOperator("+"), true);
assertEqual("Exercise 4: divide", isOperator("/"), true);
assertEqual("Exercise 4: number", isOperator("3"), false);

// Exercise 5: Parser
// Convert a token array into an AST. Numbers → NumberLiteral, ( op operands... ) → CallExpression.
function parse(tokens) {
  const state = { tokens, pos: 0 };
  function parseExpr() {
    if (state.pos >= state.tokens.length) {
      throw new SyntaxError("unexpected end of input");
    }
    const token = state.tokens[state.pos];
    if (typeof token === "number") {
      state.pos++;
      return { type: "NumberLiteral", value: token };
    }
    if (token === "(") {
      state.pos++;
      if (state.pos >= state.tokens.length) {
        throw new SyntaxError("unexpected end of input after '('");
      }
      const operator = state.tokens[state.pos];
      if (typeof operator !== "string" || !isOperator(operator)) {
        throw new SyntaxError("expected operator after '(', got '" + operator + "'");
      }
      state.pos++;
      const operands = [];
      while (state.pos < state.tokens.length && state.tokens[state.pos] !== ")") {
        operands.push(parseExpr());
      }
      if (state.pos >= state.tokens.length) {
        throw new SyntaxError("missing closing ')'");
      }
      state.pos++;
      return { type: "CallExpression", operator: operator, operands: operands };
    }
    throw new SyntaxError("unexpected token: '" + token + "'");
  }
  const ast = parseExpr();
  if (state.pos < tokens.length) {
    throw new SyntaxError("unexpected token after expression: '" + tokens[state.pos] + "'");
  }
  return ast;
}
assertEqual("Exercise 5: parse number", parse([42]), { type: "NumberLiteral", value: 42 });
assertEqual("Exercise 5: parse flat call", parse(["(", "+", 1, 2, ")"]), { type: "CallExpression", operator: "+", operands: [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }] });
assertEqual("Exercise 5: parse nested", parse(["(", "*", "(", "+", 1, 2, ")", 4, ")"]), { type: "CallExpression", operator: "*", operands: [{ type: "CallExpression", operator: "+", operands: [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }] }, { type: "NumberLiteral", value: 4 }] });
await assertThrows("Exercise 5: missing closing", () => parse(["(", "+", 1, 2]), "missing closing");

// Exercise 6: Operator application
// Apply an operator to an array of numeric arguments.
// + sums (identity 0), * multiplies (identity 1), - negates with 1 arg or subtracts, / inverts with 1 arg or divides.
// Throw Error("division by zero") when dividing by zero.
function applyOp(operator, args) {
  switch (operator) {
    case "+": {
      let result = 0;
      for (const arg of args) result += arg;
      return result;
    }
    case "*": {
      let result = 1;
      for (const arg of args) result *= arg;
      return result;
    }
    case "-": {
      if (args.length === 0) throw new TypeError("- requires at least 1 argument");
      if (args.length === 1) return -args[0];
      let result = args[0];
      for (let i = 1; i < args.length; i++) result -= args[i];
      return result;
    }
    case "/": {
      if (args.length === 0) throw new TypeError("/ requires at least 1 argument");
      if (args.length === 1) {
        if (args[0] === 0) throw new Error("division by zero");
        return 1 / args[0];
      }
      let result = args[0];
      for (let i = 1; i < args.length; i++) {
        if (args[i] === 0) throw new Error("division by zero");
        result /= args[i];
      }
      return result;
    }
    default:
      throw new TypeError("unknown operator: '" + operator + "'");
  }
}
assertEqual("Exercise 6: add identity", applyOp("+", []), 0);
assertEqual("Exercise 6: mul identity", applyOp("*", []), 1);
assertEqual("Exercise 6: negate", applyOp("-", [3]), -3);
assertEqual("Exercise 6: inverse", applyOp("/", [10]), 0.1);
assertEqual("Exercise 6: sub", applyOp("-", [10, 3]), 7);
assertEqual("Exercise 6: div multi", applyOp("/", [20, 2, 2]), 5);
await assertThrows("Exercise 6: div by zero", () => applyOp("/", [10, 0]), "division by zero");
await assertThrows("Exercise 6: unary div zero", () => applyOp("/", [0]), "division by zero");

// Exercise 7: Evaluator
// Walk the AST. NumberLiteral returns its value. CallExpression evaluates operands then applies the operator.
function evaluate(ast) {
  if (ast.type === "NumberLiteral") return ast.value;
  if (ast.type === "CallExpression") {
    const args = ast.operands.map(evaluate);
    return applyOp(ast.operator, args);
  }
  throw new Error("unknown AST node type: '" + ast.type + "'");
}
assertEqual("Exercise 7: eval number", evaluate({ type: "NumberLiteral", value: 42 }), 42);
assertEqual("Exercise 7: eval flat call", evaluate({ type: "CallExpression", operator: "+", operands: [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }] }), 3);
const capstoneAst = {
  type: "CallExpression", operator: "-",
  operands: [
    { type: "NumberLiteral", value: 100 },
    { type: "CallExpression", operator: "*",
      operands: [
        { type: "NumberLiteral", value: 7 },
        { type: "CallExpression", operator: "+",
          operands: [
            { type: "NumberLiteral", value: 8 },
            { type: "CallExpression", operator: "/",
              operands: [
                { type: "CallExpression", operator: "-",
                  operands: [{ type: "NumberLiteral", value: 12 }] },
                { type: "CallExpression", operator: "-",
                  operands: [{ type: "NumberLiteral", value: 3 }] }
              ] }
          ] }
      ] }
  ] };
assertEqual("Exercise 7: nested capstone", evaluate(capstoneAst), 16);

// Exercise 8: Full pipeline and error recovery
// runCalculator composes tokenize → parse → evaluate.
// calcRepl wraps it: return the result on success, or "Syntax error: ...", "Type error: ...", or "Error: ..." on failure.
function runCalculator(source) {
  return evaluate(parse(tokenize(source)));
}
function calcRepl(source) {
  try {
    return runCalculator(source);
  } catch (e) {
    if (e instanceof SyntaxError) return "Syntax error: " + e.message;
    if (e instanceof TypeError) return "Type error: " + e.message;
    return "Error: " + e.message;
  }
}
assertEqual("Exercise 8: simple", runCalculator("(+ 1 2)"), 3);
assertEqual("Exercise 8: nested", runCalculator("(* (+ 1 2) 4)"), 12);
assertEqual("Exercise 8: capstone", runCalculator("(- 100 (* 7 (+ 8 (/ (- 12) (- 3)))))"), 16);
assertEqual("Exercise 8: repl syntax error", calcRepl("(% 1 2)"), "Syntax error: unexpected character: '%'");
assertEqual("Exercise 8: repl missing paren", calcRepl("(+ 1 2"), "Syntax error: missing closing ')'");
assertEqual("Exercise 8: repl div zero", calcRepl("(/ 10 0)"), "Error: division by zero");
