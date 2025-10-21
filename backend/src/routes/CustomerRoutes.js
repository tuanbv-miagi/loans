const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");

router.get("/", customerController.customers());
// router.post("/audio-books", upload.single("file"), importExcel);

module.exports = router;