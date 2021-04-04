import NodeCache from 'node-cache';
import { AppConfig } from '@server/common/config/AppConfig';

class Cache {

    cache: NodeCache;
    constructor(ttlSeconds: number) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }

    public async get<T>(key: string, storeFunction: () => Promise<T>): Promise<T> {
        const value = this.cache.get(key) as T;
        if (value) {
            return Promise.resolve(value);
        }

        return this.update(key, storeFunction);
    }

    public async update<T>(key: string, storeFunction: () => Promise<T>): Promise<T> {
        return storeFunction().then((result) => {
            this.cache.set(key, result);
            return result;
        });
    }

    public del(key: string) {
        this.cache.del(key);
    }

    public delStartWith(prefix: string = '') {
        if (!prefix) {
            return;
        }

        const keys = this.cache.keys();
        for (const key of keys) {
            if (key.indexOf(prefix) === 0) {
                this.del(key);
            }
        }
    }

    public flush() {
        this.cache.flushAll();
    }
}


export const CacheManager = new Cache(AppConfig.standardCacheTTL);
