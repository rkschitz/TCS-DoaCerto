const { Sequelize } = require('sequelize');
require('dotenv').config();

class Database {

    constructor() {
        this.Init();
    }

    Init() {
        this.db = new Sequelize({

            database: "doacerto",
            host: "localhost",
            username: "root",
            dialect: "mysql",
            password: "",
            // dialectOptions: {
            //   ssl: {
            //     require: true,
            //     rejectUnauthorized: false
            //   }}

        });
    }
}

module.exports = new Database();