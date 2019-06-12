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

GCOptimizedList.prototype.__constructor = function(self, ...)
    self.items = {}
    self.indices = {}
    self.size = 0;

    for _, entry in ipairs({...}) do
        self:add(entry)
    end
end

GCOptimizedList.prototype.forEach = function(self, callback)
    for i = 0, self.size - 1 do
        callback(_, self:get(i))
    end
end

GCOptimizedList.prototype.entries = function(self)
    return ipairs(self.items)
end

-- values-only iteration by doing reverse lookup
local function iter(list, v)
    local next_index
    if not v then
        next_index = 1
    else
        next_index = list.indices[v] + 1
    end
    local next_value = list.items[next_index]
    if next_value then
        return next_value, next_value
    end
end

local function ivalues(list)
    return iter, list, nil
end

GCOptimizedList.prototype.values = function(self)
    return ivalues(self)
end

GCOptimizedList.prototype.add = function(self, value)
    self.items[self.size + 1] = value
    self.indices[value] = self.size + 1
    self.size = self.size + 1
    return self
end

GCOptimizedList.prototype.clear = function(self)
    for i = 1, self.size do
        local item = self.items[i]
        self.indices[item] = nil
        self.items[i] = nil
    end
    self.size = 0
end

GCOptimizedList.prototype.delete = function(self, index)
    if self:hasIndex(index) then
        local value = self.items[index + 1]
        self.items[index + 1] = nil
        self.indices[value] = nil
        local k = index
        self.size = self.size - 1
        while k < self.size do
            local one_up_value = self.items[k + 1 + 1]
            if one_up_value ~= nil then
                self.items[k + 1] = one_up_value
                self.indices[one_up_value] = k + 1
            end
            k = k + 1
        end
        self.items[self.size + 1] = nil
        return true
    end
    return false
end

GCOptimizedList.prototype.deleteValue = function(self, value)
    local index = self.indices[value]
    if index ~= nil then
        self:delete(index - 1)
        return true
    end
    return false
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
    return self.size == 0
end

GCOptimizedList.prototype.hasIndex = function(self, index)
    return self.items[index + 1] ~= nil
end

GCOptimizedList.prototype.hasValue = function(self, index)
    return self.indices[index] ~= nil
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
        local item = self.items[self.size - 1 + 1]
        self:delete(self.size - 1)
        return item
    else
        return nil
    end
end

GCOptimizedList.Empty = GCOptimizedList.new()

exports.GCOptimizedList = GCOptimizedList
return exports
