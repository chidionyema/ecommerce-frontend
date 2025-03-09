// File: cache-handler.js
export class CacheHandler {
    constructor() {
      this.cache = new Map();
      this.tags = new Map();
    }
  
    async get(key) {
      return this.cache.get(key);
    }
  
    async set(key, value, { tags = [] } = {}) {
      this.cache.set(key, value);
      tags.forEach(tag => {
        if (!this.tags.has(tag)) {
          this.tags.set(tag, new Set());
        }
        this.tags.get(tag).add(key);
      });
    }
  
    async revalidateTag(tag) {
      if (this.tags.has(tag)) {
        const keys = Array.from(this.tags.get(tag));
        keys.forEach(key => this.cache.delete(key));
        this.tags.delete(tag);
      }
    }
  }