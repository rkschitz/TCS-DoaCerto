const database = require("../config/database");

class Giver {
    constructor() {
        this.model = database.db.define("giver", {
            idGiver: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idPerson: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'person',
                    key: 'idPerson'
                }
            }
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Giver().model;
