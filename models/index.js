const db = require('../config/database');
const WeatherReport = require('./weatherReport');
const WeatherPhoto = require('./weatherPhoto');
const User = require('./user');

WeatherReport.hasMany(WeatherPhoto, { foreignKey: 'reportId' });
WeatherPhoto.belongsTo(WeatherReport, { foreignKey: 'reportId' });

module.exports = { db, WeatherReport, WeatherPhoto, User };