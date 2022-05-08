//! -- Файл index.js будет объединяь все маршруты

const Router = require("express");
const router = new Router();
// -- Файлы typeRouter, brandRouter, deviceRouter, userRouter являются своего рода подроутами
// -- Эти роутеры (маршруты) сопоставляем с соответствующими роутами
const deviceRouter = require("./deviceRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const userRouter = require("./userRouter");
const announRouter = require("./announRouter");

// -- Превый параметр - URL, по которому роутер будет отрабатывать. Второй параметр - сам роутер
router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/announ", announRouter);

module.exports = router;
