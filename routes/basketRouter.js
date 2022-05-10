const Router = require("express");
const basketController = require("../controllers/basketController");
const router = new Router();

router.get("/", basketController.basketUser);

module.exports = router;
