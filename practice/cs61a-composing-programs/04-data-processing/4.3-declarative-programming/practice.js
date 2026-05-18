import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: table — create a named table with stable row copies
// TODO: Return { name, rows } where each row is a shallow copy so mutations don't affect the original
function table(name, rows) {
  return { name, rows };
}
const rawStudents = [{ id: 1, name: "Ada" }, { id: 2, name: "Grace" }];
const studentsTable = table("students", rawStudents);
assertEqual("Exercise 1: table name", studentsTable.name, "students");
assertEqual("Exercise 1: table copies rows", studentsTable.rows, [{ id: 1, name: "Ada" }, { id: 2, name: "Grace" }]);
studentsTable.rows[0].name = "Changed";
assertEqual("Exercise 1: original unchanged", rawStudents[0].name, "Ada");

// Exercise 2: selectRows — project specific columns from rows
// TODO: For each row, build a new object containing only the specified columns (missing columns become undefined)
function selectRows(rows, columns) {
  return [];
}
const people = [
  { name: "Ada", house: "A", year: 2 },
  { name: "Grace", house: "B", year: 3 },
];
assertEqual("Exercise 2: select name and house", selectRows(people, ["name", "house"]), [
  { name: "Ada", house: "A" },
  { name: "Grace", house: "B" },
]);
assertEqual("Exercise 2: select missing column", selectRows(people, ["name", "age"]), [
  { name: "Ada", age: undefined },
  { name: "Grace", age: undefined },
]);
assertEqual("Exercise 2: select from empty", selectRows([], ["name"]), []);

// Exercise 3: whereRows — filter rows with a predicate
// TODO: Return only the rows for which predicate(row) is true
function whereRows(rows, predicate) {
  return [];
}
const classList = [
  { name: "Ada", house: "A" },
  { name: "Grace", house: "B" },
  { name: "Alan", house: "A" },
];
assertEqual("Exercise 3: filter house A", whereRows(classList, r => r.house === "A"), [
  { name: "Ada", house: "A" },
  { name: "Alan", house: "A" },
]);
assertEqual("Exercise 3: filter none match", whereRows(classList, r => r.house === "C"), []);
assertEqual("Exercise 3: filter all match", whereRows(classList, () => true), classList);

// Exercise 4: joinRows — inner join on key fields
// TODO: For each left row, find matching right rows and merge them; rows with no match are excluded
function joinRows(leftRows, rightRows, leftKey, rightKey) {
  return [];
}
const students = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
];
const enrollments = [
  { studentId: 1, course: "CS" },
  { studentId: 1, course: "Math" },
  { studentId: 3, course: "Art" },
];
assertEqual("Exercise 4: join students enrollments", joinRows(students, enrollments, "id", "studentId"), [
  { id: 1, name: "Ada", studentId: 1, course: "CS" },
  { id: 1, name: "Ada", studentId: 1, course: "Math" },
]);
assertEqual("Exercise 4: join no matches", joinRows(students, [{ studentId: 99, course: "X" }], "id", "studentId"), []);
assertEqual("Exercise 4: join order preserved", joinRows(students, enrollments, "id", "studentId").map(r => r.course), ["CS", "Math"]);

// Exercise 5: groupBy — group rows by a computed key, returns Map
// TODO: Build a Map where each key is keyFn(row) and each value is an array of matching rows
function groupBy(rows, keyFn) {
  return new Map();
}
const items = [
  { name: "Ada", dept: "CS" },
  { name: "Grace", dept: "CS" },
  { name: "Alan", dept: "Math" },
];
const grouped = groupBy(items, r => r.dept);
assertEqual("Exercise 5: groupBy keys", [...grouped.keys()], ["CS", "Math"]);
assertEqual("Exercise 5: groupBy CS group", grouped.get("CS"), [
  { name: "Ada", dept: "CS" },
  { name: "Grace", dept: "CS" },
]);

// Exercise 6: count, sum, avg — aggregate helpers
// TODO: count returns row count; sum adds up selector(row) values; avg divides sum by count (0 for empty)
function count(rows) {
  return 0;
}
function sum(rows, selector) {
  return 0;
}
function avg(rows, selector) {
  return 0;
}
const scores = [
  { name: "Ada", score: 90 },
  { name: "Grace", score: 80 },
  { name: "Alan", score: 70 },
];
assertEqual("Exercise 6: count rows", count(scores), 3);
assertEqual("Exercise 6: sum scores", sum(scores, r => r.score), 240);
assertEqual("Exercise 6: avg score", avg(scores, r => r.score), 80);
assertEqual("Exercise 6: count empty", count([]), 0);
assertEqual("Exercise 6: avg empty returns 0", avg([], r => r.score), 0);

// Exercise 7: executeQuery — compose query operations
// TODO: Apply join, where, groupBy, and select in SQL order; return rows or Map
function executeQuery(query) {
  if (query.groupBy) return new Map();
  return [];
}
const roster = [
  { name: "Ada", house: "A", year: 2 },
  { name: "Grace", house: "B", year: 3 },
  { name: "Alan", house: "A", year: 2 },
];
assertEqual("Exercise 7: query select only", executeQuery({ from: roster, select: ["name"] }), [
  { name: "Ada" }, { name: "Grace" }, { name: "Alan" },
]);
assertEqual("Exercise 7: query where and select", executeQuery({
  from: roster,
  where: r => r.house === "A",
  select: ["name"],
}), [{ name: "Ada" }, { name: "Alan" }]);
const courses = [
  { studentName: "Ada", course: "CS" },
  { studentName: "Grace", course: "Math" },
];
assertEqual("Exercise 7: query join and select", executeQuery({
  from: roster,
  join: { table: courses, leftKey: "name", rightKey: "studentName" },
  select: ["name", "course"],
}), [{ name: "Ada", course: "CS" }, { name: "Grace", course: "Math" }]);
const byHouse = executeQuery({ from: roster, groupBy: r => r.house });
assertEqual("Exercise 7: query groupBy keys", [...byHouse.keys()], ["A", "B"]);
assertEqual("Exercise 7: query groupBy with aggregates", executeQuery({
  from: roster,
  groupBy: r => r.house,
  aggregates: {
    count: group => count(group),
    avgYear: group => avg(group, r => r.year),
  },
}), [
  { _key: "A", count: 2, avgYear: 2 },
  { _key: "B", count: 1, avgYear: 3 },
]);
assertEqual("Exercise 7: query groupBy with sum", executeQuery({
  from: [
    { product: "Widget", qty: 10, price: 5 },
    { product: "Gadget", qty: 3, price: 20 },
    { product: "Widget", qty: 7, price: 5 },
  ],
  groupBy: r => r.product,
  aggregates: { revenue: group => sum(group, r => r.qty * r.price) },
}), [
  { _key: "Widget", revenue: 85 },
  { _key: "Gadget", revenue: 60 },
]);

// Exercise 8: declarative vs imperative — same result, different style
// TODO: Compare a declarative query result to an imperative loop that does the same thing
const salesData = [
  { product: "Widget", qty: 10, price: 5 },
  { product: "Gadget", qty: 3, price: 20 },
  { product: "Widget", qty: 7, price: 5 },
  { product: "Gadget", qty: 5, price: 20 },
];
const declarativeResult = executeQuery({
  from: salesData,
  where: r => r.product === "Widget",
  select: ["product", "qty", "price"],
});
const declarative = declarativeResult.map(r => r.qty * r.price);
const imperative = [];
for (const sale of salesData) {
  if (sale.product === "Widget") {
    imperative.push(sale.qty * sale.price);
  }
}
assertEqual("Exercise 8: declarative Widget revenue", declarative, [50, 35]);
assertEqual("Exercise 8: imperative matches declarative", declarative, imperative);
