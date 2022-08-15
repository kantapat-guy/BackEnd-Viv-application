require('dotenv').config();

const config = {
    port: process.env.PORT,
    mongoDB: process.env.MONGODB
}

module.exports = config;