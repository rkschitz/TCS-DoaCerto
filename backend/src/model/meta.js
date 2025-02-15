const database = require("../config/database");

class Meta {
    constructor() {
        this.model = database.db.define("meta", {
            idMeta: {
                type: database.db.Sequelize.STRING,
                primaryKey: true
            },
            meta: {
                type: database.db.Sequelize.STRING,
            },
            idAlimento:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'alimento',
                    key: 'idAlimento'
                }
            },
            idCampanha:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'campanha',
                    key: 'idCampanha'
                }
            }
        });
    }
}

module.exports = new Meta().model;
