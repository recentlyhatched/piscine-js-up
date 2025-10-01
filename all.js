async function all(obj) {
  const entries = Object.entries(obj); // [[key, value], ...]
  const results = await Promise.all(
    entries.map(([_, value]) => Promise.resolve(value))
  );
  return Object.fromEntries(entries.map(([key], i) => [key, results[i]]));
}
