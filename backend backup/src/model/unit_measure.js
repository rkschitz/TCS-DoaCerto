const database = require("../config/database");

class UnityMeasure{
  constructor() {
    this.model = database.db.define("unit_measure", {
      idUnitMeasure: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unitMeasure: {
        type: database.db.Sequelize.STRING,
      }
    }, {
      freezeTableName: true
    });
  }
}

module.exports = new UnityMeasure().model;