const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team');

const GameSchema = new Schema({
   pairs:[]
});

const Game  = mongoose.model('Game', GameSchema);
module.exports = Game;