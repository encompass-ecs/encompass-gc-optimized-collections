local current_folder = (...):gsub('%.[^%.]+$', '') .. '.'
local exports = {}

local gc_optimized_list = require(current_folder .. "gc_optimized_list")
local GCOptimizedList = gc_optimized_list.GCOptimizedList

local GCOptimizedSortedList = {}

GCOptimizedSortedList.__index = GCOptimizedSortedList
GCOptimizedSortedList.prototype = {}
GCOptimizedSortedList.prototype.__index = GCOptimizedSortedList.prototype
GCOptimizedSortedList.prototype.constructor = GCOptimizedSortedList
GCOptimizedSortedList.____super = GCOptimizedList
setmetatable(GCOptimizedSortedList, GCOptimizedList.____super)
setmetatable(GCOptimizedSortedList.prototype, GCOptimizedSortedList.____super.prototype)

GCOptimizedSortedList.new = function(...)
    local self = setmetatable({}, GCOptimizedSortedList.prototype)
    self:__constructor(...)
    return self
end

local function insert(self, index, value)
    local k = self.size + 1
    while k > index do
        self.items[k] = self.items[k - 1]
        self.indices[self.items[k]] = k
        k = k - 1
    end
    self.items[index] = value
    self.indices[value] = self.size
    self.size = self.size + 1
end

GCOptimizedSortedList.prototype.add = function(self, value)
    for index, v in self:entries() do
        if value < v then
            insert(self, index, value)
            return
        end
    end
    self.items[self.size + 1] = value
    self.indices[value] = self.size + 1
    self.size = self.size + 1
end

GCOptimizedSortedList.Empty = GCOptimizedSortedList.new()

exports.GCOptimizedSortedList = GCOptimizedSortedList
return exports
