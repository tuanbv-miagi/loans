const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/", userController.getAllUsers);
router.post("/paginate", userController.paginate);
router.post("/create", userController.create);
router.put("/update/:id", userController.update);
router.put("/lock/:id", userController.lock);
router.put("/unlock/:id", userController.unLock);
router.delete("/delete/:id", userController.delete);

module.exports = router;
