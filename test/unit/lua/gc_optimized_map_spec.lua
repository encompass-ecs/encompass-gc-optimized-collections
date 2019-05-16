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

    describe("clear", function()
        local my_map = GCOptimizedMap.new({2, 5}, {3, 89})

        my_map:clear()

        it("should have size 0", function()
            assert.is.equal(my_map.size, 0)
        end)

        it("should not have items", function()
            assert.is_nil(my_map:get(2))
            assert.is_nil(my_map:get(3))
        end)
    end)

    describe("delete", function()
        local my_map = GCOptimizedMap.new({4, 2}, {1, 2}, {7, 3})

        my_map:delete(1)

        it("removes the entry", function()
            assert.is_nil(my_map:get(1))
        end)
    end)

    describe("entries", function()
        it("iterates through the entries", function()
            local my_map = GCOptimizedMap.new({1, 4}, {2, 3}, {5, 6})

            local key_sum = 0
            local value_sum = 0
            for k, v in my_map:entries() do
                key_sum = key_sum + k
                value_sum = value_sum + v
            end

            assert.is.equal(8, key_sum)
            assert.is.equal(13, value_sum)
        end)
    end)

    describe("get", function()
        local my_map = GCOptimizedMap.new({1, 4}, {2, 3}, {5, 6})

        it("retrieves the correct value", function()
            assert.is.equal(6, my_map:get(5))
        end)
    end)

    describe("has", function()
        local my_map = GCOptimizedMap.new({1, 4}, {2, 3}, {5, 6})

        describe("the map has the key", function()
            it("returns true", function()
                assert.is_true(my_map:has(2))
            end)
        end)

        describe("the map does not have the key", function()
            it("returns false", function()
                assert.is_false(my_map:has(8))
            end)
        end)
    end)

    describe("set", function()
        local my_map = GCOptimizedMap.new()

        my_map:set(5, 0)
        my_map:set(2, 6)

        it("sets the key value pair", function()
            assert.is.equal(0, my_map:get(5))
            assert.is.equal(6, my_map:get(2))
        end)
    end)

    describe("size", function()
        local my_map = GCOptimizedMap.new({1, 4}, {2, 3}, {5, 6})

        it("returns the amount of entries", function()
            assert.is.equal(3, my_map.size)
        end)
    end)
end)
