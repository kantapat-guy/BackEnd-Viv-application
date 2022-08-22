const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema ({
        user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
                },
    title:{ type:String,
            min: 5, max: 200,
            required: true },
    start: { type: Date,
            required: true},
    end: { type: Date,
            required: true},
    allDay: {default: true,
             type: Boolean}
})


const ScheduleModel = mongoose.model('schedule', scheduleSchema);

module.exports = ScheduleModel;