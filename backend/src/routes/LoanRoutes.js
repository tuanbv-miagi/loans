const express = require("express");
const router = express.Router();
const loanController = require("../controllers/LoanController");

router.get("/:id", loanController.show);
router.post("/create", loanController.create);
router.post("/paginate", loanController.paginate);
router.post("/update/:id", loanController.update);
router.delete("/delete/:id", loanController.delete);

module.exports = router;