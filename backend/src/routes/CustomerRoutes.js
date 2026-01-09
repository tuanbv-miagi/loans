const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");

router.get("", customerController.customers);
router.get("/:id", customerController.show);
router.post("/paginate", customerController.paginate);
router.post("/create", customerController.create);
router.post("/update/:id", customerController.update);
router.delete("/delete/:id", customerController.delete);

module.exports = router;