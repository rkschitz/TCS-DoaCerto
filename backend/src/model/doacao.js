const database = require("../config/database");

class Doacao {
    constructor() {
        this.model = database.db.define("doacao", {
            idDoacao: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idDoador: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'doador',
                    key: 'idDoador'
                }
            },
            idCampanha: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'campanha',
                    key: 'idCampanha'
                }
            },
            dtDoacao: {
                type: database.db.Sequelize.DATE,
            },
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Doacao().model;
