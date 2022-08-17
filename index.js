const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const activityRouter = require('./src/routers/activitiesRoute')
const scheduleRouter = require('./src/routers/scheduleRoute')
const config = require('./config')


const app = express();

mongoose.connect(config.mongoDB, {dbName: "VivApplication"})
.then(()=>console.log("Connected Database"))
.catch((err)=>console.log(err))


//middleware
app.use(cors());
app.use(express.json())


app.use('/activities', activityRouter)
app.use('/schedule', scheduleRouter)

app.listen(process.env.PORT, ()=> {
    console.log(`Server is listen on port: ${config.port}`)
})