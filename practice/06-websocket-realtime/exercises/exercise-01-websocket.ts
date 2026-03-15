// EXERCISE 1: WebSocket Basics
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx 06-websocket-realtime/exercises/exercise-01-websocket.ts

console.log("=== Exercise 1: WebSocket Basics ===\n");

// ============================================
// TODO 1: Connection Lifecycle Handler
// ============================================
// Instructions:
// - Implement a WebSocket connection lifecycle handler
// - Handle CONNECTING, OPEN, CLOSING, and CLOSED states
// - Log appropriate messages for each state transition
// - Implement proper error handling for connection failures

type WebSocketState = 0 | 1 | 2 | 3;

interface WebSocketConnection {
  url: string;
  state: WebSocketState;
  connect(): void;
  send(data: string): boolean;
  close(code?: number, reason?: string): void;
}

// TODO: Your code here - Implement the WebSocketConnection interface
class MockWebSocket implements WebSocketConnection {
  url: string;
  state: WebSocketState = 0; // CONNECTING

  constructor(url: string) {
    this.url = url;
  }

  connect(): void {
    // TODO: Implement connection logic
    // - Set state to CONNECTING
    // - Simulate connection delay
    // - On success, set state to OPEN
    // - On failure, set state to CLOSED and log error
  }

  send(data: string): boolean {
    // TODO: Implement send logic
    // - Only send if state is OPEN
    // - Return true if sent, false if not
    // - Log the message being sent
    return false;
  }

  close(code?: number, reason?: string): void {
    // TODO: Implement close logic
    // - Only close if not already CLOSED
    // - Set state to CLOSING, then CLOSED
    // - Log the close code and reason
  }
}

console.log("--- TODO 1: Connection Lifecycle ---\n");

// Test your implementation
const ws = new MockWebSocket("wss://health-coach.com/session/123");
console.log(`Initial state: ${ws.state} (0=CONNECTING, 1=OPEN, 2=CLOSING, 3=CLOSED)`);

ws.connect();
// TODO: After implementing, you should see state transition to OPEN

ws.send("Hello, coach!");
// TODO: After implementing, message should be sent when OPEN

ws.close(1000, "Session ended");
// TODO: After implementing, connection should close gracefully

console.log("\nExpected behavior:");
console.log("  - State transitions: CONNECTING → OPEN → CLOSING → CLOSED");
console.log("  - Messages only sent when OPEN");
console.log("  - Close code and reason logged");
console.log("");

// ============================================
// TODO 2: Message Send/Receive Logic
// ============================================
// Instructions:
// - Implement message send/receive with callbacks
// - Track sent and received messages
// - Validate message format before sending
// - Handle messages up to 1MB in size

interface Message {
  type: string;
  payload: unknown;
  timestamp: number;
}

interface MessageHandlers {
  onMessage?: (message: Message) => void;
  onError?: (error: string) => void;
}

// TODO: Your code here - Implement message handling
class MessageWebSocket {
  private sentMessages: Message[] = [];
  private receivedMessages: Message[] = [];
  private handlers: MessageHandlers = {};

  constructor(private ws: WebSocketConnection) {}

  // TODO: Implement message sending
  // - Validate message format (has type, payload, timestamp)
  // - Check message size <= 1MB (1,048,576 bytes)
  // - Only send if connection is OPEN
  // - Add to sentMessages array
  // - Call onError callback if validation fails
  send(message: Message): void {
    // TODO: Your implementation
  }

  // TODO: Implement message receiving
  // - Validate incoming message
  // - Add to receivedMessages array
  // - Call onMessage callback if registered
  receive(message: unknown): void {
    // TODO: Your implementation
  }

  // Register message handler
  onMessage(callback: (message: Message) => void): void {
    this.handlers.onMessage = callback;
  }

  // Register error handler
  onError(callback: (error: string) => void): void {
    this.handlers.onError = callback;
  }

  // Get statistics
  getStats(): { sent: number; received: number } {
    return {
      sent: this.sentMessages.length,
      received: this.receivedMessages.length,
    };
  }
}

console.log("--- TODO 2: Message Send/Receive ---\n");

const msgWs = new MessageWebSocket(ws);
console.log("Testing message handling:");

msgWs.onMessage((msg) => {
  console.log(`📥 Received: ${msg.type}`);
});

msgWs.onError((err) => {
  console.log(`❌ Error: ${err}`);
});

// TODO: After implementing, these should work:
// msgWs.send({ type: "test", payload: "hello", timestamp: Date.now() });
// msgWs.receive({ type: "response", payload: "world", timestamp: Date.now() });

console.log("\nExpected behavior:");
console.log("  - Valid messages are sent and received");
console.log("  - Invalid format triggers error callback");
console.log("  - Messages > 1MB are rejected");
console.log("  - Statistics track sent/received counts");
console.log("");

// ============================================
// TODO 3: Heartbeat/Ping Mechanism
// ============================================
// Instructions:
// - Implement ping/pong heartbeat mechanism
// - Send PING every 30 seconds
// - Expect PONG response within 5 seconds
// - After 3 missed PONGs, close connection

interface HeartbeatConfig {
  pingInterval: number; // milliseconds
  pongTimeout: number; // milliseconds
  maxMissedPongs: number;
}

// TODO: Your code here - Implement heartbeat
class HeartbeatWebSocket {
  private pingTimer?: ReturnType<typeof setInterval>;
  private pongTimer?: ReturnType<typeof setTimeout>;
  private missedPongs = 0;

  constructor(
    private ws: WebSocketConnection,
    private config: HeartbeatConfig = {
      pingInterval: 30000,
      pongTimeout: 5000,
      maxMissedPongs: 3,
    }
  ) {}

  // TODO: Start sending PING messages
  // - Set up interval to send PING every config.pingInterval
  // - Start PONG timeout after each PING
  // - Reset missedPongs counter on successful PONG
  // - Close connection after maxMissedPongs
  start(): void {
    // TODO: Your implementation
  }

  // TODO: Handle PONG response
  // - Clear PONG timeout
  // - Reset missedPongs counter
  // - Log round-trip time
  handlePong(timestamp: number): void {
    // TODO: Your implementation
  }

  // TODO: Stop heartbeat mechanism
  // - Clear both timers
  stop(): void {
    // TODO: Your implementation
  }

  // Get current missed PONG count
  getMissedPongs(): number {
    return this.missedPongs;
  }
}

console.log("--- TODO 3: Heartbeat Mechanism ---\n");

const heartbeatWs = new HeartbeatWebSocket(ws, {
  pingInterval: 5000, // 5 seconds for testing (normally 30000)
  pongTimeout: 2000, // 2 seconds for testing (normally 5000)
  maxMissedPongs: 3,
});

console.log("Testing heartbeat:");
// TODO: After implementing, test with:
// heartbeatWs.start();
// heartbeatWs.handlePong(Date.now());

console.log("\nExpected behavior:");
console.log("  - PING sent every 5 seconds");
console.log("  - PONG timeout after 2 seconds if no response");
console.log("  - Connection closes after 3 missed PONGs");
console.log("  - Round-trip time logged on PONG");
console.log("");

// ============================================
// TODO 4: Reconnection with Exponential Backoff
// ============================================
// Instructions:
// - Implement reconnection with exponential backoff
// - Start with 1 second delay
// - Double delay each retry (max 30 seconds)
// - Stop after 10 attempts
// - Log each reconnection attempt

interface ReconnectConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
}

// TODO: Your code here - Implement reconnection
class ReconnectingWebSocket {
  private reconnectAttempts = 0;
  private reconnectTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private ws: WebSocketConnection,
    private config: ReconnectConfig = {
      maxAttempts: 10,
      initialDelay: 1000,
      maxDelay: 30000,
    }
  ) {}

  // TODO: Calculate delay with exponential backoff
  // - Start with initialDelay
  // - Double each attempt (2^n)
  // - Cap at maxDelay
  // - Return delay in milliseconds
  private calculateBackoff(): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Attempt reconnection
  // - Calculate delay using exponential backoff
  // - Increment attempt counter
  // - Log attempt number and delay
  // - Schedule reconnection after delay
  // - Stop if max attempts reached
  reconnect(): void {
    // TODO: Your implementation
  }

  // TODO: Reset reconnection state
  // - Call when connection is successful
  // - Reset attempt counter
  // - Clear reconnect timer
  reset(): void {
    // TODO: Your implementation
  }

  // Get current attempt count
  getAttempts(): number {
    return this.reconnectAttempts;
  }
}

console.log("--- TODO 4: Reconnection with Backoff ---\n");

const reconnectWs = new ReconnectingWebSocket(ws, {
  maxAttempts: 5, // Reduced for testing
  initialDelay: 1000,
  maxDelay: 16000,
});

console.log("Testing reconnection:");
// TODO: After implementing, test with:
// reconnectWs.reconnect(); // Should schedule reconnect in 1s
// setTimeout(() => reconnectWs.reconnect(), 2000); // Should schedule in 2s

console.log("\nExpected behavior:");
console.log("  - First attempt: 1 second delay");
console.log("  - Second attempt: 2 second delay");
console.log("  - Third attempt: 4 second delay");
console.log("  - Fourth attempt: 8 second delay");
console.log("  - Fifth attempt: 16 second delay (capped)");
console.log("  - Stops after max attempts");
console.log("");

// ============================================
// TODO 5: Connection Error Handling
// ============================================
// Instructions:
// - Implement comprehensive error handling
// - Handle connection failures
// - Handle send failures when not connected
// - Provide meaningful error messages

// TODO: Your code here - Implement error handling
interface ConnectionErrorHandler {
  onConnectionError?: (error: Error) => void;
  onSendError?: (error: Error) => void;
  onCloseError?: (error: Error) => void;
}

class SafeWebSocket {
  private handlers: ConnectionErrorHandler = {};

  constructor(private ws: WebSocketConnection) {}

  // TODO: Connect with error handling
  // - Try to connect
  // - On failure, call onConnectionError
  // - Log error with context
  connect(): void {
    // TODO: Your implementation
  }

  // TODO: Send with error handling
  // - Check if connected
  // - If not, call onSendError
  // - Log error with message details
  send(data: string): void {
    // TODO: Your implementation
  }

  // TODO: Close with error handling
  // - Attempt to close
  // - On failure, call onCloseError
  // - Log error with close code/reason
  close(code?: number, reason?: string): void {
    // TODO: Your implementation
  }

  // Register error handlers
  onConnectionError(callback: (error: Error) => void): void {
    this.handlers.onConnectionError = callback;
  }

  onSendError(callback: (error: Error) => void): void {
    this.handlers.onSendError = callback;
  }

  onCloseError(callback: (error: Error) => void): void {
    this.handlers.onCloseError = callback;
  }
}

console.log("--- TODO 5: Error Handling ---\n");

const safeWs = new SafeWebSocket(ws);

safeWs.onConnectionError((err) => {
  console.log(`🔴 Connection Error: ${err.message}`);
});

safeWs.onSendError((err) => {
  console.log(`🔴 Send Error: ${err.message}`);
});

safeWs.onCloseError((err) => {
  console.log(`🔴 Close Error: ${err.message}`);
});

console.log("Testing error handling:");
// TODO: After implementing, test various error scenarios

console.log("\nExpected behavior:");
console.log("  - Connection failures trigger onConnectionError");
console.log("  - Send when disconnected triggers onSendError");
console.log("  - Close failures trigger onCloseError");
console.log("  - All errors include context and meaningful messages");
console.log("");

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a complete WebSocket client class
// - Combine all previous features
// - Add connection state tracking
// - Implement message queue while disconnected

// TODO: Your code here - Create complete WebSocket client
class CompleteWebSocketClient {
  // TODO: Implement combining all features:
  // - Connection lifecycle
  // - Message send/receive
  // - Heartbeat mechanism
  // - Reconnection with backoff
  // - Error handling
  // - Message queue while disconnected
}

console.log("--- BONUS: Complete WebSocket Client ---\n");

console.log("Create a production-ready WebSocket client that:");
console.log("  - Manages full connection lifecycle");
console.log("  - Handles heartbeat/ping-pong");
console.log("  - Reconnects automatically with backoff");
console.log("  - Queues messages while disconnected");
console.log("  - Provides comprehensive error handling");
console.log("  - Tracks connection state and statistics");
console.log("");

console.log("✅ Exercise complete!");
console.log("\nNext step: Compare your answers with exercise-01-websocket-solution.ts");

export {};
