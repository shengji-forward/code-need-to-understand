// WebSocket Basics Practice
// Run with: npx tsx 06-websocket-realtime/practice/01-websocket-basics.ts

console.log("=== WebSocket Basics Practice ===\n");

// ============================================
// LEVEL 1: WebSocket Fundamentals
// ============================================

console.log("--- LEVEL 1: WebSocket vs HTTP ---\n");

// WebSocket vs HTTP comparison
const comparison = {
  http: {
    connection: "Short-lived (request-response)",
    direction: "Client-initiated only",
    latency: "New connection for each request",
    overhead: "HTTP headers in every request",
    useCase: "RESTful APIs, document retrieval",
  },
  websocket: {
    connection: "Long-lived (persistent)",
    direction: "Full-duplex (both ways)",
    latency: "Low (single handshake)",
    overhead: "Minimal after handshake",
    useCase: "Real-time updates, chat, gaming",
  },
};

console.log("HTTP vs WebSocket:");
console.log("  HTTP:");
Object.entries(comparison.http).forEach(([key, value]) => {
  console.log(`    ${key}: ${value}`);
});
console.log("  WebSocket:");
Object.entries(comparison.websocket).forEach(([key, value]) => {
  console.log(`    ${key}: ${value}`);
});
console.log("");

// WebSocket Lifecycle States
const wsStates = {
  CONNECTING: {
    value: 0,
    meaning: "Connection not yet established",
    emoji: "🔌",
  },
  OPEN: {
    value: 1,
    meaning: "Connection is open and ready to send messages",
    emoji: "✅",
  },
  CLOSING: {
    value: 2,
    meaning: "Connection is in the process of closing",
    emoji: "🔄",
  },
  CLOSED: {
    value: 3,
    meaning: "Connection is closed or couldn't be established",
    emoji: "❌",
  },
};

console.log("WebSocket Lifecycle States:");
Object.entries(wsStates).forEach(([state, info]) => {
  console.log(`  ${state} (${info.value}): ${info.emoji} ${info.meaning}`);
});
console.log("");

// Mock WebSocket Class for demonstration
type WebSocketState = 0 | 1 | 2 | 3;
type MessageHandler = (data: string) => void;
type CloseHandler = () => void;

class MockWebSocket {
  private state: WebSocketState = 0; // CONNECTING
  private messageHandlers: MessageHandler[] = [];
  private closeHandlers: CloseHandler[] = [];

  constructor(private url: string) {
    console.log(`🔌 Connecting to ${url}...`);
    // Simulate connection delay
    setTimeout(() => {
      this.state = 1; // OPEN
      console.log(`✅ Connected to ${url}`);
      this.onOpen();
    }, 100);
  }

  // State getter
  get readyState(): WebSocketState {
    return this.state;
  }

  // Send a message
  send(data: string): void {
    if (this.state !== 1) {
      console.log(`❌ Cannot send: connection not open (state: ${this.state})`);
      return;
    }
    console.log(`📤 Sending: ${data}`);
  }

  // Register message handler
  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  // Register close handler
  onClose(handler: CloseHandler): void {
    this.closeHandlers.push(handler);
  }

  // Simulate receiving a message
  private simulateIncoming(data: string): void {
    if (this.state === 1) {
      console.log(`📥 Received: ${data}`);
      this.messageHandlers.forEach((h) => h(data));
    }
  }

  // Simulate opening connection
  private onOpen(): void {
    // Send welcome message
    this.simulateIncoming(JSON.stringify({ type: "welcome", message: "Connected to health coaching session" }));
  }

  // Close the connection
  close(code?: number, reason?: string): void {
    if (this.state === 2 || this.state === 3) {
      console.log("❌ Connection already closed");
      return;
    }
    console.log(`🔄 Closing connection... (code: ${code || 1000}, reason: ${reason || "normal"})`);
    this.state = 2; // CLOSING
    setTimeout(() => {
      this.state = 3; // CLOSED
      console.log("❌ Connection closed");
      this.closeHandlers.forEach((h) => h());
    }, 50);
  }

  // Static reference to states
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
}

// Health Coaching Scenario: Real-time coaching session
console.log("🏥 Health Coaching Scenario: Real-time Session\n");

const coachWs = new MockWebSocket("wss://health-coach.com/session/123");

// Wait for connection to establish
setTimeout(() => {
  console.log("\n--- Sending Messages ---\n");

  // Coach sends feedback
  coachWs.send(JSON.stringify({
    type: "feedback",
    target: "client",
    message: "Great progress on your water intake today!",
  }));

  // Simulate client response
  setTimeout(() => {
    console.log("📥 Received: " + JSON.stringify({
      type: "question",
      target: "coach",
      message: "Should I increase my walking distance?",
    }));
  }, 100);

  // Coach responds
  setTimeout(() => {
    coachWs.send(JSON.stringify({
      type: "advice",
      target: "client",
      message: "Yes, try adding 500m to your daily walk!",
    }));
  }, 200);

  // Close connection
  setTimeout(() => {
    console.log("\n--- Closing Connection ---\n");
    coachWs.close(1000, "Session ended");
  }, 300);
}, 200);

console.log("");
console.log("💡 Key Points:");
console.log("  - WebSocket starts in CONNECTING state");
console.log("  - After successful handshake, moves to OPEN");
console.log("  - Messages can be sent bidirectionally when OPEN");
console.log("  - Connection closes with CLOSING then CLOSED states");
console.log("");

// ============================================
// LEVEL 2: Connection Management
// ============================================

setTimeout(() => {
  console.log("\n--- LEVEL 2: Connection Management ---\n");

  // Message Types
  const messageTypes = {
    text: {
      format: "UTF-8 string",
      useCase: "JSON, plain text messages",
      example: '{"type":"update","data":{"steps":5000}}',
    },
    binary: {
      format: "ArrayBuffer or Blob",
      useCase: "Images, audio, video, protobuf",
      example: "<binary data>",
    },
  };

  console.log("Message Types:");
  Object.entries(messageTypes).forEach(([type, info]) => {
    console.log(`  ${type}:`);
    console.log(`    Format: ${info.format}`);
    console.log(`    Use Case: ${info.useCase}`);
    console.log(`    Example: ${info.example}`);
  });
  console.log("");

  // Heartbeat/Ping-Pong Mechanism
  console.log("💓 Heartbeat/Ping-Pong Mechanism:");
  console.log("  Purpose: Detect dead connections, keep connection alive");
  console.log("");
  console.log("  Client → Server: PING");
  console.log("  Server → Client: PONG (must echo same payload)");
  console.log("");
  console.log("  Benefits:");
  console.log("    - Detect zombie connections (no response)");
  console.log("    - Prevent connection drops from idle timeout");
  console.log("    - Measure round-trip latency");
  console.log("");

  // Heartbeat Implementation
  class HeartbeatWebSocket {
    private ws: MockWebSocket;
    private intervalId?: ReturnType<typeof setInterval>;
    private timeoutId?: ReturnType<typeof setTimeout>;
    private missedPongs = 0;
    private readonly MAX_MISSED_PONGS = 3;

    constructor(url: string, private heartbeatInterval = 30000) {
      this.ws = new MockWebSocket(url);
      this.setupHeartbeat();
    }

    private setupHeartbeat(): void {
      this.intervalId = setInterval(() => {
        this.ws.send(JSON.stringify({ type: "ping", timestamp: Date.now() }));
        console.log("💓 Sent PING");

        // Expect PONG within 5 seconds
        this.timeoutId = setTimeout(() => {
          this.missedPongs++;
          console.log(`⚠️  PONG timeout (${this.missedPongs}/${this.MAX_MISSED_PONGS})`);

          if (this.missedPongs >= this.MAX_MISSED_PONGS) {
            console.log("❌ Connection dead - closing");
            this.close();
          }
        }, 5000);
      }, this.heartbeatInterval);
    }

    handlePong(data: string): void {
      clearTimeout(this.timeoutId);
      this.missedPongs = 0;
      const pong = JSON.parse(data);
      const rtt = Date.now() - pong.timestamp;
      console.log(`💓 Received PONG - RTT: ${rtt}ms`);
    }

    send(data: string): void {
      this.ws.send(data);
    }

    close(): void {
      clearInterval(this.intervalId);
      clearTimeout(this.timeoutId);
      this.ws.close();
    }
  }

  console.log("Heartbeat Implementation Pattern:");
  console.log("  - Send PING every 30 seconds");
  console.log("  - Expect PONG within 5 seconds");
  console.log("  - After 3 missed PONGs, close connection");
  console.log("");

  // Reconnection with Exponential Backoff
  console.log("🔄 Reconnection with Exponential Backoff:");
  console.log("  Purpose: Handle temporary network issues gracefully");
  console.log("");

  class ReconnectingWebSocket {
    private ws: MockWebSocket | null = null;
    private reconnectAttempts = 0;
    private reconnectTimeoutId?: ReturnType<typeof setTimeout>;
    private readonly MAX_RECONNECT_ATTEMPTS = 10;
    private readonly INITIAL_RECONNECT_DELAY = 1000;

    constructor(private url: string) {
      this.connect();
    }

    private connect(): void {
      this.ws = new MockWebSocket(this.url);
      this.ws.onClose(() => {
        console.log("❌ Connection closed - attempting reconnect...");
        this.scheduleReconnect();
      });
    }

    private scheduleReconnect(): void {
      if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
        console.log("❌ Max reconnect attempts reached - giving up");
        return;
      }

      // Exponential backoff: 1s, 2s, 4s, 8s, 16s, ...
      const delay = Math.min(
        this.INITIAL_RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts),
        30000 // Max 30 seconds
      );

      this.reconnectAttempts++;
      console.log(`🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})`);

      this.reconnectTimeoutId = setTimeout(() => {
        this.connect();
      }, delay);
    }

    send(data: string): void {
      this.ws?.send(data);
    }

    close(): void {
      clearTimeout(this.reconnectTimeoutId);
      this.ws?.close();
    }
  }

  const backoffSchedule = [1000, 2000, 4000, 8000, 16000, 30000, 30000, 30000, 30000, 30000];

  console.log("Exponential Backoff Schedule:");
  backoffSchedule.forEach((delay, i) => {
    console.log(`  Attempt ${i + 1}: ${delay}ms`);
  });
  console.log("");

  // Connection Lifecycle Management
  console.log("🔄 Connection Lifecycle Management:");
  const lifecycle = {
    connecting: {
      actions: ["Show loading indicator", "Disable send buttons", "Store pending messages"],
    },
    connected: {
      actions: ["Hide loading indicator", "Enable send buttons", "Send queued messages", "Start heartbeat"],
    },
    disconnecting: {
      actions: ["Show disconnecting indicator", "Stop sending new messages", "Finish pending sends"],
    },
    disconnected: {
      actions: ["Show reconnecting UI", "Attempt reconnection", "Cache outgoing messages"],
    },
  };

  Object.entries(lifecycle).forEach(([state, actions]) => {
    console.log(`  ${state}:`);
    actions.actions.forEach((action) => console.log(`    - ${action}`));
  });
  console.log("");
}, 2000);

// ============================================
// LEVEL 3: Production Patterns
// ============================================

setTimeout(() => {
  console.log("\n--- LEVEL 3: Production Patterns ---\n");

  // Authentication during Handshake
  console.log("🔐 Authentication during Handshake:");
  console.log("  WebSocket URLs can include authentication token:");
  console.log("  wss://health-coach.com/session/123?token=eyJhbGciOiJIUzI1NiIs...");
  console.log("");
  console.log("  Server validates token before upgrading HTTP to WebSocket");
  console.log("  Invalid token → HTTP 401 during handshake");
  console.log("");

  // Message Validation and Sanitization
  console.log("✅ Message Validation and Sanitization:");
  const validation = {
    validate: {
      type: "Check message type is allowed",
      size: "Limit message size (e.g., 1MB max)",
      structure: "Validate JSON structure",
      fields: "Validate required fields present",
    },
    sanitize: {
      xss: "Escape HTML entities in text",
      sql: "Parameterize database queries",
      injection: "Validate against command injection",
    },
  };

  console.log("  Validation:");
  Object.entries(validation.validate).forEach(([check, desc]) => {
    console.log(`    - ${desc} (${check})`);
  });
  console.log("  Sanitization:");
  Object.entries(validation.sanitize).forEach(([check, desc]) => {
    console.log(`    - ${desc} (${check})`);
  });
  console.log("");

  // Rate Limiting per Connection
  console.log("⏱️  Rate Limiting per Connection:");
  const rateLimit = {
    purpose: "Prevent connection flooding and DoS",
    strategies: {
      messagesPerSecond: "Max 100 messages/second per connection",
      connectionsPerIP: "Max 10 connections per IP address",
      messageSize: "Max 1MB per message",
      burstAllowance: "Allow short bursts, then throttle",
    },
  };

  console.log(`  Purpose: ${rateLimit.purpose}`);
  console.log("  Strategies:");
  Object.entries(rateLimit.strategies).forEach(([strategy, limit]) => {
    console.log(`    - ${limit}`);
  });
  console.log("");

  // Graceful Connection Closure
  console.log("🎯 Graceful Connection Closure:");
  const closureCodes = {
    normal: {
      code: 1000,
      meaning: "Normal closure",
      useCase: "Session completed, user logged out",
    },
    goingAway: {
      code: 1001,
      meaning: "Endpoint going away",
      useCase: "Server shutting down, user closing tab",
    },
    protocolError: {
      code: 1002,
      meaning: "Protocol error",
      useCase: "Invalid WebSocket frame received",
    },
    unsupported: {
      code: 1003,
      meaning: "Unsupported data",
      useCase: "Client can't handle message type",
    },
    noStatus: {
      code: 1005,
      meaning: "No status received",
      useCase: "Connection closed without code",
    },
    abnormal: {
      code: 1006,
      meaning: "Abnormal closure",
      useCase: "Network error, no close frame",
    },
  };

  console.log("  Closure Codes:");
  Object.entries(closureCodes).forEach(([name, info]) => {
    console.log(`    ${info.code} - ${info.meaning}`);
    console.log(`      (${info.useCase})`);
  });
  console.log("");

  console.log("  Best Practices:");
  console.log("    - Always send close frame before dropping TCP connection");
  console.log("    - Include meaningful close code and reason");
  console.log("    - Clean up resources (timers, subscriptions)");
  console.log("    - Flush pending messages before closing");
  console.log("");

  // Error Handling and Recovery
  console.log("⚡ Error Handling and Recovery:");
  const errors = {
    connectionFailed: {
      error: "Failed to connect",
      action: "Schedule reconnection with backoff",
      log: "Log connection failure with URL and error",
    },
    messageSendFailed: {
      error: "Send failed (not ready)",
      action: "Queue message for retry when connected",
      log: "Log failed message (don't lose data)",
    },
    parseError: {
      error: "Invalid JSON received",
      action: "Send error message, close if malicious",
      log: "Log invalid message for security analysis",
    },
    heartbeatTimeout: {
      error: "No PONG response",
      action: "Close and reconnect",
      log: "Log timeout for connection quality monitoring",
    },
  };

  Object.entries(errors).forEach(([name, info]) => {
    console.log(`  ${name}:`);
    console.log(`    Action: ${info.action}`);
    console.log(`    Log: ${info.log}`);
  });
  console.log("");
}, 4000);

// ============================================
// Best Practices Summary
// ============================================

setTimeout(() => {
  console.log("\n=== Best Practices ===\n");

  console.log("✅ Security:");
  console.log("  - Always use WSS (WebSocket over TLS) in production");
  console.log("  - Authenticate during handshake (token in URL or header)");
  console.log("  - Validate and sanitize all incoming messages");
  console.log("  - Implement rate limiting per connection and IP");
  console.log("  - Use CSP headers to prevent XSS");
  console.log("");

  console.log("✅ Performance:");
  console.log("  - Implement heartbeat/ping-pong to detect dead connections");
  console.log("  - Use exponential backoff for reconnection");
  console.log("  - Limit message size to prevent memory exhaustion");
  console.log("  - Batch/aggregate messages when appropriate");
  console.log("  - Use binary messages for large data (images, files)");
  console.log("");

  console.log("✅ Reliability:");
  console.log("  - Handle all WebSocket states (CONNECTING, OPEN, CLOSING, CLOSED)");
  console.log("  - Implement reconnection with exponential backoff");
  console.log("  - Queue messages while disconnected");
  console.log("  - Use proper close codes for graceful shutdown");
  console.log("  - Monitor connection quality (latency, drops, reconnections)");
  console.log("");

  console.log("✅ Code Quality:");
  console.log("  - Wrap WebSocket in a class/abstraction layer");
  console.log("  - Implement proper error handling and logging");
  console.log("  - Use TypeScript interfaces for message types");
  console.log("  - Clean up resources (timers, listeners) on close");
  console.log("  - Test connection failure and recovery scenarios");
  console.log("");

  console.log("\n✅ Practice complete!");
}, 6000);

export {};
