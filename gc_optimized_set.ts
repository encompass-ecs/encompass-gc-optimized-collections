export class GCOptimizedSet<TValue> {
    public size: number;

    private items: {[key: string]: TValue}; // Key type is actually TValue

    constructor(other?: Iterable<TValue> | TValue[]) {
        this.items = {};
        this.size = 0;

        if (other) {
            const iterable = other as Iterable<TValue>;
            if (iterable[Symbol.iterator]) {
                // Iterate manually because Set is compiled with ES5 which doesn't support Iterables in for...of
                const iterator = iterable[Symbol.iterator]();
                while (true) {
                    const result = iterator.next();
                    if (result.done) {
                        break;
                    }
                    this.add(result.value);
                }
            } else {
                const arr = other as TValue[];
                this.size = arr.length;
                for (const value of arr) {
                    this.items[value as any] = value;
                }
            }
        }
    }

    public add(value: TValue): GCOptimizedSet<TValue> {
        if (!this.has(value)) {
            this.size++;
        }
        this.items[value as any] = value;
        return this;
    }

    public clear(): void {
        for (const k in this.items) {
            delete this.items[k];
        }
        this.size = 0;
    }

    public delete(value: TValue): boolean {
        const contains = this.has(value);
        if (contains) {
            this.size--;
        }
        delete this.items[value as any];
        return contains;
    }

    public forEach(callback: (value: TValue, key: TValue, set: GCOptimizedSet<TValue>) => any): void {
        for (const key in this.items) {
            callback(this.items[key], this.items[key], this);
        }
        return;
    }

    public has(value: TValue): boolean {
        return this.items[value as any] !== undefined;
    }
}
