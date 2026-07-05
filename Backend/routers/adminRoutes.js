const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get(
    "/admin/mahasiswa",
    adminController.getMahasiswa
);

router.post(
    "/admin/mahasiswa",
    adminController.createMahasiswa
);

router.put(
    "/admin/mahasiswa/:nim",
    adminController.updateMahasiswa
);

router.delete(
    "/admin/mahasiswa/:nim",
    adminController.deleteMahasiswa
);

router.get(
    "/admin/dashboard",
    adminController.dashboard
);

module.exports = router;