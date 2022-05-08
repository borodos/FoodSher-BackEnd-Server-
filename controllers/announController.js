const { Announ } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class AnnounController {
	async create(req, res) {
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
		});
		return res.json(announ);
	}

	async getAll(req, res) {
		const announs = await Announ.findAll();
		return res.json(announs);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const announs = await Announ.findOne({ where: { id } });
		return res.json(announs);
	}
}

module.exports = new AnnounController();
