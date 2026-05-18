import { assertEqual } from "../../shared/helpers.js";

// --- Partition ---

// Exercise 1: partition — split items into N chunks deterministically
// TODO: Distribute items round-robin by index modulo partitionCount
function partition(items, partitionCount) {
  return [];
}
assertEqual("Exercise 1: partition 6 items into 2",
  partition(["a", "b", "c", "d", "e", "f"], 2),
  [["a", "c", "e"], ["b", "d", "f"]]);
assertEqual("Exercise 1: partition into 3",
  partition([1, 2, 3, 4, 5], 3),
  [[1, 4], [2, 5], [3]]);
assertEqual("Exercise 1: partition empty", partition([], 3), [[], [], []]);
assertEqual("Exercise 1: more partitions than items",
  partition(["x"], 3), [["x"], [], []]);

// --- Map phase ---

// Exercise 2: mapPartition — apply mapper to each item in one partition
// TODO: For each item, call mapper and collect all emitted [key, value] pairs
function mapPartition(part, mapper) {
  return [];
}
function echoMapper(item) {
  return [[item, 1]];
}
assertEqual("Exercise 2: mapPartition single item",
  mapPartition(["hello"], echoMapper), [["hello", 1]]);
assertEqual("Exercise 2: mapPartition multiple items",
  mapPartition(["a", "b"], echoMapper), [["a", 1], ["b", 1]]);
assertEqual("Exercise 2: mapPartition empty", mapPartition([], echoMapper), []);

// --- Shuffle ---

// Exercise 3: shuffle — group [key, value] pairs by key
// TODO: Build an object mapping each key to its array of values
function shuffle(mappedPairs) {
  return {};
}
assertEqual("Exercise 3: shuffle groups pairs",
  shuffle([["a", 1], ["b", 2], ["a", 3]]),
  { a: [1, 3], b: [2] });
assertEqual("Exercise 3: shuffle empty", shuffle([]), {});
assertEqual("Exercise 3: shuffle single key",
  shuffle([["x", 1], ["x", 2], ["x", 3]]),
  { x: [1, 2, 3] });

// --- Reduce ---

// Exercise 4: reduceGroups — apply reducer to each key's values
// TODO: For each key (sorted), apply reducer(key, values) and collect results
function reduceGroups(groups, reducer) {
  return {};
}
function sumReducer(key, values) {
  return values.reduce((a, b) => a + b, 0);
}
assertEqual("Exercise 4: reduceGroups sums",
  reduceGroups({ a: [1, 3], b: [2] }, sumReducer),
  { a: 4, b: 2 });
assertEqual("Exercise 4: reduceGroups empty input",
  reduceGroups({}, sumReducer), {});
assertEqual("Exercise 4: reduceGroups sorted keys",
  Object.keys(reduceGroups({ z: [1], a: [2], m: [3] }, sumReducer)),
  ["a", "m", "z"]);

// --- Pipeline ---

// Exercise 5: mapReduce — compose the full pipeline
// TODO: partition -> mapPartition -> shuffle -> reduceGroups
function mapReduce(items, mapper, reducer, partitionCount = 2) {
  return {};
}
const lines5 = ["the quick brown", "quick fox jumps", "the fox was quick"];
function wcMapper5(line) {
  return line.split(/\s+/).filter(w => w.length > 0).map(w => [w, 1]);
}
const result5 = mapReduce(lines5, wcMapper5, sumReducer);
assertEqual("Exercise 5: mapReduce the count", result5.the, 2);
assertEqual("Exercise 5: mapReduce quick count", result5.quick, 3);
assertEqual("Exercise 5: mapReduce fox count", result5.fox, 2);
assertEqual("Exercise 5: mapReduce all keys sorted",
  Object.keys(result5), ["brown", "fox", "jumps", "quick", "the", "was"]);
assertEqual("Exercise 5: mapReduce empty input",
  mapReduce([], wcMapper5, sumReducer), {});

// --- Word Count ---

// Exercise 6: wordCount — classic MapReduce example
// TODO: Lowercase words, emit [word, 1], reduce by summing
function wordCountMapper(line) {
  return [];
}
function wordCount(lines) {
  return {};
}
const lines6 = [
  "the quick brown fox",
  "jumps over the lazy dog",
  "the fox was quick",
];
const wc6 = wordCount(lines6);
assertEqual("Exercise 6: wordCount the", wc6.the, 3);
assertEqual("Exercise 6: wordCount fox", wc6.fox, 2);
assertEqual("Exercise 6: wordCount quick", wc6.quick, 2);
assertEqual("Exercise 6: wordCount dog", wc6.dog, 1);
assertEqual("Exercise 6: wordCount key count", Object.keys(wc6).length, 9);

// --- Inverted Index ---

// Exercise 7: invertedIndex — map words to document IDs
// TODO: Emit [word, docId] for unique words in each document; reduce by dedup+sort
function invertedIndexMapper(document) {
  return [];
}
function invertedIndexReducer(key, docIds) {
  return [];
}
function invertedIndex(documents) {
  return {};
}
const docs7 = [
  { id: "doc1", text: "map reduce distributed" },
  { id: "doc2", text: "distributed data processing" },
  { id: "doc3", text: "map data filter" },
];
const idx7 = invertedIndex(docs7);
assertEqual("Exercise 7: invertedIndex map", idx7.map, ["doc1", "doc3"]);
assertEqual("Exercise 7: invertedIndex distributed", idx7.distributed, ["doc1", "doc2"]);
assertEqual("Exercise 7: invertedIndex data", idx7.data, ["doc2", "doc3"]);
assertEqual("Exercise 7: invertedIndex reduce", idx7.reduce, ["doc1"]);
assertEqual("Exercise 7: invertedIndex filter", idx7.filter, ["doc3"]);
assertEqual("Exercise 7: invertedIndex key count", Object.keys(idx7).length, 6);

// --- Combiner ---

// Exercise 8: combiner — local pre-aggregation before shuffle
// TODO: Group [key, value] pairs locally and sum values per key
function wordCountCombiner(pairs) {
  return [];
}
const raw8 = wordCountMapper("the the the quick quick fox");
const combined8 = wordCountCombiner(raw8);
assertEqual("Exercise 8: combiner reduces pairs",
  combined8.length < raw8.length, true);
const combinedMap8 = Object.fromEntries(combined8);
assertEqual("Exercise 8: combiner sums the", combinedMap8.the, 3);
assertEqual("Exercise 8: combiner sums quick", combinedMap8.quick, 2);
assertEqual("Exercise 8: combiner sums fox", combinedMap8.fox, 1);

// Verify combiner produces same final result as without combiner
const lines8 = ["the quick brown", "quick fox jumps", "the fox was quick"];
const parts8 = partition(lines8, 2);
const mappedParts8 = parts8.map(part => wordCountCombiner(mapPartition(part, wordCountMapper)));
const grouped8 = shuffle(mappedParts8.flat());
const resultWithCombiner = reduceGroups(grouped8, sumReducer);
assertEqual("Exercise 8: combiner same result as full",
  resultWithCombiner, mapReduce(lines8, wordCountMapper, sumReducer));
