const express = require("express");
const router = express.Router();
const rekeningController = require("../controllers/rekeningController");

router.get("/", rekeningController.getAll);
router.post("/", rekeningController.create);

module.exports = router;