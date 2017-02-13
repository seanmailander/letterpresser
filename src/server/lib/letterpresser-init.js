var fs = require('fs');
var trie = require('./trie.js');

function initializeDictionary() {
  //
  var start = Date.now();
  var data = fs.readFileSync( './data/custom.js', "utf8");
  exports.dictionary = trie.buildTrie(data);
    // Process dictionary (static method, do it once and save data structure to disk)
    var end = Date.now();
  console.log('dictionary loaded: %j', end-start);
}

exports.init = initializeDictionary;

