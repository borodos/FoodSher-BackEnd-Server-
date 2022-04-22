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

// -- Модель корзины
const Basket = sequelize.define("basket", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define("basket_device", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// -- Модель девайса
const Device = sequelize.define("device", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	rating: { type: DataTypes.INTEGER, defaultValue: 0 },
	img: { type: DataTypes.STRING, allowNull: false },
});

// -- Модель типа устройства
const Type = sequelize.define("type", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// -- Модель брэнда
const Brand = sequelize.define("brand", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// -- Модель рейтинга
const Rating = sequelize.define("rating", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	rate: { type: DataTypes.INTEGER, allowNull: false },
});

// -- Модель информации девайса
const DeviceInfo = sequelize.define("device_info", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// -- Описание связей моделей друг с другом
User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(DeviceInfo);
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
	User,
	Basket,
	BasketDevice,
	Device,
	Type,
	Brand,
	Rating,
	TypeBrand,
	DeviceInfo,
};
