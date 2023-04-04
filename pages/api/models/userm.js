import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING
},{
    freezeTableName: true
});

export default User;

(async () => {
    await db.sync();
})();