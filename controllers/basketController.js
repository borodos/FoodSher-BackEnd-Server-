const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { Basket, BasketAnnoun, Message, Announ } = require("../models/models");
const jwt = require("jsonwebtoken");

class BasketController {
	async addToBasket(req, res, next) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(401).json({ message: "Нет токена" });
			}

			const decoded = jwt.verify(token, process.env.SECRET_KEY);

			req.user = decoded;
		} catch (error) {
			return next(ApiError.internal("Авторизуйтесь"));
		}

		const basket = await Basket.findOne({ where: { userId: req.user.id } });

		const existingBasketAnnoun = await BasketAnnoun.findOne({
			where: { basketId: basket.id, announId: req.body.id },
		});

		if (existingBasketAnnoun) {
			return next(ApiError.internal("Товар уже добавлен в корзину"));
		}

		const basketAnnoun = await BasketAnnoun.create({
			basketId: basket.id,
			announId: req.body.id,
		});

		await Message.create({
			senderId: req.user.id,
			receiverId: req.body.userId,
		});
		return res.json(basketAnnoun);
	}

	async getBasket(req, res, next) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(401).json({ message: "Нет токена" });
			}

			const decoded = jwt.verify(token, process.env.SECRET_KEY);

			req.user = decoded;
		} catch (error) {
			return next(
				ApiError.internal("Не удалось получить инофрмацию о пользователе")
			);
		}

		const basket = await Basket.findOne({ where: { userId: req.user.id } });
		const basketAnnoun = await BasketAnnoun.findAll({
			where: { basketId: basket.id },
		});
		return res.json(basketAnnoun);
	}

	async getBasketForMessages(req, res, next) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(401).json({ message: "Нет токена" });
			}

			const decoded = jwt.verify(token, process.env.SECRET_KEY);

			req.user = decoded;
		} catch (error) {
			return next(
				ApiError.internal("Не удалось получить инофрмацию о пользователе")
			);
		}

		const basket = await Basket.findOne({ where: { userId: req.user.id } });
		const basketAnnoun = await BasketAnnoun.count({
			where: { basketId: basket.id },
		});
		return res.json(basketAnnoun);
	}

	async deleteOrder(req, res, next) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(401).json({ message: "Нет токена" });
			}

			const decoded = jwt.verify(token, process.env.SECRET_KEY);

			req.user = decoded;
		} catch (error) {
			return next(
				ApiError.internal("Не удалось получить инофрмацию о пользователе")
			);
		}

		const basket = await Basket.findOne({ where: { userId: req.user.id } });
		const basketAnnoun = await BasketAnnoun.findOne({
			where: { basketId: basket.id, announId: req.body.announId },
		});
		await basketAnnoun.destroy();
		await basketAnnoun.save();
		return res.json(basketAnnoun);
	}

	async getOrderInfo(req, res, next) {
		const announ = await Announ.findOne({
			where: {
				id: req.body.announId,
			},
		});

		return res.json(announ);
	}
}

module.exports = new BasketController();
