export function range(size) { return [...Array(size).keys()]; }

export function randBetween(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

export function getCanonical(s) {
  return s.replace(/\W/g, '').split('').sort().join('');
}

export function flatten(arrayToFlatten) {
  return arrayToFlatten.reduce((a, b) => a.concat(b), []);
}

export function cartesianProduct(arrayOfArrays) {
  const initialValue = [[]];
  const reducer = (a, b) => flatten(a.map(x => b.map(y => x.concat(y))));
  return arrayOfArrays.reduce(reducer, initialValue);
}

export function difference(setA, setB) { return new Set([...setA].filter(x => !setB.has(x))); }
export function symmetricDifference(setA, setB) { return new Set([...[...difference(setA, setB)], ...[...difference(setB, setA)]]); }
