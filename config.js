require('dotenv').config();

const config = {
    isVercel: process.env.IS_VERCEL || false,
    port: process.env.PORT,
    mongoDB: process.env.MONGODB
}

module.exports = config;