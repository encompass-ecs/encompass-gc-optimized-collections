import { GCOptimizedMap } from "../../../tstl-gc-optimized-collections/init";

describe("GCOptimizedMap", () => {
    describe("Empty", () => {
        it("should be empty", () => {
            expect(GCOptimizedMap.Empty.size).toBe(0);
        });
    });

    describe("constructor", () => {
        describe("no argument", () => {
            const myMap = new GCOptimizedMap();

            it("should have size 0", () => {
                expect(myMap.size).toBe(0);
            });
        });

        describe("iterable argument", () => {
            const myMap = new GCOptimizedMap(["a", "c"],["b", "d"]);

            it("should have size 2", () => {
                expect(myMap.size).toBe(2);
            });

            it("should have element a", () => {
                expect(myMap.has("a")).toBeTruthy();
            });

            it("should have element b", () => {
                expect(myMap.has("b")).toBeTruthy();
            });
        });
    });

    describe("clear", () => {
        const myMap = new GCOptimizedMap<string, string>(["a","c"], ["b","d"]);

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

    describe("delete", () => {
        const myMap = new GCOptimizedMap(["a", "c"],["b", "d"]);

        myMap.delete("a");

        it("should not have element a", () => {
            expect(myMap.has("a")).toBeFalsy();
        });

        it("should have element b", () => {
            expect(myMap.has("b")).toBeTruthy();
        });
    });

    describe("forEach", () => {
        const myMap = new GCOptimizedMap(["a", 2], ["b", 3], ["c", 4]);
        let count = 0;
        for (const [k, v] of myMap.entries()) {
            count += v;
        }

        it("iterates over all entries", () => {
            expect(count).toBe(9);
        });
    });

    describe("get", () => {
        const myMap = new GCOptimizedMap(["a", "c"], ["b", "d"]);

        describe("the map has the key", () => {
            it("gets the value from the key", () => {
                expect(myMap.get("a")).toBe("c");
            });
        });

        describe("the map does not have the key", () => {
            it("returns undefined", () => {
                expect(myMap.get("c")).toBeUndefined();
            });
        });
    });

    describe("has", () => {
        const myMap = new GCOptimizedMap(["a", "c"]);

        describe("the map has the key", () => {
            it("returns true", () => {
                expect(myMap.has("a")).toBeTruthy();
            });
        });

        describe("the map does not have the key", () => {
            it("returns false", () => {
                expect(myMap.has("c")).toBeFalsy();
            });
        });
    });

    describe("set", () => {
        const myMap = new GCOptimizedMap();

        myMap.set("a", 5);

        it("should have key", () => {
            expect(myMap.has("a")).toBeTruthy();
        });

        it("should have value", () => {
            expect(myMap.get("a")).toBe(5);
        });
    });

    describe("size", () => {
        describe("the map is empty", () => {
            const m = new GCOptimizedMap();

            it("returns 0", () => {
                expect(m.size).toBe(0);
            });
        });

        describe("the map has a value set", () => {
            const m = new GCOptimizedMap();

            m.set(1, 3);

            it("returns 1", () => {
                expect(m.size).toBe(1);
            });
        });

        describe("the map is constructed with 2 entries", () => {
            const m = new GCOptimizedMap([1,2],[3,4]);

            it("returns 2", () => {
                expect(m.size).toBe(2);
            });
        });

        describe("the map is cleared", () => {
            const m = new GCOptimizedMap([1,2],[3,4]);
            m.clear();

            it("returns 0", () => {
                expect(m.size).toBe(0);
            });
        });

        describe("the map has 2 entries and 1 is deleted", () => {
            const m = new GCOptimizedMap([1,2], [3,4]);
            m.delete(1);

            it("returns 1", () => {
                expect(m.size).toBe(1);
            });
        });
    });

    describe("entries", () => {
        const m = new GCOptimizedMap([3, 2], [1, 4], [2, 6]);

        it("iterates through the entries", () => {
            let key_sum = 0;
            let value_sum = 0;
            for (const [k, v] of m.entries()) {
                key_sum += k;
                value_sum += v;
            }
            expect(key_sum).toBe(6);
            expect(value_sum).toBe(12);
        });
    });
});
