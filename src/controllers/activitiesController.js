const ActivityModel = require('../models/activityModel')

const showAllActivities = async (req,res) => {
    const activities = await ActivityModel.find();
    if (!activities) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(activities)
}

const showActivity = async (req,res)=>{
    const activity = await ActivityModel.findById(req.params.activityId);
    if (!activity) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(activity)
}

const createActivity = async (req,res)=>{
    const activity = new ActivityModel(req.body);
    const validateResult = activity.validateSync();
    if (validateResult) {
        return res.status(400).send('Bad request')
    }
    await activity.save();
    res.send(activity)
}

const editActivity = async (req,res)=>{
    console.log(`Edit an id: ${req.params}`)
    console.log(req.body)
    const activity = await ActivityModel.findByIdAndUpdate(req.params.activityId, req.body);
    if (!activity) {
        res.status(404).send('Not found, the resource does not exist')
    }
    await activity.save();
    res.send(req.body)
}

const deleteActivity = async (req,res)=>{
    console.log(`Delete an id: ${req.params}`)
    const activity = await ActivityModel.findByIdAndDelete(req.params.activityId);
    if (!activity) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.status(204).send("Delete an activity");
}

//For Pie Chart using Aggregation
const sumMonth = async (req, res) => {
    const data = await ActivityModel.aggregate( 
        [
            { $group:
                { 
                _id: {month: { $month: "$date" }, type: "$ActType"},
                total_hour: { $sum: "$hour" },
                total_minute: { $sum: "$minute" },

            }},
            { $project: 
                {_id: 1,
                total_hour:1,
                total_minute: 1,
                total: { $sum: ["$total_minute",{ $multiply: [ "$total_hour", 60 ] }]}}}
        ]
    )
    if (!data) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(data)
}

module.exports = {
    showAllActivities,
    showActivity,
    createActivity,
    editActivity,
    deleteActivity,
    sumMonth
}