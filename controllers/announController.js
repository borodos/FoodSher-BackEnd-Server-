const { Announ } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const jwt = require("jsonwebtoken");

class AnnounController {
	async create(req, res) {
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
		const { title, description, phone, nameObject } = req.body;
		const { img } = req.files;
		let fileName = uuid.v4() + ".jpg";
		img.mv(path.resolve(__dirname, "..", "static", fileName));

		const announ = await Announ.create({
			title,
			description,
			phone,
			nameObject,
			img: fileName,
			userId: req.user.id,
		});
		return res.json(announ);
	}

	async getAll(req, res) {
		const announs = await Announ.findAll();
		return res.json(announs);
	}

	async getAllForUser(req, res) {
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

		const announs = await Announ.findAll({ where: { userId: req.user.id } });
		return res.json(announs);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const announs = await Announ.findOne({ where: { id } });
		return res.json(announs);
	}

	async delete(req, res) {
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

		const announs = await Announ.destroy({
			where: { userId: req.user.id, id: req.body.id },
		});
		return res.json(announs);
	}
}

module.exports = new AnnounController();
