import { Router, Request, Response } from "express";
import GetOrders from "../../../application/usecase/GetOrders";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderController {
  constructor(app: Router, readonly orderRepository: OrderRepository) {
    app.get("/", this.findAll)
  }

  async findAll(req: Request, resp: Response) {
    const getOrders = new GetOrders(this.orderRepository)
    resp.json(await getOrders.execute())
  }

  
}