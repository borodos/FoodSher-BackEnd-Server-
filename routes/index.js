//! -- Файл index.js будет объединяь все маршруты

const Router = require("express");
const router = new Router();
// -- Файлы typeRouter, brandRouter, deviceRouter, userRouter являются своего рода подроутами
// -- Эти роутеры (маршруты) сопоставляем с соответствующими роутами
const userRouter = require("./userRouter");
const announRouter = require("./announRouter");
const basketRouter = require("./basketRouter");
const messageRouter = require("./messageRouter");

// -- Превый параметр - URL, по которому роутер будет отрабатывать. Второй параметр - сам роутер
router.use("/user", userRouter);
router.use("/announ", announRouter);
router.use("/basket", basketRouter);
router.use("/message", messageRouter);

module.exports = router;
