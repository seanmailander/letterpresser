import fs from 'fs';
import vm from 'vm';

import { convertWordsToFlatWordList } from './BigFlatWordList';

function loadNativeLibrary(path, context = {}) {
  const data = fs.readFileSync(path);
  vm.runInNewContext(data, context, path);
  return context;
}

const succinctTrie = loadNativeLibrary('./src/server/lib/Bits.sthanov.js', { console });


function loadWordsFromRawData(pathToWords) {
  try {
    return fs.readFileSync(pathToWords, 'utf8').split('\n');
  } catch (e) {
    console.error(e);
    return [];
  }
}

function saveJSONToDisk(jsonObject, pathToJSON) {
  try {
    fs.writeFileSync(pathToJSON, JSON.stringify(jsonObject), 'utf8');
  } catch (e) {
    console.error(e);
  }
}

function loadJSONFromDisk(pathToJSON) {
  try {
    return JSON.parse(fs.readFileSync(pathToJSON, 'utf8'));
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
  const trie = succinctTrie.convertWordsToTrie(words);
  // Save Trie to disk
  saveJSONToDisk(trie, pathToTrie);

  return trie;
}

function initializeFlatWords(pathToWords, pathToFlatWords) {
  console.log('Initializing flat words');
  // Load words from raw data
  const words = loadWordsFromRawData(pathToWords);
  // Convert words to Trie
  const flatWordList = convertWordsToFlatWordList(words);
  // Save Trie to disk
  saveJSONToDisk(flatWordList, pathToFlatWords);

  return flatWordList;
}


export function getTrie() {
  const pathToWords = './data/sowpods.txt';
  const pathToTrie = './data/trie.json';

  let trie = null;

  // Check if Trie already exists
  if (!fs.existsSync(pathToTrie)) {
    trie = initializeTrie(pathToWords, pathToTrie);
  } else {
    trie = loadJSONFromDisk(pathToTrie);
  }

  return new succinctTrie.FrozenTrie(trie.trie, trie.directory, trie.nodeCount);
}


export function getFlatWordList() {
  const pathToWords = './data/sowpods.txt';
  const pathToFlatWords = './data/flatWords.json';

  let flatWords = null;

  // Check if Trie already exists
  if (!fs.existsSync(pathToFlatWords)) {
    flatWords = initializeFlatWords(pathToWords, pathToFlatWords);
  } else {
    flatWords = loadJSONFromDisk(pathToFlatWords);
  }

  return flatWords;
}

//curl https://www.wordgamedictionary.com/sowpods/download/sowpods.txt -o data/sowpods.txt
//curl https://raw.githubusercontent.com/quackle/quackle/master/data/raw_lexica/twl98.raw -o ./data/twl98.txt
//curl https://raw.githubusercontent.com/quackle/quackle/master/data/raw_lexica/ods5.raw -o ./data/ods5.txt
// curl http://www.hanovsolutions.com/trie/ospd3.txt -o ./data/ospd3.txt
// curl https://www.wordgamedictionary.com/twl06/download/twl06.txt -o twl06.txt