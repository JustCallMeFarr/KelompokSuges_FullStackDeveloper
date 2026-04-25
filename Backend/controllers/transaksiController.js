const Transaksi = require("../models/transaksiModel");

exports.getAll = (req, res) => {
    Transaksi.getAll((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.create = (req, res) => {
    Transaksi.create(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Transaksi berhasil", result });
    });
};