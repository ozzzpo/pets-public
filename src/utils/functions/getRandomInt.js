export function getRand(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  console.log(
    Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  );
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
