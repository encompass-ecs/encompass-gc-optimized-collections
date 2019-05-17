import { GCOptimizedSortedList } from "../../../tstl-gc-optimized-collections/init";

describe("GCOptimizedSortedList", () => {
    describe("Empty", () => {
        it("should be empty", () => {
            expect(GCOptimizedSortedList.Empty.empty()).toBeTruthy();
        });
    });

    describe("add", () => {
        const myList = new GCOptimizedSortedList<number>();
        myList.add(6);
        myList.add(10);
        myList.add(2);
        myList.add(8);

        it("should have 2 as element 0", () => {
            expect(myList.get(0)).toBe(2);
        });

        it("should have 6 as element 1", () => {
            expect(myList.get(1)).toBe(6);
        });

        it("should have 8 as element 2", () => {
            expect(myList.get(2)).toBe(8);
        });

        it("should have 10 as element 3", () => {
            expect(myList.get(3)).toBe(10);
        });
    });

    describe("forEach", () => {
        const myList = new GCOptimizedSortedList<number>();
        myList.add(6);
        myList.add(10);
        myList.add(2);
        myList.add(8);

        it("iterates values in order", () => {
            const results: number[] = [];

            myList.forEach((num) => {
                results.push(num);
            });

            expect(results[0]).toBe(2);
            expect(results[1]).toBe(6);
            expect(results[2]).toBe(8);
            expect(results[3]).toBe(10);
        });
    });
});
