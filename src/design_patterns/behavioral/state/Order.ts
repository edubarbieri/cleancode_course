import OrderStatus from "./OrderStatus";
import PendingStatus from "./PendingStatus.ts";

export default class Order {
	status: OrderStatus;

	constructor () {
		this.status = new PendingStatus(this);
	}

	confirm () {
		this.status.confirm();
	}

	cancel () {
		this.status.cancel();
	}
}
