const database = require("../config/database");

class User {
  constructor() {
    this.model = database.db.define("pessoa", {
      idPessoa: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CPF: {
        type: database.db.Sequelize.STRING,
      },
      email: {
        type: database.db.Sequelize.STRING,
        unique: true,
      },
      senha: {
        type: database.db.Sequelize.STRING,
        defaultValue: "doacerto"
      },
      telefone: {
        type: database.db.Sequelize.STRING,
      },
      dt_nascimento: {
        type: database.db.Sequelize.DATE,
      },
      idEdereco: {
        type: database.db.Sequelize.INTEGER,
        references: {
          model: 'endereco',
          key: 'idEndereco'
        },
      }
    }, {
      freezeTableName: true
    });
  }
}

module.exports = new User().model;