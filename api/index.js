const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const activityRouter = require('../src/routers/activitiesRoute')
const scheduleRouter = require('../src/routers/scheduleRoute');
const userRouter = require('../src/routers/usersRoute')
const authRouter = require('../src/routers/authRoute')
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
    optionsSuccessStatus: 200,
  }));
app.use(express.json())


app.use('/activities', activityRouter)
app.use('/schedule', scheduleRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)

// localhost:3000/users/me/activites

module.exports = app;