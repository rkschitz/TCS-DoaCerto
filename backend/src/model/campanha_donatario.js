const database = require("../config/database");

class CampanhaDonatario {
    constructor() {
        this.model = database.db.define("campanha_donatario", {
            idCampanhaDonatario: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idDonatario: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'donatario',
                    key: 'idDonatario'
                }
            },
            idCampanha: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'campanha',
                    key: 'idCampanha'
                }
            },
        },{
            freezeTableName: true
        });
    }
}

module.exports = new CampanhaDonatario().model;
