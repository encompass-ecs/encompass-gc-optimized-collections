import { GCOptimizedList } from "../init";

export class GCOptimizedSortedList<T> extends GCOptimizedList<T> {
    public add(value: T): void {
        for (const [index, v] of this.entries()) {
            if (value < v) {
                this.insert(index, value);
                return;
            }
        }
        this.items.set(this._size, value);
        this._size += 1;
    }

    private insert(index: number, value: T): void {
        let k = this._size;
        while (k > index) {
            this.items.set(k, this.items.get(k - 1)!);
            k -= 1;
        }
        this.items.set(index, value);
        this._size += 1;
    }
}
