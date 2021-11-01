import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ProductRepository from "../../domain/repository/ProductRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";
import ProductRepositoryDatabase from "../repository/database/ProductRepositoryDatabase";
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase";

export default class DatabaseRepositoryFactory implements AbstractRepositoryFactory {

	constructor (readonly databaseConnection: DatabaseConnection) {
	}

	createProductRepository(): ProductRepository {
		return new ProductRepositoryDatabase(this.databaseConnection);
	}
	createCouponRepository(): CouponRepository {
		return new CouponRepositoryDatabase(this.databaseConnection);
	}
	createOrderRepository(): OrderRepository {
		return new OrderRepositoryDatabase(this.databaseConnection);
	}
}
