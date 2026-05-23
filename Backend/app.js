const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mahasiswaRoutes = require("./routers/mahasiswaRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/mahasiswa", mahasiswaRoutes);

app.listen(3000, () => {
    console.log("SERVER JALAN DI PORT 3000");
});