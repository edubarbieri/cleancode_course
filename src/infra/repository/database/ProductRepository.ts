import DatabaseConnection from "../../database/DatabaseConnection";
import ProductRepository from "../../../domain/repository/ProductRepository";
import Product from "../../../domain/entity/Product";
import Dimension from "../../../domain/entity/Dimension";

export default class ItemRepositoryDatabase implements ProductRepository {

    constructor (readonly databaseConnection: DatabaseConnection) {
    }

    async findById(idItem: string): Promise<Product> {
        const [itemData] = await this.databaseConnection.query("select * from ccca.item where id = $1", [idItem]);
        return new Product(itemData.id, itemData.category, itemData.description, parseFloat(itemData.price), new Dimension(1, 2, 3, 4));
    }
}