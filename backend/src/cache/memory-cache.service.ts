import { Injectable } from '@nestjs/common';

type Entry = { value: string; expiresAt: number };

@Injectable()
export class MemoryCacheService {
  private store = new Map<string, Entry>();

  get(key: string): string | null {
    const hit = this.store.get(key);
    if (!hit) return null;
    if (Date.now() > hit.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return hit.value;
  }

  set(key: string, value: string, ttlSeconds: number): void {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.store.set(key, { value, expiresAt });
  }
}
