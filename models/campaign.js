const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./campaign-types');

const CampaignSchema = new Schema({
    title           : { type: String, required: true },
    description     : { type: String, required: true },
    category        : { type: String, enum: TYPES, required: true },
    _creator        : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    goal            : { type: Number, required: true },
    backerCount     : { type: Number, default: 0 },
    totalPledged    : { type: Number, default: 0 },
    deadline        : { type: Date, required: true }
});

CampaignSchema.virtual('timeRemaining').get(function () {
    let remaining = moment(this.deadline).fromNow(true).split(' ');
    let [days, unit] = remaining;
    return { days, unit };
});

module.exports = mongoose.model('Campaign', CampaignSchema);