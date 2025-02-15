const database = require("../config/database");

class Breed {
    constructor() {
        this.model = database.db.define("permissao", {
            idPermissao: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true
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

module.exports = new Breed().model;
