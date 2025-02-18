const database = require("../config/database");

class PermissaoUsuario {
    constructor() {
        this.model = database.db.define("permissao_usuario", {
            idPermissaoUsuario: {
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

module.exports = new PermissaoUsuario().model;
