const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const authController = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/detail', weatherController.getWeather);

// Wrap multer to capture errors (e.g., file too large or unexpected field)
router.post('/upload', verifyToken, (req, res, next) => {
    upload.single('document')(req, res, (err) => {
        if (err) {
            console.error('Multer error on /upload:', err);
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, isAdmin, weatherController.createWeather);

router.post('/upload-photo', verifyToken, (req, res, next) => {
    upload.single('photo')(req, res, (err) => {
        if (err) {
            console.error('Multer error on /upload-photo:', err);
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, isAdmin, weatherController.uploadPhoto);

module.exports = router;