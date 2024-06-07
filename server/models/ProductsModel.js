import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";

const ProductsModel = connection_db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER
    }
},{
    tableName: 'products',
    timestamps: false
});

export default ProductsModel;