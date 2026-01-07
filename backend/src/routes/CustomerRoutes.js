const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");

router.post("/paginate", customerController.paginate);
router.post("/create", customerController.create);

module.exports = router;