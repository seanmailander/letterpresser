let dict;

exports.buildTrie = function (txt) {
  return (dict = eval(`(${txt})`));
};

exports.buildBinaryDict = function (txt) {
  return (dict = txt.split(','));
};

exports.buildStringDict = function (txt) {
  return (dict = ` ${txt} `);
};

exports.buildHashDict = function (txt) {
  let words = txt.split(' '),
    tmp = {};

  for (let i = 0, l = words.length; i < l; i++) {
    tmp[words[i]] = true;
  }

  return (dict = tmp);
};

exports.isTriePrefix = function isTriePrefix(word, cur) {
  cur = cur || dict;

  for (const node in cur) {
    if (word.indexOf(node) === 0) {
      const val = typeof cur[node] === 'number' && cur[node] ?
                                dict.$[cur[node]] :
                                cur[node];

      if (node.length === word.length) {
        return true;// always return true, only checking prefix //val === 0 || val.$ === 0;
      } else if (val === 0) {
        return false; // if val is 0, need to bail otherwise we will reset to dict via assignment in first line
      }
      return isTriePrefix(word.slice(node.length), val);
    }
  }
  return false;
};

exports.isTrieWord = function isTrieWord(word, cur) {
  cur = cur || dict;

  for (const node in cur) {
    if (word.indexOf(node) === 0) {
      const val = typeof cur[node] === 'number' && cur[node] ?
                                dict.$[cur[node]] :
                                cur[node];

      if (node.length === word.length) {
        return val === 0 || val.$ === 0;
      }
      return isTrieWord(word.slice(node.length), val);
    }
  }

  return false;
};

exports.findTrieWord = function findTrieWord(word, cur) {
  cur = cur || dict;

  for (const node in cur) {
    if (word.indexOf(node) === 0) {
      const val = typeof cur[node] === 'number' && cur[node] ?
				dict.$[cur[node]] :
				cur[node];

      if (node.length === word.length) {
        return val === 0 || val.$ === 0;
      }
      return findTrieWord(word.slice(node.length), val);
    }
  }

  return false;
};

exports.findBinaryWord = function (word) {
  const l = word.length;

  if (!dict[l]) {
    return false;
  }

  let words = dict[l].length / l,
    low = 0,
    high = words - 1,
    mid = Math.floor(words / 2);

  while (high >= low) {
    const found = dict[l].substr(l * mid, l);

    if (word === found) {
      return true;
    }

    if (word < found) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }

    mid = Math.floor((low + high) / 2);
  }

  return false;
};

exports.findSuccinctWord = function (word) {
  return dict.lookup(word);
};

exports.findStringWord = function (word) {
  return dict.indexOf(` ${word} `) > -1;
};

exports.findHashWord = function (word) {
  return !!dict[word];
};

exports.dictionary = dict;
