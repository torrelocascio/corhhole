const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const Team = require('./team');

const LeagueSchema = new Schema({
    leagueName      : { type: String, required: true },
    description     : { type: String, required: true },
    // category        : { type: String, enum: TYPES, required: true },
    // _creator        : {ref: 'User', required: true },
     numberOfTeams  : { type: Number},
    //  team               : {type: Schema.team}
});

// Date Formatting
LeagueSchema.virtual('inputFormattedDate').get(function() {
    return moment(this.deadline).format('YYYY-MM-DD');
});

  
  //for authorization
  
  LeagueSchema.methods.belongsTo = function(user){
    return this._creator.equals(user._id);
  }

module.exports = mongoose.model('League', LeagueSchema);