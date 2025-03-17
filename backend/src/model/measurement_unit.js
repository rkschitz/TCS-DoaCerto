const database = require("../config/database");

class UnityMeasure{
  constructor() {
    this.model = database.db.define("measurement_unit", {
      idMeasurementUnit: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      measurementUnit: {
        type: database.db.Sequelize.STRING,
      }
    }, {
      freezeTableName: true
    });
  }
}

module.exports = new UnityMeasure().model;