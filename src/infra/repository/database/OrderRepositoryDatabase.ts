import Order from "../../../domain/entity/Order";
import OrderItem from "../../../domain/entity/OrderItem";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DatabaseConnection from "../../database/DatabaseConnection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly databaseConnection: DatabaseConnection) {
	}



	async save(order: Order): Promise<void> {
		// begin
		const [orderData] = await this.databaseConnection.query(`
			insert into 
				ccca.order 
			(
				code, cpf, issue_date, freight, sequence, coupon, total
			) 
			values 
			(
				$1, $2, $3, $4, $5, $6, $7
			) 
			returning *`, 
			[
				order.getCode(), 
				order.getCpf(), 
				order.issueDate, 
				order.getShippingPrice(), 
				order.sequence, 
				order.getCoupon(),
				order.getTotal()
			]
		);
		for (const orderItem of order.getOrderItems()) {
			await this.databaseConnection.query(`
				insert into
					ccca.order_item
				(
					id_order, id_item, price, quantity
				)
				values
				(
					$1, $2, $3, $4
				)
			`, 
				[
					orderData.id, orderItem.productID, orderItem.price, orderItem.quantity
				]
			)
		}
		// commit
	}


	async findByCode(code: string): Promise<Order> {
		const [orderData] = await this.databaseConnection.query('select * from ccca.order where code = $1',[code])
		if (!orderData){
			throw new Error("Coupon not found");
		}
		const order = new Order(orderData.cpf, orderData.issue_date)
		order.shippingPrice = orderData.freight
		const itemsData = await this.databaseConnection.query('select * from ccca.order_item where id_order = $1',[orderData.id])
		for (const orderItem of itemsData) {
			order.items.push(new OrderItem(orderItem.id_item, orderItem.quantity, orderItem.price))
		}
		return order;
	}


	async findAll(): Promise<Order[]> {
		const orders: Order[] = []
		const ordersData = await this.databaseConnection.query('select * from ccca.order', [])

		for (const orderData of ordersData) {
			const order = new Order(orderData.cpf, orderData.issue_date)
			order.shippingPrice = orderData.freight
			const itemsData = await this.databaseConnection.query('select * from ccca.order_item where id_order = $1',[orderData.id])
			for (const orderItem of itemsData) {
				order.items.push(new OrderItem(orderItem.id_item, orderItem.quantity, orderItem.price))
			}
			orders.push(order)
		}
		return orders;
	}
}