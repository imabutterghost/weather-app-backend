const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User berhasil dibuat", user: { id: user.id, username: user.username } });
    } catch (err) {
        res.status(400).json({ error: "Username sudah digunakan" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role });
    } else {
        res.status(401).json({ message: "Username atau password salah" });
    }
};