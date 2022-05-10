const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, Basket, UserInfo } = require("../models/models");
const jwt = require("jsonwebtoken");
class BasketController {
	// -- НУЖНО ИЗМЕНИТЬ!!!
	async basketUser(req, res, next) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(401).json({ message: "Нет токена" });
			}

			const decoded = jwt.verify(token, process.env.SECRET_KEY);

			req.user = decoded;
		} catch (error) {
			return next(ApiError.internal("Не удалось отправить basket"));
		}

		const basket = await Basket.findOne({ where: { userId: req.user.id } });
		return res.json(basket.id);
	}
}

module.exports = new BasketController();
