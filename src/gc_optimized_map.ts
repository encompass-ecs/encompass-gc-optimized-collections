export class GCOptimizedMap<TKey, TValue> extends Map<TKey, TValue> {
    public size: number;

    public clear(): void {
        for (const [k, v] of this) {
            this.delete(k);
        }
        return;
    }
}
