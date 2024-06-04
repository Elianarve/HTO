import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";

const UserModel = connection_db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue : 'admin',
        allowNull: false
    },
},{
    tableName: 'user',
    timestamps: false
})

export default UserModel;



