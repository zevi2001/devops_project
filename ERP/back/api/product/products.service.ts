import { Product, AdminProduct } from './products.model';
import { ShopProductInterface ,AdminProductInterface,ProductCreateInput, UpdateProductRequest} from './products.interface';


const productService = {
    getAllInventory: async (): Promise<AdminProductInterface[]> => {
        const inventory = await AdminProduct.findAll({
            include: [Product], 
            raw: true, 
        });
        return inventory as unknown as AdminProductInterface[];
    },

    getInventoryById: async (productId: string): Promise<AdminProductInterface | null> => {
        const inventoryItem = await AdminProduct.findOne({
            where: { product_id: productId },
            include: [Product], 
            raw: true, 
        });
    
        return inventoryItem ? (inventoryItem as unknown as AdminProductInterface) : null;
    },
    
    
    addNewInventoryItem: async (
        newInventoryItemData: {
            product: ShopProductInterface;
            Admin_Products: {
                is_for_sale: boolean;
                cost_price: number;
                supplier: string;
            };
        }
    ): Promise<{ adminProduct: AdminProductInterface; product: ShopProductInterface | null }> => {
        try {
            const createdProduct = await Product.create(newInventoryItemData.product as ProductCreateInput) as unknown as ShopProductInterface;
    
            const createdAdminProduct = await AdminProduct.create({
                ...newInventoryItemData.Admin_Products,
                product_id: createdProduct.product_id,
            });
    
            const retrievedProduct = await Product.findOne({
                where: { product_id: createdProduct.product_id },
            });
    
            return {
                adminProduct: createdAdminProduct.toJSON() as AdminProductInterface,
                product: retrievedProduct ? (retrievedProduct.toJSON() as ShopProductInterface) : null,
            };
        } catch (error) {
            console.error('Error creating new inventory item:', error);
            throw new Error('Error creating new inventory item');
        }
    },


    updateInventoryItem: async (
        productId: string,
        updatedInventoryItemData: Partial<AdminProductInterface>
    ): Promise<AdminProductInterface | null> => {
        
        const inventoryItem = await AdminProduct.findOne({
            where: { product_id: productId },
            include: [Product], 
        });
    
        if (!inventoryItem) {
            return null;
        }
    
await inventoryItem.update(updatedInventoryItemData);
console.log("Update in AdminProduct successful");

const associatedProduct = await (inventoryItem as any).getProduct(); 

console.log("Associated Product:", associatedProduct);

if (associatedProduct) {
    await associatedProduct.update(updatedInventoryItemData as ProductCreateInput); 
    console.log("Update in Product successful");
} else {
    console.log("Associated Product not found");
}
    
        return inventoryItem.toJSON() as AdminProductInterface;
    },
    
    
    

    

    deleteInventoryItem: async (productId: string): Promise<{ success: boolean, message?: string }> => {
        try {
            const inventoryItem = await AdminProduct.findOne({ where: { product_id: productId } });
    
            if (!inventoryItem) {
                return { success: false, message: 'Inventory item not found.' };
            }
    
            await inventoryItem.destroy();
    
            return { success: true, message: 'Inventory item deleted successfully.' };
        } catch (error) {
            console.error('Error deleting inventory item:', error);
            throw new Error('Error deleting inventory item');
        }
    },
    
};

export default productService;
