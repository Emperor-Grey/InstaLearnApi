const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post('/upload', upload.single('pdf'), pdfController.uploadPDF);
router.get('/pdfs', pdfController.getAllPDFs);

module.exports = router;
