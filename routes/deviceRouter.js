const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");
// -- Файлы typeRouter, brandRouter, deviceRouter, userRouter являются своего рода подроутами

router.post("/", deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

module.exports = router;
