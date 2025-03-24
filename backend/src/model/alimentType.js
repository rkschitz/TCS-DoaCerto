const database = require("../config/database");

class AlimentType {
    constructor() {
        this.model = database.db.define("aliment_type", {
            idAlimentType: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            alimentType: {
                type: database.db.Sequelize.STRING,
            }
        },{
            freezeTableName: true
        });
    }
}

module.exports = new AlimentType().model;
