import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: table — create a named table with stable row copies
function table(name, rows) {
  return { name, rows: rows.map(row => ({ ...row })) };
}
const rawStudents = [{ id: 1, name: "Ada" }, { id: 2, name: "Grace" }];
const studentsTable = table("students", rawStudents);
assertEqual("Exercise 1: table name", studentsTable.name, "students");
assertEqual("Exercise 1: table copies rows", studentsTable.rows, [{ id: 1, name: "Ada" }, { id: 2, name: "Grace" }]);
studentsTable.rows[0].name = "Changed";
assertEqual("Exercise 1: original unchanged", rawStudents[0].name, "Ada");

// Exercise 2: selectRows — project specific columns from rows
function selectRows(rows, columns) {
  return rows.map(row => {
    const result = {};
    for (const col of columns) {
      result[col] = row[col];
    }
    return result;
  });
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
function whereRows(rows, predicate) {
  return rows.filter(predicate);
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
function joinRows(leftRows, rightRows, leftKey, rightKey) {
  return leftRows.flatMap(left =>
    rightRows
      .filter(right => left[leftKey] === right[rightKey])
      .map(right => ({ ...left, ...right }))
  );
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
function groupBy(rows, keyFn) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(row);
  }
  return map;
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
function count(rows) {
  return rows.length;
}
function sum(rows, selector) {
  return rows.reduce((acc, row) => acc + selector(row), 0);
}
// avg returns 0 for empty rows — explicit documented behavior
function avg(rows, selector) {
  if (rows.length === 0) return 0;
  return sum(rows, selector) / rows.length;
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
function executeQuery(query) {
  let rows = query.from.rows ?? query.from;

  if (query.join) {
    const rightRows = query.join.table.rows ?? query.join.table;
    rows = joinRows(rows, rightRows, query.join.leftKey, query.join.rightKey);
  }

  if (query.where) {
    rows = whereRows(rows, query.where);
  }

  if (query.groupBy) {
    const groups = groupBy(rows, query.groupBy);
    if (query.aggregates) {
      rows = [...groups.entries()].map(([key, groupRows]) => {
        const result = { _key: key };
        for (const [name, fn] of Object.entries(query.aggregates)) {
          result[name] = fn(groupRows);
        }
        return result;
      });
    } else {
      return groups;
    }
  }

  if (query.select) {
    rows = selectRows(rows, query.select);
  }

  return rows;
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
