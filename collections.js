// array to set
const arrToSet = (arr) => new Set(arr)

// array to string
const arrToStr = (arr) => arr.join("")

// set to array
const setToArr = (set) => Array.from(set)

// set to string
const setToStr = (set) => Array.from(set).join("")

// string to array
const strToArr = (str) => str.split("")

// string to set
const strToSet = (str) => new Set(str)

// map to object
const mapToObj = (map) => Object.fromEntries(map)

// object to array (values)
const objToArr = (obj) => Object.values(obj)

// object to map
const objToMap = (obj) => new Map(Object.entries(obj))

// array to object (key: index, value: element)
const arrToObj = (arr) => Object.fromEntries(arr.map((v, i) => [i, v]))

// string to object (each char becomes a key with value = char)
const strToObj = (str) => Object.fromEntries(str.split("").map((c, i) => [i, c]))

// superTypeOf: enhanced typeof
const superTypeOf = (val) => {
  if (val === null) return "Null"
  if (Array.isArray(val)) return "Array"
  if (val instanceof Set) return "Set"
  if (val instanceof Map) return "Map"
  if (val instanceof Date) return "Date"
  if (typeof val === "object") return "Object"
  return typeof val
};
