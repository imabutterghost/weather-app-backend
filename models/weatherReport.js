const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WeatherReport = sequelize.define('WeatherReport', {
    date: { type: DataTypes.DATEONLY, allowNull: false },
    hour: { type: DataTypes.INTEGER, allowNull: false },
    temperature: { type: DataTypes.FLOAT },
    condition: { type: DataTypes.STRING },
    document_url: { type: DataTypes.STRING }
});

module.exports = WeatherReport;