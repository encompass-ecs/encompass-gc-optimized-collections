/** @luaIterator @tupleReturn */
export interface GCOptimizedListIterable<T> extends Iterable<T> {}

export class GCOptimizedList<T> {
    private items: Map<number, T>;
    private _size: number;

    constructor() {
        this.items = new Map<number, T>();
        this._size = 0;
    }

    public iterable(): GCOptimizedListIterable<[number, T]> {
        return this.items;
    }

    public add(value: T) {
        this.items.set(this._size, value);
        this._size += 1;
        return this;
    }

    public clear(): void {
        for (const [k, _] of this.iterable()) {
            this.delete(k);
        }
        this._size = 0;
    }

    public delete(index: number) {
        if (this.has(index)) {
            this.items.delete(index);
            let k = index;
            this._size -= 1;
            while (k < this.size()) {
                this.items.set(k, this.items.get(k+1));
                k += 1;
            }
            this.items.delete(this.size());
        }
        return this;
    }

    public get(index: number): T | undefined {
        return this.items.get(index);
    }

    public empty(): boolean {
        return this.size() == 0;
    }

    public has(index: number): boolean {
        return this.items.has(index);
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
            const item = this.items.get(this.size() - 1);
            this.delete(this.size() - 1);
            return item;
        } else {
            return undefined;
        }
    }

    public size(): number {
        return this._size;
    }
}
