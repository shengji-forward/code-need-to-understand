// EXERCISE 3: Realtime Patterns
//
// TODO: Complete each section marked with TODO
// Run with: npx tsx 06-websocket-realtime/exercises/exercise-03-realtime.ts

console.log("=== Exercise 3: Realtime Patterns ===\n");

// ============================================
// TODO 1: Implement Broadcast to All Clients
// ============================================
// Instructions:
// - Implement a broadcast function that sends to all connected clients
// - Track connected clients
// - Handle client disconnections
// - Return count of clients that received the message

type ClientId = string;
type ConnectionId = string;

interface Client {
  id: ClientId;
  connections: Set<ConnectionId>;
}

// TODO: Your code here - Implement broadcast system
class BroadcastSystem {
  private clients: Map<ClientId, Client> = new Map();
  private connections: Map<ConnectionId, ClientId> = new Map();

  // TODO: Connect a client
  // - Add client to clients map
  // - Track connection
  // - Return connection ID
  connect(userId: ClientId): ConnectionId {
    // TODO: Your implementation
    return "";
  }

  // TODO: Disconnect a connection
  // - Remove connection from client
  // - Remove client if no connections left
  // - Return number of remaining connections
  disconnect(connectionId: ConnectionId): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Broadcast message to all connected clients
  // - Send to all unique users (not just connections)
  // - Log each delivery
  // - Return count of clients that received message
  broadcast(message: string): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Get connection count
  getConnectionCount(): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Get unique client count
  getClientCount(): number {
    // TODO: Your implementation
    return 0;
  }
}

console.log("--- TODO 1: Broadcast to All Clients ---\n");

const broadcast = new BroadcastSystem();

// Connect clients
const conn1 = broadcast.connect("user-1");
const conn2 = broadcast.connect("user-2");
const conn3 = broadcast.connect("user-1"); // Same user, second connection

console.log(`Connected: ${broadcast.getClientCount()} clients, ${broadcast.getConnectionCount()} connections`);

// TODO: After implementing, test broadcast:
// const count = broadcast.broadcast("Hello everyone!");
// console.log(`Message sent to ${count} clients`);

console.log("\nExpected behavior:");
console.log("  - Broadcast reaches all unique clients");
console.log("  - Multiple connections per user are handled");
console.log("  - Disconnections update counts");
console.log("  - Returns accurate delivery count");
console.log("");

// ============================================
// TODO 2: Create Room/Channel System
// ============================================
// Instructions:
// - Implement a room system where clients can join/leave
// - Send messages to specific rooms
// - Track room membership
// - Handle room creation and deletion

interface Room {
  id: string;
  name: string;
  members: Set<ConnectionId>;
}

// TODO: Your code here - Implement room system
class RoomSystem {
  private rooms: Map<string, Room> = new Map();
  private connectionRooms: Map<ConnectionId, Set<string>> = new Map();

  // TODO: Create a new room
  // - Initialize room with empty member set
  // - Return created room
  createRoom(id: string, name: string): Room {
    // TODO: Your implementation
    throw new Error("Not implemented");
  }

  // TODO: Join a room
  // - Add connection to room members
  // - Track room membership for connection
  // - Log join
  joinRoom(connectionId: ConnectionId, roomId: string): void {
    // TODO: Your implementation
  }

  // TODO: Leave a room
  // - Remove connection from room
  // - Remove room from connection's room list
  // - Delete room if empty
  leaveRoom(connectionId: ConnectionId, roomId: string): void {
    // TODO: Your implementation
  }

  // TODO: Send message to room
  // - Send to all members except sender
  // - Log delivery
  // - Return count of recipients
  sendToRoom(roomId: string, message: string, senderId?: ConnectionId): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Get room member count
  getRoomMemberCount(roomId: string): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Get all rooms
  getAllRooms(): Room[] {
    // TODO: Your implementation
    return [];
  }
}

console.log("--- TODO 2: Room/Channel System ---\n");

const rooms = new RoomSystem();

// TODO: After implementing, test with:
// rooms.createRoom("room-1", "Weight Loss Challenge");
// rooms.createRoom("room-2", "Fitness Beginners");

// rooms.joinRoom(conn1, "room-1");
// rooms.joinRoom(conn2, "room-1");
// rooms.joinRoom(conn3, "room-2");

// const sent = rooms.sendToRoom("room-1", "Welcome to the challenge!", conn1);
// console.log(`Sent to ${sent} members`);

console.log("Expected behavior:");
console.log("  - Rooms can be created and named");
console.log("  - Clients can join/leave rooms");
console.log("  - Messages sent to room exclude sender");
console.log("  - Empty rooms are automatically deleted");
console.log("");

// ============================================
// TODO 3: Add Presence Tracking (Online/Offline)
// ============================================
// Instructions:
// - Track user online/offline status
// - Handle user going away
// - Query users by status
// - Get users in a specific room

type UserStatus = "online" | "offline" | "away";

interface UserPresence {
  userId: ClientId;
  status: UserStatus;
  lastSeen: number;
  currentRoom?: string;
}

// TODO: Your code here - Implement presence system
class PresenceSystem {
  private presences: Map<ClientId, UserPresence> = new Map();

  // TODO: Set user as online
  // - Create or update presence record
  // - Set status to online
  // - Set current room if provided
  setOnline(userId: ClientId, roomId?: string): void {
    // TODO: Your implementation
  }

  // TODO: Set user as offline
  // - Update status to offline
  // - Update lastSeen timestamp
  // - Keep room membership for history
  setOffline(userId: ClientId): void {
    // TODO: Your implementation
  }

  // TODO: Set user as away
  // - Update status to away
  // - Update lastSeen timestamp
  setAway(userId: ClientId): void {
    // TODO: Your implementation
  }

  // TODO: Get online users
  // - Return array of user IDs with online status
  getOnlineUsers(): ClientId[] {
    // TODO: Your implementation
    return [];
  }

  // TODO: Get users in room
  // - Return users in specific room with online status
  getUsersInRoom(roomId: string): UserPresence[] {
    // TODO: Your implementation
    return [];
  }

  // TODO: Get user presence
  getPresence(userId: ClientId): UserPresence | undefined {
    // TODO: Your implementation
    return undefined;
  }

  // TODO: Get presence statistics
  getStats(): { online: number; offline: number; away: number } {
    // TODO: Your implementation
    return { online: 0, offline: 0, away: 0 };
  }
}

console.log("--- TODO 3: Presence Tracking ---\n");

const presence = new PresenceSystem();

// TODO: After implementing, test with:
// presence.setOnline("user-1", "room-1");
// presence.setOnline("user-2", "room-1");
// presence.setOnline("user-3", "room-2");
// presence.setAway("user-1");

// const online = presence.getOnlineUsers();
// console.log(`Online users: ${online.join(", ")}`);

// const room1Users = presence.getUsersInRoom("room-1");
// console.log(`Users in room-1: ${room1Users.length}`);

console.log("Expected behavior:");
console.log("  - User status tracked (online/offline/away)");
console.log("  - Last seen timestamp updated");
console.log("  - Room membership tracked");
console.log("  - Statistics provide overview");
console.log("");

// ============================================
// TODO 4: Build Typing Indicator System
// ============================================
// Instructions:
// - Track typing users in rooms
// - Auto-clear typing after timeout
// - Get typing users for a room
// - Handle multiple users typing simultaneously

interface TypingIndicator {
  userId: ClientId;
  roomId: string;
  timestamp: number;
}

// TODO: Your code here - Implement typing indicators
class TypingSystem {
  private typingUsers: Map<string, TypingIndicator> = new Map();
  private readonly TYPING_TIMEOUT = 3000; // Clear after 3 seconds

  // TODO: Set user as typing
  // - Add/update typing indicator
  // - Set timeout to auto-clear
  // - Log typing status
  setTyping(userId: ClientId, roomId: string): void {
    // TODO: Your implementation
  }

  // TODO: Clear typing status for user
  // - Remove from typing map
  // - Log clear
  clearTyping(userId: ClientId, roomId: string): void {
    // TODO: Your implementation
  }

  // TODO: Get typing users in room
  // - Return array of user IDs typing in room
  // - Clean up expired indicators
  getTypingUsers(roomId: string): ClientId[] {
    // TODO: Your implementation
    return [];
  }

  // TODO: Clean up expired typing indicators
  // - Remove indicators older than timeout
  // - Return count of cleaned up indicators
  cleanup(): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Check if user is typing in room
  isTyping(userId: ClientId, roomId: string): boolean {
    // TODO: Your implementation
    return false;
  }
}

console.log("--- TODO 4: Typing Indicators ---\n");

const typing = new TypingSystem();

// TODO: After implementing, test with:
// typing.setTyping("user-1", "room-1");
// typing.setTyping("user-2", "room-1");

// const typingInRoom1 = typing.getTypingUsers("room-1");
// console.log(`Typing in room-1: ${typingInRoom1.join(", ")}`);

// setTimeout(() => {
//   const afterTimeout = typing.getTypingUsers("room-1");
//   console.log(`After timeout: ${afterTimeout.length} users typing`);
// }, 4000);

console.log("Expected behavior:");
console.log("  - Typing status set per user per room");
console.log("  - Auto-clears after timeout");
console.log("  - Multiple users can type simultaneously");
console.log("  - Expired indicators cleaned up");
console.log("");

// ============================================
// TODO 5: Handle Reconnection State Sync
// ============================================
// Instructions:
// - Track client state before disconnect
// - Restore state on reconnection
// - Send missed messages during disconnect
// - Handle state versioning

interface ClientState {
  userId: ClientId;
  rooms: string[];
  lastMessageSeq: number;
  timestamp: number;
}

// TODO: Your code here - Implement state synchronization
class StateSyncManager {
  private states: Map<ConnectionId, ClientState> = new Map();
  private messageHistory: Array<{ seq: number; message: string; timestamp: number }> = [];
  private seqCounter = 0;

  // TODO: Save client state before disconnect
  // - Store current state
  // - Include timestamp
  // - Log save
  saveState(connectionId: ConnectionId, state: ClientState): void {
    // TODO: Your implementation
  }

  // TODO: Restore state on reconnection
  // - Retrieve saved state
  // - Return state or undefined if not found
  restoreState(connectionId: ConnectionId): ClientState | undefined {
    // TODO: Your implementation
    return undefined;
  }

  // TODO: Add message to history
  // - Assign sequence number
  // - Store with timestamp
  // - Increment counter
  addMessage(message: string): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Get missed messages
  // - Return messages after given sequence number
  // - Used to sync client after reconnection
  getMissedMessages(fromSeq: number): Array<{ seq: number; message: string; timestamp: number }> {
    // TODO: Your implementation
    return [];
  }

  // TODO: Clean up old states
  // - Remove states older than given age
  // - Return count of cleaned up states
  cleanup(maxAge: number): number {
    // TODO: Your implementation
    return 0;
  }

  // TODO: Get state for connection
  getState(connectionId: ConnectionId): ClientState | undefined {
    // TODO: Your implementation
    return undefined;
  }
}

console.log("--- TODO 5: Reconnection State Sync ---\n");

const stateSync = new StateSyncManager();

// TODO: After implementing, test with:
// // Save state before disconnect
// stateSync.saveState("conn-1", {
//   userId: "user-1",
//   rooms: ["room-1", "room-2"],
//   lastMessageSeq: 5,
//   timestamp: Date.now(),
// });

// // Add some messages
// stateSync.addMessage("Message 6");
// stateSync.addMessage("Message 7");
// stateSync.addMessage("Message 8");

// // Restore state on reconnect
// const restored = stateSync.restoreState("conn-1");
// if (restored) {
//   console.log(`Restored state for ${restored.userId}`);
//   console.log(`Rooms: ${restored.rooms.join(", ")}`);

//   const missed = stateSync.getMissedMessages(restored.lastMessageSeq);
//   console.log(`Missed ${missed.length} messages:`);
//   missed.forEach((m) => console.log(`  - ${m.message}`));
// }

console.log("Expected behavior:");
console.log("  - State saved before disconnect");
console.log("  - State restored on reconnection");
console.log("  - Missed messages retrieved");
console.log("  - Old states cleaned up");
console.log("");

// ============================================
// BONUS CHALLENGE
// ============================================
// Instructions:
// - Create a complete realtime server
// - Combine all previous features
// - Add authentication
// - Implement rate limiting

// TODO: Your code here - Create complete realtime server
class RealtimeServer {
  // TODO: Implement combining all features:
  // - Broadcast system
  // - Room management
  // - Presence tracking
  // - Typing indicators
  // - State synchronization
  // - Authentication
  // - Rate limiting
  // - Metrics collection
}

console.log("--- BONUS: Complete Realtime Server ---\n");

console.log("Create a production-ready realtime server that:");
console.log("  - Broadcasts to all clients");
console.log("  - Manages rooms and channels");
console.log("  - Tracks user presence");
console.log("  - Shows typing indicators");
console.log("  - Syncs state on reconnection");
console.log("  - Authenticates users");
console.log("  - Rate limits messages");
console.log("  - Collects metrics");
console.log("");

console.log("✅ Exercise complete!");
console.log("\nNext step: Compare your answers with exercise-03-realtime-solution.ts");

export {};
