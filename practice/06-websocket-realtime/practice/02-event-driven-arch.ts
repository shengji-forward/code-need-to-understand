// Event-Driven Architecture Practice
// Run with: npx tsx 06-websocket-realtime/practice/02-event-driven-arch.ts

import { EventEmitter } from "events";

console.log("=== Event-Driven Architecture Practice ===\n");

// ============================================
// LEVEL 1: Event Fundamentals
// ============================================

console.log("--- LEVEL 1: Event Emitter/Listener Pattern ---\n");

// Event Emitter Basics
console.log("📡 Event Emitter Pattern:");
console.log("  - EventEmitter: Node.js built-in class for event handling");
console.log("  - on(): Register a listener for an event");
console.log("  - emit(): Trigger an event with data");
console.log("  - off(): Remove a listener");
console.log("");

// Simple Event Example
const eventBus = new EventEmitter();

// Register listener
eventBus.on("user-action", (data) => {
  console.log(`📥 Event received: user-action`);
  console.log(`   Data: ${JSON.stringify(data)}`);
});

// Emit event
console.log("📤 Emitting event: user-action");
eventBus.emit("user-action", { action: "click", element: "button" });
console.log("");

// Event Types and Routing
console.log("🔀 Event Types and Routing:");
const healthEvents = {
  GOAL_CREATED: "goal.created",
  GOAL_UPDATED: "goal.updated",
  GOAL_COMPLETED: "goal.completed",
  SESSION_SCHEDULED: "session.scheduled",
  SESSION_STARTED: "session.started",
  METRIC_RECORDED: "metric.recorded",
  ACHIEVEMENT_UNLOCKED: "achievement.unlocked",
};

console.log("  Health Coaching Events:");
Object.entries(healthEvents).forEach(([name, eventType]) => {
  console.log(`    ${name}: "${eventType}"`);
});
console.log("");

// Event Payload Structure with TypeScript
type EventPayload<T = any> = {
  type: string;
  timestamp: number;
  userId: string;
  data: T;
};

type GoalEventPayload = EventPayload<{
  goalId: string;
  title: string;
  target?: number;
  progress?: number;
}>;

// Type-safe event handling
const typedBus = new EventEmitter();

typedBus.on("goal.created", (payload: GoalEventPayload) => {
  console.log(`🎯 Goal Created: ${payload.data.title}`);
  console.log(`   By: ${payload.userId}`);
  console.log(`   Target: ${payload.data.target || "Not set"}`);
});

typedBus.emit("goal.created", {
  type: "goal.created",
  timestamp: Date.now(),
  userId: "user-123",
  data: {
    goalId: "goal-456",
    title: "Walk 10,000 steps daily",
    target: 10000,
  },
});
console.log("");

// Broadcast vs Targeted Emit
console.log("📢 Broadcast vs Targeted Emit:");
console.log("");

// Broadcast: All listeners receive the event
console.log("  Broadcast (all listeners receive):");
const broadcastBus = new EventEmitter();

broadcastBus.on("notification", (data) => {
  console.log(`    📱 User A received: ${data.message}`);
});

broadcastBus.on("notification", (data) => {
  console.log(`    📱 User B received: ${data.message}`);
});

broadcastBus.emit("notification", { message: "New coaching session available!" });
console.log("");

// Targeted: Only specific listener receives
console.log("  Targeted (specific listener receives):");
const targetedBus = new EventEmitter();

targetedBus.on("notification:user-123", (data) => {
  console.log(`    📱 User 123 received: ${data.message}`);
});

targetedBus.on("notification:user-456", (data) => {
  console.log(`    📱 User 456 received: ${data.message}`);
});

targetedBus.emit("notification:user-123", { message: "Your session starts in 5 minutes" });
console.log("");

// ============================================
// LEVEL 2: Event Patterns
// ============================================

setTimeout(() => {
  console.log("\n--- LEVEL 2: Event Patterns ---\n");

  // Event Naming Conventions
  console.log("📝 Event Naming Conventions:");
  const namingPatterns = {
    nounVerb: {
      pattern: "resource.action",
      examples: ["user.created", "goal.updated", "session.started"],
      benefits: "Clear, consistent, easy to route",
    },
    nounVerbAdjective: {
      pattern: "resource.action.status",
      examples: ["payment.completed.success", "payment.completed.failed"],
      benefits: "More specific, supports filtering",
    },
    domainResourceAction: {
      pattern: "domain:resource:action",
      examples: ["health:goal:created", "health:metric:recorded"],
      benefits: "Prevents naming conflicts across domains",
    },
  };

  Object.entries(namingPatterns).forEach(([name, info]) => {
    console.log(`  ${name}:`);
    console.log(`    Pattern: ${info.pattern}`);
    console.log(`    Examples: ${info.examples.join(", ")}`);
    console.log(`    Benefits: ${info.benefits}`);
  });
  console.log("");

  // Event Serialization (JSON with validation)
  console.log("📦 Event Serialization and Validation:");
  console.log("");

  interface EventSchema {
    type: string;
    version: string;
    timestamp: number;
    source: string;
    payload: unknown;
  }

  class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ValidationError";
    }
  }

  function validateEvent(event: unknown): EventSchema {
    const e = event as Record<string, unknown>;

    if (typeof e !== "object" || e === null) {
      throw new ValidationError("Event must be an object");
    }

    if (typeof e.type !== "string" || !e.type) {
      throw new ValidationError("Event must have a 'type' field");
    }

    if (typeof e.version !== "string" || !e.version) {
      throw new ValidationError("Event must have a 'version' field");
    }

    if (typeof e.timestamp !== "number" || e.timestamp <= 0) {
      throw new ValidationError("Event must have a valid 'timestamp'");
    }

    if (typeof e.source !== "string" || !e.source) {
      throw new ValidationError("Event must have a 'source' field");
    }

    return e as EventSchema;
  }

  // Valid event
  const validEvent = {
    type: "goal.completed",
    version: "1.0",
    timestamp: Date.now(),
    source: "health-coaching-service",
    payload: {
      goalId: "goal-123",
      userId: "user-456",
      completionDate: new Date().toISOString(),
    },
  };

  try {
    const validated = validateEvent(validEvent);
    console.log("  ✅ Valid event:");
    console.log(`     Type: ${validated.type}`);
    console.log(`     Version: ${validated.version}`);
  } catch (error) {
    console.log(`  ❌ Error: ${(error as Error).message}`);
  }
  console.log("");

  // Invalid event
  const invalidEvent = {
    type: "goal.completed",
    // Missing version field
  };

  try {
    validateEvent(invalidEvent);
  } catch (error) {
    console.log("  ❌ Invalid event:");
    console.log(`     Error: ${(error as Error).message}`);
  }
  console.log("");

  // Event Type Checking
  console.log("🔍 Event Type Checking:");
  console.log("");

  type EventType = "goal.created" | "goal.updated" | "goal.completed" | "metric.recorded";

  class TypedEventBus extends EventEmitter {
    on<T = unknown>(event: EventType, listener: (data: T) => void): this {
      return super.on(event, listener);
    }

    emit<T = unknown>(event: EventType, data: T): boolean {
      return super.emit(event, data);
    }
  }

  const typedEventBus = new TypedEventBus();

  // Type-safe listeners
  typedEventBus.on("goal.created", (data: { goalId: string; title: string }) => {
    console.log(`  ✅ Goal created: ${data.title} (${data.goalId})`);
  });

  typedEventBus.emit("goal.created", {
    goalId: "goal-789",
    title: "Drink 8 glasses of water",
  });
  console.log("");

  // Event Handlers and Middleware
  console.log("⛓️  Event Handlers and Middleware:");
  console.log("");

  // Middleware pattern: Pre-processing events
  const middlewareBus = new EventEmitter();

  function loggingMiddleware(event: string, data: unknown) {
    console.log(`  📋 [LOG] Event: ${event}, Data: ${JSON.stringify(data)}`);
  }

  function authMiddleware(event: string, data: unknown & { userId?: string }) {
    if (!data.userId) {
      console.log(`  🔒 [AUTH] Blocked event: ${event} (no userId)`);
      return false; // Block event
    }
    console.log(`  🔓 [AUTH] Authorized: ${event} (user: ${data.userId})`);
    return true; // Allow event
  }

  function emitWithMiddleware(event: string, data: unknown) {
    loggingMiddleware(event, data);

    if (authMiddleware(event, data as { userId?: string })) {
      middlewareBus.emit(event, data);
    }
  }

  middlewareBus.on("goal.created", (data: { userId: string; title: string }) => {
    console.log(`  ✅ [HANDLER] Processing goal.created: ${data.title}`);
  });

  emitWithMiddleware("goal.created", {
    userId: "user-123",
    title: "Exercise 30 minutes daily",
  });
  console.log("");

  emitWithMiddleware("goal.created", {
    title: "Unauthorized goal",
  });
  console.log("");

  // Error Handling in Event Handlers
  console.log("⚠️  Error Handling in Event Handlers:");
  console.log("");

  const errorHandlingBus = new EventEmitter();

  // Wrap listeners to catch errors
  function safeListener(bus: EventEmitter, event: string, listener: (...args: any[]) => void) {
    const wrappedListener = (...args: any[]) => {
      try {
        listener(...args);
      } catch (error) {
        console.log(`  ❌ Error in ${event} handler: ${(error as Error).message}`);
        bus.emit("error", { event, error });
      }
    };

    bus.on(event, wrappedListener);
  }

  errorHandlingBus.on("error", (data: { event: string; error: Error }) => {
    console.log(`  🚨 [ERROR HANDLER] Event: ${data.event}`);
    console.log(`     Message: ${data.error.message}`);
  });

  // Add a listener that throws an error
  safeListener(errorHandlingBus, "risky-operation", (data: { value: number }) => {
    if (data.value < 0) {
      throw new Error("Value cannot be negative!");
    }
    console.log(`  ✅ Processed value: ${data.value}`);
  });

  console.log("  Processing valid value:");
  errorHandlingBus.emit("risky-operation", { value: 42 });
  console.log("");

  console.log("  Processing invalid value:");
  errorHandlingBus.emit("risky-operation", { value: -1 });
  console.log("");

}, 1000);

// ============================================
// LEVEL 3: Production Event Systems
// ============================================

setTimeout(() => {
  console.log("\n--- LEVEL 3: Production Event Systems ---\n");

  // Event Versioning for Compatibility
  console.log("🔢 Event Versioning for Compatibility:");
  console.log("");

  interface VersionedEvent {
    type: string;
    version: string; // Semver: "1.0.0"
    timestamp: number;
    payload: unknown;
  }

  const eventVersions: Record<string, VersionedEvent[]> = {
    "goal.created": [
      {
        type: "goal.created",
        version: "1.0.0",
        timestamp: Date.now(),
        payload: {
          goalId: "goal-123",
          title: "Walk daily",
        },
      },
      {
        type: "goal.created",
        version: "2.0.0",
        timestamp: Date.now(),
        payload: {
          goalId: "goal-123",
          title: "Walk daily",
          category: "fitness",
          priority: "medium",
        },
      },
    ],
  };

  function handleVersionedEvent(event: VersionedEvent) {
    console.log(`  📦 Event: ${event.type} v${event.version}`);

    switch (event.version) {
      case "1.0.0":
        // Legacy handling
        console.log(`     Title: ${(event.payload as { title: string }).title}`);
        break;
      case "2.0.0":
        // New handling with extra fields
        const payload = event.payload as { title: string; category: string; priority: string };
        console.log(`     Title: ${payload.title}`);
        console.log(`     Category: ${payload.category}`);
        console.log(`     Priority: ${payload.priority}`);
        break;
      default:
        console.log(`     ⚠️  Unknown version, using default handling`);
    }
  }

  handleVersionedEvent(eventVersions["goal.created"][0]);
  handleVersionedEvent(eventVersions["goal.created"][1]);
  console.log("");

  // Event Replay for Recovery
  console.log("🔄 Event Replay for Recovery:");
  console.log("");

  class EventStore {
    private events: VersionedEvent[] = [];

    store(event: VersionedEvent): void {
      this.events.push(event);
      console.log(`  💾 Stored: ${event.type} v${event.version}`);
    }

    replay(fromTimestamp: number): VersionedEvent[] {
      console.log(`  🔄 Replaying events from ${new Date(fromTimestamp).toISOString()}`);
      return this.events.filter((e) => e.timestamp >= fromTimestamp);
    }
  }

  const eventStore = new EventStore();

  // Store some events
  eventStore.store({
    type: "goal.created",
    version: "1.0.0",
    timestamp: Date.now() - 5000,
    payload: { goalId: "goal-1", title: "Goal 1" },
  });

  eventStore.store({
    type: "goal.completed",
    version: "1.0.0",
    timestamp: Date.now() - 3000,
    payload: { goalId: "goal-1", completedAt: new Date().toISOString() },
  });

  eventStore.store({
    type: "goal.created",
    version: "1.0.0",
    timestamp: Date.now() - 1000,
    payload: { goalId: "goal-2", title: "Goal 2" },
  });

  console.log("");

  // Replay events from 4 seconds ago
  const replayedEvents = eventStore.replay(Date.now() - 4000);
  console.log(`  📋 Replay result: ${replayedEvents.length} events`);
  replayedEvents.forEach((e) => {
    console.log(`     - ${e.type} at ${new Date(e.timestamp).toISOString()}`);
  });
  console.log("");

  // Dead Letter Queue for Failed Events
  console.log("📬 Dead Letter Queue for Failed Events:");
  console.log("");

  interface FailedEvent {
    event: VersionedEvent;
    error: string;
    timestamp: number;
    retryCount: number;
  }

  class DeadLetterQueue {
    private failedEvents: FailedEvent[] = [];

    add(event: VersionedEvent, error: string): void {
      const failed: FailedEvent = {
        event,
        error,
        timestamp: Date.now(),
        retryCount: 0,
      };
      this.failedEvents.push(failed);
      console.log(`  ❌ Added to DLQ: ${event.type} - ${error}`);
    }

    retry(): void {
      console.log(`  🔄 Attempting to retry ${this.failedEvents.length} failed events`);

      this.failedEvents = this.failedEvents.filter((failed) => {
        if (failed.retryCount < 3) {
          failed.retryCount++;
          console.log(`     🔄 Retrying ${failed.event.type} (attempt ${failed.retryCount}/3)`);
          // In real implementation, would retry processing here
          return true; // Keep in queue (for demo)
        } else {
          console.log(`     ❌ Max retries reached for ${failed.event.type}, giving up`);
          return false; // Remove from queue
        }
      });
    }

    getFailedEvents(): FailedEvent[] {
      return this.failedEvents;
    }
  }

  const dlq = new DeadLetterQueue();

  // Simulate failed events
  dlq.add(
    {
      type: "payment.processed",
      version: "1.0.0",
      timestamp: Date.now(),
      payload: { amount: 100 },
    },
    "Payment gateway unavailable"
  );

  dlq.add(
    {
      type: "email.sent",
      version: "1.0.0",
      timestamp: Date.now(),
      payload: { to: "user@example.com" },
    },
    "Email service timeout"
  );

  console.log("");

  // Retry once
  dlq.retry();
  console.log("");

  // Retry again (will max out on first event)
  dlq.retry();
  console.log("");

  // Event Aggregation and Batching
  console.log("📊 Event Aggregation and Batching:");
  console.log("");

  class EventAggregator {
    private batch: VersionedEvent[] = [];
    private batchSize: number;
    private batchTimeout: number;
    private timeoutId?: ReturnType<typeof setTimeout>;
    private emitter: EventEmitter;

    constructor(emitter: EventEmitter, batchSize = 10, batchTimeout = 1000) {
      this.emitter = emitter;
      this.batchSize = batchSize;
      this.batchTimeout = batchTimeout;
    }

    add(event: VersionedEvent): void {
      this.batch.push(event);

      if (this.batch.length >= this.batchSize) {
        this.flush();
      } else {
        this.scheduleFlush();
      }
    }

    private scheduleFlush(): void {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.flush();
      }, this.batchTimeout);
    }

    private flush(): void {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }

      if (this.batch.length === 0) {
        return;
      }

      console.log(`  📦 Flushing batch of ${this.batch.length} events`);
      this.emitter.emit("batch", this.batch);
      this.batch = [];
    }
  }

  const aggregationBus = new EventEmitter();
  const aggregator = new EventAggregator(aggregationBus, 5, 2000);

  aggregationBus.on("batch", (events: VersionedEvent[]) => {
    console.log(`     Processing batch:`);
    events.forEach((e) => console.log(`       - ${e.type}`));
  });

  // Add events
  for (let i = 1; i <= 5; i++) {
    aggregator.add({
      type: `event-${i}`,
      version: "1.0.0",
      timestamp: Date.now(),
      payload: { id: i },
    });
  }
  console.log("");

  // Performance Optimization
  console.log("⚡ Performance Optimization:");
  console.log("");

  const optimizations = {
    debounce: {
      description: "Group rapid-fire events into one",
      example: "Debounce 'typing' events to only emit after user stops",
    },
    throttle: {
      description: "Limit event frequency",
      example: "Throttle 'scroll' events to max 10 per second",
    },
    batch: {
      description: "Process multiple events together",
      example: "Batch database writes instead of one per event",
    },
    async: {
      description: "Handle events asynchronously",
      example: "Use worker queues for slow event processors",
    },
    select: {
      description: "Only emit events when needed",
      example: "Don't emit 'value-changed' if value didn't actually change",
    },
  };

  Object.entries(optimizations).forEach(([name, info]) => {
    console.log(`  ${name}:`);
    console.log(`    ${info.description}`);
    console.log(`    Example: ${info.example}`);
  });
  console.log("");

}, 2000);

// ============================================
// Best Practices Summary
// ============================================

setTimeout(() => {
  console.log("\n=== Best Practices ===\n");

  console.log("✅ Event Design:");
  console.log("  - Use consistent naming conventions (resource.action)");
  console.log("  - Include version field for schema evolution");
  console.log("  - Always include timestamp for debugging and replay");
  console.log("  - Use TypeScript types for type safety");
  console.log("  - Document event schemas in a central registry");
  console.log("");

  console.log("✅ Error Handling:");
  console.log("  - Wrap event listeners in try-catch blocks");
  console.log("  - Implement global error handler for uncaught errors");
  console.log("  - Use dead letter queue for failed events");
  console.log("  - Log all errors with event context");
  console.log("  - Implement retry logic with exponential backoff");
  console.log("");

  console.log("✅ Performance:");
  console.log("  - Batch events when processing is expensive");
  console.log("  - Debounce/throttle high-frequency events");
  console.log("  - Use async processing for slow handlers");
  console.log("  - Avoid blocking operations in event handlers");
  console.log("  - Remove unused event listeners to prevent memory leaks");
  console.log("");

  console.log("✅ Monitoring:");
  console.log("  - Track event emission rates");
  console.log("  - Monitor handler execution times");
  console.log("  - Alert on DLQ size and error rates");
  console.log("  - Use distributed tracing for event flows");
  console.log("  - Aggregate metrics by event type");
  console.log("");

  console.log("✅ Architecture:");
  console.log("  - Use domain events to capture business meaning");
  console.log("  - Keep events immutable (don't modify after creation)");
  console.log("  - Make events self-contained (include all relevant data)");
  console.log("  - Use event versioning for backward compatibility");
  console.log("  - Implement event replay for recovery and testing");
  console.log("");

  console.log("\n✅ Practice complete!");
}, 3000);

export {};
