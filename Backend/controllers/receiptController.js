const db = require("../config/db");
const connectSheet = require("../config/googleSheet");

exports.receipt = async (req, res) => {

    const connection = db.promise();

    try {

        const {
            id_user,
            merchant,
            amount,
            description
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Foto struk wajib diupload"
            });
        }

        if (!id_user || !merchant || !amount) {
            return res.status(400).json({
                message: "Data belum lengkap"
            });
        }

        // Ambil data user
        const [user] = await connection.query(
            "SELECT * FROM users WHERE id_user = ?",
            [id_user]
        );

        if (user.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }

        const foto = req.file.filename;

        // Simpan transaksi
        await connection.query(
            `
            INSERT INTO transaksi
            (
                id_user,
                jenis_transaksi,
                jumlah,
                tanggal,
                keterangan,
                status,
                foto_struk
            )
            VALUES
            (?, 'RECEIPT', ?, NOW(), ?, 'SUCCESS', ?)
            `,
            [
                id_user,
                amount,
                description || `Upload struk ${merchant}`,
                foto
            ]
        );

        // Google Sheets
        try {

            const doc = await connectSheet();
            const sheet = doc.sheetsByIndex[0];

            await sheet.addRow({
                tanggal: new Date().toLocaleString("id-ID"),
                pengirim: user[0].display_name,
                penerima: merchant,
                rekening_pengirim: "-",
                rekening_penerima: "-",
                jenis_transaksi: "RECEIPT",
                jumlah: amount,
                keterangan: description || `Upload struk ${merchant}`,
                status: "SUCCESS"
            });

            console.log("✅ Receipt berhasil dikirim ke Google Sheet");

        } catch (sheetErr) {

            console.error("Google Sheet Error:", sheetErr.message);

        }

        res.json({
            success: true,
            message: "Struk berhasil disimpan",
            file: foto
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};