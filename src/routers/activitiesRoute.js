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

router.get('/:activityId', showActivity)

router.post('/create', createActivity)

router.patch('/:activityId', editActivity)

router.delete('/:activityId', deleteActivity)

router.get('/summaryMonth', sumMonth)

module.exports = router;