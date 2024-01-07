import { Product } from './products.model';
import { ShopProductInterface } from './products.interface';
import { Sequelize } from 'sequelize';
const productService = {
  getAllProducts: async (): Promise<ShopProductInterface[]> => {
    const products = await Product.findAll();
    return products.map((product) => product.toJSON() as ShopProductInterface);
  },

  getProductById: async (id: string): Promise<ShopProductInterface | null> => {
    const product = await Product.findOne({ where: { product_id: id } }); 
    return product ? (product.toJSON() as ShopProductInterface) : null;
  },

  updateProductQuantity: async (id: string, amount: number): Promise<ShopProductInterface | string | number> => {
    const result = await Product.update(
      { quantity: Sequelize.literal(`quantity - ${amount}`) },
      { where: { product_id: id } }
    );
    
    if (result[0] === 0) {
      return "Product not found!";
    }    
    return result[0];
},
};

export default productService;
