/** @luaIterator @tupleReturn */
export interface IGCOptimizedMapIterable<T> extends Iterable<T> {}

export class GCOptimizedMap<TKey, TValue> {
    public static readonly Empty = new GCOptimizedMap<any, any>();

    get size(): number {
        return this.items.size;
    }

    private items: Map<TKey, TValue>;

    constructor(...entries: [TKey, TValue][]) {
        this.items = new Map<TKey, TValue>(entries);
    }

    public entries(): IGCOptimizedMapIterable<[TKey, TValue]> {
        return this.items;
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
