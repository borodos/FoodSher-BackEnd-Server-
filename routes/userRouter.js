const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
// -- Проверка на то, авторизован ли пользователь или нет. Это будет делаться по JWT токену
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
