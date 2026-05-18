import { assertEqual } from "../../shared/helpers.js";

// --- Term representation ---
function term(name, args = []) {
  return { type: "term", name, args };
}
function variable(name) {
  return `?${name}`;
}
function isVariable(value) {
  return typeof value === "string" && value.startsWith("?");
}

// --- Database helper for proof exercises ---
function makeDatabase(facts, rules = []) {
  const index = Object.create(null);
  for (const f of facts) {
    if (!Object.hasOwn(index, f.name)) index[f.name] = [];
    index[f.name].push(f);
  }
  return { factsFor: name => index[name] || [], rules, _freshCounter: 0 };
}

// Exercise 1: walk — resolve variable chains through substitutions
function walk(value, subst) {
  while (isVariable(value) && subst.has(value)) {
    value = subst.get(value);
  }
  return value;
}
const s1 = new Map([["?x", "?y"], ["?y", "hello"]]);
assertEqual("Exercise 1: walk chains variables", walk("?x", s1), "hello");
assertEqual("Exercise 1: walk returns constant", walk("hello", s1), "hello");
assertEqual("Exercise 1: walk unresolved variable", walk("?z", s1), "?z");

// Exercise 2: occursCheck and extend — safe variable binding
function occursCheck(variableName, value, subst) {
  const v = walk(value, subst);
  if (isVariable(v)) return v === variableName;
  if (v && v.type === "term") return v.args.some(arg => occursCheck(variableName, arg, subst));
  return false;
}
function extend(variableName, value, subst) {
  if (occursCheck(variableName, value, subst)) return null;
  const next = new Map(subst);
  next.set(variableName, value);
  return next;
}
assertEqual("Exercise 2: extend adds binding", extend("?x", "hello", new Map()), new Map([["?x", "hello"]]));
assertEqual("Exercise 2: extend preserves existing", extend("?y", "world", new Map([["?x", "hello"]])).get("?x"), "hello");
assertEqual("Exercise 2: extend rejects occurs", extend("?x", term("f", [variable("x")]), new Map()), null);

// Exercise 3: unify — identical constants and variable-constant
function unify(left, right, subst = new Map()) {
  const l = walk(left, subst);
  const r = walk(right, subst);
  if (l === r) return subst;
  if (isVariable(l)) return extend(l, r, subst);
  if (isVariable(r)) return extend(r, l, subst);
  if (l && l.type === "term" && r && r.type === "term") {
    if (l.name !== r.name || l.args.length !== r.args.length) return null;
    let current = subst;
    for (let i = 0; i < l.args.length; i++) {
      current = unify(l.args[i], r.args[i], current);
      if (current === null) return null;
    }
    return current;
  }
  return null;
}
assertEqual("Exercise 3: unify same constant", unify("a", "a"), new Map());
assertEqual("Exercise 3: unify different constants", unify("a", "b"), null);
assertEqual("Exercise 3: unify variable with constant", unify(variable("x"), "hello"), new Map([["?x", "hello"]]));

// Exercise 4: unify — compound terms
assertEqual("Exercise 4: unify compound terms",
  unify(term("parent", ["alice", variable("child")]), term("parent", ["alice", "bob"])),
  new Map([["?child", "bob"]]));
assertEqual("Exercise 4: unify nested terms",
  unify(term("pair", [variable("x"), variable("y")]), term("pair", ["a", "b"])),
  new Map([["?x", "a"], ["?y", "b"]]));
assertEqual("Exercise 4: unify repeated variable consistent",
  unify(term("pair", [variable("x"), variable("x")]), term("pair", ["a", "a"])),
  new Map([["?x", "a"]]));

// Exercise 5: unify — reject incompatible terms
assertEqual("Exercise 5: reject different predicates",
  unify(term("parent", ["alice", "bob"]), term("child", ["alice", "bob"])),
  null);
assertEqual("Exercise 5: reject arity mismatch",
  unify(term("parent", ["alice"]), term("parent", ["alice", "bob"])),
  null);
assertEqual("Exercise 5: reject inconsistent variable",
  unify(term("pair", [variable("x"), variable("x")]), term("pair", ["a", "b"])),
  null);

// Exercise 6: unify — reject cyclic bindings (occurs check)
assertEqual("Exercise 6: reject occurs check",
  unify(variable("x"), term("f", [variable("x")]), new Map()),
  null);
assertEqual("Exercise 6: reject deep occurs",
  unify(variable("x"), term("g", [term("h", [variable("x")])]), new Map()),
  null);

// Exercise 7: applySubstitution — resolve all variables in a term
function applySubstitution(value, subst) {
  const v = walk(value, subst);
  if (isVariable(v)) return v;
  if (v && v.type === "term") return term(v.name, v.args.map(arg => applySubstitution(arg, subst)));
  return v;
}
const s7 = new Map([["?x", "hello"], ["?y", term("inner", ["world"])]]);
assertEqual("Exercise 7: apply to variable", applySubstitution(variable("x"), s7), "hello");
assertEqual("Exercise 7: apply to compound", applySubstitution(term("pair", [variable("x"), variable("y")]), s7),
  term("pair", ["hello", term("inner", ["world"])]));
assertEqual("Exercise 7: apply unresolved", applySubstitution(variable("z"), s7), "?z");

// Dog-breeding database for proof exercises
const dogFacts = [
  term("parent", ["abraham", "barack"]),
  term("parent", ["abraham", "clinton"]),
  term("parent", ["delano", "herbert"]),
  term("parent", ["fillmore", "abraham"]),
  term("parent", ["fillmore", "delano"]),
  term("parent", ["fillmore", "grover"]),
  term("parent", ["eisenhower", "fillmore"]),
];
const dogDb = makeDatabase(dogFacts);

// Exercise 8: prove — find bindings matching a single goal against facts
function prove(goal, database, subst = new Map(), fuel = 50) {
  if (fuel <= 0) return [];
  const results = [];
  for (const fact of database.factsFor(goal.name)) {
    const s = unify(goal, fact, new Map(subst));
    if (s !== null) {
      results.push(s);
    }
  }
  return results;
}
assertEqual("Exercise 8: prove exact fact", prove(term("parent", ["abraham", "barack"]), dogDb).length, 1);
assertEqual("Exercise 8: prove with variable", prove(term("parent", ["abraham", variable("child")]), dogDb).length, 2);
assertEqual("Exercise 8: prove no match", prove(term("parent", ["nobody", variable("x")]), dogDb), []);

// Variable renaming — prevents collisions when a rule is used multiple times
function renameVariables(rule, suffix) {
  const mapping = Object.create(null);
  function rename(value) {
    if (isVariable(value)) {
      if (!Object.hasOwn(mapping, value)) {
        mapping[value] = `${value}_${suffix}`;
      }
      return mapping[value];
    }
    if (value && value.type === "term") {
      return term(value.name, value.args.map(rename));
    }
    return value;
  }
  return { type: "rule", head: rename(rule.head), body: rule.body.map(rename) };
}

// Exercise 9: solve — prove goals using facts and rules
const dogRules = [
  { type: "rule", head: term("child", [variable("c"), variable("p")]), body: [term("parent", [variable("p"), variable("c")])] },
  { type: "rule", head: term("ancestor", [variable("a"), variable("y")]), body: [term("parent", [variable("a"), variable("y")])] },
  { type: "rule", head: term("ancestor", [variable("a"), variable("y")]), body: [term("parent", [variable("a"), variable("z")]), term("ancestor", [variable("z"), variable("y")])] },
];
const dogDbRules = makeDatabase(dogFacts, dogRules);
function solve(goals, database, subst = new Map(), fuel = 50) {
  if (fuel <= 0) return [];
  if (goals.length === 0) return [subst];
  const [first, ...rest] = goals;
  const results = [];
  for (const fact of database.factsFor(first.name)) {
    const s = unify(first, fact, new Map(subst));
    if (s !== null) {
      results.push(...solve(rest, database, s, fuel - 1));
    }
  }
  for (const r of database.rules) {
    const renamed = renameVariables(r, database._freshCounter++);
    const s = unify(first, renamed.head, new Map(subst));
    if (s !== null) {
      results.push(...solve([...renamed.body, ...rest], database, s, fuel - 1));
    }
  }
  return results;
}
const childResults = solve([term("child", ["barack", variable("who")])], dogDbRules);
assertEqual("Exercise 9: prove with child rule count", childResults.length, 1);
assertEqual("Exercise 9: child rule resolved",
  applySubstitution(term("child", ["barack", variable("who")]), childResults[0]),
  term("child", ["barack", "abraham"]));
assertEqual("Exercise 9: prove no rule match", solve([term("child", ["nobody", variable("p")])], dogDbRules), []);

// Exercise 10: solve — multiple goals, recursive rules, and fuel bounding
const grandkids = solve(
  [term("parent", ["fillmore", variable("x")]), term("parent", [variable("x"), variable("y")])],
  dogDb
);
const grandkidNames = grandkids.map(s => applySubstitution(variable("y"), s)).sort();
assertEqual("Exercise 10: solve multi-goal", grandkidNames, ["barack", "clinton", "herbert"]);
const ancestorResults = solve([term("ancestor", ["fillmore", variable("y")])], dogDbRules);
const ancestorNames = ancestorResults.map(s => applySubstitution(variable("y"), s)).sort();
assertEqual("Exercise 10: ancestor recursive", ancestorNames,
  ["abraham", "barack", "clinton", "delano", "grover", "herbert"]);
assertEqual("Exercise 10: fuel zero returns empty",
  solve([term("parent", ["abraham", variable("x")])], dogDb, new Map(), 0), []);
