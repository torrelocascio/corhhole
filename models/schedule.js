const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const leagueName = require('./league')

const ScheduleSchema = new Schema({
    leagueName      : {type: String, required: true },
    

});

const Team  = mongoose.model('Team', teamSchema);
module.exports = Team