export class GCOptimizedSet<TValue> {
    get size(): number {
        return this.items.size;
    }

    private items: Set<TValue>; // Key type is actually TValue

    constructor(other?: Iterable<TValue> | TValue[]) {
        this.items = new Set<TValue>(other);
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

    public forEach(callback: (value: TValue, key: TValue, set: GCOptimizedSet<TValue>) => any): void {
        for (const value of this.items) {
            callback(value, value, this);
        }
        return;
    }

    public has(value: TValue): boolean {
        return this.items.has(value);
    }
}
