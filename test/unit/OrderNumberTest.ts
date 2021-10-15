import OrderNumber from "../../src/domain/entity/OrderNumber";

test("Deve criar o código de um pedido", function () {
	const date = new Date("2021-03-01");
	const sequence = 1;
	const code = new OrderNumber(date, sequence);
	expect(code.value).toBe("202100000001");
});