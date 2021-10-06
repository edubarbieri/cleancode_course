import Order from "../../domain/entity/Order";
import OrderRepository from "../../domain/repository/OrderRepository";
import ItemRepository from "../../domain/repository/ProductRepository";
import SubmitOrderInput from "../dto/SubmitOrderInput";

export default class SubmitOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository
  ) {}

  async execute(input: SubmitOrderInput): Promise<any> {
    const order = new Order(input.cpf);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.productId);
      order.addItem(item, orderItem.quantity);
    }
    this.orderRepository.save(order);
    return {
      total: order.getTotal(),
    };
  }
}
