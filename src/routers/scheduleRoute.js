const express = require('express');
const router = express.Router();
const {showSchedule, createSchedule, deleteSchedule} = require('../controllers/scheduleController')

router.get('/', showSchedule)
router.post('/create', createSchedule)
router.delete('/:scheduleId', deleteSchedule)

module.exports = router;