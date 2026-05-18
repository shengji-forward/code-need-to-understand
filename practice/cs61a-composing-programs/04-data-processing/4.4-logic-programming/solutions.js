import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: term — build compound terms
function term(name, args = []) {
  return { type: "term", name, args };
}
assertEqual("Exercise 1: term with args", term("parent", ["alice", "bob"]),
  { type: "term", name: "parent", args: ["alice", "bob"] });
assertEqual("Exercise 1: term empty args", term("true"),
  { type: "term", name: "true", args: [] });

// Exercise 2: variable and isVariable — identify logic variables
function variable(name) {
  return `?${name}`;
}
function isVariable(value) {
  return typeof value === "string" && value.startsWith("?");
}
assertEqual("Exercise 2: variable creates ?-prefixed string", variable("x"), "?x");
assertEqual("Exercise 2: isVariable detects variable", isVariable("?child"), true);
assertEqual("Exercise 2: isVariable rejects constant", isVariable("alice"), false);

// Exercise 3: matchFact — match exact facts (no variables)
function matchFact(goal, fact) {
  if (goal.name !== fact.name || goal.args.length !== fact.args.length) {
    return null;
  }
  const bindings = {};
  for (let i = 0; i < goal.args.length; i++) {
    const g = goal.args[i];
    const f = fact.args[i];
    if (isVariable(g)) {
      if (Object.hasOwn(bindings, g)) {
        if (bindings[g] !== f) return null;
      } else {
        bindings[g] = f;
      }
    } else if (g !== f) {
      return null;
    }
  }
  return bindings;
}
assertEqual("Exercise 3: match exact fact", matchFact(
  term("parent", ["abraham", "barack"]),
  term("parent", ["abraham", "barack"])
), {});
assertEqual("Exercise 3: match different predicate", matchFact(
  term("parent", ["abraham", "barack"]),
  term("child", ["abraham", "barack"])
), null);
assertEqual("Exercise 3: match different arity", matchFact(
  term("parent", ["abraham"]),
  term("parent", ["abraham", "barack"])
), null);

// Exercise 4: matchFact — match facts with variables and return bindings
assertEqual("Exercise 4: match binds variable", matchFact(
  term("parent", ["abraham", variable("child")]),
  term("parent", ["abraham", "barack"])
), { "?child": "barack" });
assertEqual("Exercise 4: match repeated variable inconsistent", matchFact(
  term("parent", [variable("x"), variable("x")]),
  term("parent", ["abraham", "barack"])
), null);
assertEqual("Exercise 4: match repeated variable consistent", matchFact(
  term("parent", [variable("x"), variable("x")]),
  term("parent", ["abraham", "abraham"])
), { "?x": "abraham" });

// Exercise 5: FactBase — store and query facts
class FactBase {
  constructor() {
    this._facts = Object.create(null);
    this._rules = [];
  }
  addFact(fact) {
    if (!Object.hasOwn(this._facts, fact.name)) {
      this._facts[fact.name] = [];
    }
    this._facts[fact.name].push(fact);
  }
  addRule(r) {
    this._rules.push(r);
  }
  factsFor(name) {
    return this._facts[name] || [];
  }
  query(goal) {
    const results = [];
    for (const fact of this.factsFor(goal.name)) {
      const bindings = matchFact(goal, fact);
      if (bindings !== null) {
        results.push(bindings);
      }
    }
    return results;
  }
}
const db = new FactBase();
db.addFact(term("parent", ["abraham", "barack"]));
db.addFact(term("parent", ["abraham", "clinton"]));
db.addFact(term("parent", ["delano", "herbert"]));
assertEqual("Exercise 5: factsFor returns matching facts", db.factsFor("parent").length, 3);
assertEqual("Exercise 5: factsFor empty for unknown", db.factsFor("child"), []);
assertEqual("Exercise 5: query finds bindings", db.query(term("parent", ["abraham", variable("child")])), [
  { "?child": "barack" },
  { "?child": "clinton" },
]);
assertEqual("Exercise 5: query no matches", db.query(term("parent", ["nobody", variable("x")])), []);

// Exercise 6: rule — represent conditional facts
function rule(head, body) {
  return { type: "rule", head, body };
}
const childRule = rule(
  term("child", [variable("c"), variable("p")]),
  [term("parent", [variable("p"), variable("c")])]
);
assertEqual("Exercise 6: rule type", childRule.type, "rule");
assertEqual("Exercise 6: rule body length", childRule.body.length, 1);

// Exercise 7: FactBase with rules — store and verify
const db2 = new FactBase();
db2.addFact(term("parent", ["abraham", "barack"]));
db2.addFact(term("parent", ["abraham", "clinton"]));
db2.addRule(childRule);
assertEqual("Exercise 7: database stores facts", db2.factsFor("parent").length, 2);
assertEqual("Exercise 7: database stores rules", db2._rules.length, 1);
assertEqual("Exercise 7: query returns correct bindings",
  db2.query(term("parent", ["abraham", variable("child")])),
  [{ "?child": "barack" }, { "?child": "clinton" }]);
