import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter"
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase"
import GetOrders from "../../src/application/usecase/GetOrders"

test("deve retornar um pedido pelo codigo", async () => {
  const getOrderByCode = new GetOrders(new OrderRepositoryDatabase(new DatabaseConnectionAdapter()))
  const orders = await getOrderByCode.execute()
  expect(orders.length).toBeGreaterThan(0)
})