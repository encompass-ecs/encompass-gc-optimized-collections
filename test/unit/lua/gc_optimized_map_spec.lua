local GCOptimizedMap = require("tstl-gc-optimized-collections.lua.gc_optimized_map").GCOptimizedMap

describe("GCOptimizedMap", function()
    describe("constructor", function()
        local my_map = GCOptimizedMap.new({1, "hello"}, {2, "hey"})

        it("should have size 2", function()
            assert.is.equal(2, my_map.size)
        end)

        it("should have the elements", function()
            assert.is.equal("hello", my_map:get(1))
            assert.is.equal("hey", my_map:get(2))
        end)
    end)
end)
