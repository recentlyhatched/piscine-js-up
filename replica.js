function replica(target, ...sources) {

  for (const source of sources) {
    if (source === null || typeof source !== "object") continue;

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const srcVal = source[key];
        const tgtVal = target[key];

        if (Array.isArray(srcVal)) {
          // Deep copy arrays
          target[key] = srcVal.map((item) =>
            typeof item === "object" && item !== null ? replica({}, item) : item
          );
        } else if (srcVal instanceof Date) {
          target[key] = new Date(srcVal);
        } else if (srcVal instanceof RegExp) {
          target[key] = new RegExp(srcVal.source, srcVal.flags);
        } else if (srcVal && typeof srcVal === "object") {
          // Deep merge objects
          target[key] = replica(
            tgtVal && typeof tgtVal === "object" ? tgtVal : {},
            srcVal
          );
        } else {
          // Primitives and functions -> overwrite
          target[key] = srcVal;
        }
      }
    }
  }

  return target;
}
