const database = require("../config/database");

class Organizacao {
    constructor() {
        this.model = database.db.define("organizacao", {
            idOrganizacao: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            organizacao: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            idPessoa: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'pessoa',
                    key: 'idPessoa'
                }
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

module.exports = new Organizacao().model;