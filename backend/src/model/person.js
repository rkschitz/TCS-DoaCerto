const database = require("../config/database");

class Person {
  constructor() {
    this.model = database.db.define("person", {
      idPerson: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CPF: {
        type: database.db.Sequelize.STRING,
      },
      name: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: database.db.Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: database.db.Sequelize.STRING,
        defaultValue: "doacerto"
      },
      number: {
        type: database.db.Sequelize.STRING,
      },
      birthdate: {
        type: database.db.Sequelize.DATE,
      },
      role:{
        type: database.db.Sequelize.STRING,
        defaultValue: 'U' // U = Usuário, A = Administrador, O = Organização
      },
      idAdress: {
        type: database.db.Sequelize.INTEGER,
        references: {
          model: 'adress',
          key: 'idAdress'
        },
      }
    }, {
      freezeTableName: true
    });
  }
}

module.exports = new Person().model;