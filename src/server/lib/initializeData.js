import fs from 'fs';
import vm from 'vm';


function loadNativeLibrary(path, context = {}) {
  const data = fs.readFileSync(path);
  vm.runInNewContext(data, context, path);
  return context;
}

const succinctTrie = loadNativeLibrary('./src/server/lib/Bits.sthanov.js', { console });

function convertWordsToTrie(words) {
  console.log('dictionary loading');
  const start = Date.now();

  // create a trie
  const trie = new succinctTrie.Trie();

    // Trie insertion is optimized for alphabetically-sorted words
  words.sort();

  console.log(`dictionary length: ${words.length}`);
    // To save space, our encoding handles only the letters a-z. Ignore
    // words that contain other characters.
  const regex = /^[a-z]+$/;
  words
      .map(word => word.toLowerCase())
      .filter(word => word.match(regex))
      .map(word => trie.insert(word));

  console.log('inserted all words');
    // Encode the trie.
  const trieData = trie.encode();
  console.log('encoded trie');
    // Encode the rank directory
  const directory = succinctTrie.RankDirectory.Create(trieData, (trie.getNodeCount() * 2) + 1, succinctTrie.L1, succinctTrie.L2);
  console.log('created directory');

  const returnValue = { trie: trieData, directory: directory.getData(), nodeCount: trie.getNodeCount() };

  console.log(`Encoded ${words.join('').length} bytes to ${trieData.length} bytes.`);

  const end = Date.now();
  console.log('dictionary loaded: %j', end - start);

  return returnValue;
}

function loadWordsFromRawData(pathToWords) {
  try {
    return fs.readFileSync(pathToWords, 'utf8').split('\n');
  } catch (e) {
    console.error(e);
    return [];
  }
}

function saveTrieToDisk(trie, pathToTrie) {
  try {
    fs.writeFileSync(pathToTrie, JSON.stringify(trie), 'utf8');
  } catch (e) {
    console.error(e);
  }
}

function loadTrieFromDisk(pathToTrie) {
  try {
    return JSON.parse(fs.readFileSync(pathToTrie, 'utf8'));
  } catch (e) {
    console.error(e);
    return null;
  }
}

function initializeTrie(pathToWords, pathToTrie) {
  console.log('Initializing trie');
  // Load words from raw data
  const words = loadWordsFromRawData(pathToWords);
  // Convert words to Trie
  const trie = convertWordsToTrie(words);
  // Save Trie to disk
  saveTrieToDisk(trie, pathToTrie);

  return trie;
}


export default function getTrie() {
  const pathToWords = './data/sowpods.txt';
  const pathToTrie = './data/trie.json';

  let trie = null;

  // Check if Trie already exists
  if (!fs.existsSync(pathToTrie)) {
    trie = initializeTrie(pathToWords, pathToTrie);
  } else {
    trie = loadTrieFromDisk(pathToTrie);
  }

  return new succinctTrie.FrozenTrie(trie.trie, trie.directory, trie.nodeCount);
}
