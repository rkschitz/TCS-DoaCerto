const database = require("../config/database.js");
class Pessoa {
    constructor() {
        this.model = database.db.define("pessoa", {
            idPessoa: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            cpf: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            telefone: {
                type: database.db.Sequelize.STRING,
            },
        }, {
            freezeTableName: true
        });
    }
}

module.exports = new Pessoa().model;