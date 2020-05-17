
const  { getRandomGameBoard } = require('../src/server/services/letterpresser.js');

module.exports = (req, res) => {
  res.json(getRandomGameBoard());
};