import request from 'request';
import fs from 'fs';

const downloadFile = (pathToFile) => {
  const targetFile = fs.createWriteStream(pathToFile);
  await new Promise((resolve, reject) => {
      request({
          uri: 'https://www.wordgamedictionary.com/sowpods/download/sowpods.txt ',
          headers: {
              'Accept': 'text/html',
              'Accept-Encoding': 'gzip, deflate, br',
              'Cache-Control': 'max-age=0',
          },
          gzip: true
      })
      .pipe(targetFile)
      .on('finish', () => {
          console.log(`Download of ${pathToFile} complete`);
          resolve();
      })
      .on('error', (error) => {
          reject(error);
      });
  })
  .catch(error => {
      console.log(`Something happened: ${error}`);
  });

}

export default downloadFile;