// Parametros de conexão
const db = require('./01-params')
require('dotenv/config');
const { Sequelize, DataTypes } = require('sequelize')

//Parametros de acesso ao banco de dados

const dbConnection = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: db.dialect,
    // operatorsAliases: false,
    define: {
        timestamps: true,
        freezeTableName: true
    },

    pool: {
        max: db.pool.max,
        min: db.pool.min,
        acquire: db.pool.acquire,
        idle: db.pool.idle
    }
});

const dbase = {}

dbase.Sequelize = Sequelize
dbase.DataTypes = DataTypes
dbase.dbConnection = dbConnection
dbase.AmbAseSync = require('../models/models')(dbase.DataTypes, dbase.dbConnection)

module.exports = dbase