const express = require('express');
const router = express.Router();
const reportController = require('../../controller/report/reportController');

//creating a new report
router.post('/reports', reportController.createReport);

//getting all reports
router.get('/get', reportController.getReports);

//updating a report by ID
router.put('/update', reportController.updateReport);

//deleting a report by ID
router.delete('/:id/delete', reportController.deleteReport);

module.exports = router;
