const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/", userController.getAllUsers);
router.post("/paginate", userController.paginate);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
