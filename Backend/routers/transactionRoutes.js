const express = require("express");

const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.post(
    "/transaksi",
    transactionController.createTransaction
);

router.get(
    "/transaksi/:id",
    transactionController.getTransactions
);

router.post(
    "/transfer",
    transactionController.transfer
);

module.exports = router;