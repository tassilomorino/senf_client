export function pick(keys, obj) {
  const newObj = {};
  const numOfKeys = keys.length;
  for (let i = 0; i < numOfKeys; i++) {
    if (keys[i] in obj) {
      newObj[keys[i]] = obj[keys[i]];
    }
  }
  return newObj;
}
