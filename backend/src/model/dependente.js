const database = require("../config/database.js");

class Dependente{
    constructor(){
        this.model = database.db.define("dependente", {
            idDependente:{
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idPessoa:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'pessoa',
                    key: 'idPessoa'
                },
            },
            idade: {
                type: database.db.Sequelize.INTEGER,
                allowNull: false
            },
            idProvedor:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'pessoa',
                    key: 'idPessoa'
                },
            },
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Dependente().model;