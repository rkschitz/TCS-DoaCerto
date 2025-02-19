const database = require("../config/database");

class Permissao {
    constructor() {
        this.model = database.db.define("permissao", {
            idPermissao: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            permissao:{
                type: database.db.Sequelize.STRING,
                allowNull: false
            }
        }, {
            freezeTableName: true
          });
    }
}

// Permissoes
// Admin A
// Organização O
// Usuário U

module.exports = new Permissao().model;
