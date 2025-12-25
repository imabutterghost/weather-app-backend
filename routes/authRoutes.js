const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Format email salah').normalizeEmail().trim(),
    body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter').trim()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, authController.register);

router.post('/login', [
    body('email').isEmail().withMessage('Format email salah').normalizeEmail().trim(),
    body('password').notEmpty().withMessage('Password wajib diisi').trim()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, authController.login);

module.exports = router;