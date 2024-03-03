export function removeDuplicateObjects(array) {
  const uniqueObjects = {};
  array.forEach((obj) => {
    uniqueObjects[obj.id] = obj;
  });
  return Object.values(uniqueObjects);
}
