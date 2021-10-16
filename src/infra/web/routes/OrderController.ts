import { Request, Response, Router} from "express";
import GetOrders from "../../../application/usecase/GetOrders";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderController {
  constructor(readonly orderRepository: OrderRepository) { 
  }

  getRouter(){
    const orderRouter =  Router()
    orderRouter.get("/order", this.findAll.bind(this))
    return orderRouter;
  }

  async findAll(req: Request, resp: Response) {
    const getOrders = new GetOrders(this.orderRepository)
    const orders = await getOrders.execute()
    resp.json(orders)
  }
  
}