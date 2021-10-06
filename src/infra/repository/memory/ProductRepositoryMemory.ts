import Dimension from "../../../domain/entity/Dimension";
import Product from "../../../domain/entity/Product";
import ProductRepository from "../../../domain/repository/ProductRepository";

export default class ItemRepositoryMemory implements ProductRepository {
  products: Product[];

  constructor () {
      this.products = [
          new Product("1", "Instrumentos Musicais", "Guitarra", 1000, new Dimension(1, 2, 3, 4)),
          new Product("2", "Instrumentos Musicais", "Amplificador", 5000, new Dimension(1, 2, 3, 4)),
          new Product("3", "Instrumentos Musicais", "Cabo", 30, new Dimension(1, 2, 3, 4))
      ]
  }

  async findById(productId: string): Promise<Product> {
      const item = this.products.find(prod => prod.id === productId);
      if (!item) throw new Error("Product not found");
      return item;
  }
}