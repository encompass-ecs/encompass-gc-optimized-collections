local GCOptimizedList = require("tstl-gc-optimized-collections.lua.gc_optimized_list").GCOptimizedList

describe("GCOptimizedList", function()
    describe("constructor", function()
        local my_list = GCOptimizedList.new(1, 4, 5)

        it("should have size 3", function()
            assert.is.equal(3, my_list.size)
        end)

        it("should have the elements", function()
            assert.is.equal(1, my_list:get(0))
            assert.is.equal(4, my_list:get(1))
            assert.is.equal(5, my_list:get(2))
        end)
    end)

    describe("Empty", function()
        it("should be empty", function()
            assert.is.equal(0, GCOptimizedList.Empty.size)
        end)
    end)

    describe("forEach", function()
        it("iterates in order", function()
            local myList = GCOptimizedList.new()

            myList:add(4)
            myList:add(7)
            myList:add(10)
            myList:add(12)
            myList:add(56)

            local results = {}

            myList:forEach(function(_, num)
                table.insert(results, num)
            end)

            assert.are.equal(4, results[1])
            assert.are.equal(7, results[2])
            assert.are.equal(10, results[3])
            assert.are.equal(12, results[4])
            assert.are.equal(56, results[5])
        end)
    end)

    describe("entries", function()
        it("iterates in order", function()
            local myList = GCOptimizedList.new()

            myList:add(4)
            myList:add(7)
            myList:add(10)
            myList:add(12)
            myList:add(56)
            myList:delete(1)

            local results = {}

            for k, v in myList:entries() do
                table.insert(results, v)
            end

            assert.are.equal(4, results[1])
            assert.are.equal(10, results[2])
            assert.are.equal(12, results[3])
            assert.are.equal(56, results[4])
        end)
    end)

    describe("values", function()
        describe("empty", function()
            local myList = GCOptimizedList.new()

            it("does nothing", function()
                local results = {}

                for v in myList:values() do
                    table.insert(results, v)
                end

                assert.is_nil(next(results))
            end)
        end)

        describe("not empty", function()
            local myList = GCOptimizedList.new()

            myList:add(5)
            myList:add(0)
            myList:add(10)
            myList:add(12)

            it("iterates in order", function()
                local results = {}

                for v in myList:values() do
                    table.insert(results, v)
                end

                assert.are.equal(5, results[1])
                assert.are.equal(0, results[2])
                assert.are.equal(10, results[3])
                assert.are.equal(12, results[4])
            end)
        end)
    end)

    describe("add", function()
        local myList = GCOptimizedList.new()
        myList:add(2)
        myList:add(101)
        myList:add(4)

        it("should have 2 as element 0", function()
            assert.are.equal(2, myList:get(0))
        end)

        it("should have 101 as element 1", function()
            assert.are.equal(101, myList:get(1))
        end)

        it("should have 3 as element 2", function()
            assert.are.equal(4, myList:get(2))
        end)
    end)

    describe("clear", function()
        local myList = GCOptimizedList.new()
        myList:add("hello")
        myList:add("thing")
        myList:clear()

        it("should have size 0", function()
            assert.are.equal(0, myList.size)
        end)

        it("should not have the first element", function()
            assert.are.equal(false, myList:hasIndex(0))
        end)

        it("should not have the second element", function()
            assert.are.equal(false, myList:hasIndex(1))
        end)

        it("should clear the indices list", function()
            assert.is_nil(next(myList.indices))
        end)
    end)

    describe("delete", function()
        local myList = GCOptimizedList.new()
        myList:add(100)
        myList:add(101)
        myList:add(102)
        myList:add(103)
        myList:delete(1)

        it("restructures", function()
            assert.are.equal(102, myList:get(1))
            assert.are.equal(103, myList:get(2))
        end)
    end)

    describe("deleteValue", function()
        local myList = GCOptimizedList.new()
        myList:add(100)
        myList:add(101)
        myList:add(102)
        myList:add(103)

        myList:deleteValue(101)

        it("restructures", function()
            assert.are.equal(102, myList:get(1))
            assert.are.equal(103, myList:get(2))
        end)
    end)

    describe("indexOf", function()
        local myList = GCOptimizedList.new()

        myList:add(6)
        myList:add(10)
        myList:add(16)
        myList:add(25)
        myList:delete(2)

        it("returns the correct index", function()
            assert.are.equal(0, myList:indexOf(6))
            assert.are.equal(2, myList:indexOf(25))
        end)
    end)

    describe("get", function()
        local myList = GCOptimizedList.new()
        myList:add(5)
        myList:add(9)
        myList:add(13)

        it("gets", function()
            assert.are.equal(13, myList:get(2))
        end)
    end)

    describe("empty", function()
        describe("list is empty", function()
            local myList = GCOptimizedList.new()

            it("returns true", function()
                assert.is.truthy(myList:empty())
            end)
        end)

        describe("list had elements removed", function()
            local myList = GCOptimizedList.new()

            myList:add(101)
            myList:add(102)

            myList:delete(0)
            myList:delete(0)

            it("returns true", function()
                assert.is.truthy(true, myList:empty())
            end)
        end)

        describe("list is not empty", function()
            local myList = GCOptimizedList.new()

            myList:add(100)

            it("returns false", function()
                assert.is.falsy(myList:empty())
            end)
        end)
    end)

    describe("hasIndex", function()
        describe("list has index", function()
            local myList = GCOptimizedList.new()

            myList:add(3)
            myList:add(400)

            it("returns true", function()
                assert.is.truthy(myList:hasIndex(1))
            end)
        end)

        describe("list does not have index", function()
            local myList = GCOptimizedList.new()

            myList:add(4)
            myList:add(350)

            it("returns false", function()
                assert.is.falsy(myList:hasIndex(4))
            end)
        end)
    end)

    describe("hasValue", function()
        local myList = GCOptimizedList.new()

        myList:add(3)
        myList:add(400)

        describe("list does not have value", function()
            it("returns false", function()
                assert.is_false(myList:hasValue(1))
            end)
        end)

        describe("list has value", function()
            it("returns true", function()
                assert.is_true(myList:hasValue(400))
            end)
        end)
    end)

    describe("shift", function()
        describe("list has at least one element", function()
            local myList = GCOptimizedList.new()

            myList:add(3)
            myList:add(6)

            local result = myList:shift()

            it("returns the first element", function()
                assert.are.equal(3, result)
            end)

            it("deletes the first element", function()
                assert.are.equal(1, myList.size)
                assert.are.equal(6, myList:get(0))
            end)
        end)

        describe("list is empty", function()
            local myList = GCOptimizedList.new()

            it("returns nil", function()
                assert.is_nil(myList:shift())
            end)
        end)
    end)

    describe("pop", function()
        describe("list has at least one element", function()
            local myList = GCOptimizedList.new()

            myList:add(4)
            myList:add(6)
            myList:add(1)

            local result = myList:pop()

            it("returns the last element", function()
                assert.are.equal(1, result)
            end)

            it("deletes the last element", function()
                assert.are.equal(2, myList.size)
                assert.are.equal(4, myList:get(0))
                assert.are.equal(6, myList:get(1))
                assert.is.falsy(myList:get(2))
            end)
        end)
    end)
end)
