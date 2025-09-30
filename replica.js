function replica(target, ...sources) {
  if (target === null || typeof target !== "object") {
    throw new TypeError("Target must be an object");
  }

  for (const source of sources) {
    if (source === null || typeof source !== "object") continue;

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const srcVal = source[key];
        const tgtVal = target[key];

        if (Array.isArray(srcVal)) {
          // Always deep copy arrays from source
          target[key] = srcVal.map((item) =>
            typeof item === "object" && item !== null ? replica({}, item) : item
          );
        } else if (srcVal instanceof Date) {
          target[key] = new Date(srcVal);
        } else if (srcVal instanceof RegExp) {
          target[key] = new RegExp(srcVal.source, srcVal.flags);
        } else if (srcVal && typeof srcVal === "object") {
          if (tgtVal && typeof tgtVal === "object" && !Array.isArray(tgtVal)) {
            // Deep merge objects only if both are objects
            target[key] = replica(tgtVal, srcVal);
          } else {
            // Replace in case of type mismatch
            target[key] = replica({}, srcVal);
          }
        } else {
          // Primitives or functions -> overwrite
          target[key] = srcVal;
        }
      }
    }
  }

  return target;
}
