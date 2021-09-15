require('dotenv/config');

module.exports = {
    /* Configuração de coneção com a db */
    HOST: 'turkeyshit.mysql.dbaas.com.br',
    USER: 'turkeyshit',
    PASSWORD: 'Pfes2018',
    DB: 'turkeyshit',
    /* Dialect é a db que está sendo utilizada no momento*/
    dialect: 'mysql',
    /* */
    pool: {
        /*maximum number of connection in pool */
        max: 5,
        /*minimum number of connection in pool */
        min: 0,
        /* maximum time, in milliseconds, that pool will try
        to get connection before throwing error*/
        acquire: 30000,
        /* maximum time, in milliseconds, that a connection
        can be idle before being released */
        idle: 10000
    }
};