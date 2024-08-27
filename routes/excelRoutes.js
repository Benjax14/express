const express = require('express');
const excelController = require('../controllers/excelController');
const router = express.Router();
const fileUploadService = require('../services/fileUploadService');

router.post('/upload-excel', fileUploadService.uploadSingleFile , excelController.excelRead);

module.exports = router;