const Router = require("express");
const announController = require("../controllers/announController");
const router = new Router();

router.post("/", announController.create);
router.post("/delete", announController.delete);
router.get("/", announController.getAll);
// router.get("/:id", announController.getOne);
router.get("/user_announs", announController.getAllForUser);

module.exports = router;
