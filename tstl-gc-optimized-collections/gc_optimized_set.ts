export class GCOptimizedSet<TValue> {
    get size(): number {
        return this.items.size;
    }

    private items: Set<TValue>; // Key type is actually TValue

    constructor(other?: ReadonlyArray<TValue>) {
        this.items = new Set<TValue>(other);
    }

    public *[Symbol.iterator]() {
        for (const value of this.items) {
            yield value;
        }
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
