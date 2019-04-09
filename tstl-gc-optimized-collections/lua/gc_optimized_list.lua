local exports = {}
local GCOptimizedList = {}
GCOptimizedList.__index = GCOptimizedList
GCOptimizedList.prototype = {}
GCOptimizedList.prototype.__index = GCOptimizedList.prototype
GCOptimizedList.prototype.constructor = GCOptimizedList

GCOptimizedList.new = function(...)
    local self = setmetatable({}, GCOptimizedList.prototype)
    self:__constructor(...)
    return self
end

GCOptimizedList.prototype.__constructor = function(self)
    self.items = {}
    self.indices = {}
    self._size = 0;
end

GCOptimizedList.prototype.iterable = function(self)
    return ipairs(self.items)
end

GCOptimizedList.prototype.add = function(self, value)
    self.items[self._size + 1] = value
    self.indices[value] = self._size + 1
    self._size = self._size + 1
    return self
end

GCOptimizedList.prototype.clear = function(self)
    for k in ipairs(self.items) do
        self.items[k] = nil
    end
    for k in ipairs(self.indices) do
        self.indices[k] = nil
    end
    self._size = 0
end

GCOptimizedList.prototype.delete = function(self, index)
    if self:has(index) then
        local value = self.items[index + 1]
        self.items[index + 1] = nil
        self.indices[value] = nil
        local k = index
        self._size = self._size - 1
        while k < self:size() do
            local one_up_value = self.items[k + 1 + 1]
            if one_up_value ~= nil then
                self.items[k + 1] = one_up_value
                self.indices[one_up_value] = k + 1
            end
            k = k + 1
        end
        self.items[self:size() + 1] = nil
    end
    return self
end

GCOptimizedList.prototype.indexOf = function(self, value)
    if self.indices[value] ~= nil then
        return self.indices[value] - 1
    else
        return nil
    end
end

GCOptimizedList.prototype.get = function(self, index)
    return self.items[index + 1]
end

GCOptimizedList.prototype.empty = function(self)
    return self._size == 0
end

GCOptimizedList.prototype.has = function(self, index)
    return self.items[index + 1] ~= nil
end

GCOptimizedList.prototype.shift = function(self)
    if not self:empty() then
        local item = self.items[0 + 1]
        self:delete(0)
        return item
    else
        return nil
    end
end

GCOptimizedList.prototype.pop = function(self)
    if not self:empty() then
        local item = self.items[self:size() - 1 + 1]
        self:delete(self:size() - 1)
        return item
    else
        return nil
    end
end

GCOptimizedList.prototype.size = function(self)
    return self._size
end

exports.GCOptimizedList = GCOptimizedList
return exports
