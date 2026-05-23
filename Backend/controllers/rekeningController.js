const Rekening = require("../models/rekeningModel");

exports.getAll = (req, res) => {
    Rekening.getAll((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.create = (req, res) => {
    Rekening.create(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Data rekening ditambahkan", result });
    });
};