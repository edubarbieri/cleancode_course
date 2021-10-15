import Product from "../entity/Product";

export default interface ProductRepository {
    findById(productId: number): Promise<Product>;
}