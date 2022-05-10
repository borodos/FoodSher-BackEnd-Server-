const Router = require("express");
const announController = require("../controllers/announController");
const router = new Router();

router.post("/", announController.create);
router.get("/", announController.getAll);
router.get("/:id", announController.getOne);

module.exports = router;
