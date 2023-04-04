import { Sequelize } from "sequelize";

const db = new Sequelize('belajar_next', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;