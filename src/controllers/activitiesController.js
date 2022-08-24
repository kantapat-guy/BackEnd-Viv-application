const ActivityModel = require('../models/activityModel')
const mongoose = require('mongoose');

const showAllActivities = async (req,res) => {
    const activities = await ActivityModel.find({user: req.user.id}).sort({date: -1});
    if (!activities) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(activities)
}

const showAscActivities = async (req,res) => {
    const activities = await ActivityModel.find({user: req.user.id}).sort({date: 1});
    if (!activities) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(activities)
}

const showActivity = async (req,res)=>{
    const activity = await ActivityModel.findById(req.params.activityId);
    //req.user.id === activity owner ? 401 ?
    if (!activity) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(activity)
}

const createActivity = async (req,res)=>{

    const activity = await ActivityModel.create({
        user: req.user.id,
        ActType: req.body.ActType,
        hour: req.body.hour,
        minute: req.body.minute,
        date: req.body.date,
        description: req.body.description,
    });

    if (!activity) {
        return res.status(400).send('Bad request')
    }
    await activity.save();
    res.send(activity)
}

const editActivity = async (req,res)=>{
    const user = await ActivityModel.findById(req.user.id)

    const activity = await ActivityModel.findByIdAndUpdate(req.params.activityId, req.body, {
        new: true,
      })

    // if (!user) {
    //     res.status(401).send('User not found, the resource does not exist')
    // }

    if (!activity) {
        res.status(400).send('Activity not found, the resource does not exist')
    }
    res.status(200).json(editActivity);
}

const deleteActivity = async (req,res)=>{
    const activity = await ActivityModel.findByIdAndDelete(req.params.activityId);
    if (!activity) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.status(204).send("Delete an activity");
}

//For Pie Chart using Aggregation
const sumMonth = async (req, res) => {

    const user = req.user.id

    const data = await ActivityModel.aggregate( 
        
        [
            { $match: {user: new mongoose.Types.ObjectId(user) }},
            { $group:
                { 
                _id: {user: "$user", month: { $month: "$date" }, type: "$ActType"},
                total_hour: { $sum: "$hour" },
                total_minute: { $sum: "$minute" },

            }},
            { $project: 
                {_id: 1,
                user:1,
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

const sumWeek = async (req, res) => {

    const user = req.user.id

    const act = await ActivityModel.aggregate([
      { $match: {user: new mongoose.Types.ObjectId(user) }},
      { $group:
          {
          _id: {user: "$user",week: {$floor: {$divide: [{$dayOfMonth: "$date"}, 7]}}, type: "$ActType"},
          total_hour: { $sum: "$hour" },
          total_minute: { $sum: "$minute" },
 
      }},
      { $project:
          {_id: 1,
            user:1,
          total_hour:1,
          total_minute: 1,
          total: { $sum: ["$total_minute",{ $multiply: [ "$total_hour", 60 ] }]}}}
  ]);
    if (!act) {
      res.status(404).send("Not found, the resource does not exist");
    }
    res.send(act);
  };


module.exports = {
    showAllActivities,
    showActivity,
    createActivity,
    editActivity,
    deleteActivity,
    sumMonth,
    sumWeek,
    showAscActivities
}