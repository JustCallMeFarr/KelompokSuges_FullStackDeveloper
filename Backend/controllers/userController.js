const db = require('../config/db');

exports.getBalance = async (req, res) => {
    const { id } = req.params;

    try {
        const [user] = await db.promise().query(
            "SELECT balance, card_number, card_holder FROM users WHERE id_user = ?",
            [id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.json(user[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};