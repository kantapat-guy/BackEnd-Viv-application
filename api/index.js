const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const activityRouter = require('../src/routers/activitiesRoute')
const scheduleRouter = require('../src/routers/scheduleRoute');
const config = require('../config');
const morgan = require("morgan");


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
    optionsSuccessStatus: 200,
  }));
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/users', require('../src/routers/usersRoute'));

app.use('/activities', activityRouter)
app.use('/schedule', scheduleRouter)


module.exports = app;