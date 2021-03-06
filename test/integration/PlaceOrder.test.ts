import ProductRepositoryDatabase from "../../src/infra/repository/database/ProductRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import PlaceOrderInput from "../../src/application/dto/PlaceOrderInput";
import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

let placeOrder: PlaceOrder;

beforeEach(function () {
	const databaseConnection = new DatabaseConnectionAdapter();
	placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));
});


test("Deve fazer um pedido", async function () {
  const input = new PlaceOrderInput(
    "847.903.332-05",
    [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 1,
      },
      {
        productId: 3,
        quantity: 3,
      },
    ],
    new Date("2021-03-01"),
    "VALE20"
  );

  const output = await placeOrder.execute(input);
  expect(output.total).toBe(5132);
  expect(output.code).toBe("202100000001");
});
