const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/mahasiswaController");

router.get("/", ctrl.getAll);
router.get("/:nim", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:nim", ctrl.update);
router.delete("/:nim", ctrl.delete);

module.exports = router;