const ApiError = require("../error/ApiError");

class UserController {
	async registration(req, res) {}

	async login(req, res) {}

	async check(req, res, next) {
		// -- Универсальная обработка ошибки
		const { id } = req.query; // -- req.query возвращает параметр строки запроса
		// -- Если пользователь не указал id, то вызываем функцию next
		if (!id) {
			return next(ApiError.badRequest("Не задан ID"));
		}
		res.json(id);
	}
}

module.exports = new UserController();
