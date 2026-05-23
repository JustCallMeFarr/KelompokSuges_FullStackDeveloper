const db = require("../config/db");

const Transaksi = {
    getAll: (callback) => {
        db.query("SELECT * FROM transaksi", callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO transaksi SET ?", data, callback);
    }
};

module.exports = Transaksi;