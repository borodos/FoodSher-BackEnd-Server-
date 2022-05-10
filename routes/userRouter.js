const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
// -- Проверка на то, авторизован ли пользователь или нет. Это будет делаться по JWT токену
router.get("/auth", authMiddleware, userController.check);
router.post("/setimage", userController.userSetProfileImage);
router.get("/getimage", userController.userGetProfileImage);
router.get("/getuser", userController.userGetInfo);

module.exports = router;
