const database = require("../config/database");

class Alimento {
    constructor() {
        this.model = database.db.define("alimento", {
            idAlimento: {
                type: database.db.Sequelize.STRING,
                primaryKey: true
            },
            alimento: {
                type: database.db.Sequelize.STRING,
            },
            idUnidadeMedida:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'unidade_medida',
                    key: 'idUnidadeMedida'
                }
            }
        });
    }
}

module.exports = new Alimento().model;
