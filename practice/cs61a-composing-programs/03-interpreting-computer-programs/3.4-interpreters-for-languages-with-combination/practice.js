import { assertEqual, assertThrows } from "../../shared/helpers.js";

// Exercise 1: Tokenizer basics
// TODO: Split source into token array. Numbers become JS number values, parens and operators stay as strings.
function tokenize(source) { return []; }
assertEqual("Exercise 1: basic call", tokenize("(+ 1 2)"), ["(", "+", 1, 2, ")"]);
assertEqual("Exercise 1: bare number", tokenize("42"), [42]);
assertEqual("Exercise 1: nested tokens", tokenize("(* (+ 1 2) 4)"), ["(", "*", "(", "+", 1, 2, ")", 4, ")"]);

// Exercise 2: Tokenizer edge cases
// TODO: Handle whitespace, floats, and throw SyntaxError for malformed numbers or invalid characters.
assertEqual("Exercise 2: whitespace", tokenize("  (+  1   2)  "), ["(", "+", 1, 2, ")"]);
assertEqual("Exercise 2: float", tokenize("3.14"), [3.14]);
await assertThrows("Exercise 2: malformed number", () => tokenize("2.3.4"), "invalid numeral");
await assertThrows("Exercise 2: unsupported char", () => tokenize("(% 1 2)"), "unexpected character");

// Exercise 3: AST node helpers
// TODO: numberLiteral(v) returns { type: "NumberLiteral", value: v }.
//       callExpr(op, operands) returns { type: "CallExpression", operator: op, operands }.
function numberLiteral(v) { return {}; }
function callExpr(op, operands) { return {}; }
assertEqual("Exercise 3: numberLiteral", numberLiteral(42), { type: "NumberLiteral", value: 42 });
assertEqual("Exercise 3: callExpr", callExpr("+", [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }]), { type: "CallExpression", operator: "+", operands: [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }] });

// Exercise 4: Operator check
// TODO: Return true if token is one of "+", "-", "*", "/".
function isOperator(token) { return false; }
assertEqual("Exercise 4: plus", isOperator("+"), true);
assertEqual("Exercise 4: divide", isOperator("/"), true);
assertEqual("Exercise 4: number", isOperator("3"), false);

// Exercise 5: Parser
// TODO: Convert a token array into an AST. Numbers → NumberLiteral, ( op operands... ) → CallExpression.
function parse(tokens) { return { type: "NumberLiteral", value: 0 }; }
assertEqual("Exercise 5: parse number", parse([42]), { type: "NumberLiteral", value: 42 });
assertEqual("Exercise 5: parse flat call", parse(["(", "+", 1, 2, ")"]), { type: "CallExpression", operator: "+", operands: [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }] });
assertEqual("Exercise 5: parse nested", parse(["(", "*", "(", "+", 1, 2, ")", 4, ")"]), { type: "CallExpression", operator: "*", operands: [{ type: "CallExpression", operator: "+", operands: [{ type: "NumberLiteral", value: 1 }, { type: "NumberLiteral", value: 2 }] }, { type: "NumberLiteral", value: 4 }] });
await assertThrows("Exercise 5: missing closing", () => parse(["(", "+", 1, 2]), "missing closing");

// Exercise 6: Operator application
// TODO: Apply an operator to an array of numeric arguments.
//       + sums (identity 0), * multiplies (identity 1), - negates with 1 arg or subtracts, / inverts with 1 arg or divides.
//       Throw Error("division by zero") when dividing by zero.
function applyOp(operator, args) { return 0; }
assertEqual("Exercise 6: add identity", applyOp("+", []), 0);
assertEqual("Exercise 6: mul identity", applyOp("*", []), 1);
assertEqual("Exercise 6: negate", applyOp("-", [3]), -3);
assertEqual("Exercise 6: inverse", applyOp("/", [10]), 0.1);
assertEqual("Exercise 6: sub", applyOp("-", [10, 3]), 7);
assertEqual("Exercise 6: div multi", applyOp("/", [20, 2, 2]), 5);
await assertThrows("Exercise 6: div by zero", () => applyOp("/", [10, 0]), "division by zero");
await assertThrows("Exercise 6: unary div zero", () => applyOp("/", [0]), "division by zero");

// Exercise 7: Evaluator
// TODO: Walk the AST. NumberLiteral returns its value. CallExpression evaluates operands then applies the operator.
function evaluate(ast) { return 0; }
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
// TODO: runCalculator composes tokenize → parse → evaluate.
//       calcRepl wraps it: return the result on success, or "Syntax error: ...", "Type error: ...", or "Error: ..." on failure.
function runCalculator(source) { return 0; }
function calcRepl(source) { return ""; }
assertEqual("Exercise 8: simple", runCalculator("(+ 1 2)"), 3);
assertEqual("Exercise 8: nested", runCalculator("(* (+ 1 2) 4)"), 12);
assertEqual("Exercise 8: capstone", runCalculator("(- 100 (* 7 (+ 8 (/ (- 12) (- 3)))))"), 16);
assertEqual("Exercise 8: repl syntax error", calcRepl("(% 1 2)"), "Syntax error: unexpected character: '%'");
assertEqual("Exercise 8: repl missing paren", calcRepl("(+ 1 2"), "Syntax error: missing closing ')'");
assertEqual("Exercise 8: repl div zero", calcRepl("(/ 10 0)"), "Error: division by zero");
