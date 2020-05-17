#!/bin/bash

curl https://www.wordgamedictionary.com/sowpods/download/sowpods.txt -o data/sowpods.txt

node --experimental-modules scripts/getWords.js