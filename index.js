// -- Импорт конфига из модуля dotenv
require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
// -- Импорт моделей данных
const modules = require("./models/models");
const cors = require("cors");
// -- Имопрт основного роутера
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const PORT = process.env.PORT || 7000;

const app = express();
// -- Корсы, чтобы можно было отправлять запросы с браузера
app.use(cors());
// -- Чтобы наше приложение могло парсить данные JSON
app.use(express.json());
// -- Первый параметр - URL, по которому роутер должен обрабатываться. Второй параметр - сам роутер
app.use("/api", router);
// -- Middleware, который работает с ошибками обязательно должен идти и регистрироваться в самом конце
app.use(errorHandler);

const start = async () => {
	try {
		// asdds
		// -- Подключение к БД
		await sequelize.authenticate();
		// -- Сверяем состояние БД со схемой данных
		await sequelize.sync();
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
