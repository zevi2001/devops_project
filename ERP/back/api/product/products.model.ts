import { sequelize } from "../../utils/connections.db";
import { DataTypes } from 'sequelize';

export const Product = sequelize.define('products', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sale_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING(255),
    },
    discount_percentage: {
        type: DataTypes.DECIMAL,
    },
    image_url: {
        type: DataTypes.TEXT,
    },
    image_alt: {
        type: DataTypes.STRING(255),
    },
    
    
},{
    timestamps: false,
});

export const AdminProduct = sequelize.define('admin_products', 
{
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    is_for_sale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    cost_price: {
        type: DataTypes.DECIMAL,
    },
    supplier: {
        type: DataTypes.STRING(255),
    },
},

{
    timestamps: false,
}

);

AdminProduct.belongsTo(Product, { foreignKey: 'product_id' });

sequelize.sync()
    .then(() => {
        console.log('Products and AdminProducts tables created successfully.');
    })
    .catch(err => {
        console.error('Error creating tables:', err);
    });