/** @luaIterator @tupleReturn */
export interface IGCOptimizedListEntriesIterable<T> extends Iterable<T> {}

/** @luaIterator */
export interface IGCOptimizedListValuesIterable<T> extends Iterable<T> {}

export class GCOptimizedList<T> {
    public static readonly Empty = new GCOptimizedList<any>();

    get size(): number {
        return this._size;
    }

    protected items: Map<number, T>;
    protected indices: Map<T, number>;
    protected _size: number;

    constructor(...entries: T[]) {
        this.items = new Map<number, T>();
        this.indices = new Map<T, number>();
        this._size = 0;

        for (const k of entries) {
            this.add(k);
        }
    }

    public forEach(callback: (value: T) => any) {
        for (let i = 0; i < this.size; i++) {
            callback(this.get(i)!);
        }
    }

    public entries(): IGCOptimizedListEntriesIterable<[number, T]> {
        return this.items;
    }

    public values(): IGCOptimizedListValuesIterable<T> {
        return this.items.values();
    }

    public add(value: T): void {
        this.items.set(this._size, value);
        this.indices.set(value, this._size);
        this._size += 1;
    }

    public clear(): void {
        for (const [k, v] of this.entries()) {
            this.items.delete(k);
            this.indices.delete(v);
        }
        this._size = 0;
    }

    public delete(index: number): boolean {
        if (this.hasIndex(index)) {
            const value = this.get(index)!;
            this.items.delete(index);
            this.indices.delete(value);
            let k = index;
            this._size -= 1;
            while (k < this.size) {
                const one_up_value = this.items.get(k + 1);
                if (one_up_value !== undefined) {
                    this.items.set(k, one_up_value);
                    this.indices.set(one_up_value, k);
                }
                k += 1;
            }
            this.items.delete(this.size);
            return true;
        }
        return false;
    }

    public deleteValue(value: T): boolean {
        const index = this.indexOf(value);
        if (index !== null) {
            this.delete(index);
            return true;
        }
        return false;
    }

    public indexOf(value: T): number | null {
        if (this.indices.has(value)) {
            return this.indices.get(value)!;
        } else {
            return null;
        }
    }

    public get(index: number): T | undefined {
        return this.items.get(index);
    }

    public empty(): boolean {
        return this.size === 0;
    }

    public hasIndex(index: number): boolean {
        return this.items.has(index);
    }

    public hasValue(value: T): boolean {
        return this.indices.has(value);
    }

    public shift(): T | undefined {
        if (!this.empty()) {
            const item = this.items.get(0);
            this.delete(0);
            return item;
        } else {
            return undefined;
        }
    }

    public pop(): T | undefined {
        if (!this.empty()) {
            const item = this.items.get(this.size - 1);
            this.delete(this.size - 1);
            return item;
        } else {
            return undefined;
        }
    }
}
