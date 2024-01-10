const { Sequelize } = require('sequelize');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: 'usof1',
    password: 'root1ROOT'
};

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password, {
        host: dbConfig.host,
        dialect: 'mysql'
    }
);

module.exports = sequelize;