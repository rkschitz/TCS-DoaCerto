const database = require("../config/database");

class Campaing {
    constructor() {
        this.model = database.db.define("campaign", {
            idCampaign: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING,
            },
            startDate: {
                type: database.db.Sequelize.DATE,
            },
            finalDate: {
                type: database.db.Sequelize.DATE,
            },
            situation: {
                type: database.db.Sequelize.BOOLEAN,
            },
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Campaing().model;
