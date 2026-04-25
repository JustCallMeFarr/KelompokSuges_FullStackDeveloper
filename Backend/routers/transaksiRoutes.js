const express = require("express");
const router = express.Router();
const transaksiController = require("../controllers/transaksiController");

router.get("/", transaksiController.getAll);
router.post("/", transaksiController.create);

module.exports = router;