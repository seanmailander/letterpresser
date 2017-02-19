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

export function getCanonicalFromMove(move) {
  return move.reduce((result, currIndex) => result + (2 ** currIndex), 0);
}

export function uniqBy(a, key) {
  const seen = {};
  return a.filter((item) => {
    const k = key(item);
    return seen[k] ? false : (seen[k] = true);
  });
}

export function arrayIsUnique(arr) {
  return arr.length === new Set(arr).size;
}

export function difference(setA, setB) { return new Set([...setA].filter(x => !setB.has(x))); }
export function symmetricDifference(setA, setB) { return new Set([...[...difference(setA, setB)], ...[...difference(setB, setA)]]); }
