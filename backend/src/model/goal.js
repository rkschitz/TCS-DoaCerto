const database = require("../config/database");

class Goal {
    constructor() {
        this.model = database.db.define("goal", {
            idGoal: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            goal: {
                type: database.db.Sequelize.STRING,
            },
            idAliment:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'aliment',
                    key: 'idAliment'
                }
            },
            idCampaign:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'Campaign',
                    key: 'idCampaign'
                }
            }
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Goal().model;
