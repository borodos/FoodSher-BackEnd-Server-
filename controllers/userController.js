const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, Basket } = require("../models/models");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
	return jwt.sign(
		{ id: id, email: email, role: role },
		process.env.SECRET_KEY,
		{ expiresIn: "24h" } // -- Сколько времени живет токен
	);
};

class UserController {
	async registration(req, res, next) {
		// -- Из запроса получаем email и пароль
		const { email, password, role } = req.body;

		// -- Ошибка, если пароль и почта не указаны
		if (!email || !password) {
			return next(ApiError.badRequest("Некорректный email или пароль"));
		}

		// -- Проверка, существует ли пользователь с таким email в системе
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			return next(
				ApiError.badRequest("Пользователь с таким email уже существует")
			);
		}
		// -- Если такого пользователя нет, тогда хэшируем пароль и создаем нового пользователя
		const hashPassword = await bcrypt.hash(password, 5); // -- Первый параметр - сам пароль, второй параметр - сколько раз будем хэшировать пароль

		// -- Создание пользователя
		const user = await User.create({ email, role, password: hashPassword });

		// -- Создание для пользователя корзины
		const basket = await Basket.create({ userId: user.id });

		//! -- Генерация JWT Token
		// -- Первый параметр - объект PAYLOAD (центральная часть JWT Token, в которой будут сшиваться данные)
		// -- Второй параметр - секретный ключ
		// -- Третий параметр - опции
		const token = generateJwt(user.id, user.email, user.role);
		// -- Возращаем токен
		return res.json({ token });
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });

		// -- Ошибка, если пользователь не найден
		if (!user) {
			return next(ApiError.internal("Пользователь не найден"));
		}

		// -- Проверка, совпадает ли пароль введенный пользователем с паролем в БД
		let comparePassword = bcrypt.compareSync(password, user.password);
		// -- Ошибка, если пароли не найден
		if (!user) {
			return next(ApiError.internal("Не верный пароль"));
		}

		// -- Генерируем токен
		const token = generateJwt(user.id, user.email, user.role);

		return res.json({ token });
	}

	async check(req, res, next) {
		// -- Возвращаем сгенерированный токен на клиент
		const token = generateJwt(req.user.id, req.user.email, req.user.role);
		return res.json({ token });
	}
}

module.exports = new UserController();
