const { DataTypes } = require("sequelize");
const Sale = require("./../Sale/sale");
const Service = require("./../Service/Service");
const { db1 } = require("../../config/dbConnect");

const SaleService = db1.define("SaleService", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Sale,
      key: "SaleID",
    },
  },
  service_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Service,
      key: "service_id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Sale.belongsToMany(Service, { through: SaleService, foreignKey: "sale_id" });
Service.belongsToMany(Sale, { through: SaleService, foreignKey: "service_id" });

module.exports = SaleService;
