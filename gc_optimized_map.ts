export class GCOptimizedMap<TKey, TValue> {
    get size(): number {
        return this.items.size;
    }

    private items: Map<TKey, TValue>;

    constructor(other?: Iterable<[TKey, TValue]> | Array<[TKey, TValue]>) {
        this.items = new Map<TKey, TValue>(other);
    }

    public clear(): void {
        for (const [k, v] of this.items) {
            this.delete(k);
        }
        return;
    }

    public delete(key: TKey): boolean {
        return this.items.delete(key);
    }

    public forEach(callback: (value: TValue, key: TKey, map: GCOptimizedMap<TKey, TValue>) => any): void {
        for (const [k, v] of this.items) {
            callback(v, k, this);
        }
        return;
    }

    public get(key: TKey): TValue {
        return this.items.get(key);
    }

    public has(key: TKey): boolean {
        return this.items.has(key);
    }

    public set(key: TKey, value: TValue): GCOptimizedMap<TKey, TValue> {
        this.items.set(key, value);
        return this;
    }
}
