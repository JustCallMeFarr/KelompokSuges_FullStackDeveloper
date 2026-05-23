const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_kipk_tracker"
});

db.connect((err) => {
    if (err) {
        console.log("❌ DB CONNECT ERROR:");
        console.log(err);
    } else {
        console.log("✅ DB CONNECTED");
    }
});

module.exports = db;