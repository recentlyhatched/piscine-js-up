// array Set
const arrToSet = (arr) => new Set(arr)

// array String
const arrToStr = (arr) => arr.join(",")

// set Array
const setToArr = (set) => Array.from(set)

// set String
const setToStr = (set) => Array.from(set).join(",")

// string array
const strToArr = (str) => str.split("")

// string Set
const strToSet = (str) => new Set(str)

// map Object
const mapToObj = (map) => Object.fromEntries(map)

// object Array (values)
const objToArr = (obj) => Object.values(obj)

// object Map
const objToMap = (obj) => new Map(Object.entries(obj))

// array Object (key: index, value: element)
const arrToObj = (arr) => Object.fromEntries(arr.map((v, i) => [i, v]))

// string Object (each char becomes a key with value = char)
const strToObj = (str) => Object.fromEntries(str.split("").map((c, i) => [i, c]))

// superTypeOf: enhanced typeof
const superTypeOf = (val) => {
  if (val === null) return "null"
  if (Array.isArray(val)) return "array"
  if (val instanceof Set) return "set"
  if (val instanceof Map) return "map"
  if (val instanceof Date) return "date"
  return typeof val
};
