// -- Описание моделей данных
const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// -- Модель пользователя
// -- Первый параметр - название модели. Второй параметр - объект, в которым описываются поля модели
const User = sequelize.define("user", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const UserInfo = sequelize.define("user_info", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstName: { type: DataTypes.STRING, allowNull: false },
	secondName: { type: DataTypes.STRING, allowNull: false },
	img: { type: DataTypes.STRING },
});

// -- Модель корзины
const Basket = sequelize.define("basket", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// -- Модель объявления
const Announ = sequelize.define("announ", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
	person: { type: DataTypes.STRING, allowNull: false },
	phone: { type: DataTypes.STRING, allowNull: false },
	nameObject: { type: DataTypes.STRING, allowNull: false },
	img: { type: DataTypes.STRING, allowNull: false },
});

const BasketAnnoun = sequelize.define("basket_announ", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Message = sequelize.define("message", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	senderId: { type: DataTypes.INTEGER, allowNull: false },
	receiverId: { type: DataTypes.INTEGER, allowNull: false },
});

// -- Описание связей моделей друг с другом
User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(Announ);
Announ.belongsTo(User);

Basket.hasMany(BasketAnnoun);
BasketAnnoun.belongsTo(Basket);

Announ.hasOne(BasketAnnoun);
BasketAnnoun.belongsTo(Announ);

module.exports = {
	User,
	Announ,
	Basket,
	BasketAnnoun,
	UserInfo,
	Message,
};
