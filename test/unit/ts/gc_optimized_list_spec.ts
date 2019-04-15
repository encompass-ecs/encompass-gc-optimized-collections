import { GCOptimizedList } from "../../../tstl-gc-optimized-collections/init";

describe("GCOptimizedList", () => {
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
        })
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
            expect(myList.has(0)).toBeFalsy();
        });

        it("should not have second element", () => {
            expect(myList.has(1)).toBeFalsy();
        });
    });

    describe("delete", () => {
        const myList = new GCOptimizedList<number>();
        myList.add(100);
        myList.add(101);
        myList.add(102);
        myList.add(103);
        myList.delete(1);

        it("restructures", () => {
            expect(myList.get(1)).toBe(102);
            expect(myList.get(2)).toBe(103);
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
            })
        });

        describe("list had elements removed", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(101);
            myList.add(102);

            myList.delete(0);
            myList.delete(0);

            it("returns true", () => {
                expect(myList.empty()).toBeTruthy();
            })
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
                expect(myList.has(1)).toBeTruthy();
            });
        });

        describe("list does not have index", () => {
            const myList = new GCOptimizedList<number>();

            myList.add(4);
            myList.add(350);

            it("returns false", () => {
                expect(myList.has(400)).toBeFalsy();
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
        })
    });
});
