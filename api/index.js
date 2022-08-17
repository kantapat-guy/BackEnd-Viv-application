const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const activityRouter = require('../src/routers/activitiesRoute')
const scheduleRouter = require('../src/routers/scheduleRoute');
const config = require('../config');


const app = express();

//middleware
if (config.isVercel) {
    app.use ( async (req, res, next) => {
    await mongoose.connect(config.mongoDB, {dbName: "VivApplication"})
    return next();
})
}

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
app.use(express.json())

app.use('/activities', activityRouter)
app.use('/schedule', scheduleRouter)

module.exports = app;