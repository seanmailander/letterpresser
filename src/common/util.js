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
  const reducer = (a, b) => flatten(a.map((x) => b.map((y) => x.concat(y))));
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

function k_combinations(set, k) {
  let i; let j; let combs; let head; let
    tailcombs;

  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }

  // K-sized set has only one K-sized subset.
  if (k == set.length) {
    return [set];
  }

  // There is N 1-sized subsets in a N-sized set.
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

  // Assert {1 < k < set.length}

  // Algorithm description:
  // To get k-combinations of a set, we want to join each element
  // with all (k-1)-combinations of the other elements. The set of
  // these k-sized sets would be the desired result. However, as we
  // represent sets with lists, we need to take duplicates into
  // account. To avoid producing duplicates and also unnecessary
  // computing, we use the following approach: each element i
  // divides the list into three: the preceding elements, the
  // current element i, and the subsequent elements. For the first
  // element, the list of preceding elements is empty. For element i,
  // we compute the (k-1)-computations of the subsequent elements,
  // join each with the element i, and store the joined to the set of
  // computed k-combinations. We do not need to take the preceding
  // elements into account, because they have already been the i:th
  // element so they are already computed and stored. When the length
  // of the subsequent list drops below (k-1), we cannot find any
  // (k-1)-combs, hence the upper limit for the iteration:
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

export function cartesianProductWithoutDuplicates(arrayOfArrays, canonicalForm) {
  const letterCounts = arrayOfArrays
    .reduce((result, value) => {
      const key = canonicalForm(value);
      if (result[key]) {
        result[key].count++;
      } else {
        result[key] = {
          value,
          count: 1,
        };
      }

      return result;
    }, {});

  const letterCountsArray = [].concat(
    ...Object.keys(letterCounts)
      .map((key) => letterCounts[key])
      .map((letterGroup) => [k_combinations(letterGroup.value, letterGroup.count)]),
  );

  const results = letterCountsArray
    .reduce((result, letterGroup) => result
      .map((existingResults) => letterGroup
        .map((newLetter) => existingResults.concat(newLetter)))
      .reduce((s, t) => s.concat(t)),
    [[]]);

  // TODO: make this faster to resolve correctly-ordered words
  return results.map((move) => {
    const mappedLetters = arrayOfArrays.map((letterPositions) => {
      const firstMatchingLetter = (letter) => _.indexOf(move, letter);
      const matchedLetters = letterPositions.map(firstMatchingLetter).filter((index) => index > -1);
      const removedLetter = move.splice(matchedLetters.shift(), 1);
      return removedLetter;
    });
    return [].concat(...mappedLetters);
  });
}

export function difference(setA, setB) { return new Set([...setA].filter((x) => !setB.has(x))); }
export function symmetricDifference(setA, setB) { return new Set([...[...difference(setA, setB)], ...[...difference(setB, setA)]]); }
