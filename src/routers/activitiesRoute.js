const express = require('express');
const {showAllActivities,
       showActivity,
       createActivity,
       editActivity,
       deleteActivity,
       sumMonth
    } = require('../controllers/activitiesController');

const router = express.Router();

router.get('/', showAllActivities)

router.get('/show/:activityId', showActivity)

router.post('/create', createActivity)

router.patch('/:activityId', editActivity)

router.delete('/:activityId', deleteActivity)

router.get('/summaryMonth', sumMonth) //for pie chart

module.exports = router;