import Product from "../entity/Product";

export default interface ProductRepository {
    findById(productId: string): Promise<Product>;
}