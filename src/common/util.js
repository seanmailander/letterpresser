import _ from 'lodash';

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

function upFrontOptimizedCartesianProductWithoutDuplicates(arrayOfArrays, canonicalForm) {
  const initialValue = [[]];

  let isInefficient = false;

  const memoizedCanonicalForm = _.memoize(canonicalForm);
  const memoizedHaystackFind = _.memoize(hayStack => _.memoize(needle => hayStack.some(hay => hay === needle)));


  const result = arrayOfArrays.reduce((accumulatorA, nextGroupA) => {
    if (isInefficient || accumulatorA.length > 50) {
      isInefficient = true;
      // bail out, this is not performant
      return null;
    }
    const smudged = accumulatorA.map((elementInAccumulatorA) => {
      const haveSeen = needle => elementInAccumulatorA.some(hay => hay === needle);

      const joined = nextGroupA
        .filter(y => !haveSeen(y))
        .map(y => elementInAccumulatorA.concat(haveSeen(y) ? [] : y));
      return joined;
    });
    const reducedSmudge = smudged.reduce((s, t) => {
      const canonicalHaystack = s.map(memoizedCanonicalForm).sort();

      const haveSeen = (elementToFind) => {
        const canonicalElement = memoizedCanonicalForm(elementToFind);
        const hasSeen = memoizedHaystackFind(canonicalHaystack)(canonicalElement);
        // const hasSeen = haystackFind(canonicalHaystack)(canonicalElement);
        return hasSeen;
      };
      const flattened = s.concat(t.filter(u => !haveSeen(u)));
      return flattened;
    }, []);
    return reducedSmudge;
  }, initialValue);

  return { isInefficient, result };
}

export function cartesianProductWithoutDuplicates(arrayOfArrays, canonicalForm) {
  const start = new Date();
  const { isInefficient, result: resultOfUpfrontOptimized } = upFrontOptimizedCartesianProductWithoutDuplicates(arrayOfArrays, canonicalForm);

  if (isInefficient) {
    const timeTaken1 = new Date() - start;
    if (timeTaken1 > 20) {
      console.log(`Took ${timeTaken1}ms to find determine upfront is inefficient`);
    }

    const cp = cartesianProduct(arrayOfArrays, canonicalForm);

    const timeTaken = new Date() - start;
    if (timeTaken > 50) {
      console.log(`Took ${timeTaken}ms to find cartesian product without optimizatings`);
    }
    return cp;
  }

  const timeTaken = new Date() - start;
  if (timeTaken > 50) {
    console.log(`Took ${timeTaken}ms to find cartesian product with optimizatings`);
  }

  return resultOfUpfrontOptimized;
}

export function difference(setA, setB) { return new Set([...setA].filter(x => !setB.has(x))); }
export function symmetricDifference(setA, setB) { return new Set([...[...difference(setA, setB)], ...[...difference(setB, setA)]]); }
