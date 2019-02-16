export class GCOptimizedSet<TValue> extends Set<TValue> {
    public clear(): void {
        for (const k of this) {
            this.delete(k);
        }
    }
}
