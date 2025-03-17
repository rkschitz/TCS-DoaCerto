const database = require("../config/database");

class Aliment {
    constructor() {
        this.model = database.db.define("aliment", {
            idAliment: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            aliment: {
                type: database.db.Sequelize.STRING,
            },
            situation:{
                type: database.db.Sequelize.BOOLEAN,
                defaultValue: true
            },
            idUnitMeasure:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'unit_measure',
                    key: 'idUnitMeasure'
                }
            }
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Aliment().model;
