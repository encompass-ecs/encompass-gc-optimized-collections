local exports = {}
local GCOptimizedMap = {}
GCOptimizedMap.__index = GCOptimizedMap
GCOptimizedMap.prototype = {}
GCOptimizedMap.prototype.__index = GCOptimizedMap.prototype
GCOptimizedMap.prototype.constructor = GCOptimizedMap

GCOptimizedMap.new = function(...)
    local self = setmetatable({}, GCOptimizedMap.prototype)
    self:__constructor(...)
    return self
end

GCOptimizedMap.prototype.__constructor = function(self, ...)
    self.items = {}
    self.size = 0

    for _, entry in ipairs({...}) do
        self.items[entry[1]] = entry[2]
        self.size = self.size + 1
    end
end

GCOptimizedMap.prototype.clear = function(self)
    for k in pairs(self.items) do
        self.items[k] = nil
    end
    self.size = 0
end

GCOptimizedMap.prototype.delete = function(self, key)
    if self:has(key) then
        self.items[key] = nil
        self.size = self.size - 1
    end
end

GCOptimizedMap.prototype.entries = function(self)
    return pairs(self.items)
end

GCOptimizedMap.prototype.get = function(self, key)
    return self.items[key]
end

GCOptimizedMap.prototype.has = function(self, key)
    return self.items[key] ~= nil
end

GCOptimizedMap.prototype.set = function(self, key, value)
    if not self:has(key) then
        self.size = self.size + 1
    end
    self.items[key] = value
    return this
end

GCOptimizedMap.prototype.size = function(self)
    return self.size
end

exports.GCOptimizedMap = GCOptimizedMap
return exports
