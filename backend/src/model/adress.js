const database = require("../config/database");

class Endereco {
    constructor(){
        this.model = database.db.define("adress", {
            idAdress:{
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            number:{
                type: database.db.Sequelize.STRING,
            },
            complement:{
                type: database.db.Sequelize.STRING,
            },
            idLogradouro:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'logradouro',
                    key: 'idLogradouro'
                }
            }
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Endereco().model;