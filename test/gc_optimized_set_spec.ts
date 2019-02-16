describe("GCOptimizedSet", () => {
    describe("clear", () => {
        const mySet = new Set<number>([0, 1]);

        mySet.clear();

        it("should have size 0", () => {
            expect(mySet.size).toBe(0);
        });

        it("should not have first element", () => {
            expect(mySet.has(0)).toBeFalsy();
        });

        it("should not have second element", () => {
            expect(mySet.has(1)).toBeFalsy();
        });
    });
});