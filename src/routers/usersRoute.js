const express = require('express');
const router = express.Router();
const {  registerUser,
        loginUser,
        getMe,
        uploadPicture,
        getImg } = require("../controllers/userController")
const {protect} = require("../middlewares/jwtMiddleware")
const activityRouter = require("./activitiesRoute")
const scheduleRouter = require("./scheduleRoute")



router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/login', protect, getMe)
router.get('/profile',protect, getImg)
router.post('/profile',protect, uploadPicture)
router.use('/me/activities', protect, activityRouter)
router.use('/me/schedule', protect, scheduleRouter)



module.exports = router;



