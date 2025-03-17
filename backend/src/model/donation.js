const database = require("../config/database");

class Donation {
    constructor() {
        this.model = database.db.define("donation", {
            idDonation: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idGiver: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'giver',
                    key: 'idGiver'
                }
            },
            idCampaign: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'Campaign',
                    key: 'idCampaign'
                }
            },
            donationDate: {
                type: database.db.Sequelize.DATE,
            },
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Donation().model;
