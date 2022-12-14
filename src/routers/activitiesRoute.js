const express = require('express');
const {showAllActivities,
       showActivity,
       createActivity,
       editActivity,
       deleteActivity,
       sumMonth,
       sumWeek,
       showAscActivities
    } = require('../controllers/activitiesController');

const router = express.Router();

router.get('/', showAllActivities)

router.get('/asc', showAscActivities)

router.get('/show/:activityId', showActivity)

router.post('/create', createActivity)

router.patch('/:activityId', editActivity)

router.delete('/:activityId', deleteActivity)

router.get('/summaryMonth', sumMonth) //for pie chart

router.get('/summaryWeek', sumWeek) //for pie chart

module.exports = router;