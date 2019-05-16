local exports = {}
local GCOptimizedSet = {}
GCOptimizedSet.__index = GCOptimizedSet
GCOptimizedSet.prototype = {}
GCOptimizedSet.prototype.__index = GCOptimizedSet.prototype
GCOptimizedSet.prototype.constructor = GCOptimizedSet

GCOptimizedSet.new = function(...)
    local self = setmetatable({}, GCOptimizedSet.prototype)
    self:__constructor(...)
    return self
end

GCOptimizedSet.prototype.__constructor = function(self, ...)
    self.items = {}
    self.size = 0

    for _, item in ipairs({...}) do
        self.items[item] = true
        self.size = self.size + 1
    end
end

GCOptimizedSet.prototype.entries = function(self)
    return pairs(self.items)
end

GCOptimizedSet.prototype.add = function(self, item)
    if not self:has(item) then
        self.size = self.size + 1
    end
    self.items[item] = item
    return self
end

GCOptimizedSet.prototype.clear = function(self)
    for k in pairs(self.items) do
        self.items[k] = nil
    end
    self.size = 0
end

GCOptimizedSet.prototype.delete = function(self, item)
    if self:has(item) then
        self.items[item] = nil
        self.size = self.size - 1
    end
end

GCOptimizedSet.prototype.has = function(self, item)
    return self.items[item] ~= nil
end

GCOptimizedSet.Empty = GCOptimizedSet.new();

exports.GCOptimizedSet = GCOptimizedSet
return exports
