import util from 'util';
import fs from 'fs';
import fetch from 'node-fetch';
import stream from 'stream';

import { getFlatWordList } from './initializeData.js';

const streamPipeline = util.promisify(stream.pipeline);

const url = 'https://www.wordgamedictionary.com/sowpods/download/sowpods.txt';
const pathToFile = './data/sowpods.txt';

async function download(pathToFile) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  await streamPipeline(response.body, fs.createWriteStream(pathToFile));

  getFlatWordList();
}

download(pathToFile);
