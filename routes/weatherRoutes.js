const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const authController = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/detail', weatherController.getWeather);

router.post('/upload', verifyToken, isAdmin, upload.single('document'), weatherController.createWeather);

router.post('/upload-photo', verifyToken, isAdmin, upload.single('photo'), weatherController.uploadPhoto);

module.exports = router;