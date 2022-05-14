const Router = require("express");
const announController = require("../controllers/announController");
const messageController = require("../controllers/messageController");
const router = new Router();

router.get("/", messageController.get);
router.get("/count", messageController.count);
router.post("/info", messageController.getInfoSender);
router.post("/confrim", messageController.confirm);

module.exports = router;
