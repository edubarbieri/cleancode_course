import Dimension from "../../../domain/entity/Dimension";
import Product from "../../../domain/entity/Product";
import ProductRepository from "../../../domain/repository/ProductRepository";

export default class ItemRepositoryMemory implements ProductRepository {
  products: Product[];

  constructor () {
      this.products = [
          new Product(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 50, 15, 3)),
          new Product(2, "Instrumentos Musicais", "Amplificador", 5000, new Dimension(50, 50, 50, 22)),
          new Product(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10, 1))
      ]
  }

  async findById(productId: number): Promise<Product> {
      const item = this.products.find(prod => prod.id === productId);
      if (!item){
        throw new Error("Product not found");
      }
      return item;
  }
}