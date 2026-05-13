import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Classify language pipeline phases
// TODO: Return ["source", "tokens", "ast", "value"] in evaluation order.
const pipeline = undefined;
assertEqual("Exercise 1: pipeline order", pipeline, ["source", "tokens", "ast", "value"]);

// Exercise 2: Token objects
// TODO: Return token objects for the expression "2 + 3".
function tokenizeSimpleExpression(source) { return []; }
assertEqual("Exercise 2: tokenize 2 + 3", tokenizeSimpleExpression("2 + 3"), [
  { type: "number", value: 2 },
  { type: "operator", value: "+" },
  { type: "number", value: 3 },
]);

// Exercise 3: AST node shape
// TODO: Return a BinaryExpression AST for 2 + 3.
function makeAdditionAst(leftValue, rightValue) { return { type: undefined }; }
assertEqual("Exercise 3: AST type", makeAdditionAst(2, 3).type, "BinaryExpression");
assertEqual("Exercise 3: AST operator", makeAdditionAst(2, 3).operator, "+");

// Exercise 4: Evaluate a tiny AST
// TODO: Evaluate NumberLiteral and BinaryExpression nodes for + only.
function evaluateTinyAst(node) { return undefined; }
const tinyAst = {
  type: "BinaryExpression",
  operator: "+",
  left: { type: "NumberLiteral", value: 2 },
  right: { type: "NumberLiteral", value: 3 },
};
assertEqual("Exercise 4: evaluate tiny AST", evaluateTinyAst(tinyAst), 5);

// Exercise 5: Eval/apply vocabulary
// TODO: Return the missing words in order.
const evalApply = undefined;
assertEqual("Exercise 5: eval/apply", evalApply, ["evaluate operator", "evaluate operands", "apply function"]);

// Exercise 6: Environment lookup
// TODO: Implement lookup(name, env) where env is a plain object for this intro exercise.
function lookup(name, env) { return undefined; }
assertEqual("Exercise 6: lookup x", lookup("x", { x: 10, y: 20 }), 10);
assertEqual("Exercise 6: lookup missing", lookup("z", { x: 10 }), undefined);
