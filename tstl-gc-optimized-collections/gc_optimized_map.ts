export class GCOptimizedMap<TKey, TValue> {
    get size(): number {
        return this.items.size;
    }

    private items: Map<TKey, TValue>;

    constructor(other?: ReadonlyArray<[TKey, TValue]>) {
        this.items = new Map<TKey, TValue>(other);
    }

    public [Symbol.iterator] = this.items[Symbol.iterator];

    public clear(): void {
        for (const [k, v] of this.items) {
            this.delete(k);
        }
        return;
    }

    public delete(key: TKey): boolean {
        return this.items.delete(key);
    }

    public get(key: TKey): TValue | undefined {
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
