import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: term — build compound terms
// TODO: Return an object with type "term", the predicate name, and args array
function term(name, args = []) {
  return { type: "term", name, args };
}
assertEqual("Exercise 1: term with args", term("parent", ["alice", "bob"]),
  { type: "term", name: "parent", args: ["alice", "bob"] });
assertEqual("Exercise 1: term empty args", term("true"),
  { type: "term", name: "true", args: [] });

// Exercise 2: variable and isVariable — identify logic variables
// TODO: variable returns a "?name" string; isVariable checks for "?" prefix
function variable(name) {
  return `?${name}`;
}
function isVariable(value) {
  return false;
}
assertEqual("Exercise 2: variable creates ?-prefixed string", variable("x"), "?x");
assertEqual("Exercise 2: isVariable detects variable", isVariable("?child"), true);
assertEqual("Exercise 2: isVariable rejects constant", isVariable("alice"), false);

// Exercise 3: matchFact — match exact facts (no variables)
// TODO: Check predicate name and arity match, then compare each argument
function matchFact(goal, fact) {
  return null;
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
// TODO: Bind variables from goal to matching values in fact; reject inconsistent bindings
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
// TODO: Index facts by predicate name; query matches goals against stored facts
class FactBase {
  constructor() {
    this._facts = Object.create(null);
    this._rules = [];
  }
  addFact(fact) { /* TODO */ }
  addRule(r) { /* TODO */ }
  factsFor(name) { return []; }
  query(goal) { return []; }
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
// TODO: Return an object with type "rule", head term, and body array
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
// TODO: Implement addFact and addRule so the database stores both
const db2 = new FactBase();
db2.addFact(term("parent", ["abraham", "barack"]));
db2.addFact(term("parent", ["abraham", "clinton"]));
db2.addRule(childRule);
assertEqual("Exercise 7: database stores facts", db2.factsFor("parent").length, 2);
assertEqual("Exercise 7: database stores rules", db2._rules.length, 1);
assertEqual("Exercise 7: query returns correct bindings",
  db2.query(term("parent", ["abraham", variable("child")])),
  [{ "?child": "barack" }, { "?child": "clinton" }]);
