import Order from "../../domain/entity/Order";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class GetOrders {
  constructor(private orderRepository: OrderRepository){}

  execute(): Promise<Order[]>{
    return this.orderRepository.findAll()
  }
}
