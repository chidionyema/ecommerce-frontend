/**
 * Enterprise-Grade TypeScript WebSocket Implementation
 * Compatible with SignalR and standard WebSockets
 */

// Core types for the WebSocket implementation
export type ConnectionState = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export interface WebSocketMessage {
  type: string;
  payload: any;
  id?: string;
  error?: string;
}

export interface WebSocketOptions {
  url: string;
  protocols?: string | string[];
  autoReconnect?: boolean;
  maxReconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  connectionTimeout?: number;
  debug?: boolean;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  onMessage?: (data: any) => void;
  headers?: Record<string, string>;
}

// Signal-based event emitter
export class Signal<T> {
  private listeners: Array<(value: T) => void> = [];

  public subscribe(listener: (value: T) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public emit(value: T): void {
    this.listeners.forEach(listener => listener(value));
  }
}

// Enhanced WebSocket Client
export class EnterpriseWebSocket {
  private socket: WebSocket | null = null;
  private options: Required<WebSocketOptions>;
  private reconnectAttempts = 0;
  private reconnectTimeout: number | null = null;
  private heartbeatInterval: number | null = null;
  private pendingMessages: Map<string, { resolve: Function; reject: Function; timeout: number }> = new Map();
  private messageQueue: WebSocketMessage[] = [];
  private connectionTimeout: number | null = null;

  // Signals for state management
  public readonly connectionState = new Signal<ConnectionState>();
  public readonly messageReceived = new Signal<WebSocketMessage>();
  public readonly connectionError = new Signal<Error>();

  constructor(options: WebSocketOptions) {
    // Set default options
    this.options = {
      url: options.url,
      protocols: options.protocols || [],
      autoReconnect: options.autoReconnect !== false,
      maxReconnectAttempts: options.maxReconnectAttempts || 10,
      reconnectInterval: options.reconnectInterval || 3000,
      heartbeatInterval: options.heartbeatInterval || 30000,
      connectionTimeout: options.connectionTimeout || 10000,
      debug: options.debug || false,
      onOpen: options.onOpen || (() => {}),
      onClose: options.onClose || (() => {}),
      onError: options.onError || (() => {}),
      onMessage: options.onMessage || (() => {}),
      headers: options.headers || {},
    };

    // Initialize with disconnected state
    this.connectionState.emit('disconnected');
  }

  /**
   * Connect to the WebSocket server
   */
  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        this.log('WebSocket is already connected or connecting');
        if (this.socket.readyState === WebSocket.OPEN) {
          resolve();
        }
        return;
      }

      this.connectionState.emit('connecting');
      this.log(`Connecting to ${this.options.url}`);

      try {
        this.socket = new WebSocket(this.options.url, this.options.protocols);
        
        // Set connection timeout
        this.connectionTimeout = window.setTimeout(() => {
          if (this.socket && this.socket.readyState !== WebSocket.OPEN) {
            this.log('Connection timeout');
            this.connectionError.emit(new Error('Connection timeout'));
            this.socket.close();
            reject(new Error('Connection timeout'));
          }
        }, this.options.connectionTimeout);

        this.socket.onopen = (event) => {
          if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout);
            this.connectionTimeout = null;
          }
          
          this.handleOpen(event);
          this.options.onOpen(event);
          resolve();
        };

        this.socket.onclose = (event) => {
          this.handleClose(event);
          this.options.onClose(event);
          
          if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout);
            this.connectionTimeout = null;
            reject(new Error('Connection closed'));
          }
        };

        this.socket.onerror = (event) => {
          this.handleError(event);
          this.options.onError(event);
          
          if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout);
            this.connectionTimeout = null;
            reject(new Error('Connection error'));
          }
        };

        this.socket.onmessage = (event) => {
          this.handleMessage(event);
          this.options.onMessage(event.data);
        };

      } catch (error) {
        this.connectionError.emit(error instanceof Error ? error : new Error(String(error)));
        reject(error);
      }
    });
  }

  /**
   * Disconnect from the WebSocket server
   */
  public disconnect(): void {
    this.log('Disconnecting...');
    
    // Clear all intervals and timeouts
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }

    // Clear all pending message timeouts
    this.pendingMessages.forEach(({ timeout }) => {
      clearTimeout(timeout);
    });
    this.pendingMessages.clear();

    // Close socket if it exists
    if (this.socket) {
      try {
        this.socket.close(1000, 'Closed by client');
      } catch (error) {
        this.log('Error during disconnect:', error);
      }
      this.socket = null;
    }

    this.connectionState.emit('disconnected');
  }

  /**
   * Send a message to the WebSocket server
   * @param type Message type
   * @param payload Message payload
   * @param timeout Optional timeout in milliseconds
   */
  public send(type: string, payload: any, timeout = 30000): Promise<WebSocketMessage> {
    const message: WebSocketMessage = {
      type,
      payload,
      id: this.generateId(),
    };

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return this.sendMessage(message, timeout);
    } else {
      this.log('Socket not connected, queueing message');
      this.messageQueue.push(message);
      
      // If not already connecting or reconnecting, try to connect
      if (this.connectionState['value'] !== 'connecting' && this.connectionState['value'] !== 'reconnecting') {
        this.connect().catch(() => {
          // Connection attempt handled in the connect method
        });
      }
      
      return new Promise((resolve, reject) => {
        this.pendingMessages.set(message.id!, {
          resolve,
          reject,
          timeout: window.setTimeout(() => {
            this.pendingMessages.delete(message.id!);
            reject(new Error(`Message ${message.id} timed out`));
          }, timeout)
        });
      });
    }
  }

  /**
   * Subscribe to a specific message type
   * @param messageType The type of message to subscribe to
   * @param callback Function to call when a message of this type is received
   */
  public subscribe(messageType: string, callback: (data: any) => void): () => void {
    return this.messageReceived.subscribe((message) => {
      if (message.type === messageType) {
        callback(message.payload);
      }
    });
  }

  /**
   * Request-response pattern for WebSocket communication
   * @param type Message type
   * @param payload Message payload
   * @param timeout Optional timeout in milliseconds
   */
  public request<T = any>(type: string, payload: any, timeout = 30000): Promise<T> {
    return this.send(type, payload, timeout)
      .then(response => {
        if (response.error) {
          throw new Error(response.error);
        }
        return response.payload as T;
      });
  }

  /**
   * Check if the connection is active
   */
  public isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  // Private methods
  private sendMessage(message: WebSocketMessage, timeout: number): Promise<WebSocketMessage> {
    return new Promise((resolve, reject) => {
      try {
        this.socket!.send(JSON.stringify(message));
        this.log('Sent message:', message);

        this.pendingMessages.set(message.id!, {
          resolve,
          reject,
          timeout: window.setTimeout(() => {
            this.pendingMessages.delete(message.id!);
            reject(new Error(`Message ${message.id} timed out`));
          }, timeout)
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleOpen(event: Event): void {
    this.log('WebSocket connected');
    this.reconnectAttempts = 0;
    this.connectionState.emit('connected');

    // Start heartbeat interval
    this.startHeartbeat();

    // Send any queued messages
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.sendMessage(message, 30000).catch(error => {
          this.log('Error sending queued message:', error);
        });
      }
    }
  }

  private handleClose(event: CloseEvent): void {
    this.log(`WebSocket closed: ${event.code} ${event.reason}`);
    
    // Clear heartbeat interval
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    // Attempt to reconnect if enabled
    if (this.options.autoReconnect && event.code !== 1000) {
      this.attemptReconnect();
    } else {
      this.connectionState.emit('disconnected');

      // Reject all pending messages
      this.pendingMessages.forEach(({ reject, timeout }) => {
        clearTimeout(timeout);
        reject(new Error('Connection closed'));
      });
      this.pendingMessages.clear();
    }
  }

  private handleError(event: Event): void {
    this.log('WebSocket error:', event);
    this.connectionError.emit(new Error('WebSocket error'));
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data) as WebSocketMessage;
      this.log('Received message:', message);
      
      // Emit the message through signal
      this.messageReceived.emit(message);

      // Resolve pending promise if this is a response to a sent message
      if (message.id && this.pendingMessages.has(message.id)) {
        const { resolve, timeout } = this.pendingMessages.get(message.id)!;
        clearTimeout(timeout);
        this.pendingMessages.delete(message.id);
        resolve(message);
      }
    } catch (error) {
      this.log('Error parsing message:', error);
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
      this.log('Maximum reconnect attempts reached');
      this.connectionState.emit('disconnected');
      return;
    }

    this.reconnectAttempts++;
    this.connectionState.emit('reconnecting');
    
    this.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.options.maxReconnectAttempts})...`);
    
    this.reconnectTimeout = window.setTimeout(() => {
      this.connect().catch(error => {
        this.log('Reconnect failed:', error);
      });
    }, this.options.reconnectInterval);
  }

  private startHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = window.setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.send('heartbeat', { timestamp: new Date().toISOString() })
          .catch(error => {
            this.log('Heartbeat error:', error);
          });
      }
    }, this.options.heartbeatInterval);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  private log(...args: any[]): void {
    if (this.options.debug) {
      console.log('[EnterpriseWebSocket]', ...args);
    }
  }
}

// SignalR-compatible WebSocket implementation
export class SignalRWebSocket extends EnterpriseWebSocket {
  private hubName: string;
  private connectionId: string | null = null;

  constructor(options: WebSocketOptions & { hubName: string }) {
    super(options);
    this.hubName = options.hubName;

    // Listen for connection ID from server
    this.messageReceived.subscribe((message) => {
      if (message.type === 'connection-id') {
        this.connectionId = message.payload.id;
      }
    });
  }

  /**
   * Call a SignalR hub method
   * @param methodName The hub method name to call
   * @param args Arguments to pass to the hub method
   */
  public invokeHubMethod<T = any>(methodName: string, ...args: any[]): Promise<T> {
    return this.request<T>('hub-invoke', {
      hub: this.hubName,
      method: methodName,
      args
    });
  }

  /**
   * Subscribe to a SignalR hub event
   * @param eventName The hub event name to subscribe to
   * @param callback Function to call when the event is received
   */
  public onHubEvent(eventName: string, callback: (data: any) => void): () => void {
    return this.subscribe(`hub-event:${this.hubName}.${eventName}`, callback);
  }

  /**
   * Get the connection ID assigned by the SignalR server
   */
  public getConnectionId(): string | null {
    return this.connectionId;
  }
}

// Factory function to create WebSocket instances
export function createWebSocket(options: WebSocketOptions): EnterpriseWebSocket {
  return new EnterpriseWebSocket(options);
}

// Factory function to create SignalR WebSocket instances
export function createSignalRWebSocket(options: WebSocketOptions & { hubName: string }): SignalRWebSocket {
  return new SignalRWebSocket(options);
}

// Example usage:
/*
// Standard WebSocket
const websocket = createWebSocket({
  url: 'wss://example.com/ws',
  autoReconnect: true,
  debug: true
});

websocket.connect().then(() => {
  console.log('Connected!');
  
  // Send a message
  websocket.send('chat-message', { text: 'Hello, world!' });
  
  // Request-response pattern
  websocket.request('get-data', { id: 123 })
    .then(response => {
      console.log('Response:', response);
    });
    
  // Subscribe to messages
  const unsubscribe = websocket.subscribe('chat-message', (data) => {
    console.log('Received chat message:', data);
  });
  
  // Later, unsubscribe
  unsubscribe();
});

// Using with SignalR
const signalRWebSocket = createSignalRWebSocket({
  url: 'wss://example.com/signalr',
  hubName: 'chatHub',
  autoReconnect: true
});

signalRWebSocket.connect().then(() => {
  // Call a hub method
  signalRWebSocket.invokeHubMethod('SendMessage', 'User', 'Hello everyone!')
    .then(() => {
      console.log('Message sent via SignalR hub');
    });
    
  // Subscribe to hub events
  signalRWebSocket.onHubEvent('ReceiveMessage', (data) => {
    console.log(`${data.user} says: ${data.message}`);
  });
});
*/