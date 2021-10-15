import Order from "../../domain/entity/Order";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class GetOrderByCode {
  constructor(private orderRepository: OrderRepository){}

  execute(code: string): Promise<Order>{
    return this.orderRepository.findByCode(code)
  }
}
