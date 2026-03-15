// SOLUTION: Exercise 2 - Event-Driven Architecture
// Compare with your work to see how you did!

import { EventEmitter } from "events";

console.log("=== Exercise 2: Event-Driven Architecture (Solution) ===\n");

// ============================================
// SOLUTION 1: Create Event Emitter for Goal Updates
// ============================================

type GoalEventPayload = {
  goalId: string;
  userId: string;
  title: string;
  timestamp: number;
  target?: number;
  progress?: number;
  status?: string;
};

// SOLUTION: Type-safe event emitter for goal events
class GoalEventEmitter {
  private emitter: EventEmitter = new EventEmitter();

  // Register handler for goal created events
  onGoalCreated(handler: (payload: GoalEventPayload) => void): void {
    this.emitter.on("goal.created", handler);
  }

  // Emit goal created event
  emitGoalCreated(payload: GoalEventPayload): void {
    this.emitter.emit("goal.created", payload);
  }

  // Register handler for goal updated events
  onGoalUpdated(handler: (payload: GoalEventPayload) => void): void {
    this.emitter.on("goal.updated", handler);
  }

  // Emit goal updated event
  emitGoalUpdated(payload: GoalEventPayload): void {
    this.emitter.emit("goal.updated", payload);
  }

  // Register handler for goal completed events
  onGoalCompleted(handler: (payload: GoalEventPayload) => void): void {
    this.emitter.on("goal.completed", handler);
  }

  // Emit goal completed event
  emitGoalCompleted(payload: GoalEventPayload): void {
    this.emitter.emit("goal.completed", payload);
  }

  // Register handler for goal deleted events
  onGoalDeleted(handler: (payload: { goalId: string; userId: string; timestamp: number }) => void): void {
    this.emitter.on("goal.deleted", handler);
  }

  // Emit goal deleted event
  emitGoalDeleted(payload: { goalId: string; userId: string; timestamp: number }): void {
    this.emitter.emit("goal.deleted", payload);
  }

  // Remove all listeners for an event
  removeAllListeners(eventType?: string): void {
    if (eventType) {
      this.emitter.removeAllListeners(eventType);
    } else {
      this.emitter.removeAllListeners();
    }
  }
}

console.log("--- SOLUTION 1: Goal Event Emitter ---\n");

const goalEmitter = new GoalEventEmitter();

// Register multiple listeners
goalEmitter.onGoalCreated((payload) => {
  console.log(`✅ Listener 1: Goal created - ${payload.title}`);
});

goalEmitter.onGoalCreated((payload) => {
  console.log(`✅ Listener 2: Notifying user ${payload.userId}`);
});

goalEmitter.onGoalCompleted((payload) => {
  console.log(`🎉 Goal completed: ${payload.title}`);
});

// Emit events
goalEmitter.emitGoalCreated({
  goalId: "goal-123",
  userId: "user-456",
  title: "Walk 10,000 steps daily",
  target: 10000,
  timestamp: Date.now(),
});

goalEmitter.emitGoalCompleted({
  goalId: "goal-123",
  userId: "user-456",
  title: "Walk 10,000 steps daily",
  progress: 10000,
  status: "completed",
  timestamp: Date.now(),
});

console.log("\nKey Points:");
console.log("  - Event naming: resource.action (goal.created)");
console.log("  - Type-safe payloads with TypeScript");
console.log("  - Multiple listeners per event type");
console.log("  - Encapsulated event handling");
console.log("");

// ============================================
// SOLUTION 2: Implement Event Routing by Type
// ============================================

interface EventHandler {
  (payload: unknown): void;
}

interface RoutePattern {
  pattern: string;
  handler: EventHandler;
}

// SOLUTION: Event router with wildcard support
class EventRouter {
  private routes: RoutePattern[] = [];
  private routingStats: Map<string, number> = new Map();

  on(pattern: string, handler: EventHandler): void {
    this.routes.push({ pattern, handler });
    console.log(`📝 Registered handler for pattern: ${pattern}`);
  }

  route(eventType: string, payload: unknown): void {
    console.log(`🔀 Routing event: ${eventType}`);

    let handlersCalled = 0;

    this.routes.forEach((route) => {
      if (this.matches(route.pattern, eventType)) {
        console.log(`  → Matched pattern: ${route.pattern}`);
        try {
          route.handler(payload);
          handlersCalled++;
        } catch (error) {
          console.log(`  ❌ Handler error: ${(error as Error).message}`);
        }
      }
    });

    // Track statistics
    this.routingStats.set(eventType, (this.routingStats.get(eventType) || 0) + 1);

    console.log(`  ✅ Called ${handlersCalled} handler(s)\n`);
  }

  private matches(pattern: string, eventType: string): boolean {
    // Exact match
    if (pattern === eventType) {
      return true;
    }

    // Wildcard match (e.g., "goal.*" matches "goal.created")
    if (pattern.endsWith(".*")) {
      const prefix = pattern.slice(0, -2);
      return eventType.startsWith(prefix + ".");
    }

    return false;
  }

  getStats(): { routes: number; handlers: number; routingStats: Record<string, number> } {
    const stats: Record<string, number> = {};
    this.routingStats.forEach((count, type) => {
      stats[type] = count;
    });

    return {
      routes: this.routes.length,
      handlers: this.routes.length,
      routingStats: stats,
    };
  }

  removeHandler(pattern: string): void {
    this.routes = this.routes.filter((r) => r.pattern !== pattern);
    console.log(`🗑️  Removed handlers for pattern: ${pattern}`);
  }
}

console.log("--- SOLUTION 2: Event Routing ---\n");

const router = new EventRouter();

// Register handlers
router.on("goal.created", (payload) => {
  console.log(`    [Specific] Goal created handler`);
});

router.on("goal.*", (payload) => {
  console.log(`    [Wildcard] Any goal event handler`);
});

router.on("*.created", (payload) => {
  console.log(`    [Wildcard] Any created event handler`);
});

router.on("*", (payload) => {
  console.log(`    [Wildcard] Catch-all handler`);
});

// Route events
router.route("goal.created", { goalId: "123" });
router.route("goal.updated", { goalId: "123" });
router.route("user.created", { userId: "456" });

const stats = router.getStats();
console.log("Routing Statistics:");
console.log(`  Total routes: ${stats.routes}`);
console.log("  Events routed:");
Object.entries(stats.routingStats).forEach(([type, count]) => {
  console.log(`    ${type}: ${count}`);
});
console.log("");

console.log("Key Points:");
console.log("  - Wildcard patterns (* match any event)");
console.log("  - Multiple handlers can match same event");
console.log("  - Handlers called in registration order");
console.log("  - Statistics tracking for monitoring");
console.log("");

// ============================================
// SOLUTION 3: Add Event Serialization/Validation
// ============================================

interface ValidatedEvent {
  type: string;
  version: string;
  timestamp: number;
  payload: unknown;
}

// SOLUTION: Event validation and serialization
class EventValidator {
  private readonly SUPPORTED_VERSIONS = ["1.0", "2.0"];

  validate(event: unknown): ValidatedEvent {
    if (!event || typeof event !== "object") {
      throw new Error("Event must be an object");
    }

    const e = event as Record<string, unknown>;

    // Validate type
    if (!e.type || typeof e.type !== "string") {
      throw new Error("Event must have a 'type' field (string)");
    }

    // Validate version
    if (!e.version || typeof e.version !== "string") {
      throw new Error("Event must have a 'version' field (string)");
    }

    if (!this.isVersionSupported(e.version)) {
      throw new Error(`Unsupported version: ${e.version}. Supported: ${this.SUPPORTED_VERSIONS.join(", ")}`);
    }

    // Validate timestamp
    if (!e.timestamp || typeof e.timestamp !== "number") {
      throw new Error("Event must have a 'timestamp' field (number)");
    }

    if (e.timestamp <= 0 || e.timestamp > Date.now() + 60000) {
      throw new Error("Invalid timestamp (must be positive and not too far in future)");
    }

    return e as ValidatedEvent;
  }

  serialize(event: ValidatedEvent): string {
    try {
      return JSON.stringify(event);
    } catch (error) {
      throw new Error(`Serialization failed: ${(error as Error).message}`);
    }
  }

  deserialize(json: string): ValidatedEvent {
    try {
      const parsed = JSON.parse(json);
      return this.validate(parsed);
    } catch (error) {
      throw new Error(`Deserialization failed: ${(error as Error).message}`);
    }
  }

  private isVersionSupported(version: string): boolean {
    return this.SUPPORTED_VERSIONS.includes(version);
  }

  // Helper to create a valid event
  createEvent(type: string, payload: unknown, version = "1.0"): ValidatedEvent {
    return {
      type,
      version,
      timestamp: Date.now(),
      payload,
    };
  }
}

console.log("--- SOLUTION 3: Event Serialization/Validation ---\n");

const validator = new EventValidator();

// Test valid event
const validEvent = validator.createEvent("goal.completed", {
  goalId: "goal-123",
  userId: "user-456",
});

console.log("Testing validation:");
try {
  const validated = validator.validate(validEvent);
  console.log(`✅ Valid event: ${validated.type} v${validated.version}`);
} catch (error) {
  console.log(`❌ Error: ${(error as Error).message}`);
}

// Test invalid event (missing version)
const invalidEvent = {
  type: "goal.completed",
  timestamp: Date.now(),
  payload: {},
};

try {
  validator.validate(invalidEvent);
} catch (error) {
  console.log(`✅ Expected error: ${(error as Error).message}`);
}

// Test serialization/deserialization
console.log("\nTesting serialization:");
const serialized = validator.serialize(validEvent);
console.log(`📦 Serialized: ${serialized.substring(0, 50)}...`);

const deserialized = validator.deserialize(serialized);
console.log(`📥 Deserialized: ${deserialized.type} v${deserialized.version}`);
console.log("");

console.log("Key Points:");
console.log("  - Comprehensive validation of event structure");
console.log("  - Version checking for compatibility");
console.log("  - Safe serialization/deserialization");
console.log("  - Helper methods for event creation");
console.log("");

// ============================================
// SOLUTION 4: Handle Failed Events (Dead Letter Queue)
// ============================================

interface FailedEvent {
  event: ValidatedEvent;
  error: string;
  timestamp: number;
  retryCount: number;
}

// SOLUTION: Dead letter queue with retry logic
class DeadLetterQueue {
  private queue: FailedEvent[] = [];
  private readonly MAX_RETRIES = 3;

  add(event: ValidatedEvent, error: string): void {
    const failed: FailedEvent = {
      event,
      error,
      timestamp: Date.now(),
      retryCount: 0,
    };

    this.queue.push(failed);
    console.log(`❌ Added to DLQ: ${event.type} - ${error}`);
  }

  retry(reprocessFn: (event: ValidatedEvent) => boolean): void {
    console.log(`🔄 Retrying ${this.queue.length} failed events`);

    this.queue = this.queue.filter((failed) => {
      if (failed.retryCount >= this.MAX_RETRIES) {
        console.log(`❌ Max retries reached for ${failed.event.type}, removing`);
        return false; // Remove from queue
      }

      failed.retryCount++;
      console.log(`🔄 Retrying ${failed.event.type} (attempt ${failed.retryCount}/${this.MAX_RETRIES})`);

      try {
        const success = reprocessFn(failed.event);
        if (success) {
          console.log(`✅ Successfully processed ${failed.event.type}`);
          return false; // Remove from queue
        }
        return true; // Keep in queue
      } catch (error) {
        console.log(`❌ Retry failed: ${(error as Error).message}`);
        return true; // Keep in queue
      }
    });

    console.log(`✅ Retry complete. Queue size: ${this.queue.length}\n`);
  }

  size(): number {
    return this.queue.length;
  }

  getAll(): FailedEvent[] {
    return [...this.queue];
  }

  clear(): void {
    this.queue = [];
    console.log("🗑️  Dead letter queue cleared");
  }

  getStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    this.queue.forEach((failed) => {
      stats[failed.event.type] = (stats[failed.event.type] || 0) + 1;
    });
    return stats;
  }
}

console.log("--- SOLUTION 4: Dead Letter Queue ---\n");

const dlq = new DeadLetterQueue();

// Add failed events
dlq.add(
  {
    type: "payment.processed",
    version: "1.0",
    timestamp: Date.now(),
    payload: { amount: 100 },
  },
  "Payment gateway timeout"
);

dlq.add(
  {
    type: "email.sent",
    version: "1.0",
    timestamp: Date.now(),
    payload: { to: "user@example.com" },
  },
  "Email service unavailable"
);

dlq.add(
  {
    type: "notification.push",
    version: "1.0",
    timestamp: Date.now(),
    payload: { userId: "user-123" },
  },
  "Push service down"
);

console.log(`\nDLQ size: ${dlq.size()}`);
console.log("Failed events by type:");
const dlqStats = dlq.getStats();
Object.entries(dlqStats).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});

console.log("\nRetrying with 50% success rate:");
dlq.retry((event) => {
  console.log(`  Processing ${event.type}...`);
  return Math.random() > 0.5;
});

console.log("Key Points:");
console.log("  - Failed events stored with error context");
console.log("  - Retry attempts tracked and limited");
console.log("  - Events removed after max retries");
console.log("  - Statistics for monitoring failed events");
console.log("");

// ============================================
// SOLUTION 5: Create Event Replay Mechanism
// ============================================

interface StoredEvent extends ValidatedEvent {
  id: string;
  storedAt: number;
}

// SOLUTION: Event store with replay capability
class EventStore {
  private events: StoredEvent[] = [];
  private idCounter = 0;

  store(event: ValidatedEvent): StoredEvent {
    const stored: StoredEvent = {
      ...event,
      id: `evt-${++this.idCounter}`,
      storedAt: Date.now(),
    };

    this.events.push(stored);
    console.log(`💾 Stored event ${stored.id}: ${event.type}`);
    return stored;
  }

  replay(fromTimestamp: number, eventType?: string): StoredEvent[] {
    console.log(`🔄 Replaying events from ${new Date(fromTimestamp).toISOString()}`);

    let replayed = this.events.filter((e) => e.timestamp >= fromTimestamp);

    if (eventType) {
      replayed = replayed.filter((e) => e.type === eventType);
      console.log(`📋 Filtering by type: ${eventType}`);
    }

    console.log(`📋 Replayed ${replayed.length} events:`);
    replayed.forEach((e) => {
      console.log(`  - ${e.id}: ${e.type} at ${new Date(e.timestamp).toISOString()}`);
    });

    return replayed;
  }

  getById(id: string): StoredEvent | undefined {
    return this.events.find((e) => e.id === id);
  }

  getByType(eventType: string): StoredEvent[] {
    return this.events.filter((e) => e.type === eventType);
  }

  getStats(): { totalEvents: number; eventTypes: Record<string, number>; oldestEvent?: number; newestEvent?: number } {
    const eventTypes: Record<string, number> = {};
    let oldestEvent: number | undefined;
    let newestEvent: number | undefined;

    this.events.forEach((e) => {
      eventTypes[e.type] = (eventTypes[e.type] || 0) + 1;

      if (!oldestEvent || e.timestamp < oldestEvent) {
        oldestEvent = e.timestamp;
      }
      if (!newestEvent || e.timestamp > newestEvent) {
        newestEvent = e.timestamp;
      }
    });

    return {
      totalEvents: this.events.length,
      eventTypes,
      oldestEvent,
      newestEvent,
    };
  }

  clear(): void {
    this.events = [];
    console.log("🗑️  Event store cleared");
  }
}

console.log("--- SOLUTION 5: Event Replay ---\n");

const eventStore = new EventStore();

// Store events with different timestamps
const now = Date.now();

eventStore.store({
  type: "goal.created",
  version: "1.0",
  timestamp: now - 5000,
  payload: { goalId: "goal-1", title: "Walk daily" },
});

eventStore.store({
  type: "goal.updated",
  version: "1.0",
  timestamp: now - 4000,
  payload: { goalId: "goal-1", progress: 5000 },
});

eventStore.store({
  type: "goal.completed",
  version: "1.0",
  timestamp: now - 3000,
  payload: { goalId: "goal-1" },
});

eventStore.store({
  type: "goal.created",
  version: "1.0",
  timestamp: now - 2000,
  payload: { goalId: "goal-2", title: "Drink water" },
});

eventStore.store({
  type: "session.started",
  version: "1.0",
  timestamp: now - 1000,
  payload: { sessionId: "session-123" },
});

console.log("");

// Replay all events from 4 seconds ago
eventStore.replay(now - 4000);

console.log("");

// Replay only goal.created events
eventStore.replay(now - 6000, "goal.created");

// Get statistics
const storeStats = eventStore.getStats();
console.log("\nEvent Store Statistics:");
console.log(`  Total events: ${storeStats.totalEvents}`);
console.log("  Event types:");
Object.entries(storeStats.eventTypes).forEach(([type, count]) => {
  console.log(`    ${type}: ${count}`);
});
console.log(`  Time range: ${new Date(storeStats.oldestEvent || 0).toISOString()} to ${new Date(storeStats.newestEvent || 0).toISOString()}`);
console.log("");

console.log("Key Points:");
console.log("  - Events stored with unique IDs and timestamps");
console.log("  - Replay from specific timestamp");
console.log("  - Filter by event type");
console.log("  - Statistics for monitoring and analysis");
console.log("");

// ============================================
// BONUS: Complete Event Processing Pipeline
// ============================================

// SOLUTION: Production-ready event pipeline
class EventPipeline {
  private validator: EventValidator;
  private router: EventRouter;
  private dlq: DeadLetterQueue;
  private store: EventStore;
  private metrics: Map<string, number> = new Map();

  constructor() {
    this.validator = new EventValidator();
    this.router = new EventRouter();
    this.dlq = new DeadLetterQueue();
    this.store = new EventStore();
  }

  // Process an event through the entire pipeline
  process(event: unknown): boolean {
    const startTime = Date.now();

    try {
      // Step 1: Validate
      const validated = this.validator.validate(event);

      // Step 2: Store for replay
      this.store.store(validated);

      // Step 3: Route to handlers
      this.router.route(validated.type, validated.payload);

      // Step 4: Track metrics
      this.trackMetric("events.processed");
      this.trackMetric(`events.${validated.type}`);

      const duration = Date.now() - startTime;
      this.trackMetric("processing.time.ms", duration);

      console.log(`✅ Pipeline processed ${validated.type} in ${duration}ms\n`);
      return true;
    } catch (error) {
      // Step 5: Handle errors
      const errorMessage = (error as Error).message;
      console.log(`❌ Pipeline error: ${errorMessage}`);

      try {
        const validated = this.validator.validate(event);
        this.dlq.add(validated, errorMessage);
      } catch {
        // If we can't even validate, still add to DLQ
        this.dlq.add(
          {
            type: "unknown",
            version: "1.0",
            timestamp: Date.now(),
            payload: event,
          },
          errorMessage
        );
      }

      this.trackMetric("events.failed");
      return false;
    }
  }

  // Register a handler for an event pattern
  on(pattern: string, handler: EventHandler): void {
    this.router.on(pattern, handler);
  }

  // Retry failed events
  retryFailed(): void {
    this.dlq.retry((event) => this.process(event));
  }

  // Replay events from timestamp
  replay(fromTimestamp: number): void {
    const events = this.store.replay(fromTimestamp);
    events.forEach((event) => {
      this.router.route(event.type, event.payload);
    });
  }

  // Get pipeline metrics
  getMetrics(): Record<string, number> {
    const metrics: Record<string, number> = {};
    this.metrics.forEach((value, key) => {
      metrics[key] = value;
    });
    return metrics;
  }

  // Get combined statistics
  getStats(): {
    pipeline: Record<string, number>;
    store: ReturnType<EventStore["getStats"]>;
    dlq: { size: number; events: Record<string, number> };
  } {
    return {
      pipeline: this.getMetrics(),
      store: this.store.getStats(),
      dlq: {
        size: this.dlq.size(),
        events: this.dlq.getStats(),
      },
    };
  }

  private trackMetric(name: string, value = 1): void {
    this.metrics.set(name, (this.metrics.get(name) || 0) + value);
  }
}

console.log("--- BONUS: Complete Event Pipeline ---\n");

const pipeline = new EventPipeline();

// Register handlers
pipeline.on("goal.*", (payload) => {
  console.log(`    [Handler] Processing goal event`);
});

pipeline.on("session.*", (payload) => {
  console.log(`    [Handler] Processing session event`);
});

// Process events
console.log("Processing events through pipeline:");

pipeline.process({
  type: "goal.created",
  version: "1.0",
  timestamp: Date.now(),
  payload: { goalId: "goal-1", title: "Walk daily" },
});

pipeline.process({
  type: "session.started",
  version: "1.0",
  timestamp: Date.now(),
  payload: { sessionId: "session-123" },
});

// Process invalid event (will go to DLQ)
pipeline.process({
  type: "invalid.event",
  // Missing version - will be caught and sent to DLQ
});

// Get pipeline statistics
const pipelineStats = pipeline.getStats();
console.log("\nPipeline Statistics:");
console.log("  Pipeline metrics:");
Object.entries(pipelineStats.pipeline).forEach(([metric, value]) => {
  console.log(`    ${metric}: ${value}`);
});
console.log(`  Store: ${pipelineStats.store.totalEvents} events`);
console.log(`  DLQ: ${pipelineStats.dlq.size} failed events");
console.log("");

console.log("Key Features:");
console.log("  - ✅ Event validation");
console.log("  - ✅ Event routing with wildcards");
console.log("  - ✅ Error handling with DLQ");
console.log("  - ✅ Event storage for replay");
console.log("  - ✅ Metrics collection");
console.log("  - ✅ Retry mechanism");
console.log("");

console.log("\n✅ Solution complete!");
console.log("\nTakeaways:");
console.log("  - Event emitters provide loose coupling between components");
console.log("  - Wildcard routing enables flexible event handling");
console.log("  - Validation ensures event quality and compatibility");
console.log("  - Dead letter queues prevent event loss during failures");
console.log("  - Event replay enables debugging and recovery");
console.log("  - Production systems combine all these patterns");

export {};
