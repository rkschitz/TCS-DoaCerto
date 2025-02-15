const database = require("../config/database");

class UnidadeMedida {
  constructor() {
    this.model = database.db.define("unidade_medida", {
      idUnidadeMedida: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unidadeMedida: {
        type: database.db.Sequelize.STRING,
      }
    }, {
      freezeTableName: true
    });
  }
}

module.exports = new UnidadeMedida().model;