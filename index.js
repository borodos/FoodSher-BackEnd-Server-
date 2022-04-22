// -- Импорт конфига из модуля dotenv
require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const modules = require("./models/models");

const PORT = process.env.PORT || 7000;

const app = express();

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
