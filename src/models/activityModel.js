const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema ({
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
// ,{
//     statics: {
//       findByType: async function (type) {
//         return this.find({ type });
//       },
//     },
//   }
);

const ActivityModel = mongoose.model('activity', activitySchema);

module.exports = ActivityModel;