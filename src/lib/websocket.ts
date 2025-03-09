// Type definitions for validation
type SchemaType = 'string' | 'number' | 'object';

interface PropertySchema {
  type: SchemaType;
  minLength?: number;
  maxLength?: number;
}

interface Schema {
  type: SchemaType;
  required?: string[];
  properties?: Record<string, PropertySchema>;
}

type ValidationResult = {
  valid: boolean;
  errors: Array<{ stack: string }>;
};

// Simple validation function
function validateSchema(obj: any, schema: Schema): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [] };
  
  // Basic type validation
  if (schema.type === 'object' && typeof obj !== 'object') {
    result.valid = false;
    result.errors.push({ stack: `Expected object, got ${typeof obj}` });
  }
  
  // Required fields validation
  if (schema.required && Array.isArray(schema.required)) {
    for (const field of schema.required) {
      if (obj === null || obj === undefined || !(field in obj)) {
        result.valid = false;
        result.errors.push({ stack: `Missing required field: ${field}` });
      }
    }
  }
  
  // Properties validation if object
  if (schema.properties && typeof obj === 'object' && obj !== null) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      const propertySchema = propSchema as PropertySchema;
      if (key in obj) {
        const value = obj[key];
        
        // String validation
        if (propertySchema.type === 'string' && typeof value !== 'string') {
          result.valid = false;
          result.errors.push({ stack: `Field ${key} should be string, got ${typeof value}` });
        }
        
        // String length validation
        if (typeof value === 'string') {
          if (propSchema.minLength !== undefined && value.length < propSchema.minLength) {
            result.valid = false;
            result.errors.push({ stack: `Field ${key} should have min length ${propSchema.minLength}` });
          }
          if (propSchema.maxLength !== undefined && value.length > propSchema.maxLength) {
            result.valid = false;
            result.errors.push({ stack: `Field ${key} should have max length ${propSchema.maxLength}` });
          }
        }
        
        // Number validation
        if (propertySchema.type === 'number' && typeof value !== 'number') {
          result.valid = false;
          result.errors.push({ stack: `Field ${key} should be number, got ${typeof value}` });
        }
      }
    }
  }
  
  return result;
}

// Core types for the WebSocket implementation
export type ConnectionState = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export interface WebSocketMessage {
  type: string;
  payload: any;
  id?: string;
  error?: string;
  timestamp?: string;
  encrypted?: boolean;
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
  // Security enhancements
  validateOrigin?: boolean;
  allowedOrigins?: string[];
  enableCSRFProtection?: boolean;
  csrfToken?: string;
  messageSchemas?: Record<string, any>;
  rateLimits?: {
    messagesPerMinute?: number;
    reconnectsPerMinute?: number;
  };
  authentication?: {
    type: 'bearer' | 'basic' | 'custom';
    token?: string;
    tokenRefreshUrl?: string;
    tokenRefreshThreshold?: number; // milliseconds before expiry
    getToken?: () => Promise<string>;
    onTokenExpired?: () => Promise<string>;
  };
  encryption?: {
    enabled: boolean;
    publicKey?: string;
    encrypt?: (data: any) => Promise<string>;
    decrypt?: (data: string) => Promise<any>;
  };
  sensitiveFields?: string[];
}

export interface RateLimitState {
  messagesCount: number;
  reconnectsCount: number;
  lastResetTime: number;
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

// Enhanced WebSocket Client with security features
export class SecureEnterpriseWebSocket {
  private socket: WebSocket | null = null;
  private options: Required<WebSocketOptions>;
  private reconnectAttempts = 0;
  private reconnectTimeout: number | null = null;
  private heartbeatInterval: number | null = null;
  private pendingMessages: Map<string, { resolve: Function; reject: Function; timeout: number }> = new Map();
  private messageQueue: WebSocketMessage[] = [];
  private connectionTimeout: number | null = null;
  private tokenRefreshTimeout: number | null = null;
  private rateLimit: RateLimitState = {
    messagesCount: 0,
    reconnectsCount: 0,
    lastResetTime: Date.now()
  };
  private backoffTime = 1000; // Initial backoff time in milliseconds
  private currentState: ConnectionState = 'disconnected';

  // Signals for state management
  public readonly connectionState = new Signal<ConnectionState>();
  public readonly messageReceived = new Signal<WebSocketMessage>();
  public readonly connectionError = new Signal<Error>(); // expects Error objects
  public readonly securityEvent = new Signal<{ type: string; message: string }>();

  constructor(options: WebSocketOptions) {
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
      validateOrigin: options.validateOrigin || false,
      allowedOrigins: options.allowedOrigins || [],
      enableCSRFProtection: options.enableCSRFProtection || false,
      csrfToken: options.csrfToken || '',
      messageSchemas: options.messageSchemas || {},
      rateLimits: options.rateLimits || {
        messagesPerMinute: 300,
        reconnectsPerMinute: 10
      },
      authentication: options.authentication || {
        type: 'bearer',
        token: '',
        tokenRefreshUrl: '',
        tokenRefreshThreshold: 60000,
        getToken: async () => '',
        onTokenExpired: async () => ''
      },
      encryption: options.encryption || {
        enabled: false,
        publicKey: '',
        encrypt: async (data) => JSON.stringify(data),
        decrypt: async (data) => JSON.parse(data)
      },
      sensitiveFields: options.sensitiveFields || ['password', 'token', 'secret', 'key', 'auth', 'credential']
    };

    this.currentState = 'disconnected';
    this.connectionState.emit('disconnected');

    // Start rate limit reset interval
    setInterval(() => this.resetRateLimits(), 60000);
  }

  public async connect(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      // Origin validation
      if (this.options.validateOrigin && typeof window !== 'undefined') {
        const currentOrigin = window.location.origin;
        if (this.options.allowedOrigins.length > 0 && !this.options.allowedOrigins.includes(currentOrigin)) {
          const error = new Error(`Origin validation failed: ${currentOrigin} is not allowed`);
          this.securityEvent.emit({ type: 'origin-validation-failed', message: error.message });
          this.log('Security: ' + error.message, true);
          reject(error);
          return;
        }
      }

      // Rate limit check for reconnects
      if (!this.checkRateLimit('reconnect')) {
        const error = new Error('Rate limit exceeded for reconnection attempts');
        this.securityEvent.emit({ type: 'rate-limit-exceeded', message: error.message });
        this.log('Security: ' + error.message, true);
        this.backoffTime = Math.min(this.backoffTime * 2, 60000);
        setTimeout(() => {
          this.connect().then(resolve).catch(reject);
        }, this.backoffTime);
        return;
      } else {
        this.backoffTime = 1000;
      }

      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        this.log('WebSocket is already connected or connecting');
        if (this.socket.readyState === WebSocket.OPEN) {
          resolve();
        }
        return;
      }

      this.currentState = 'connecting';
      this.connectionState.emit('connecting');
      this.log(`Connecting to ${this.options.url}`);

      try {
        // Prepare headers for connection including authentication
        const headers = { ...this.options.headers };
        if (this.options.authentication.type !== 'custom') {
          await this.updateAuthenticationHeaders(headers);
        }
        if (this.options.enableCSRFProtection && this.options.csrfToken) {
          headers['X-CSRF-Token'] = this.options.csrfToken;
        }

        // Create WebSocket connection
        this.socket = new WebSocket(this.options.url, this.options.protocols);

        // Set connection timeout
        this.connectionTimeout = window.setTimeout(() => {
          if (this.socket && this.socket.readyState !== WebSocket.OPEN) {
            this.log('Connection timeout', true);
            const timeoutError = new Error('Connection timeout');
            this.connectionError.emit(timeoutError);
            this.socket.close();
            reject(timeoutError);
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
        };
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        this.connectionError.emit(err);
        reject(err);
      }
    });
  }

  public disconnect(): void {
    this.log('Disconnecting...');
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
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }
    this.pendingMessages.forEach(({ timeout }) => {
      clearTimeout(timeout);
    });
    this.pendingMessages.clear();
    if (this.socket) {
      try {
        this.socket.close(1000, 'Closed by client');
      } catch (error) {
        this.log('Error during disconnect:', false);
      }
      this.socket = null;
    }
    this.currentState = 'disconnected';
    this.connectionState.emit('disconnected');
  }

  public async send(type: string, payload: any, timeout = 30000): Promise<WebSocketMessage> {
    if (!this.checkRateLimit('message')) {
      const error = new Error('Rate limit exceeded for message sending');
      this.securityEvent.emit({ type: 'rate-limit-exceeded', message: error.message });
      this.log('Security: ' + error.message, true);
      return Promise.reject(error);
    }

    if (this.options.messageSchemas && this.options.messageSchemas[type]) {
      const validationResult = validateSchema(payload, this.options.messageSchemas[type]);
      if (!validationResult.valid) {
        const error = new Error(`Message validation failed: ${validationResult.errors.map(e => e.stack).join(', ')}`);
        this.securityEvent.emit({ type: 'message-validation-failed', message: error.message });
        this.log('Security: ' + error.message, true);
        return Promise.reject(error);
      }
    }

    let processedPayload = payload;
    let isEncrypted = false;

    if (this.options.encryption.enabled && this.options.encryption.encrypt) {
      try {
        processedPayload = await this.options.encryption.encrypt(payload);
        isEncrypted = true;
      } catch (error) {
        this.log('Encryption error: ' + (error instanceof Error ? error.message : String(error)), true);
        return Promise.reject(new Error('Encryption failed'));
      }
    }

    const message: WebSocketMessage = {
      type,
      payload: processedPayload,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      encrypted: isEncrypted
    };

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return this.sendMessage(message, timeout);
    } else {
      this.log('Socket not connected, queueing message');
      this.messageQueue.push(message);
      if (this.currentState !== 'connecting' && this.currentState !== 'reconnecting') {
        this.connect().catch(() => {});
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

  public subscribe(messageType: string, callback: (data: any) => void): () => void {
    return this.messageReceived.subscribe((message) => {
      if (message.type === messageType) {
        callback(message.payload);
      }
    });
  }

  public request<T = any>(type: string, payload: any, timeout = 30000): Promise<T> {
    return this.send(type, payload, timeout)
      .then(async response => {
        if (response.error) {
          throw new Error(response.error);
        }
        let finalPayload = response.payload;
        if (response.encrypted && this.options.encryption.enabled && this.options.encryption.decrypt) {
          try {
            finalPayload = await this.options.encryption.decrypt(response.payload);
          } catch (error) {
            throw new Error('Failed to decrypt response');
          }
        }
        return finalPayload as T;
      });
  }

  public isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  public async updateAuthToken(token: string): Promise<void> {
    if (this.options.authentication.type === 'bearer') {
      this.options.authentication.token = token;
      this.options.headers['Authorization'] = `Bearer ${token}`;
      this.log('Authentication token updated', false);
      this.scheduleTokenRefresh();
    }
  }

  public resetRateLimits(): void {
    this.rateLimit = {
      messagesCount: 0,
      reconnectsCount: 0,
      lastResetTime: Date.now()
    };
  }

  private async sendMessage(message: WebSocketMessage, timeout: number): Promise<WebSocketMessage> {
    return new Promise((resolve, reject) => {
      try {
        const logMessage = this.redactSensitiveFields(JSON.parse(JSON.stringify(message)));
        this.log('Sending message:', false, logMessage);
        this.socket!.send(JSON.stringify(message));
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
    this.currentState = 'connected';
    this.connectionState.emit('connected');
    this.startHeartbeat();
    this.scheduleTokenRefresh();
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.sendMessage(message, 30000).catch(error => {
          this.log('Error sending queued message:', true);
        });
      }
    }
  }

  private handleClose(event: CloseEvent): void {
    this.log(`WebSocket closed: ${event.code} ${event.reason}`);
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }
    if (event.code === 1000 + 401 || event.code === 1000 + 403) {
      this.securityEvent.emit({
        type: 'authentication-error',
        message: `Authentication error: ${event.reason || 'Unauthorized'}`
      });
    }
    if (this.options.autoReconnect && event.code !== 1000) {
      this.attemptReconnect();
    } else {
      this.currentState = 'disconnected';
      this.connectionState.emit('disconnected');
      this.pendingMessages.forEach(({ reject, timeout }) => {
        clearTimeout(timeout);
        reject(new Error('Connection closed'));
      });
      this.pendingMessages.clear();
    }
  }

  private handleError(event: Event): void {
    this.log('WebSocket error:', true);
    const error = new Error('WebSocket error');
    (error as any).originalEvent = event;
    this.connectionError.emit(error);
  }

  private async handleMessage(event: MessageEvent): Promise<void> {
    try {
      let parsedData: WebSocketMessage;
      try {
        parsedData = JSON.parse(event.data) as WebSocketMessage;
      } catch (error) {
        this.log('Error parsing message: Invalid JSON', true);
        return;
      }
      if (parsedData.encrypted && this.options.encryption.enabled && this.options.encryption.decrypt) {
        try {
          parsedData.payload = await this.options.encryption.decrypt(parsedData.payload);
          parsedData.encrypted = false;
        } catch (error) {
          this.log('Error decrypting message', true);
          this.securityEvent.emit({ type: 'decryption-error', message: 'Failed to decrypt incoming message' });
          return;
        }
      }
      const logMessage = this.redactSensitiveFields(JSON.parse(JSON.stringify(parsedData)));
      this.log('Received message:', false, logMessage);
      if (parsedData.type === 'auth-token-expired') {
        this.securityEvent.emit({ type: 'token-expired', message: 'Authentication token expired' });
        if (this.options.authentication.onTokenExpired) {
          try {
            const newToken = await this.options.authentication.onTokenExpired();
            await this.updateAuthToken(newToken);
          } catch (error) {
            this.log('Failed to refresh authentication token', true);
          }
        }
      }
      this.messageReceived.emit(parsedData);
      this.options.onMessage(event.data);
      if (parsedData.id && this.pendingMessages.has(parsedData.id)) {
        const { resolve, timeout } = this.pendingMessages.get(parsedData.id)!;
        clearTimeout(timeout);
        this.pendingMessages.delete(parsedData.id);
        resolve(parsedData);
      }
    } catch (error) {
      this.log('Error processing message:', true);
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
      this.log('Maximum reconnect attempts reached');
      this.currentState = 'disconnected';
      this.connectionState.emit('disconnected');
      return;
    }
    this.reconnectAttempts++;
    this.currentState = 'reconnecting';
    this.connectionState.emit('reconnecting');
    const jitter = Math.random() * 0.5 + 0.75;
    const delay = this.options.reconnectInterval * Math.min(Math.pow(1.5, this.reconnectAttempts), 5) * jitter;
    this.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.options.maxReconnectAttempts}) in ${Math.round(delay)}ms...`);
    this.reconnectTimeout = window.setTimeout(() => {
      this.connect().catch(error => {
        this.log('Reconnect failed:', true);
      });
    }, delay);
  }

  private startHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.heartbeatInterval = window.setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.send('heartbeat', { timestamp: new Date().toISOString() })
          .catch(error => {
            this.log('Heartbeat error:', true);
          });
      }
    }, this.options.heartbeatInterval);
  }

  private scheduleTokenRefresh(): void {
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }
    if (!this.options.authentication.token || !this.options.authentication.tokenRefreshThreshold) {
      return;
    }
    const token = this.options.authentication.token;
    let expirationTime: number | null = null;
    try {
      if (token.includes('.')) {
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        if (payload.exp) {
          expirationTime = payload.exp * 1000;
        }
      }
    } catch (e) {}
    if (!expirationTime) {
      return;
    }
    const now = Date.now();
    const timeToExpiry = expirationTime - now;
    const refreshTime = Math.max(0, timeToExpiry - this.options.authentication.tokenRefreshThreshold);
    if (refreshTime <= 0) {
      this.refreshAuthToken();
    } else {
      this.tokenRefreshTimeout = window.setTimeout(() => {
        this.refreshAuthToken();
      }, refreshTime);
    }
  }

  private async refreshAuthToken(): Promise<void> {
    if (!this.options.authentication.onTokenExpired) {
      return;
    }
    try {
      const newToken = await this.options.authentication.onTokenExpired();
      await this.updateAuthToken(newToken);
      this.log('Authentication token refreshed', false);
    } catch (error) {
      this.log('Failed to refresh authentication token', true);
      this.securityEvent.emit({ type: 'token-refresh-failed', message: 'Failed to refresh authentication token' });
    }
  }

  private async updateAuthenticationHeaders(headers: Record<string, string>): Promise<void> {
    if (this.options.authentication.type === 'bearer') {
      if (this.options.authentication.getToken) {
        try {
          const token = await this.options.authentication.getToken();
          this.options.authentication.token = token;
        } catch (error) {
          this.log('Failed to get authentication token', true);
        }
      }
      if (this.options.authentication.token) {
        headers['Authorization'] = `Bearer ${this.options.authentication.token}`;
      }
    } else if (this.options.authentication.type === 'basic') {
      if (this.options.authentication.token) {
        headers['Authorization'] = `Basic ${this.options.authentication.token}`;
      }
    }
  }

  private checkRateLimit(type: 'message' | 'reconnect'): boolean {
    const now = Date.now();
    if (now - this.rateLimit.lastResetTime > 60000) {
      this.resetRateLimits();
    }
    if (type === 'message') {
      if (this.rateLimit.messagesCount >= (this.options.rateLimits.messagesPerMinute || 300)) {
        return false;
      }
      this.rateLimit.messagesCount++;
    } else if (type === 'reconnect') {
      if (this.rateLimit.reconnectsCount >= (this.options.rateLimits.reconnectsPerMinute || 10)) {
        return false;
      }
      this.rateLimit.reconnectsCount++;
    }
    return true;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  private log(message: string, isError = false, data?: any): void {
    if (this.options.debug) {
      const logMethod = isError ? console.error : console.log;
      if (data) {
        logMethod('[SecureWebSocket]', message, data);
      } else {
        logMethod('[SecureWebSocket]', message);
      }
    }
  }

  private redactSensitiveFields(obj: any): any {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }
    const result = Array.isArray(obj) ? [...obj] : { ...obj };
    for (const key in result) {
      if (this.options.sensitiveFields.includes(key.toLowerCase())) {
        result[key] = '[REDACTED]';
      } else if (typeof result[key] === 'object' && result[key] !== null) {
        result[key] = this.redactSensitiveFields(result[key]);
      }
    }
    return result;
  }
}

// SignalR-compatible WebSocket implementation with enhanced security
export class SecureSignalRWebSocket extends SecureEnterpriseWebSocket {
  private hubName: string;
  private connectionId: string | null = null;

  constructor(options: WebSocketOptions & { hubName: string }) {
    super(options);
    this.hubName = options.hubName;
    this.messageReceived.subscribe((message) => {
      if (message.type === 'connection-id') {
        this.connectionId = message.payload.id;
      }
    });
  }

  public invokeHubMethod<T = any>(methodName: string, ...args: any[]): Promise<T> {
    return this.request<T>('hub-invoke', {
      hub: this.hubName,
      method: methodName,
      args
    });
  }

  public onHubEvent(eventName: string, callback: (data: any) => void): () => void {
    return this.subscribe(`hub-event:${this.hubName}.${eventName}`, callback);
  }

  public getConnectionId(): string | null {
    return this.connectionId;
  }
}

// Factory functions
export function createSecureWebSocket(options: WebSocketOptions): SecureEnterpriseWebSocket {
  return new SecureEnterpriseWebSocket(options);
}

export function createSecureSignalRWebSocket(options: WebSocketOptions & { hubName: string }): SecureSignalRWebSocket {
  return new SecureSignalRWebSocket(options);
}
