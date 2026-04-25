const db = require("../config/db");

const Rekening = {
    getAll: (callback) => {
        db.query("SELECT * FROM rekening", callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO rekening SET ?", data, callback);
    }
};

module.exports = Rekening;