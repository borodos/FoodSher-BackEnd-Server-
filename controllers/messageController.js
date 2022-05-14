const {
	Announ,
	Message,
	UserInfo,
	Basket,
	BasketAnnoun,
	User,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const jwt = require("jsonwebtoken");

class MessageController {
	async get(req, res) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(401).json({ message: "Нет токена" });
			}

			const decoded = jwt.verify(token, process.env.SECRET_KEY);

			req.user = decoded;
		} catch (error) {
			return next(
				ApiError.internal("Не удалось отправить информацию о пользователе")
			);
		}

		const message = await Message.findAll({
			where: {
				receiverId: req.user.id,
			},
		});

		return res.json(message);
	}

	async getInfoSender(req, res, next) {
		const info = await UserInfo.findOne({
			where: {
				userId: req.body.senderId,
			},
		});

		return res.json(info);
	}

	async confirm(req, res, next) {
		const message = await Message.destroy({
			where: {
				id: req.body.id,
			},
		});

		return res.json(message);
	}

	async count(req, res, next) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(401).json({ message: "Нет токена" });
			}

			const decoded = jwt.verify(token, process.env.SECRET_KEY);

			req.user = decoded;
		} catch (error) {
			return next(
				ApiError.internal("Не удалось отправить информацию о пользователе")
			);
		}

		const message = await Message.count({
			where: {
				receiverId: req.user.id,
			},
		});

		return res.json(message);
	}
}

module.exports = new MessageController();
