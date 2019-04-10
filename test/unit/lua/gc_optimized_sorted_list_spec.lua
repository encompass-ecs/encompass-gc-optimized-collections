local GCOptimizedSortedList = require("tstl-gc-optimized-collections.lua.gc_optimized_sorted_list").GCOptimizedSortedList

describe("GCOptimizedSortedList", function()
    describe("add", function()
        local myList = GCOptimizedSortedList.new()

        myList:add(6)
        myList:add(10)
        myList:add(2)
        myList:add(8)

        it("should have 2 as element 0", function()
            assert.are.equal(2, myList:get(0))
        end)

        it("should have 6 as element 1", function()
            assert.are.equal(6, myList:get(1))
        end)

        it("should have 8 as element 2", function()
            assert.are.equal(8, myList:get(2))
        end)

        it("should have 10 as element 3", function()
            assert.are.equal(10, myList:get(3))
        end)
    end)

    describe("delete", function()
        local myList = GCOptimizedSortedList.new()

        myList:add(6)
        myList:add(10)
        myList:add(2)
        myList:add(8)

        myList:delete(2)

        it("should have 2 as element 0", function()
            assert.are.equal(2, myList:get(0))
        end)

        it("should have 6 as element 1", function()
            assert.are.equal(6, myList:get(1))
        end)

        it("should have 10 as element 2", function()
            assert.are.equal(10, myList:get(2))
        end)
    end)
end)
