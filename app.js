const express = require('express');
const helmet = require('helmet');
const { db } = require('./models'); // Ini akan otomatis mencari models/index.js
const path = require('path');
require('dotenv').config();

const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

// Security Middleware (Week 8)
app.use(helmet());
app.use(express.json());

// Static Folder untuk akses foto (Week 9)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes (Week 3)
app.use('/api/weather', weatherRoutes);

// Database Sync & Server Start (Week 5)
const PORT = process.env.PORT || 3000;
db.sync({ alter: true }).then(() => {
    console.log('Database Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});