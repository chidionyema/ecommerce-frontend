interface CacheAdapter {
    get(key: string): Promise<any | null>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    delete(key: string): Promise<boolean>;
  }
  
  class UniversalCache implements CacheAdapter {
    private adapter: CacheAdapter;
  
    constructor() {
      this.adapter = this.detectEnvironment();
    }
  
    private detectEnvironment(): CacheAdapter {
      // Runtime detection
      if (typeof caches !== 'undefined') {
        return new EdgeCacheAdapter();
      }
      if (process.env.REDIS_URL) {
        return new RedisAdapter();
      }
      return new MemoryCacheAdapter();
    }
  
    public get(key: string) {
      return this.adapter.get(key);
    }
  
    public set(key: string, value: any, ttl?: number) {
      return this.adapter.set(key, value, ttl);
    }
  
    public delete(key: string) {
      return this.adapter.delete(key);
    }
  }
  
  // Memory Cache (Development/fallback)
  class MemoryCacheAdapter implements CacheAdapter {
    private store = new Map<string, { value: any; expires: number }>();
  
    async get(key: string) {
      const entry = this.store.get(key);
      if (!entry) return null;
      if (Date.now() > entry.expires) {
        this.store.delete(key);
        return null;
      }
      return entry.value;
    }
  
    async set(key: string, value: any, ttl = 60) {
      this.store.set(key, {
        value,
        expires: Date.now() + ttl * 1000
      });
    }
  
    async delete(key: string) {
      return this.store.delete(key);
    }
  }
  
  // Edge Environment Cache
  class EdgeCacheAdapter implements CacheAdapter {
    async get(key: string) {
      const cache = await caches.open('universal-cache');
      const response = await cache.match(key);
      if (!response) return null;
      return response.json();
    }
  
    async set(key: string, value: any, ttl = 60) {
      const cache = await caches.open('universal-cache');
      const response = new Response(JSON.stringify(value), {
        headers: {
          'Cache-Control': `max-age=${ttl}`
        }
      });
      await cache.put(key, response);
    }
  
    async delete(key: string) {
      const cache = await caches.open('universal-cache');
      return cache.delete(key);
    }
  }
  
  // Redis Adapter (Production)
  class RedisAdapter implements CacheAdapter {
    private client: Redis;
  
    constructor() {
      this.client = createClient({
        url: process.env.REDIS_URL
      });
      this.client.connect();
    }
  
    async get(key: string) {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    }
  
    async set(key: string, value: any, ttl = 60) {
      await this.client.set(key, JSON.stringify(value), {
        EX: ttl
      });
    }
  
    async delete(key: string) {
      return this.client.del(key);
    }
  }
  
  export const cache = new UniversalCache();