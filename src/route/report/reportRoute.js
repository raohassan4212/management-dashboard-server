const express = require('express');
const router = express.Router();
const reportController = require('../../controller/report/reportController');

//creating a new report
router.post('/reports', reportController.createReport);

//getting all reports
router.get('/reports', reportController.getAllReports);

//getting a specific report by ID
router.get('/reports/:reportId', reportController.getReportById);

//updating a report by ID
router.put('/reports/:reportId', reportController.updateReport);

//deleting a report by ID
router.delete('/reports/:reportId', reportController.deleteReport);

module.exports = router;
