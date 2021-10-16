import express, { Router } from "express"
import DatabaseConnectionAdapter from "../database/DatabaseConnectionAdapter"
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase"
import OrderController from "./routes/OrderController"

const app = express()
app.use(express.json())

const dbAdpater = new DatabaseConnectionAdapter()
const orderRepository =  new OrderRepositoryDatabase(dbAdpater)

const orderController = new OrderController(orderRepository)
app.use(orderController.getRouter())

export default app