// EXERCISE 2: Event-Driven Architecture
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx 06-websocket-realtime/exercises/exercise-02-events.ts

import { EventEmitter } from "events";

console.log("=== Exercise 2: Event-Driven Architecture ===\n");

// ============================================
// TODO 1: Create Event Emitter for Goal Updates
// ============================================
// Instructions:
// - Create an event emitter for health coaching goal updates
// - Implement event types: goal.created, goal.updated, goal.completed, goal.deleted
// - Use proper event naming conventions
// - Include TypeScript types for event payloads

type GoalEventPayload = {
  // TODO: Define the structure of a goal event payload
  // Should include: goalId, userId, timestamp, and relevant data
};

// TODO: Your code here - Create goal event emitter
class GoalEventEmitter {
  // TODO: Implement the event emitter
  // - Use EventEmitter from Node.js
  // - Define methods for each event type
  // - Include proper TypeScript types
  // - Emit events with proper payload structure
}

console.log("--- TODO 1: Goal Event Emitter ---\n");

const goalEmitter = new GoalEventEmitter();

// TODO: After implementing, test with:
// goalEmitter.onGoalCreated((payload) => {
//   console.log(`Goal created: ${payload.goalId}`);
// });

// goalEmitter.emitGoalCreated({
//   goalId: "goal-123",
//   userId: "user-456",
//   title: "Walk 10,000 steps",
//   timestamp: Date.now(),
// });

console.log("Expected behavior:");
console.log("  - Events follow naming pattern: resource.action");
console.log("  - Payloads include all relevant data");
console.log("  - TypeScript provides type safety");
console.log("  - Multiple listeners can receive same event");
console.log("");

// ============================================
// TODO 2: Implement Event Routing by Type
// ============================================
// Instructions:
// - Implement an event router that dispatches events based on type
// - Support wildcard routing (e.g., 'goal.*' matches all goal events)
// - Track which handlers are registered for which events
// - Provide statistics on event routing

interface EventHandler {
  (payload: unknown): void;
}

interface RoutePattern {
  pattern: string;
  handler: EventHandler;
}

// TODO: Your code here - Implement event router
class EventRouter {
  private routes: RoutePattern[] = [];

  // TODO: Register a handler for a specific event pattern
  // - Support exact matches (e.g., 'goal.created')
  // - Support wildcards (e.g., 'goal.*' matches 'goal.created', 'goal.updated', etc.)
  // - Support multiple handlers for same pattern
  on(pattern: string, handler: EventHandler): void {
    // TODO: Your implementation
  }

  // TODO: Route an event to matching handlers
  // - Find all patterns that match the event type
  // - Call each handler with the payload
  // - Log routing decisions
  route(eventType: string, payload: unknown): void {
    // TODO: Your implementation
  }

  // TODO: Check if a pattern matches an event type
  // - Handle exact matches
  // - Handle wildcard matches (*)
  // - Return true if matches, false otherwise
  private matches(pattern: string, eventType: string): boolean {
    // TODO: Your implementation
    return false;
  }

  // Get routing statistics
  getStats(): { routes: number; handlers: number } {
    return {
      routes: this.routes.length,
      handlers: this.routes.length,
    };
  }
}

console.log("--- TODO 2: Event Routing ---\n");

const router = new EventRouter();

// TODO: After implementing, test with:
// router.on("goal.created", (payload) => {
//   console.log("Handler 1: Goal created");
// });

// router.on("goal.*", (payload) => {
//   console.log("Wildcard handler: Any goal event");
// });

// router.route("goal.created", { goalId: "123" });
// router.route("goal.updated", { goalId: "123" });

console.log("Expected behavior:");
console.log("  - Exact matches trigger specific handlers");
console.log("  - Wildcard patterns match multiple event types");
console.log("  - Multiple handlers can be triggered for same event");
console.log("  - Routing is logged for debugging");
console.log("");

// ============================================
// TODO 3: Add Event Serialization/Validation
// ============================================
// Instructions:
// - Implement event serialization to JSON
// - Validate event structure before processing
// - Include version field for schema evolution
// - Handle validation errors gracefully

interface ValidatedEvent {
  type: string;
  version: string;
  timestamp: number;
  payload: unknown;
}

// TODO: Your code here - Implement event validation
class EventValidator {
  private readonly SUPPORTED_VERSIONS = ["1.0", "2.0"];

  // TODO: Validate event structure
  // - Check all required fields are present
  // - Verify field types are correct
  // - Check version is supported
  // - Return validated event or throw error
  validate(event: unknown): ValidatedEvent {
    // TODO: Your implementation
    throw new Error("Not implemented");
  }

  // TODO: Serialize event to JSON string
  // - Convert event to JSON
  // - Handle circular references
  // - Return serialized string
  serialize(event: ValidatedEvent): string {
    // TODO: Your implementation
    return "";
  }

  // TODO: Deserialize JSON to event
  // - Parse JSON string
  // - Validate resulting object
  // - Return validated event
  deserialize(json: string): ValidatedEvent {
    // TODO: Your implementation
    throw new Error("Not implemented");
  }

  // TODO: Check if version is supported
  private isVersionSupported(version: string): boolean {
    // TODO: Your implementation
    return false;
  }
}

console.log("--- TODO 3: Event Serialization/Validation ---\n");

const validator = new EventValidator();

// Test with valid event
const validEvent = {
  type: "goal.completed",
  version: "1.0",
  timestamp: Date.now(),
  payload: { goalId: "goal-123", userId: "user-456" },
};

// Test with invalid event
const invalidEvent = {
  type: "goal.completed",
  // Missing version field
};

// TODO: After implementing, test with:
// try {
//   const validated = validator.validate(validEvent);
//   console.log("✅ Valid event:", validated.type);
// } catch (error) {
//   console.log("❌ Validation error:", (error as Error).message);
// }

// try {
//   validator.validate(invalidEvent);
// } catch (error) {
//   console.log("❌ Expected error:", (error as Error).message);
// }

console.log("Expected behavior:");
console.log("  - Valid events pass validation");
console.log("  - Invalid events throw descriptive errors");
console.log("  - Serialization converts to JSON safely");
console.log("  - Deserialization validates input");
console.log("");

// ============================================
// TODO 4: Handle Failed Events (Dead Letter Queue)
// ============================================
// Instructions:
// - Implement a dead letter queue for failed events
// - Store failed events with error details
// - Track retry attempts
// - Implement retry logic with backoff

interface FailedEvent {
  event: ValidatedEvent;
  error: string;
  timestamp: number;
  retryCount: number;
}

// TODO: Your code here - Implement dead letter queue
class DeadLetterQueue {
  private queue: FailedEvent[] = [];
  private readonly MAX_RETRIES = 3;

  // TODO: Add failed event to queue
  // - Store event with error details
  // - Set retry count to 0
  // - Log the failure
  add(event: ValidatedEvent, error: string): void {
    // TODO: Your implementation
  }

  // TODO: Retry processing failed events
  // - For each event in queue, attempt to reprocess
  // - Increment retry count
  // - Remove from queue if successful or max retries reached
  // - Use exponential backoff between retries
  retry(reprocessFn: (event: ValidatedEvent) => boolean): void {
    // TODO: Your implementation
  }

  // TODO: Get queue size
  size(): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Get all failed events
  getAll(): FailedEvent[] {
    // TODO: Your implementation
    return [];
  }
}

console.log("--- TODO 4: Dead Letter Queue ---\n");

const dlq = new DeadLetterQueue();

// Add some failed events
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

// TODO: After implementing, test retry:
// dlq.retry((event) => {
//   console.log(`Retrying ${event.type}...`);
//   return Math.random() > 0.5; // Simulate 50% success rate
// });

console.log("Expected behavior:");
console.log("  - Failed events are stored with error details");
console.log("  - Retry attempts are tracked");
console.log("  - Events are removed after max retries");
console.log("  - Queue can be inspected for monitoring");
console.log("");

// ============================================
// TODO 5: Create Event Replay Mechanism
// ============================================
// Instructions:
// - Implement event store for persistence
// - Support replaying events from a timestamp
// - Include event versioning
// - Support replaying specific event types

interface StoredEvent extends ValidatedEvent {
  id: string;
  storedAt: number;
}

// TODO: Your code here - Implement event store
class EventStore {
  private events: StoredEvent[] = [];
  private idCounter = 0;

  // TODO: Store an event
  // - Assign unique ID
  // - Add storage timestamp
  // - Store in array
  // - Return stored event
  store(event: ValidatedEvent): StoredEvent {
    // TODO: Your implementation
    return {} as StoredEvent;
  }

  // TODO: Replay events from a timestamp
  // - Filter events stored after given timestamp
  // - Return array of events
  // - Support filtering by event type
  replay(fromTimestamp: number, eventType?: string): StoredEvent[] {
    // TODO: Your implementation
    return [];
  }

  // TODO: Get event by ID
  // - Find event with matching ID
  // - Return event or undefined
  getById(id: string): StoredEvent | undefined {
    // TODO: Your implementation
    return undefined;
  }

  // TODO: Get all events for a specific type
  // - Filter events by type
  // - Return array of events
  getByType(eventType: string): StoredEvent[] {
    // TODO: Your implementation
    return [];
  }

  // Get store statistics
  getStats(): { totalEvents: number; eventTypes: Record<string, number> } {
    const eventTypes: Record<string, number> = {};
    this.events.forEach((e) => {
      eventTypes[e.type] = (eventTypes[e.type] || 0) + 1;
    });

    return {
      totalEvents: this.events.length,
      eventTypes,
    };
  }
}

console.log("--- TODO 5: Event Replay ---\n");

const eventStore = new EventStore();

// Store some events
eventStore.store({
  type: "goal.created",
  version: "1.0",
  timestamp: Date.now() - 5000,
  payload: { goalId: "goal-1", title: "Walk daily" },
});

eventStore.store({
  type: "goal.completed",
  version: "1.0",
  timestamp: Date.now() - 3000,
  payload: { goalId: "goal-1" },
});

eventStore.store({
  type: "goal.created",
  version: "1.0",
  timestamp: Date.now() - 1000,
  payload: { goalId: "goal-2", title: "Drink water" },
});

// TODO: After implementing, test replay:
// const replayed = eventStore.replay(Date.now() - 4000);
// console.log(`Replayed ${replayed.length} events:`);
// replayed.forEach((e) => console.log(`  - ${e.type}`));

const stats = eventStore.getStats();
console.log("Event Store Statistics:");
console.log(`  Total events: ${stats.totalEvents}`);
console.log("  Event types:");
Object.entries(stats.eventTypes).forEach(([type, count]) => {
  console.log(`    ${type}: ${count}`);
});

console.log("\nExpected behavior:");
console.log("  - Events are stored with unique IDs");
console.log("  - Replay returns events from timestamp");
console.log("  - Filtering by event type works");
console.log("  - Statistics provide insight into event patterns");
console.log("");

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a complete event processing pipeline
// - Combine validation, routing, and error handling
// - Add metrics collection
// - Implement event aggregation

// TODO: Your code here - Create complete event pipeline
class EventPipeline {
  // TODO: Implement combining all features:
  // - Event validation
  // - Event routing
  // - Error handling with DLQ
  // - Event storage for replay
  // - Metrics collection
  // - Event aggregation
}

console.log("--- BONUS: Complete Event Pipeline ---\n");

console.log("Create a production-ready event pipeline that:");
console.log("  - Validates all incoming events");
console.log("  - Routes events to appropriate handlers");
console.log("  - Handles errors gracefully with DLQ");
console.log("  - Stores events for replay");
console.log("  - Collects metrics for monitoring");
console.log("  - Aggregates events for batch processing");
console.log("");

console.log("✅ Exercise complete!");
console.log("\nNext step: Compare your answers with exercise-02-events-solution.ts");

export {};
