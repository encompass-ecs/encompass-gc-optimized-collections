import { GCOptimizedList } from "../../../tstl-gc-optimized-collections/init";

describe("GCOptimizedList", () => {
    describe("constructor", () => {
        describe("no arguments", () => {
            const myList = new GCOptimizedList<number>();

            it("is empty", () => {
                expect(myList.size).toBe(0);
            });
        });

        describe("arguments", () => {
            const myList = new GCOptimizedList<number>(1, 4, 5);

            it("has correct size", () => {
                expect(myList.size).toBe(3);
            });

            it("has correct values", () => {
                expect(myList.get(0)).toBe(1);
                expect(myList.get(1)).toBe(4);
                expect(myList.get(2)).toBe(5);
            });
        });
    });

    describe("Empty", () => {
        it("should be empty", () => {
            expect(GCOptimizedList.Empty.empty()).toBeTruthy();
        });
    });

    describe("add", () => {
        const myList = new GCOptimizedList<number>();
        myList.add(2);
        myList.add(101);
        myList.add(4);

        it("should have 2 as element 0", () => {
            expect(myList.get(0)).toBe(2);
        });

        it("should have 101 as element 1", () => {
            expect(myList.get(1)).toBe(101);
        });

        it("should have 3 as element 2", () => {
            expect(myList.get(2)).toBe(4);
        });
    });

    describe("clear", () => {
        const myList = new GCOptimizedList<string>();
        myList.add("hello");
        myList.add("thing");

        myList.clear();

        it("should have size 0", () => {
            expect(myList.size).toBe(0);
        });

        it("should not have the first element", () => {
            expect(myList.hasIndex(0)).toBeFalsy();
        });

        it("should not have second element", () => {
            expect(myList.hasIndex(1)).toBeFalsy();
        });
    });

    describe("delete", () => {
        describe("the index exists", () => {
            const myList = new GCOptimizedList<number>();
            myList.add(100);
            myList.add(101);
            myList.add(102);
            myList.add(103);
            myList.delete(1);

            it("deletes and restructures", () => {
                expect(myList.get(1)).toBe(102);
                expect(myList.get(2)).toBe(103);
            });
        });

        describe("the value does not exist", () => {
            const myList = new GCOptimizedList<number>();
            myList.add(100);
            myList.add(101);
            myList.add(102);
            myList.add(103);

            it("returns false", () => {
                expect(myList.delete(9)).toBeFalsy();
            });
        });
    });

    describe("deleteValue", () => {
        describe("the value exists", () => {
            const myList = new GCOptimizedList<number>();
            myList.add(100);
            myList.add(101);
            myList.add(102);
            myList.add(103);

            myList.deleteValue(101);

            it("deletes and restructures", () => {
                expect(myList.get(1)).toBe(102);
                expect(myList.get(2)).toBe(103);
            });
        });

        describe("the value does not exist", () => {
            const myList = new GCOptimizedList<number>();
            myList.add(100);
            myList.add(101);
            myList.add(102);
            myList.add(103);

            it("returns false", () => {
                expect(myList.delete(105)).toBeFalsy();
            });
        });
    });

    describe("indexOf", () => {
        describe("has value", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(6);
            myList.add(10);
            myList.add(16);
            myList.add(25);
            myList.delete(2);

            it("returns the correct index", () => {
                expect(myList.indexOf(6)).toBe(0);
                expect(myList.indexOf(25)).toBe(2);
            });
        });

        describe("does not have value", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(7);

            it("returns null", () => {
                expect(myList.indexOf(2)).toBeNull();
            });
        });
    });

    describe("get", () => {
        const myList = new GCOptimizedList<number>();

        myList.add(5);
        myList.add(9);
        myList.add(13);

        it("gets", () => {
            expect(myList.get(2)).toBe(13);
        });
    });

    describe("empty", () => {
        describe("list is empty", () => {
            const myList = new GCOptimizedList<number>();

            it("returns true", () => {
                expect(myList.empty()).toBeTruthy();
            });
        });

        describe("list had elements removed", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(101);
            myList.add(102);

            myList.delete(0);
            myList.delete(0);

            it("returns true", () => {
                expect(myList.empty()).toBeTruthy();
            });
        });

        describe("list is not empty", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(100);

            it("returns false", () => {
                expect(myList.empty()).toBeFalsy();
            });
        });
    });

    describe("has", () => {
        describe("list has index", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(3);
            myList.add(400);

            it("returns true", () => {
                expect(myList.hasIndex(1)).toBeTruthy();
            });
        });

        describe("list does not have index", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(4);
            myList.add(350);

            it("returns false", () => {
                expect(myList.hasIndex(400)).toBeFalsy();
            });
        });
    });

    describe("hasValue", () => {
        const myList = new GCOptimizedList<number>();

        myList.add(3);
        myList.add(400);

        describe("list has value", () => {
            it("returns true", () => {
                expect(myList.hasValue(400)).toBeTruthy();
            });
        });

        describe("list does not have value", () => {
            it("returns false", () => {
                expect(myList.hasValue(1)).toBeFalsy();
            });
        });
    });

    describe("shift", () => {
        describe("list has at least one element", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(3);
            myList.add(6);

            const result = myList.shift();

            it("returns the first element", () => {
                expect(result).toBe(3);
            });

            it("deletes the first element", () => {
                expect(myList.size).toBe(1);
                expect(myList.get(0)).toBe(6);
            });
        });

        describe("list is empty", () => {
            const myList = new GCOptimizedList<number>();

            it("returns undefined", () => {
                expect(myList.shift()).toBeUndefined();
            });
        });
    });

    describe("pop", () => {
        describe("list has at least one element", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(4);
            myList.add(6);
            myList.add(1);

            const result = myList.pop();

            it("returns the last element", () => {
                expect(result).toBe(1);
            });

            it("deletes the last element", () => {
                expect(myList.size).toBe(2);
                expect(myList.get(0)).toBe(4);
                expect(myList.get(1)).toBe(6);
            });
        });
    });

    describe("forEach", () => {
        it("iterates values in order", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(4);
            myList.add(3);
            myList.add(1);

            const results: number[] = [];

            myList.forEach((num) => {
                results.push(num);
            });

            expect(results[0]).toBe(4);
            expect(results[1]).toBe(3);
            expect(results[2]).toBe(1);
        });
    });

    describe("entries", () => {
        it("iterates indices and values in order", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(4);
            myList.add(3);
            myList.add(1);

            let value_sum = 0;
            let loop_counter = 0;
            for (const [i, v] of myList.entries()) {
                expect(i).toBe(loop_counter);
                value_sum += v;
                loop_counter += 1;
            }

            expect(value_sum).toBe(8);
        });
    });

    describe("values", () => {
        it("iterates values in order", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(3);
            myList.add(4);
            myList.add(5);

            let loop_counter = 3;
            let value_sum = 0;
            for (const v of myList.values()) {
                expect(v).toBe(loop_counter);
                value_sum += v;
                loop_counter += 1;
            }

            expect(value_sum).toBe(12);
        });
    });
});
