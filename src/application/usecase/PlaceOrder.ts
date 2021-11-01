import Order from "../../domain/entity/Order";
import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import ProductRepository from "../../domain/repository/ProductRepository";
import FreightCalculator from "../../domain/service/FreightCalculator";
import PlaceOrderInput from "../dto/PlaceOrderInput";
import PlaceOrderOutput from "../dto/PlaceOrderOutput";
import PlaceOrderOutputAssembler from "../dto/PlaceOrderOutputAssembler";

export default class PlaceOrder {
  productRepository: ProductRepository;
  couponRepository: CouponRepository;
  orderRepository: OrderRepository;
  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.productRepository = repositoryFactory.createProductRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf, input.issueDate);
    let totalShipping = 0;
    for (const orderItem of input.orderItems) {
      const product = await this.productRepository.findById(orderItem.productId);
      order.addItem(product, orderItem.quantity);
      totalShipping += FreightCalculator.calculate(product)
    }

    order.shippingPrice = totalShipping;
    
    if (input.coupon) {
			const coupon = await this.couponRepository.findByCode(input.coupon);
			order.addCoupon(coupon);
		}

    await this.orderRepository.save(order);
    return PlaceOrderOutputAssembler.assembly(order);
  }
}
