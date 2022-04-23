// -- Здесь будем проверять токен на валидность и декодировать его
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next();
	}
	try {
		// -- Берем токен из headers
		// -- В headers обычно помещает тип токена и сам токен
		const token = req.headers.authorization.split(" ")[1]; // -- Результат: Тип токена - Bearer[0], токен - agsjasdjk[1]
		// -- Ошибка, если токена нет
		if (!token) {
			return res.status(401).json({ message: "Нет токена" });
		}
		// -- Раскодируем токен
		// -- Первый параметр - сам токен, второй параметр - секретный ключ
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		// -- Запросу в поле user добавим данные, которые вытащили из токена
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: "Не авторизован" });
	}
};
