const database = require("../config/database");

class CampaingGrantee {
    constructor() {
        this.model = database.db.define("campaign_grantee", {
            idCampaignGrantee: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idGrantee: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'grantee',
                    key: 'idGrantee'
                }
            },
            idCampaign: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'campaign',
                    key: 'idCampaign'
                }
            },
        },{
            freezeTableName: true
        });
    }
}

module.exports = new CampaingGrantee().model;
