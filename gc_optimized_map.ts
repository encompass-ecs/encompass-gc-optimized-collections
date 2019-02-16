export class GCOptimizedMap<TKey, TValue> {
    public size: number;

    private keys: { [key: string]: TKey };
    private items: { [key: string]: TValue };

    constructor(other?: Iterable<[TKey, TValue]> | Array<[TKey, TValue]>) {
        this.keys = {};
        this.items = {};
        this.size = 0;

        if (other) {
            const iterable = other as Iterable<[TKey, TValue]>;
            if (iterable[Symbol.iterator]) {
                for (const [k, v] of iterable) {
                    this.set(k, v);
                }
            } else {
                const arr = other as Array<[TKey, TValue]>;
                for (const [k, v] of arr) {
                    this.set(k, v);
                }
                this.size = arr.length;
            }
        }
    }

    public clear(): void {
        for (const k in this.items) {
            delete this.items[k];
            delete this.keys[k];
        }
        this.size = 0;
        return;
    }

    public delete(key: TKey): boolean {
        const contains = this.has(key);
        if (contains) {
            this.size--;
        }
        delete this.items[key as any];
        delete this.keys[key as any];
        return contains;
    }

    public forEach(callback: (value: TValue, key: TKey, map: GCOptimizedMap<TKey, TValue>) => any): void {
        for (const k in this.items) {
            callback(this.items[k], this.keys[k], this);
        }
        return;
    }

    public get(key: TKey): TValue {
        return this.items[key as any];
    }

    public has(key: TKey): boolean {
        return this.items[key as any] !== undefined;
    }

    public set(key: TKey, value: TValue): GCOptimizedMap<TKey, TValue> {
        if (!this.has(key)) {
            this.size++;
        }
        this.items[key as any] = value;
        this.keys[key as any] = key;
        return this;
    }
}
