import { GCOptimizedMap } from "..";

describe("GCOptimizedMap", () => {
    describe("clear", () => {
        const myMap = new GCOptimizedMap<string, string>([["a","c"], ["b","d"]]);

        myMap.clear();

        it("should have size 0", () => {
            expect(myMap.size).toBe(0);
        });

        it("should not have first element", () => {
            expect(myMap.has("a")).toBeFalsy();
        });

        it("should not have second element", () => {
            expect(myMap.has("b")).toBeFalsy();
        });
    });
});
