const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Team = require('./team');

const LeagueSchema = new Schema({
    leagueName      : { type: String, required: [true, 'League Name is Required'] },
    _creator        : { type: Schema.Types.ObjectId, ref: 'User'},
    teams           : [Team.schema],
    schedule        : [Game.schema]
    // category        : { type: String, enum: TYPES, required: true },
    // _creator        : {ref: 'User', required: true },
    //  tean   mm               : {type: Schema.team}
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