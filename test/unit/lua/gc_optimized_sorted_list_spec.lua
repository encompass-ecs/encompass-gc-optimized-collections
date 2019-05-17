local GCOptimizedSortedList = require("tstl-gc-optimized-collections.lua.gc_optimized_sorted_list").GCOptimizedSortedList

describe("GCOptimizedSortedList", function()
    describe("Empty", function()
        it("should be empty", function()
            assert.is.equal(0, GCOptimizedSortedList.Empty.size)
        end)
    end)

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

    describe("forEach", function()
        it("iterates in order", function()
            local myList = GCOptimizedSortedList.new()

            myList:add(6)
            myList:add(10)
            myList:add(8)
            myList:add(2)

            local results = {}

            myList:forEach(function(_, num)
                table.insert(results, num)
            end)

            assert.are.equal(2, results[1])
            assert.are.equal(6, results[2])
            assert.are.equal(8, results[3])
            assert.are.equal(10, results[4])
        end)
    end)

    describe("values", function()
        describe("empty", function()
            local myList = GCOptimizedSortedList.new()

            it("does nothing", function()
                local results = {}

                for v in myList:values() do
                    table.insert(results, v)
                end

                assert.is_nil(next(results))
            end)
        end)

        describe("not empty", function()
            local myList = GCOptimizedSortedList.new()

            myList:add(5)
            myList:add(0)
            myList:add(10)
            myList:add(12)

            it("iterates in sorted order", function()
                local results = {}

                for v in myList:values() do
                    table.insert(results, v)
                end

                assert.are.equal(0, results[1])
                assert.are.equal(5, results[2])
                assert.are.equal(10, results[3])
                assert.are.equal(12, results[4])
            end)
        end)
    end)
end)
