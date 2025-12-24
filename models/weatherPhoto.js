const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WeatherPhoto = sequelize.define('WeatherPhoto', {
    photo_url: { type: DataTypes.STRING, allowNull: false }
});

module.exports = WeatherPhoto;