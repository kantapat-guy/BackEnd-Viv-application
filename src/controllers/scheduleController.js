const ScheduleModel = require('../models/scheduleModel')

const showSchedule = async (req,res) => {
    const schedule = await ScheduleModel.find();
    res.send(schedule.map((data)=> data.toJSON()))
}

const createSchedule = async (req,res) => {
    const schedule = new ScheduleModel(req.body);
    const validateResult = schedule.validateSync();
    if (validateResult) {
        return res.status(400).send('Bad request')
    }
    await schedule.save();
    res.send(schedule.toJSON())
}

const deleteSchedule = async (req,res)=>{
    console.log(req.params)
    const schedule = await ScheduleModel.findByIdAndDelete(req.params.scheduleId);
    if (!schedule) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.status(204).send("Delete an activity");
}

module.exports = {
    showSchedule,
    createSchedule,
    deleteSchedule
}