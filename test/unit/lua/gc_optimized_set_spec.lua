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
end)
