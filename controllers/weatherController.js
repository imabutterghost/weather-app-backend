const { WeatherPhoto } = require('../models');
const { WeatherReport } = require('../models');

exports.createWeather = async (req, res) => {
    try {
        const { date, hour, temperature, condition } = req.body;

        // Sekarang WeatherReport sudah terdefinisi
        const report = await WeatherReport.create({
            date,
            hour,
            temperature,
            condition,
            document_url: req.file ? `/uploads/${req.file.filename}` : null
        });

        res.status(201).json({ status: "success", data: report });
    } catch (err) {
        console.error("ERROR NYATA:", err);
        res.status(400).json({
            error: "Gagal menyimpan",
            message: err.message
        });
    }
};
exports.getWeather = async (req, res) => {
    try {
        const { date, hour } = req.query;
        const now = new Date();
        const requestDate = new Date(date);

        // Tentukan apakah ini masa depan
        const isFuture = requestDate > now;

        const data = await WeatherReport.findOne({
            where: { date, hour },
            // Sertakan model WeatherPhoto (Join Table)
            include: isFuture ? [] : [{ model: WeatherPhoto }]
        });

        if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

        res.json({
            status: "success",
            isFuture: isFuture,
            data: data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.uploadPhoto = async (req, res) => {
    try {
        const { reportId } = req.body;
        const newPhoto = await WeatherPhoto.create({
            reportId: reportId,
            photo_url: req.file ? `/uploads/${req.file.filename}` : null
        });
        res.status(201).json({ status: "success", data: newPhoto });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};