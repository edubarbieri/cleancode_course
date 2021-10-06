import ProductRepositoryMemory from "../../src/infra/repository/memory/ProductRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import SubmitOrder from "../../src/application/usecase/SubmitOrder";

test("Deve fazer um pedido", async function () {
  const input = {
    cpf: "847.903.332-05",
    orderItems: [
      {
        productId: "1",
        quantity: 1,
      },
      {
        productId: "2",
        quantity: 1,
      },
      {
        productId: "3",
        quantity: 3,
      },
    ],
  };
  const placeOrder = new SubmitOrder(
    new ProductRepositoryMemory(),
    new OrderRepositoryMemory()
  );
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6090);
});
