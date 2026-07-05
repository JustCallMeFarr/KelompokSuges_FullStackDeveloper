const express = require("express");
const router = express.Router();

const upload = require("../config/upload");
const receiptController = require("../controllers/receiptController");

router.post(
    "/",
    upload.single("receipt"),
    receiptController.receipt
);

module.exports = router;