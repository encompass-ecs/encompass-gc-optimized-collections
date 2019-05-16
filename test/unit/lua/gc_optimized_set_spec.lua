local GCOptimizedSet = require("tstl-gc-optimized-collections.lua.gc_optimized_set").GCOptimizedSet

describe("GCOptimizedSet", function()
    describe("constructor", function()
        local my_set = GCOptimizedSet.new(1, 2, 3)

        it("should have size 3", function()
            assert.is.equal(3, my_set.size)
        end)

        it("should contain all the elements", function()
            assert.is_true(my_set:has(1))
            assert.is_true(my_set:has(2))
            assert.is_true(my_set:has(3))
        end)
    end)

    describe("entries", function()
        local my_set = GCOptimizedSet.new(4, 2, 8)

        it("iterates over the entries", function()
            local set_sum = 0
            for k in my_set:entries() do
                set_sum = set_sum + k
            end
            assert.is.equal(14, set_sum)
        end)
    end)

    describe("add", function()
        local my_set = GCOptimizedSet.new(4, 2, 8)

        my_set:add(10)

        it("adds the element to the set", function()
            assert.is_true(my_set:has(10))
        end)

        it("increases the set size by 1", function()
            assert.is.equal(4, my_set.size)
        end)
    end)

    describe("clear", function()
        local my_set = GCOptimizedSet.new(4, 2, 8)

        my_set:clear()

        it("removes the elements", function()
            assert.is_false(my_set:has(4))
            assert.is_false(my_set:has(2))
            assert.is_false(my_set:has(8))
        end)

        it("sets the size to 0", function()
            assert.is.equal(0, my_set.size)
        end)
    end)

    describe("delete", function()
        local my_set = GCOptimizedSet.new(4, 2, 8)

        my_set:delete(4)

        it("removes the element", function()
            assert.is_false(my_set:has(4))
        end)

        it("decreases the size by 1", function()
            assert.is.equal(2, my_set.size)
        end)
    end)

    describe("has", function()
        local my_set = GCOptimizedSet.new(1, 2, 3)

        describe("the element exists in the set", function()
            it("returns true", function()
                assert.is_true(my_set:has(3))
            end)
        end)

        describe("the element does not exist in the set", function()
            it("returns false", function()
                assert.is_false(my_set:has(5))
            end)
        end)
    end)
end)
