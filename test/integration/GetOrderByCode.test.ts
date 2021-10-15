import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter"
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase"
import GetOrderByCode from "../../src/application/usecase/GetOrderByCode"

test("deve retornar um pedido pelo codigo", async () => {
  const getOrderByCode = new GetOrderByCode(new OrderRepositoryDatabase(new DatabaseConnectionAdapter()))
  const order = await getOrderByCode.execute("202100000001")
  expect(order.getCode()).toBe("202100000001")
})