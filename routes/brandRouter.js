const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");

// -- Файлы typeRouter, brandRouter, deviceRouter, userRouter являются своего рода подроутами

// -- Метод post, чтобы можно было создавать бренд
router.post("/", brandController.create);

// -- Метод get, чтобы все бренды можно было получать
router.get("/", brandController.getAll);
module.exports = router;
