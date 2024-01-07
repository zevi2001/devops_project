// products.model.ts
import { sequelize } from "../../utils/connections.db";
import { DataTypes, Model } from 'sequelize';
import { ShopProductInterface } from './products.interface';

// Product Model
export const Product = sequelize.define<Model<ShopProductInterface>>('products', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Added autoIncrement for primary key
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sale_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    discount_percentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_alt: { // Added a colon here
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});
