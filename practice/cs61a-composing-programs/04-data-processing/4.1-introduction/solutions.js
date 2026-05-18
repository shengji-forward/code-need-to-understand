import { assertEqual } from "../../shared/helpers.js";

// Exercise 1: pipe — compose unary functions left-to-right
function pipe(...fns) {
  return (input) => fns.reduce((val, fn) => fn(val), input);
}
assertEqual("Exercise 1: pipe two functions", pipe(x => x * 2, x => x + 1)(3), 7);
assertEqual("Exercise 1: pipe empty", pipe()(42), 42);

// Exercise 2: mapStage — returns a pipeline stage that maps fn over elements
function mapStage(fn) {
  return (data) => data.map(fn);
}
assertEqual("Exercise 2: mapStage doubles", mapStage(x => x * 2)([1, 2, 3]), [2, 4, 6]);

// Exercise 3: filterStage — returns a pipeline stage that keeps matching elements
function filterStage(pred) {
  return (data) => data.filter(pred);
}
assertEqual("Exercise 3: filterStage evens", filterStage(x => x % 2 === 0)([1, 2, 3, 4]), [2, 4]);

// Exercise 4: reduceStage — returns a pipeline stage that collapses an array
function reduceStage(reducer, initial) {
  return (data) => data.reduce(reducer, initial);
}
assertEqual("Exercise 4: reduceStage sum", reduceStage((acc, x) => acc + x, 0)([1, 2, 3]), 6);

// Exercise 5: runPipeline — compose stages and run input through them
function runPipeline(input, stages) {
  return pipe(...stages)(input);
}
const visits = [
  { page: "/", user: "alice" },
  { page: "/about", user: "bob" },
  { page: "/", user: "carol" },
];
assertEqual(
  "Exercise 5: pipeline count homepage visits",
  runPipeline(visits, [
    filterStage(v => v.page === "/"),
    reduceStage((acc, _) => acc + 1, 0),
  ]),
  2,
);
assertEqual(
  "Exercise 5: pipeline map then filter",
  runPipeline([1, 2, 3, 4], [
    mapStage(x => x * 3),
    filterStage(x => x > 5),
  ]),
  [6, 9, 12],
);
assertEqual(
  "Exercise 5: pipeline empty input",
  runPipeline([], [mapStage(x => x * 2)]),
  [],
);

// Exercise 6: summarizeEvents — group events by type and count
function summarizeEvents(events) {
  const counts = Object.create(null);
  for (const event of events) {
    const prev = Object.hasOwn(counts, event.type) ? counts[event.type] : 0;
    counts[event.type] = prev + 1;
  }
  return { ...counts };
}
const events = [
  { type: "click" },
  { type: "scroll" },
  { type: "click" },
  { type: "hover" },
  { type: "click" },
];
assertEqual("Exercise 6: summarizeEvents counts", summarizeEvents(events), {
  click: 3, scroll: 1, hover: 1,
});
assertEqual("Exercise 6: summarizeEvents empty", summarizeEvents([]), {});
