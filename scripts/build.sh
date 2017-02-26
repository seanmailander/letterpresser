#!/bin/bash

curl https://www.wordgamedictionary.com/sowpods/download/sowpods.txt -o data/sowpods.txt

./node_modules/.bin/babel-node -e 'require("./src/server/lib/initializeData.js").getFlatWordList();';