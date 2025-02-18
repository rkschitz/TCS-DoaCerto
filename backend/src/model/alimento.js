const database = require("../config/database");

class Alimento {
    constructor() {
        this.model = database.db.define("alimento", {
            idAlimento: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            alimento: {
                type: database.db.Sequelize.STRING,
            },
            situacao:{
                type: database.db.Sequelize.BOOLEAN,
                defaultValue: true
            },
            idUnidadeMedida:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'unidade_medida',
                    key: 'idUnidadeMedida'
                }
            }
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Alimento().model;
