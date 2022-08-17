const app = require('./api/index');
const mongoose = require('mongoose');
const config = require('./config');


const connect = async () => {
//Connect mongoDB
await mongoose.connect(config.mongoDB, {dbName: "VivApplication"})
.then(()=>console.log("Connected Database"))
.catch((err)=>console.log(err))

//start server
app.listen(process.env.PORT, ()=> {
    console.log(`Server is listen on port: ${config.port}`)
})
};

connect();