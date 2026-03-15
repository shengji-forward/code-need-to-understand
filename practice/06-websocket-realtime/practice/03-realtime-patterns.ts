// Realtime Patterns Practice
// Run with: npx tsx 06-websocket-realtime/practice/03-realtime-patterns.ts

console.log("=== Realtime Patterns Practice ===\n");

// ============================================
// LEVEL 1: Basic Realtime Features
// ============================================

console.log("--- LEVEL 1: Broadcasting and Targeting ---\n");

// Connection tracking with Maps
type ClientId = string;
type ConnectionId = string;

interface ClientConnection {
  id: ConnectionId;
  userId: ClientId;
  connected: boolean;
}

class RealtimeServer {
  private connections: Map<ConnectionId, ClientConnection> = new Map();
  private userConnections: Map<ClientId, Set<ConnectionId>> = new Map();
  private connectionCounter = 0;

  connect(userId: ClientId): ConnectionId {
    const connectionId = `conn-${++this.connectionCounter}`;

    const connection: ClientConnection = {
      id: connectionId,
      userId,
      connected: true,
    };

    this.connections.set(connectionId, connection);

    // Track user's connections
    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, new Set());
    }
    this.userConnections.get(userId)!.add(connectionId);

    console.log(`🔌 User ${userId} connected (${connectionId})`);
    return connectionId;
  }

  disconnect(connectionId: ConnectionId): void {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    console.log(`🔌 User ${connection.userId} disconnected (${connectionId})`);

    // Remove from user's connections
    const userConns = this.userConnections.get(connection.userId);
    if (userConns) {
      userConns.delete(connectionId);
      if (userConns.size === 0) {
        this.userConnections.delete(connection.userId);
      }
    }

    this.connections.delete(connectionId);
  }

  // Broadcast to all connected clients
  broadcast(message: string): void {
    console.log(`📢 Broadcasting to ${this.connections.size} clients`);
    this.connections.forEach((conn) => {
      console.log(`  → Sent to ${conn.userId} (${conn.id})`);
    });
  }

  // Send to specific client
  sendToUser(userId: ClientId, message: string): void {
    const userConns = this.userConnections.get(userId);
    if (!userConns || userConns.size === 0) {
      console.log(`❌ User ${userId} has no active connections`);
      return;
    }

    console.log(`📤 Sending to user ${userId} (${userConns.size} connections)`);
    userConns.forEach((connId) => {
      console.log(`  → Sent to ${connId}`);
    });
  }

  // Get stats
  getStats(): { totalConnections: number; totalUsers: number } {
    return {
      totalConnections: this.connections.size,
      totalUsers: this.userConnections.size,
    };
  }
}

// Health Coaching Scenario: Group Coaching Session
console.log("🏥 Health Coaching Scenario: Group Coaching Session\n");

const server = new RealtimeServer();

// Connect users
const conn1 = server.connect("user-coach"); // Coach
const conn2 = server.connect("user-client-1");
const conn3 = server.connect("user-client-2");
const conn4 = server.connect("user-client-3");

console.log("");

// Broadcast to all (e.g., coach announcement)
server.broadcast("📢 Coach: Let's start today's session!");
console.log("");

// Send to specific user (e.g., private message)
server.sendToUser("user-client-1", "📬 Coach: Great progress on your water intake!");
console.log("");

// Room/Channel Pattern
console.log("🏠 Room/Channel Pattern:");
console.log("");

interface Room {
  id: string;
  name: string;
  members: Set<ConnectionId>;
}

class RoomManager {
  private rooms: Map<string, Room> = new Map();
  private connectionRooms: Map<ConnectionId, Set<string>> = new Map();

  createRoom(id: string, name: string): Room {
    const room: Room = {
      id,
      name,
      members: new Set(),
    };
    this.rooms.set(id, room);
    console.log(`🏠 Created room: ${name} (${id})`);
    return room;
  }

  joinRoom(connectionId: ConnectionId, roomId: string): void {
    const room = this.rooms.get(roomId);
    if (!room) {
      console.log(`❌ Room ${roomId} not found`);
      return;
    }

    room.members.add(connectionId);

    // Track room membership
    if (!this.connectionRooms.has(connectionId)) {
      this.connectionRooms.set(connectionId, new Set());
    }
    this.connectionRooms.get(connectionId)!.add(roomId);

    console.log(`➕ Connection ${connectionId} joined room ${room.name}`);
  }

  leaveRoom(connectionId: ConnectionId, roomId: string): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.members.delete(connectionId);

    const connRooms = this.connectionRooms.get(connectionId);
    if (connRooms) {
      connRooms.delete(roomId);
    }

    console.log(`➖ Connection ${connectionId} left room ${room.name}`);
  }

  sendToRoom(roomId: string, message: string, excludeConnectionId?: ConnectionId): void {
    const room = this.rooms.get(roomId);
    if (!room) {
      console.log(`❌ Room ${roomId} not found`);
      return;
    }

    console.log(`📢 Sending to room ${room.name} (${room.members.size} members)`);
    room.members.forEach((connId) => {
      if (connId !== excludeConnectionId) {
        console.log(`  → Sent to ${connId}`);
      }
    });
  }

  getRoomMembers(roomId: string): ConnectionId[] {
    const room = this.rooms.get(roomId);
    return room ? Array.from(room.members) : [];
  }
}

const roomManager = new RoomManager();

// Create rooms for different coaching groups
roomManager.createRoom("room-1", "Weight Loss Challenge");
roomManager.createRoom("room-2", "Fitness Beginners");
roomManager.createRoom("room-3", "Marathon Training");
console.log("");

// Join rooms
roomManager.joinRoom(conn1, "room-1"); // Coach
roomManager.joinRoom(conn2, "room-1"); // Client 1
roomManager.joinRoom(conn3, "room-1"); // Client 2
console.log("");

// Send to room (excluding sender)
roomManager.sendToRoom("room-1", "💬 User-client-1: I lost 2kg this week!", conn2);
console.log("");

// ============================================
// LEVEL 2: Advanced Patterns
// ============================================

setTimeout(() => {
  console.log("\n--- LEVEL 2: Presence and Typing Indicators ---\n");

  // Presence System (Online/Offline Tracking)
  console.log("🟢 Presence System:");
  console.log("");

  interface UserPresence {
    userId: string;
    status: "online" | "offline" | "away";
    lastSeen: number;
    currentRoom?: string;
  }

  class PresenceManager {
    private presences: Map<ClientId, UserPresence> = new Map();
    private onlineUsers: Set<ClientId> = new Set();

    setUserOnline(userId: ClientId, roomId?: string): void {
      const presence: UserPresence = {
        userId,
        status: "online",
        lastSeen: Date.now(),
        currentRoom: roomId,
      };

      this.presences.set(userId, presence);
      this.onlineUsers.add(userId);

      console.log(`🟢 ${userId} is now online`);
      if (roomId) {
        console.log(`   In room: ${roomId}`);
      }
    }

    setUserOffline(userId: ClientId): void {
      const presence = this.presences.get(userId);
      if (presence) {
        presence.status = "offline";
        presence.lastSeen = Date.now();
        this.onlineUsers.delete(userId);
        console.log(`🔴 ${userId} is now offline`);
      }
    }

    setUserAway(userId: ClientId): void {
      const presence = this.presences.get(userId);
      if (presence) {
        presence.status = "away";
        presence.lastSeen = Date.now();
        console.log(`🟡 ${userId} is now away`);
      }
    }

    getOnlineUsers(): ClientId[] {
      return Array.from(this.onlineUsers);
    }

    getUsersInRoom(roomId: string): UserPresence[] {
      return Array.from(this.presences.values()).filter((p) => p.currentRoom === roomId && p.status === "online");
    }

    isUserOnline(userId: ClientId): boolean {
      return this.onlineUsers.has(userId);
    }
  }

  const presenceManager = new PresenceManager();

  // Users come online
  presenceManager.setUserOnline("coach-1", "room-1");
  presenceManager.setUserOnline("client-1", "room-1");
  presenceManager.setUserOnline("client-2", "room-1");
  presenceManager.setUserOnline("client-3", "room-2");
  console.log("");

  // Get online users in a room
  const room1Users = presenceManager.getUsersInRoom("room-1");
  console.log(`📊 Online users in room-1: ${room1Users.length}`);
  room1Users.forEach((u) => console.log(`  - ${u.userId}`));
  console.log("");

  // User goes away
  presenceManager.setUserAway("client-1");
  console.log("");

  // Typing Indicators
  console.log("⌨️  Typing Indicators:");
  console.log("");

  interface TypingIndicator {
    userId: ClientId;
    roomId: string;
    timestamp: number;
  }

  class TypingManager {
    private typingUsers: Map<string, TypingIndicator> = new Map();
    private readonly TIMEOUT = 3000; // Clear typing after 3 seconds

    setTyping(userId: ClientId, roomId: string): void {
      const key = `${userId}:${roomId}`;
      const indicator: TypingIndicator = {
        userId,
        roomId,
        timestamp: Date.now(),
      };

      this.typingUsers.set(key, indicator);
      console.log(`⌨️  ${userId} is typing in ${roomId}`);

      // Auto-clear after timeout
      setTimeout(() => {
        this.clearTyping(userId, roomId);
      }, this.TIMEOUT);
    }

    clearTyping(userId: ClientId, roomId: string): void {
      const key = `${userId}:${roomId}`;
      if (this.typingUsers.has(key)) {
        this.typingUsers.delete(key);
        console.log(`✋ ${userId} stopped typing in ${roomId}`);
      }
    }

    getTypingUsers(roomId: string): ClientId[] {
      const now = Date.now();
      const typing: ClientId[] = [];

      this.typingUsers.forEach((indicator, key) => {
        // Remove expired indicators
        if (now - indicator.timestamp > 5000) {
          this.typingUsers.delete(key);
          return;
        }

        if (indicator.roomId === roomId) {
          typing.push(indicator.userId);
        }
      });

      return typing;
    }
  }

  const typingManager = new TypingManager();

  // Simulate typing
  typingManager.setTyping("client-1", "room-1");
  typingManager.setTyping("client-2", "room-1");

  const typingInRoom1 = typingManager.getTypingUsers("room-1");
  console.log(`📊 Typing in room-1: ${typingInRoom1.join(", ")}`);
  console.log("");

  // Live Counters (Active Users)
  console.log("📊 Live Counters:");
  console.log("");

  interface Counter {
    name: string;
    value: number;
    lastUpdated: number;
  }

  class LiveCounterManager {
    private counters: Map<string, Counter> = new Map();

    increment(counterName: string, amount = 1): void {
      const counter = this.counters.get(counterName) || {
        name: counterName,
        value: 0,
        lastUpdated: 0,
      };

      counter.value += amount;
      counter.lastUpdated = Date.now();

      this.counters.set(counterName, counter);
      console.log(`📈 ${counterName}: ${counter.value} (+${amount})`);
    }

    decrement(counterName: string, amount = 1): void {
      const counter = this.counters.get(counterName);
      if (counter) {
        counter.value = Math.max(0, counter.value - amount);
        counter.lastUpdated = Date.now();
        console.log(`📉 ${counterName}: ${counter.value} (-${amount})`);
      }
    }

    get(counterName: string): number {
      const counter = this.counters.get(counterName);
      return counter ? counter.value : 0;
    }

    getAll(): Record<string, number> {
      const result: Record<string, number> = {};
      this.counters.forEach((counter, name) => {
        result[name] = counter.value;
      });
      return result;
    }
  }

  const counterManager = new LiveCounterManager();

  // Track active users in rooms
  counterManager.increment("room-1.active-users", 3);
  counterManager.increment("room-2.active-users", 2);
  counterManager.increment("room-1.active-users", 1); // Another user joins
  counterManager.increment("total-active-users", 5);
  console.log("");

  const allCounters = counterManager.getAll();
  console.log("📊 All counters:");
  Object.entries(allCounters).forEach(([name, value]) => {
    console.log(`  ${name}: ${value}`);
  });
  console.log("");

  // Message Acknowledgment Patterns
  console.log("✅ Message Acknowledgment Patterns:");
  console.log("");

  interface PendingMessage {
    id: string;
    content: string;
    timestamp: number;
    retries: number;
  }

  class AcknowledgmentSystem {
    private pendingMessages: Map<string, PendingMessage> = new Map();
    private messageIdCounter = 0;
    private readonly MAX_RETRIES = 3;
    private readonly ACK_TIMEOUT = 5000;

    sendWithAck(message: string): string {
      const messageId = `msg-${++this.messageIdCounter}`;

      const pending: PendingMessage = {
        id: messageId,
        content: message,
        timestamp: Date.now(),
        retries: 0,
      };

      this.pendingMessages.set(messageId, pending);
      console.log(`📤 Sending message ${messageId}: ${message}`);

      // Wait for ACK
      setTimeout(() => {
        this.checkAck(messageId);
      }, this.ACK_TIMEOUT);

      return messageId;
    }

    receiveAck(messageId: string): void {
      const pending = this.pendingMessages.get(messageId);
      if (pending) {
        this.pendingMessages.delete(messageId);
        console.log(`✅ ACK received for ${messageId}: "${pending.content}"`);
      }
    }

    private checkAck(messageId: string): void {
      const pending = this.pendingMessages.get(messageId);
      if (!pending) return; // Already acknowledged

      if (pending.retries < this.MAX_RETRIES) {
        pending.retries++;
        console.log(`⚠️  No ACK for ${messageId}, retrying (${pending.retries}/${this.MAX_RETRIES})`);

        // Resend
        setTimeout(() => {
          this.checkAck(messageId);
        }, this.ACK_TIMEOUT);
      } else {
        console.log(`❌ Max retries reached for ${messageId}, giving up`);
        this.pendingMessages.delete(messageId);
      }
    }
  }

  const ackSystem = new AcknowledgmentSystem();

  // Send message with ACK
  const msgId1 = ackSystem.sendWithAck("Hello, coach!");
  const msgId2 = ackSystem.sendWithAck("How are you?");

  // Simulate ACK for first message
  setTimeout(() => {
    ackSystem.receiveAck(msgId1);
    console.log("");
  }, 1000);
  console.log("");

}, 1000);

// ============================================
// LEVEL 3: Production Realtime
// ============================================

setTimeout(() => {
  console.log("\n--- LEVEL 3: Production Realtime Features ---\n");

  // Authentication and Authorization
  console.log("🔐 Authentication and Authorization:");
  console.log("");

  interface AuthToken {
    userId: string;
    role: "coach" | "client" | "admin";
    permissions: string[];
    expiresAt: number;
  }

  class AuthManager {
    private tokens: Map<string, AuthToken> = new Map();

    generateToken(userId: string, role: "coach" | "client" | "admin"): string {
      const token: AuthToken = {
        userId,
        role,
        permissions: this.getPermissionsForRole(role),
        expiresAt: Date.now() + 3600000, // 1 hour
      };

      const tokenId = `token-${userId}-${Date.now()}`;
      this.tokens.set(tokenId, token);

      console.log(`🔑 Generated token for ${userId} (${role})`);
      console.log(`   Permissions: ${token.permissions.join(", ")}`);

      return tokenId;
    }

    private getPermissionsForRole(role: string): string[] {
      const permissions = {
        coach: ["send_message", "moderate_room", "view_all_users"],
        client: ["send_message", "view_own_profile"],
        admin: ["*"], // All permissions
      };
      return permissions[role as keyof typeof permissions] || [];
    }

    validateToken(tokenId: string): AuthToken | null {
      const token = this.tokens.get(tokenId);

      if (!token) {
        console.log(`❌ Token not found`);
        return null;
      }

      if (Date.now() > token.expiresAt) {
        console.log(`❌ Token expired for ${token.userId}`);
        this.tokens.delete(tokenId);
        return null;
      }

      console.log(`✅ Token valid for ${token.userId} (${token.role})`);
      return token;
    }

    hasPermission(token: AuthToken, permission: string): boolean {
      if (token.permissions.includes("*")) return true;
      const has = token.permissions.includes(permission);
      console.log(`  ${token.userId} ${has ? "has" : "does NOT have"} permission: ${permission}`);
      return has;
    }
  }

  const authManager = new AuthManager();

  // Generate tokens
  const coachToken = authManager.generateToken("coach-1", "coach");
  const clientToken = authManager.generateToken("client-1", "client");
  console.log("");

  // Validate and check permissions
  const validatedCoach = authManager.validateToken(coachToken);
  if (validatedCoach) {
    authManager.hasPermission(validatedCoach, "moderate_room");
  }

  const validatedClient = authManager.validateToken(clientToken);
  if (validatedClient) {
    authManager.hasPermission(validatedClient, "moderate_room");
  }
  console.log("");

  // Scaling Considerations
  console.log("📈 Scaling Considerations:");
  console.log("");

  const scalingStrategies = {
    horizontal: {
      description: "Multiple WebSocket servers behind load balancer",
      challenges: [
        "Need message broker (Redis, RabbitMQ) for cross-server communication",
        "Sticky sessions or session affinity required",
        "State must be externalized (no in-memory storage)",
      ],
      solution: "Use Redis Pub/Sub for cross-server messaging",
    },
    vertical: {
      description: "Increase server resources (CPU, RAM)",
      challenges: [
        "Single point of failure",
        "Limited scalability ceiling",
        "Higher cost per connection",
      ],
      solution: "Use for small-scale apps (< 10K connections)",
    },
    hybrid: {
      description: "Regional servers with global coordinator",
      challenges: [
        "Complex architecture",
        "Network latency between regions",
        "Data consistency across regions",
      ],
      solution: "Use CDN + regional WebSocket servers",
    },
  };

  Object.entries(scalingStrategies).forEach(([name, info]) => {
    console.log(`  ${name}:`);
    console.log(`    ${info.description}`);
    console.log(`    Challenges:`);
    info.challenges.forEach((c) => console.log(`      - ${c}`));
    console.log(`    Solution: ${info.solution}`);
  });
  console.log("");

  // Message Ordering Guarantees
  console.log("🔢 Message Ordering Guarantees:");
  console.log("");

  const orderingStrategies = {
    sequenceNumber: {
      description: "Include sequence number in each message",
      implementation: "Client tracks last received seq number",
      benefit: "Detect missing or out-of-order messages",
    },
    timestamp: {
      description: "Use server timestamp for ordering",
      implementation: "Client sorts messages by timestamp",
      benefit: "Simple, works across reconnections",
    },
    causalOrdering: {
      description: "Vector clocks for causal relationships",
      implementation: "Track message dependencies",
      benefit: "Guarantees causal ordering",
    },
    totalOrder: {
      description: "Single sequencer for all messages",
      implementation: "Central service assigns sequence numbers",
      benefit: "Strict total ordering",
    },
  };

  Object.entries(orderingStrategies).forEach(([name, info]) => {
    console.log(`  ${name}:`);
    console.log(`    ${info.description}`);
    console.log(`    Implementation: ${info.implementation}`);
    console.log(`    Benefit: ${info.benefit}`);
  });
  console.log("");

  // Reconnection State Synchronization
  console.log("🔄 Reconnection State Synchronization:");
  console.log("");

  interface ClientState {
    userId: string;
    lastMessageSeq: number;
    joinedRooms: string[];
    pendingAcks: string[];
  }

  class StateSyncManager {
    private clientStates: Map<ClientId, ClientState> = new Map();

    saveState(connectionId: ConnectionId, state: ClientState): void {
      this.clientStates.set(connectionId, state);
      console.log(`💾 Saved state for ${connectionId}`);
      console.log(`   Last message: ${state.lastMessageSeq}`);
      console.log(`   Rooms: ${state.joinedRooms.join(", ")}`);
    }

    getState(connectionId: ConnectionId): ClientState | null {
      const state = this.clientStates.get(connectionId);
      if (state) {
        console.log(`📤 Retrieved state for ${connectionId}`);
        return state;
      }
      return null;
    }

    getMissedMessages(userId: ClientId, fromSeq: number): string[] {
      // In real implementation, would query message store
      const missedMessages = [
        `msg-${fromSeq + 1}: Welcome back!`,
        `msg-${fromSeq + 2}: You missed this message`,
        `msg-${fromSeq + 3}: Here's what happened...`,
      ];
      console.log(`📨 Found ${missedMessages.length} missed messages for ${userId}`);
      return missedMessages;
    }
  }

  const stateSync = new StateSyncManager();

  // Save state before disconnect
  stateSync.saveState("conn-1", {
    userId: "user-1",
    lastMessageSeq: 42,
    joinedRooms: ["room-1", "room-2"],
    pendingAcks: ["msg-40", "msg-41"],
  });
  console.log("");

  // On reconnect, restore state
  const restoredState = stateSync.getState("conn-1");
  if (restoredState) {
    const missed = stateSync.getMissedMessages(restoredState.userId, restoredState.lastMessageSeq);
    console.log("  Delivering missed messages:");
    missed.forEach((msg) => console.log(`    - ${msg}`));
  }
  console.log("");

  // Monitoring and Observability
  console.log("📊 Monitoring and Observability:");
  console.log("");

  interface Metrics {
    activeConnections: number;
    messagesPerSecond: number;
    errorRate: number;
    avgLatency: number;
    reconnections: number;
  }

  class MetricsCollector {
    private metrics: Metrics = {
      activeConnections: 0,
      messagesPerSecond: 0,
      errorRate: 0,
      avgLatency: 0,
      reconnections: 0,
    };

    private messageCount = 0;
    private errorCount = 0;
    private latencies: number[] = [];

    trackConnection(): void {
      this.metrics.activeConnections++;
    }

    trackDisconnection(): void {
      this.metrics.activeConnections--;
    }

    trackMessage(latency?: number): void {
      this.messageCount++;
      if (latency) {
        this.latencies.push(latency);
      }
    }

    trackError(): void {
      this.errorCount++;
    }

    trackReconnection(): void {
      this.metrics.reconnections++;
    }

    getMetrics(): Metrics {
      // Calculate derived metrics
      const total = this.messageCount + this.errorCount;
      this.metrics.messagesPerSecond = this.messageCount;
      this.metrics.errorRate = total > 0 ? (this.errorCount / total) * 100 : 0;

      if (this.latencies.length > 0) {
        const sum = this.latencies.reduce((a, b) => a + b, 0);
        this.metrics.avgLatency = sum / this.latencies.length;
      }

      return this.metrics;
    }
  }

  const metrics = new MetricsCollector();

  // Simulate some activity
  metrics.trackConnection();
  metrics.trackConnection();
  metrics.trackConnection();

  metrics.trackMessage(50);
  metrics.trackMessage(30);
  metrics.trackMessage(70);
  metrics.trackError();
  metrics.trackReconnection();

  const currentMetrics = metrics.getMetrics();
  console.log("  Current Metrics:");
  console.log(`    Active connections: ${currentMetrics.activeConnections}`);
  console.log(`    Messages/sec: ${currentMetrics.messagesPerSecond}`);
  console.log(`    Error rate: ${currentMetrics.errorRate.toFixed(2)}%`);
  console.log(`    Avg latency: ${currentMetrics.avgLatency.toFixed(2)}ms`);
  console.log(`    Reconnections: ${currentMetrics.reconnections}`);
  console.log("");

}, 2000);

// ============================================
// Best Practices Summary
// ============================================

setTimeout(() => {
  console.log("\n=== Best Practices ===\n");

  console.log("✅ Scalability:");
  console.log("  - Use message brokers (Redis Pub/Sub) for multi-server setups");
  console.log("  - Externalize state (don't rely on in-memory storage)");
  console.log("  - Implement connection limits per server");
  console.log("  - Use load balancing with sticky sessions");
  console.log("  - Consider regional servers for global applications");
  console.log("");

  console.log("✅ Reliability:");
  console.log("  - Implement heartbeat/ping-pong to detect dead connections");
  console.log("  - Use message acknowledgments for critical messages");
  console.log("  - Queue messages while disconnected");
  console.log("  - Implement reconnection with exponential backoff");
  console.log("  - Sync state on reconnection");
  console.log("");

  console.log("✅ Security:");
  console.log("  - Authenticate during WebSocket handshake");
  console.log("  - Validate permissions for each action");
  console.log("  - Rate limit messages per connection");
  console.log("  - Sanitize all user input");
  console.log("  - Use TLS/WSS in production");
  console.log("");

  console.log("✅ User Experience:");
  console.log("  - Show connection status (online/offline/connecting)");
  console.log("  - Deliver missed messages after reconnection");
  console.log("  - Implement typing indicators for better feedback");
  console.log("  - Use presence to show user availability");
  console.log("  - Queue outgoing messages while disconnected");
  console.log("");

  console.log("✅ Monitoring:");
  console.log("  - Track active connections and reconnection rates");
  console.log("  - Monitor message throughput and latency");
  console.log("  - Alert on high error rates");
  console.log("  - Log authentication failures");
  console.log("  - Use distributed tracing for message flows");
  console.log("");

  console.log("✅ Code Organization:");
  console.log("  - Separate concerns (auth, presence, rooms)");
  console.log("  - Use TypeScript for type safety");
  console.log("  - Implement graceful shutdown");
  console.log("  - Clean up resources on disconnect");
  console.log("  - Write integration tests for critical paths");
  console.log("");

  console.log("\n✅ Practice complete!");
}, 3000);

export {};
