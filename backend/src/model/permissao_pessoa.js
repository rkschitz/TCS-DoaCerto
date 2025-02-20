const database = require("../config/database");

class PermissaoPessoa {
    constructor() {
        this.model = database.db.define("permissao_pessoa", {
            idPermissaoPessoa: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idPermissao: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'permissao',
                    key: 'idPermissao'
                }
            },
            idPessoa: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'pessoa',
                    key: 'idPessoa'
                }
            }
        }, {
            freezeTableName: true
          });
    }
}

module.exports = new PermissaoPessoa().model;
