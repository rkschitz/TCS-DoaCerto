const database = require("../config/database");

class Endereco {
    constructor(){
        this.model = database.db.define("endereco", {
            idEndereco:{
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            numero:{
                type: database.db.Sequelize.STRING,
            },
            complemento:{
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