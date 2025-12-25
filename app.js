const express = require('express');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log("Content-Type:", req.headers['content-type']);
    next();
});

app.use(helmet());
app.use(express.json());
// parse x-www-form-urlencoded bodies (useful if Postman is sending form data without files)
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// mount auth routes so register/login validators run
app.use('/api', authRoutes);
app.use('/api', weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});