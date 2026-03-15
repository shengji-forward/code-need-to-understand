// SOLUTION: Exercise 3 - Realtime Patterns
// Compare with your work to see how you did!

console.log("=== Exercise 3: Realtime Patterns (Solution) ===\n");

// ============================================
// SOLUTION 1: Implement Broadcast to All Clients
// ============================================

type ClientId = string;
type ConnectionId = string;

interface Client {
  id: ClientId;
  connections: Set<ConnectionId>;
}

// SOLUTION: Broadcast system with client tracking
class BroadcastSystem {
  private clients: Map<ClientId, Client> = new Map();
  private connections: Map<ConnectionId, ClientId> = new Map();
  private connCounter = 0;

  connect(userId: ClientId): ConnectionId {
    const connId = `conn-${++this.connCounter}`;

    // Get or create client
    let client = this.clients.get(userId);
    if (!client) {
      client = { id: userId, connections: new Set() };
      this.clients.set(userId, client);
    }

    // Add connection
    client.connections.add(connId);
    this.connections.set(connId, userId);

    console.log(`🔌 ${userId} connected (${connId})`);
    return connId;
  }

  disconnect(connectionId: ConnectionId): number {
    const userId = this.connections.get(connectionId);
    if (!userId) return this.connections.size;

    const client = this.clients.get(userId);
    if (!client) return this.connections.size;

    // Remove connection
    client.connections.delete(connectionId);
    this.connections.delete(connectionId);
    console.log(`🔌 ${userId} disconnected (${connectionId})`);

    // Remove client if no connections left
    if (client.connections.size === 0) {
      this.clients.delete(userId);
      console.log(`👋 ${userId} fully disconnected`);
    }

    return this.connections.size;
  }

  broadcast(message: string): number {
    console.log(`📢 Broadcasting to ${this.clients.size} clients`);

    this.clients.forEach((client) => {
      console.log(`  → Sent to ${client.id} (${client.connections.size} connection(s))`);
    });

    return this.clients.size;
  }

  getConnectionCount(): number {
    return this.connections.size;
  }

  getClientCount(): number {
    return this.clients.size;
  }
}

console.log("--- SOLUTION 1: Broadcast to All Clients ---\n");

const broadcast = new BroadcastSystem();

// Connect clients
const conn1 = broadcast.connect("user-1");
const conn2 = broadcast.connect("user-2");
const conn3 = broadcast.connect("user-1"); // Same user, second connection

console.log(`\nConnected: ${broadcast.getClientCount()} clients, ${broadcast.getConnectionCount()} connections`);

// Broadcast
const count = broadcast.broadcast("Hello everyone!");
console.log(`\n✅ Message sent to ${count} clients`);

// Disconnect
broadcast.disconnect(conn3);
console.log(`After disconnect: ${broadcast.getClientCount()} clients, ${broadcast.getConnectionCount()} connections\n`);

console.log("Key Points:");
console.log("  - Track unique clients separately from connections");
console.log("  - One client can have multiple connections");
console.log("  - Broadcast reaches each unique client once");
console.log("  - Auto-cleanup when client has no connections");
console.log("");

// ============================================
// SOLUTION 2: Create Room/Channel System
// ============================================

interface Room {
  id: string;
  name: string;
  members: Set<ConnectionId>;
}

// SOLUTION: Room system with membership tracking
class RoomSystem {
  private rooms: Map<string, Room> = new Map();
  private connectionRooms: Map<ConnectionId, Set<string>> = new Map();

  createRoom(id: string, name: string): Room {
    if (this.rooms.has(id)) {
      throw new Error(`Room ${id} already exists`);
    }

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

    // Add to room
    room.members.add(connectionId);

    // Track room membership
    if (!this.connectionRooms.has(connectionId)) {
      this.connectionRooms.set(connectionId, new Set());
    }
    this.connectionRooms.get(connectionId)!.add(roomId);

    console.log(`➕ ${connectionId} joined room ${room.name}`);
  }

  leaveRoom(connectionId: ConnectionId, roomId: string): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    // Remove from room
    room.members.delete(connectionId);

    // Remove room from connection
    const connRooms = this.connectionRooms.get(connectionId);
    if (connRooms) {
      connRooms.delete(roomId);
      if (connRooms.size === 0) {
        this.connectionRooms.delete(connectionId);
      }
    }

    console.log(`➖ ${connectionId} left room ${room.name}`);

    // Delete room if empty
    if (room.members.size === 0) {
      this.rooms.delete(roomId);
      console.log(`🗑️  Deleted empty room: ${room.name}`);
    }
  }

  sendToRoom(roomId: string, message: string, senderId?: ConnectionId): number {
    const room = this.rooms.get(roomId);
    if (!room) {
      console.log(`❌ Room ${roomId} not found`);
      return 0;
    }

    console.log(`📢 Sending to room ${room.name} (${room.members.size} members)`);

    let sent = 0;
    room.members.forEach((connId) => {
      if (connId !== senderId) {
        console.log(`  → ${connId}`);
        sent++;
      }
    });

    return sent;
  }

  getRoomMemberCount(roomId: string): number {
    const room = this.rooms.get(roomId);
    return room ? room.members.size : 0;
  }

  getAllRooms(): Room[] {
    return Array.from(this.rooms.values());
  }

  // Remove connection from all rooms
  removeConnection(connectionId: ConnectionId): void {
    const connRooms = this.connectionRooms.get(connectionId);
    if (!connRooms) return;

    connRooms.forEach((roomId) => {
      this.leaveRoom(connectionId, roomId);
    });
  }
}

console.log("--- SOLUTION 2: Room/Channel System ---\n");

const rooms = new RoomSystem();

// Create rooms
rooms.createRoom("room-1", "Weight Loss Challenge");
rooms.createRoom("room-2", "Fitness Beginners");

// Create new broadcast system for connections
const broadcast2 = new BroadcastSystem();
const c1 = broadcast2.connect("user-1");
const c2 = broadcast2.connect("user-2");
const c3 = broadcast2.connect("user-3");

// Join rooms
rooms.joinRoom(c1, "room-1");
rooms.joinRoom(c2, "room-1");
rooms.joinRoom(c3, "room-2");

// Send to room
const sent = rooms.sendToRoom("room-1", "Welcome to the challenge!", c1);
console.log(`✅ Sent to ${sent} recipients\n`);

// List all rooms
console.log("All rooms:");
rooms.getAllRooms().forEach((room) => {
  console.log(`  ${room.name}: ${room.members.size} members`);
});

console.log("\nKey Points:");
console.log("  - Rooms track member connections");
console.log("  - Messages exclude sender");
console.log("  - Empty rooms auto-deleted");
console.log("  - Connection tracks room membership");
console.log("");

// ============================================
// SOLUTION 3: Add Presence Tracking (Online/Offline)
// ============================================

type UserStatus = "online" | "offline" | "away";

interface UserPresence {
  userId: ClientId;
  status: UserStatus;
  lastSeen: number;
  currentRoom?: string;
}

// SOLUTION: Presence system with status tracking
class PresenceSystem {
  private presences: Map<ClientId, UserPresence> = new Map();

  setOnline(userId: ClientId, roomId?: string): void {
    const presence: UserPresence = {
      userId,
      status: "online",
      lastSeen: Date.now(),
      currentRoom: roomId,
    };

    this.presences.set(userId, presence);
    console.log(`🟢 ${userId} is now online${roomId ? ` in ${roomId}` : ""}`);
  }

  setOffline(userId: ClientId): void {
    const presence = this.presences.get(userId);
    if (!presence) return;

    presence.status = "offline";
    presence.lastSeen = Date.now();
    console.log(`🔴 ${userId} is now offline`);
  }

  setAway(userId: ClientId): void {
    const presence = this.presences.get(userId);
    if (!presence) return;

    presence.status = "away";
    presence.lastSeen = Date.now();
    console.log(`🟡 ${userId} is now away`);
  }

  getOnlineUsers(): ClientId[] {
    return Array.from(this.presences.values())
      .filter((p) => p.status === "online")
      .map((p) => p.userId);
  }

  getUsersInRoom(roomId: string): UserPresence[] {
    return Array.from(this.presences.values()).filter(
      (p) => p.currentRoom === roomId && p.status === "online"
    );
  }

  getPresence(userId: ClientId): UserPresence | undefined {
    return this.presences.get(userId);
  }

  getStats(): { online: number; offline: number; away: number } {
    const stats = { online: 0, offline: 0, away: 0 };

    this.presences.forEach((p) => {
      stats[p.status]++;
    });

    return stats;
  }

  // Cleanup old presences
  cleanup(maxAge: number): number {
    const now = Date.now();
    let cleaned = 0;

    this.presences.forEach((presence, userId) => {
      if (now - presence.lastSeen > maxAge && presence.status === "offline") {
        this.presences.delete(userId);
        cleaned++;
      }
    });

    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} old presences`);
    }

    return cleaned;
  }
}

console.log("--- SOLUTION 3: Presence Tracking ---\n");

const presence = new PresenceSystem();

// Set users online
presence.setOnline("user-1", "room-1");
presence.setOnline("user-2", "room-1");
presence.setOnline("user-3", "room-2");
presence.setAway("user-1");

// Query
const online = presence.getOnlineUsers();
console.log(`\nOnline users: ${online.join(", ")}`);

const room1Users = presence.getUsersInRoom("room-1");
console.log(`Users in room-1: ${room1Users.length} (${room1Users.map((u) => u.userId).join(", ")})`);

const stats = presence.getStats();
console.log(`\nPresence stats: ${stats.online} online, ${stats.away} away, ${stats.offline} offline\n`);

console.log("Key Points:");
console.log("  - Track user status (online/offline/away)");
console.log("  - Last seen timestamp for each user");
console.log("  - Filter users by room");
console.log("  - Statistics for monitoring");
console.log("");

// ============================================
// SOLUTION 4: Build Typing Indicator System
// ============================================

interface TypingIndicator {
  userId: ClientId;
  roomId: string;
  timestamp: number;
}

// SOLUTION: Typing indicators with auto-cleanup
class TypingSystem {
  private typingUsers: Map<string, TypingIndicator> = new Map();
  private readonly TYPING_TIMEOUT = 3000;

  setTyping(userId: ClientId, roomId: string): void {
    const key = `${userId}:${roomId}`;
    const indicator: TypingIndicator = {
      userId,
      roomId,
      timestamp: Date.now(),
    };

    // Clear existing timeout if any
    const existing = this.typingUsers.get(key);
    if (existing) {
      clearTimeout((existing as any).timeout);
    }

    this.typingUsers.set(key, indicator);
    console.log(`⌨️  ${userId} is typing in ${roomId}`);

    // Set auto-clear timeout
    const timeout = setTimeout(() => {
      this.clearTyping(userId, roomId);
    }, this.TYPING_TIMEOUT);

    (indicator as any).timeout = timeout;
  }

  clearTyping(userId: ClientId, roomId: string): void {
    const key = `${userId}:${roomId}`;
    const indicator = this.typingUsers.get(key);

    if (indicator) {
      clearTimeout((indicator as any).timeout);
      this.typingUsers.delete(key);
      console.log(`✋ ${userId} stopped typing in ${roomId}`);
    }
  }

  getTypingUsers(roomId: string): ClientId[] {
    this.cleanup();
    const typing: ClientId[] = [];

    this.typingUsers.forEach((indicator, key) => {
      if (indicator.roomId === roomId) {
        typing.push(indicator.userId);
      }
    });

    return typing;
  }

  cleanup(): number {
    const now = Date.now();
    let cleaned = 0;

    this.typingUsers.forEach((indicator, key) => {
      if (now - indicator.timestamp > this.TYPING_TIMEOUT) {
        clearTimeout((indicator as any).timeout);
        this.typingUsers.delete(key);
        cleaned++;
      }
    });

    return cleaned;
  }

  isTyping(userId: ClientId, roomId: string): boolean {
    const key = `${userId}:${roomId}`;
    return this.typingUsers.has(key);
  }
}

console.log("--- SOLUTION 4: Typing Indicators ---\n");

const typing = new TypingSystem();

// Set typing
typing.setTyping("user-1", "room-1");
typing.setTyping("user-2", "room-1");

const typingInRoom1 = typing.getTypingUsers("room-1");
console.log(`Typing in room-1: ${typingInRoom1.join(", ")}`);

// Auto-clear after timeout
setTimeout(() => {
  console.log("\nAfter timeout:");
  const afterTimeout = typing.getTypingUsers("room-1");
  console.log(`Typing in room-1: ${afterTimeout.length} users`);
}, 3500);

setTimeout(() => {
  console.log("");
}, 4000);

console.log("Key Points:");
console.log("  - Track typing per user per room");
console.log("  - Auto-clear after timeout");
console.log("  - Multiple users can type simultaneously");
console.log("  - Cleanup expired indicators");
console.log("");

// ============================================
// SOLUTION 5: Handle Reconnection State Sync
// ============================================

interface ClientState {
  userId: ClientId;
  rooms: string[];
  lastMessageSeq: number;
  timestamp: number;
}

// SOLUTION: State synchronization for reconnection
class StateSyncManager {
  private states: Map<ConnectionId, ClientState> = new Map();
  private messageHistory: Array<{ seq: number; message: string; timestamp: number }> = [];
  private seqCounter = 0;
  private readonly MAX_HISTORY = 1000;

  saveState(connectionId: ConnectionId, state: ClientState): void {
    const stateWithTimestamp: ClientState = {
      ...state,
      timestamp: Date.now(),
    };

    this.states.set(connectionId, stateWithTimestamp);
    console.log(`💾 Saved state for ${connectionId}`);
    console.log(`   User: ${state.userId}`);
    console.log(`   Rooms: ${state.rooms.join(", ")}`);
    console.log(`   Last message: ${state.lastMessageSeq}`);
  }

  restoreState(connectionId: ConnectionId): ClientState | undefined {
    const state = this.states.get(connectionId);
    if (state) {
      console.log(`📤 Restored state for ${connectionId}`);
      console.log(`   User: ${state.userId}`);
      console.log(`   Rooms: ${state.rooms.join(", ")}`);
    }
    return state;
  }

  addMessage(message: string): number {
    const seq = ++this.seqCounter;
    const msg = {
      seq,
      message,
      timestamp: Date.now(),
    };

    this.messageHistory.push(msg);

    // Trim history if too long
    if (this.messageHistory.length > this.MAX_HISTORY) {
      this.messageHistory.shift();
    }

    console.log(`📨 Message ${seq}: ${message}`);
    return seq;
  }

  getMissedMessages(fromSeq: number): Array<{ seq: number; message: string; timestamp: number }> {
    const missed = this.messageHistory.filter((m) => m.seq > fromSeq);
    console.log(`📬 Found ${missed.length} missed messages after seq ${fromSeq}`);
    return missed;
  }

  cleanup(maxAge: number): number {
    const now = Date.now();
    let cleaned = 0;

    this.states.forEach((state, connId) => {
      if (now - state.timestamp > maxAge) {
        this.states.delete(connId);
        cleaned++;
      }
    });

    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} old states`);
    }

    return cleaned;
  }

  getState(connectionId: ConnectionId): ClientState | undefined {
    return this.states.get(connectionId);
  }

  // Remove saved state
  clearState(connectionId: ConnectionId): void {
    this.states.delete(connectionId);
    console.log(`🗑️  Cleared state for ${connectionId}`);
  }
}

console.log("--- SOLUTION 5: Reconnection State Sync ---\n");

const stateSync = new StateSyncManager();

// Save state before disconnect
console.log("Before disconnect:");
stateSync.saveState("conn-1", {
  userId: "user-1",
  rooms: ["room-1", "room-2"],
  lastMessageSeq: 5,
  timestamp: Date.now(),
});

// Add messages while disconnected
console.log("\nWhile disconnected:");
stateSync.addMessage("Message 6");
stateSync.addMessage("Message 7");
stateSync.addMessage("Message 8");

// Restore state on reconnect
console.log("\nOn reconnect:");
const restored = stateSync.restoreState("conn-1");
if (restored) {
  const missed = stateSync.getMissedMessages(restored.lastMessageSeq);
  console.log(`\nDelivering missed messages:`);
  missed.forEach((m) => {
    console.log(`  - Seq ${m.seq}: ${m.message}`);
  });
}

console.log("\nKey Points:");
console.log("  - Save state before disconnect");
console.log("  - Restore state on reconnection");
console.log("  - Track message sequence numbers");
console.log("  - Deliver missed messages");
console.log("  - Cleanup old states");
console.log("");

// ============================================
// BONUS: Complete Realtime Server
// ============================================

// SOLUTION: Production-ready realtime server
class RealtimeServer {
  private broadcast: BroadcastSystem;
  private rooms: RoomSystem;
  private presence: PresenceSystem;
  private typing: TypingSystem;
  private stateSync: StateSyncManager;
  private metrics: Map<string, number> = new Map();

  constructor() {
    this.broadcast = new BroadcastSystem();
    this.rooms = new RoomSystem();
    this.presence = new PresenceSystem();
    this.typing = new TypingSystem();
    this.stateSync = new StateSyncManager();
  }

  // Connect user
  connect(userId: ClientId, roomId?: string): ConnectionId {
    this.trackMetric("connections");

    const connId = this.broadcast.connect(userId);

    // Set presence
    this.presence.setOnline(userId, roomId);

    // Join room if specified
    if (roomId) {
      this.rooms.joinRoom(connId, roomId);
    }

    // Save state
    this.stateSync.saveState(connId, {
      userId,
      rooms: roomId ? [roomId] : [],
      lastMessageSeq: 0,
      timestamp: Date.now(),
    });

    return connId;
  }

  // Disconnect user
  disconnect(connectionId: ConnectionId): void {
    // Remove from rooms
    this.rooms.removeConnection(connectionId);

    // Get user ID from connection
    const state = this.stateSync.getState(connectionId);
    if (state) {
      this.presence.setOffline(state.userId);
      this.stateSync.clearState(connectionId);
    }

    // Disconnect
    this.broadcast.disconnect(connectionId);
  }

  // Broadcast message
  broadcastMessage(message: string): number {
    this.trackMetric("messages.broadcast");
    this.trackMetric("messages.total");
    return this.broadcast.broadcast(message);
  }

  // Send to room
  sendToRoom(roomId: string, message: string, senderId?: ConnectionId): number {
    this.trackMetric("messages.room");
    this.trackMetric("messages.total");
    return this.rooms.sendToRoom(roomId, message, senderId);
  }

  // Set typing
  setTyping(userId: ClientId, roomId: string): void {
    this.trackMetric("typing.indicators");
    this.typing.setTyping(userId, roomId);
  }

  // Get room members
  getRoomMembers(roomId: string): UserPresence[] {
    return this.presence.getUsersInRoom(roomId);
  }

  // Get typing users in room
  getTypingUsers(roomId: string): ClientId[] {
    return this.typing.getTypingUsers(roomId);
  }

  // Get server statistics
  getStats(): {
    connections: number;
    clients: number;
    rooms: number;
    online: number;
    metrics: Record<string, number>;
  } {
    const presenceStats = this.presence.getStats();

    return {
      connections: this.broadcast.getConnectionCount(),
      clients: this.broadcast.getClientCount(),
      rooms: this.rooms.getAllRooms().length,
      online: presenceStats.online,
      metrics: this.getMetrics(),
    };
  }

  // Get metrics
  getMetrics(): Record<string, number> {
    const metrics: Record<string, number> = {};
    this.metrics.forEach((value, key) => {
      metrics[key] = value;
    });
    return metrics;
  }

  // Track metric
  private trackMetric(name: string, value = 1): void {
    this.metrics.set(name, (this.metrics.get(name) || 0) + value);
  }

  // Cleanup old data
  cleanup(): void {
    this.presence.cleanup(3600000); // 1 hour
    this.stateSync.cleanup(3600000); // 1 hour
    this.typing.cleanup();
  }
}

console.log("--- BONUS: Complete Realtime Server ---\n");

const server = new RealtimeServer();

// Create rooms
server.rooms.createRoom("room-1", "Weight Loss Challenge");
server.rooms.createRoom("room-2", "Fitness Beginners");

// Connect users
const user1 = server.connect("user-1", "room-1");
const user2 = server.connect("user-2", "room-1");
const user3 = server.connect("user-3", "room-2");

// Broadcast
server.broadcastMessage("Welcome to the coaching platform!");

// Send to room
server.sendToRoom("room-1", "Good luck with the challenge!");

// Set typing
server.setTyping("user-1", "room-1");

// Get statistics
const serverStats = server.getStats();
console.log("\nServer Statistics:");
console.log(`  Connections: ${serverStats.connections}`);
console.log(`  Clients: ${serverStats.clients}`);
console.log(`  Rooms: ${serverStats.rooms}`);
console.log(`  Online users: ${serverStats.online}`);
console.log("  Metrics:");
Object.entries(serverStats.metrics).forEach(([metric, value]) => {
  console.log(`    ${metric}: ${value}`);
});

console.log("\nKey Features:");
console.log("  - ✅ Broadcast to all clients");
console.log("  - ✅ Room management");
console.log("  - ✅ Presence tracking");
console.log("  - ✅ Typing indicators");
console.log("  - ✅ State synchronization");
console.log("  - ✅ Metrics collection");
console.log("  - ✅ Automatic cleanup");
console.log("");

console.log("\n✅ Solution complete!");
console.log("\nTakeaways:");
console.log("  - Broadcast systems track unique clients, not just connections");
console.log("  - Rooms enable targeted messaging to groups");
console.log("  - Presence tracking shows user availability");
console.log("  - Typing indicators provide real-time feedback");
console.log("  - State sync ensures data continuity after reconnection");
console.log("  - Production systems combine all these patterns");
console.log("  - Metrics are essential for monitoring and debugging");

export {};
