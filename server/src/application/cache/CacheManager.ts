import NodeCache, { Callback } from "node-cache";
import storage from "node-persist";

type Key = string | number;

export class CacheManager {
    private readonly _cache: NodeCache;
    private readonly _storage: typeof storage;

    private constructor() {

        this._cache = new NodeCache();

        this._storage = storage;

    }

    private static _instance: CacheManager;

    public static get instance() {
        if (CacheManager._instance === undefined) {
            CacheManager._instance = new CacheManager();
        }
        return CacheManager._instance;
    }

    public async init() {
        await storage.init();
    }

    get cache() {
        return this._cache;
    }

    public static getCache() {
        return this.instance.cache;
    }

    /**
     * set a cached key and change the stats
     *
     * @param key cache key
     * @param value A element to cache. If the option `option.forceString` is `true` the module trys to translate
     * it to a serialized JSON
     * @param ttl The time to live in seconds.
     * @param cb Callback function
     */
    public static set<T>(
        key: Key,
        value: T,
        ttl: number | string = 0,
    ): boolean {
        return this.instance.cache.set(key, value, ttl);
    }


    /**
     * get a cached key and change the stats
     *
     * @param key cache key or an array of keys
     * @param cb Callback function
     */
    public static get<T>(
        key: Key,
        cb?: Callback<T>
    ): T | undefined {
        return this.instance.cache.get(key);
    }


}
