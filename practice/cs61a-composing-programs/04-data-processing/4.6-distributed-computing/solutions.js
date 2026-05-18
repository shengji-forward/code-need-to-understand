import { assertEqual } from "../../shared/helpers.js";

// --- Message construction and serialization ---

// Exercise 1: makeMessage — construct a validated message object
function makeMessage({ from, to, type, payload }) {
  return { from, to, type, payload };
}
assertEqual("Exercise 1: makeMessage creates message",
  makeMessage({ from: "a", to: "b", type: "ping", payload: {} }),
  { from: "a", to: "b", type: "ping", payload: {} });
assertEqual("Exercise 1: makeMessage carries payload",
  makeMessage({ from: "c", to: "d", type: "data", payload: { x: 1 } }).payload.x, 1);

// Exercise 2: serializeMessage and deserializeMessage
function serializeMessage(message) {
  return JSON.stringify(message);
}
function deserializeMessage(text) {
  return JSON.parse(text);
}
const original = makeMessage({ from: "client", to: "server", type: "query", payload: { key: "temp" } });
const wire = serializeMessage(original);
assertEqual("Exercise 2: serialize produces string", typeof wire, "string");
const restored = deserializeMessage(wire);
assertEqual("Exercise 2: round-trip preserves from", restored.from, "client");
assertEqual("Exercise 2: round-trip preserves payload", restored.payload.key, "temp");

// --- MessageBus ---

// Exercise 3: MessageBus — register handlers and send messages
class MessageBus {
  constructor() {
    this._handlers = Object.create(null);
    this._log = [];
  }
  register(id, handler) {
    this._handlers[id] = handler;
  }
  send(message) {
    const wire = serializeMessage(message);
    const delivered = deserializeMessage(wire);
    this._log.push(delivered);
    const handler = this._handlers[delivered.to];
    if (handler) return handler(delivered);
    return undefined;
  }
  broadcast(from, type, payload) {
    const results = [];
    for (const id of Object.keys(this._handlers)) {
      if (id !== from) {
        const msg = makeMessage({ from, to: id, type, payload });
        const result = this.send(msg);
        if (result !== undefined) results.push({ to: id, result });
      }
    }
    return results;
  }
  getLog() {
    return this._log;
  }
}
const bus3 = new MessageBus();
bus3.register("echo", (msg) => makeMessage({ from: "echo", to: msg.from, type: "reply", payload: msg.payload }));
const reply3 = bus3.send(makeMessage({ from: "caller", to: "echo", type: "ping", payload: { v: 42 } }));
assertEqual("Exercise 3: send routes to handler", reply3.type, "reply");
assertEqual("Exercise 3: send round-trips payload", reply3.payload.v, 42);
assertEqual("Exercise 3: send to unknown returns undefined",
  bus3.send(makeMessage({ from: "a", to: "noone", type: "x", payload: {} })), undefined);

// Exercise 4: broadcast — send to all except sender
const bus4 = new MessageBus();
bus4.register("n1", () => "r1");
bus4.register("n2", () => "r2");
bus4.register("n3", () => "r3");
const bc4 = bus4.broadcast("n1", "hello", { x: 1 });
assertEqual("Exercise 4: broadcast reaches all others", bc4.length, 2);
assertEqual("Exercise 4: broadcast omits sender", bc4.every(r => r.to !== "n1"), true);
assertEqual("Exercise 4: broadcast log length", bus4.getLog().length, 2);

// --- Client/Server ---

// Exercise 5: Server — handle query and respond
class Server {
  constructor(id, bus, data = {}) {
    this.id = id;
    this.data = data;
    bus.register(id, (message) => this.handle(message));
  }
  handle(message) {
    if (message.type === "query") {
      const value = this.data[message.payload.key];
      if (value !== undefined) {
        return makeMessage({ from: this.id, to: message.from, type: "response", payload: { key: message.payload.key, value } });
      }
      return makeMessage({ from: this.id, to: message.from, type: "error", payload: { code: 404, text: `Key not found: ${message.payload.key}` } });
    }
    return undefined;
  }
}

// Exercise 6: Client — send request to server
class Client {
  constructor(id, bus) {
    this.id = id;
    this.bus = bus;
    bus.register(id, () => {});
  }
  request(serverId, type, payload) {
    return this.bus.send(makeMessage({ from: this.id, to: serverId, type, payload }));
  }
}
const bus56 = new MessageBus();
new Server("weather", bus56, { temp: 72, cond: "sunny" });
const phone = new Client("phone", bus56);
const laptop = new Client("laptop", bus56);
const r5a = phone.request("weather", "query", { key: "temp" });
assertEqual("Exercise 5: server responds with value", r5a.payload.value, 72);
assertEqual("Exercise 5: server response type", r5a.type, "response");
const r5b = laptop.request("weather", "query", { key: "cond" });
assertEqual("Exercise 6: second client gets data", r5b.payload.value, "sunny");
const r5c = phone.request("weather", "query", { key: "wind" });
assertEqual("Exercise 6: missing key returns error", r5c.type, "error");
assertEqual("Exercise 6: error has code", r5c.payload.code, 404);
assertEqual("Exercise 6: bus logged all messages", bus56.getLog().length, 3);

// --- Peer-to-Peer ---

// Exercise 7: Peer — forward messages with visited set and loop detection
class Peer {
  constructor(id, bus) {
    this.id = id;
    this.bus = bus;
    this.neighbors = [];
    bus.register(id, (message) => this.receive(message));
  }
  addNeighbor(peerId) {
    if (!this.neighbors.includes(peerId)) this.neighbors.push(peerId);
  }
  receive(message) {
    if (message.finalDest === this.id) return this.handle(message);
    return this.forward(message);
  }
  handle(message) {
    if (message.type === "ping") {
      return makeMessage({ from: this.id, to: message.from, type: "pong", payload: { echo: message.payload } });
    }
    return undefined;
  }
  forward(message) {
    const visited = message.payload._visited || [];
    if (visited.includes(this.id)) return undefined;
    const newVisited = [...visited, this.id];
    for (const nId of this.neighbors) {
      if (!newVisited.includes(nId)) {
        const fwd = makeMessage({ from: this.id, to: nId, type: message.type, payload: { ...message.payload, _visited: newVisited } });
        fwd.finalDest = message.finalDest;
        const result = this.bus.send(fwd);
        if (result !== undefined) return result;
      }
    }
    return undefined;
  }
  sendTo(targetId, type, payload) {
    const message = makeMessage({ from: this.id, to: null, type, payload: { ...payload, _visited: [] } });
    message.finalDest = targetId;
    return this.forward(message);
  }
}

// Linear: A -- B -- C -- D
const bus7 = new MessageBus();
const pA = new Peer("A", bus7);
const pB = new Peer("B", bus7);
const pC = new Peer("C", bus7);
const pD = new Peer("D", bus7);
pA.addNeighbor("B");
pB.addNeighbor("A"); pB.addNeighbor("C");
pC.addNeighbor("B"); pC.addNeighbor("D");
pD.addNeighbor("C");
const r7 = pA.sendTo("D", "ping", { greeting: "hi" });
assertEqual("Exercise 7: peer forwarding reaches target", r7.type, "pong");
assertEqual("Exercise 7: pong carries echo", r7.payload.echo.greeting, "hi");
assertEqual("Exercise 7: pong from correct peer", r7.from, "D");
assertEqual("Exercise 7: three hops on wire", bus7.getLog().length, 3);

// Exercise 8: loop detection — cycle terminates, unknown peer returns undefined
pA.addNeighbor("D"); pD.addNeighbor("A");
const r8 = pA.sendTo("Z", "ping", { test: "loop" });
assertEqual("Exercise 8: unknown peer returns undefined", r8, undefined);
const loopMsgs = bus7.getLog().filter(m => m.payload.test === "loop");
assertEqual("Exercise 8: cycle messages are finite", loopMsgs.length > 0, true);
assertEqual("Exercise 8: all messages have distinct from->to", loopMsgs.length, 6);
assertEqual("Exercise 8: no self-messages", loopMsgs.every(m => m.from !== m.to), true);
