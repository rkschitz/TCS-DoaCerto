const database = require("../config/database");

class AlimentDonation {
    constructor() {
        this.model = database.db.define("aliment_donation", {
            idAlimentDonation: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idDonation: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'donation',
                    key: 'idDonation'
                }
            },
            idAliment: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'aliment',
                    key: 'idAliment'
                }
            },
            idMeasurementUnit:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'measurement_unit',
                    key: 'idMeasurementUnit'
                }
            },
            quantidade: {
                type: database.db.Sequelize.STRING,
            },
            dtValidade: {
                type: database.db.Sequelize.DATE,
            },
        },{
            freezeTableName: true
        });
    }
}

module.exports = new AlimentDonation().model;
