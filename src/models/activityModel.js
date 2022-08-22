const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ActType:{ type:String,
            required: true },
    hour: { type: Number,
        required: true },
    minute: { type: Number,
        required: true },
    date: { type: Date,
            required: true},
    description: { type: String },
}
,{versionKey: false}
);

const ActivityModel = mongoose.model('activity', activitySchema);

module.exports = ActivityModel;