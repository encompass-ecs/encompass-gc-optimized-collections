local exports = {};
do
    local __TSTL_gc_optimized_map = require("tstl-gc-optimized-collections.lua.gc_optimized_map");
    local GCOptimizedMap = __TSTL_gc_optimized_map.GCOptimizedMap;
    exports.GCOptimizedMap = GCOptimizedMap;
end
do
    local __TSTL_gc_optimized_set = require("tstl-gc-optimized-collections.lua.gc_optimized_set");
    local GCOptimizedSet = __TSTL_gc_optimized_set.GCOptimizedSet;
    exports.GCOptimizedSet = GCOptimizedSet;
end
do
    local __TSTL_gc_optimized_list = require("tstl-gc-optimized-collections.lua.gc_optimized_list");
    local GCOptimizedList = __TSTL_gc_optimized_list.GCOptimizedList;
    exports.GCOptimizedList = GCOptimizedList;
end
do
    local __TSTL_gc_optimized_sorted_list = require("tstl-gc-optimized-collections.lua.gc_optimized_sorted_list");
    local GCOptimizedSortedList = __TSTL_gc_optimized_sorted_list.GCOptimizedSortedList;
    exports.GCOptimizedSortedList = GCOptimizedSortedList;
end
return exports;
