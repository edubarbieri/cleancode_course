import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import PlaceOrderInput from "../../src/application/dto/PlaceOrderInput";
import GetOrders from "../../src/application/query/GetOrders";
import OrderDAODatabase from "../../src/infra/dao/OrderDAODatabase";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

let placeOrder: PlaceOrder;
let getOrders: GetOrders;

beforeEach(function () {
	const databaseConnection = new DatabaseConnectionAdapter();
	placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));
	const orderDAO = new OrderDAODatabase(databaseConnection);
	getOrders = new GetOrders(orderDAO);
});

test("Deve obter um pedido pelo código", async function () {
	const input = new PlaceOrderInput(
		"847.903.332-05", 
		[
			{
				productId: 1,
				quantity: 1
			},
			{
				productId: 2,
				quantity: 1
			},
			{
				productId: 3,
				quantity: 3
			}
		], 
		new Date("2021-03-01"), 
		"VALE20"
	);
	await placeOrder.execute(input);
	const getOrdersOutput = await getOrders.execute();
});
