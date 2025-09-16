const is = {
  num: (val) => typeof val === "number" && !Number.isNaN(val),
  nan: (val) => typeof val === "number" && Number.isNaN(val),
  str: (val) => typeof val === "string",
  bool: (val) => typeof val === "boolean",
  undef: (val) => val === undefined,
  def: (val) => val !== undefined,
  arr: (val) => Array.isArray(val),
  obj: (val) =>
    val !== null && typeof val === "object" && !Array.isArray(val),
  fun: (val) => typeof val === "function",
  truthy: (val) => !!val,
  falsy: (val) => !val,
}
