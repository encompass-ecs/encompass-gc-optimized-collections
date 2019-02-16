export class GCOptimizedMap<TKey, TValue> {
    get size(): number {
        return this.internalMap.size;
    }

    private internalMap: Map<TKey, TValue>;

    constructor(other?: Iterable<[TKey, TValue]> | Array<[TKey, TValue]>) {
        this.internalMap = new Map(other);
    }

    public clear(): void {
        for (const [k, v] of this.internalMap) {
            this.delete(k);
        }
        return;
    }

    public delete(key: TKey): boolean {
        return this.internalMap.delete(key);
    }

    public [Symbol.iterator](): IterableIterator<[TKey, TValue]> {
        return this.entries();
    }

    public entries(): IterableIterator<[TKey, TValue]> {
        return this.internalMap.entries();
    }

    public forEach(callback: (value: TValue, key: TKey, map: GCOptimizedMap<TKey, TValue>) => any): void {
        for (const [k, v] of this.internalMap) {
            callback(v, k, this);
        }
        return;
    }

    public get(key: TKey): TValue {
        return this.internalMap.get(key);
    }

    public has(key: TKey): boolean {
        return this.internalMap.has(key);
    }

    public keys(): IterableIterator<TKey> {
        return this.internalMap.keys();
    }

    public set(key: TKey, value: TValue): GCOptimizedMap<TKey, TValue> {
        this.internalMap.set(key, value);
        return this;
    }

    public values(): IterableIterator<TValue> {
        return this.internalMap.values();
    }
}
