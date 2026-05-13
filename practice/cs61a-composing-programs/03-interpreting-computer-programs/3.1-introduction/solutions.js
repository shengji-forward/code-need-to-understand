import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: Classify language pipeline phases
const pipeline = ["source", "tokens", "ast", "value"];
assertEqual("Exercise 1: pipeline order", pipeline, ["source", "tokens", "ast", "value"]);

// Exercise 2: Token objects
function tokenizeSimpleExpression(source) {
  return source.split(" ").map((token) => {
    if (!isNaN(token)) {
      return { type: "number", value: Number(token) };
    }
    return { type: "operator", value: token };
  });
}
assertEqual("Exercise 2: tokenize 2 + 3", tokenizeSimpleExpression("2 + 3"), [
  { type: "number", value: 2 },
  { type: "operator", value: "+" },
  { type: "number", value: 3 },
]);

// Exercise 3: AST node shape
function makeAdditionAst(leftValue, rightValue) {
  return {
    type: "BinaryExpression",
    operator: "+",
    left: { type: "NumberLiteral", value: leftValue },
    right: { type: "NumberLiteral", value: rightValue },
  };
}
assertEqual("Exercise 3: AST type", makeAdditionAst(2, 3).type, "BinaryExpression");
assertEqual("Exercise 3: AST operator", makeAdditionAst(2, 3).operator, "+");

// Exercise 4: Evaluate a tiny AST
function evaluateTinyAst(node) {
  if (node.type === "NumberLiteral") {
    return node.value;
  }
  if (node.type === "BinaryExpression" && node.operator === "+") {
    return evaluateTinyAst(node.left) + evaluateTinyAst(node.right);
  }
}
const tinyAst = {
  type: "BinaryExpression",
  operator: "+",
  left: { type: "NumberLiteral", value: 2 },
  right: { type: "NumberLiteral", value: 3 },
};
assertEqual("Exercise 4: evaluate tiny AST", evaluateTinyAst(tinyAst), 5);

// Exercise 5: Eval/apply vocabulary
const evalApply = ["evaluate operator", "evaluate operands", "apply function"];
assertEqual("Exercise 5: eval/apply", evalApply, ["evaluate operator", "evaluate operands", "apply function"]);

// Exercise 6: Environment lookup
function lookup(name, env) {
  return env[name];
}
assertEqual("Exercise 6: lookup x", lookup("x", { x: 10, y: 20 }), 10);
assertEqual("Exercise 6: lookup missing", lookup("z", { x: 10 }), undefined);
