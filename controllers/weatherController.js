const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getWeather = async (req, res) => {
    try {
        const { date, hour } = req.query;
        const report = await prisma.weatherReport.findFirst({
            where: { date, hour: parseInt(hour) },
            include: { photos: true }
        });
        if (!report) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createWeather = async (req, res) => {
    console.log("--- DEBUG UPLOAD ---");
    console.log("Header Content-Type:", req.headers['content-type']);
    console.log("Isi req.body:", req.body);
    console.log("Isi req.file:", req.file);

    try {
      const { date, hour, temperature, condition } = req.body;

        const report = await prisma.weatherReport.create({
            data: {
                date,
                hour: parseInt(hour),
                temperature: parseFloat(temperature),
                condition,
                document_url: req.file ? `/uploads/${req.file.filename}` : null
            }
        });
        res.status(201).json(report);
    } catch (err) {
        console.error("Prisma Error:", err);
        res.status(500).json({ error: err.message });
    }
};
exports.uploadPhoto = async (req, res) => {
    try {
        const { reportId } = req.body;
        const photo = await prisma.weatherPhoto.create({
            data: {
                reportId: parseInt(reportId),
                photo_url: req.file ? `/uploads/${req.file.filename}` : ""
            }
        });
        res.status(201).json(photo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};