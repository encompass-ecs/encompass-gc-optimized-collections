/** @luaIterator */
export interface GCOptimizedSetIterable<T> extends Iterable<T> {}

export class GCOptimizedSet<TValue> {
    public static readonly Empty = new GCOptimizedSet<any>();

    get size(): number {
        return this.items.size;
    }

    private items: Set<TValue>; // Key type is actually TValue

    constructor(...items: TValue[]) {
        this.items = new Set<TValue>([...items]);
    }

    public entries(): GCOptimizedSetIterable<TValue> {
        return this.items;
    }

    public add(value: TValue): GCOptimizedSet<TValue> {
        this.items.add(value);
        return this;
    }

    public clear(): void {
        for (const k of this.items) {
            this.delete(k);
        }
    }

    public delete(value: TValue): boolean {
        return this.items.delete(value);
    }

    public has(value: TValue): boolean {
        return this.items.has(value);
    }
}
