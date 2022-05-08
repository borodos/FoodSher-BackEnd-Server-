const Router = require("express");
const announController = require("../controllers/announController");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", announController.create);
router.get("/", announController.getAll);
router.get("/:id", announController.getOne);

module.exports = router;
