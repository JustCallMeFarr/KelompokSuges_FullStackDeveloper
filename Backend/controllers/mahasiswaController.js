const db = require("../config/db");

const Mahasiswa = {
    getAll: (cb) => {
        db.query("SELECT * FROM mahasiswa", cb);
    },

    getById: (nim, cb) => {
        db.query("SELECT * FROM mahasiswa WHERE nim=?", [nim], cb);
    },

    create: (data, cb) => {
        db.query("INSERT INTO mahasiswa SET ?", data, cb);
    },

    update: (nim, data, cb) => {
        db.query("UPDATE mahasiswa SET ? WHERE nim=?", [data, nim], cb);
    },

    delete: (nim, cb) => {
        db.query("DELETE FROM mahasiswa WHERE nim=?", [nim], cb);
    }
};

module.exports = Mahasiswa;