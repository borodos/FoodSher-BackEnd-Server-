const Router = require("express");
const basketController = require("../controllers/basketController");
const router = new Router();

router.post("/", basketController.addToBasket);
router.get("/", basketController.getBasket);
router.get("/orders", basketController.getBasketForMessages);
router.post("/delete", basketController.deleteOrder);

module.exports = router;
