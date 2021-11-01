import CouponRepository from "../repository/CouponRepository";
import ProductRepository from "../repository/ProductRepository";
import OrderRepository from "../repository/OrderRepository";

export default interface AbstractRepositoryFactory {
	createProductRepository(): ProductRepository;
	createCouponRepository(): CouponRepository;
	createOrderRepository(): OrderRepository;
}
