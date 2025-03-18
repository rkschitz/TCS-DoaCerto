const database = require("../config/database");

class MeasurementUnit{
  constructor() {
    this.model = database.db.define("measurement_unit", {
      idMeasurementUnit: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      measurementUnit: {
        type: database.db.Sequelize.STRING,
      },
      ieSituation: {
        type: database.db.Sequelize.STRING,
        defaultValue: 'A'
      }
    }, {
      freezeTableName: true
    });
  }
}

module.exports = new MeasurementUnit().model;