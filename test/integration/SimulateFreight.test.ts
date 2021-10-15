import SimulateFreightInput from "../../src/application/dto/SimulateFreightInput";
import SimulateFreight from "../../src/application/usecase/SimulateFreight";
import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import ProductRepositoryMemory from "../../src/infra/repository/memory/ProductRepositoryMemory";

test("Deve simular o frete dos produtos", async function () {
	const databaseConnection = new DatabaseConnectionAdapter()
	const productRepository = new ProductRepositoryMemory();
	const simulateFreight = new SimulateFreight(productRepository);
	const input = new SimulateFreightInput([
		{
			idItem: 1,
			quantity: 1
		},
		{
			idItem: 2,
			quantity: 1
		},
		{
			idItem: 3,
			quantity: 3
		}
	]);
	const freight = await simulateFreight.execute(input);
	expect(freight).toBe(280);
});