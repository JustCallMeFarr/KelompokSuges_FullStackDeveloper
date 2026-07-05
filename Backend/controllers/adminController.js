const db = require("../config/db");

exports.getMahasiswa = (req, res) => {
    db.query(
        "SELECT * FROM mahasiswa",
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};

exports.createMahasiswa = (req, res) => {
    const { nim, nama, jurusan, angkatan } = req.body;

    db.query(
        "INSERT INTO mahasiswa (nim,nama,jurusan,angkatan) VALUES (?,?,?,?)",
        [nim, nama, jurusan, angkatan],
        (err, result) => {
            if (err) return res.status(500).json(err);

            res.json({
                success: true,
                message: "Mahasiswa berhasil ditambahkan"
            });
        }
    );
};

exports.updateMahasiswa = (req, res) => {

    const { nim } = req.params;
    const { nama, jurusan, angkatan } = req.body;

    db.query(
        `UPDATE mahasiswa
         SET nama = ?, jurusan = ?, angkatan = ?
         WHERE nim = ?`,
        [nama, jurusan, angkatan, nim],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Mahasiswa berhasil diupdate"
            });

        }
    );

};

exports.deleteMahasiswa = (req, res) => {

    const { nim } = req.params;

    db.query(
        "DELETE FROM mahasiswa WHERE nim = ?",
        [nim],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Mahasiswa berhasil dihapus"
            });

        }
    );

};
exports.dashboard = (req, res) => {

    const dashboard = {};

    db.query(
        "SELECT COUNT(*) AS total_mahasiswa FROM mahasiswa",
        (err, mahasiswa) => {

            if (err) return res.status(500).json(err);

            dashboard.total_mahasiswa =
                mahasiswa[0].total_mahasiswa;

            db.query(
                "SELECT COUNT(*) AS total_user FROM users",
                (err, users) => {

                    if (err) return res.status(500).json(err);

                    dashboard.total_user =
                        users[0].total_user;

                    db.query(
                        "SELECT COUNT(*) AS total_transaksi FROM transaksi",
                        (err, transaksi) => {

                            if (err) return res.status(500).json(err);

                            dashboard.total_transaksi =
                                transaksi[0].total_transaksi;

                            db.query(
                                "SELECT SUM(balance) AS total_saldo FROM users",
                                (err, saldo) => {

                                    if (err) return res.status(500).json(err);

                                    dashboard.total_saldo =
                                        saldo[0].total_saldo || 0;

                                    db.query(
                                        "SELECT COUNT(*) AS total_receipt FROM receipts",
                                        (err, receipt) => {

                                            if (err) return res.status(500).json(err);

                                            dashboard.total_receipt =
                                                receipt[0].total_receipt;

                                            res.json(dashboard);

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};