import OrderItem from "./OrderItem";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Product from "./Product";
import OrderNumber from "./OrderNumber";

export default class Order {
  private cpf: Cpf;
  items: OrderItem[];
  coupon: Coupon | undefined;
  number: OrderNumber
  shippingPrice: number;

  constructor(cpf: string, readonly issueDate: Date = new Date(), readonly sequence: number = 1) {
    this.cpf = new Cpf(cpf);
    this.items = [];
    this.number = new OrderNumber(issueDate, sequence)
    this.shippingPrice = 0;
  }

  addItem(product: Product, quantity: number) {
    this.items.push(new OrderItem(product.id, quantity, product.price));
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.issueDate)) {
      throw new Error("Coupon is expired");
    }
    this.coupon = coupon;
  }

  getItemsPrice() {
    return this.items
      .map((item) => item.getTotal())
      .reduce(
        (prevValue: number, currentValue: number) => prevValue + currentValue,
        0
      );
  }

  getTotalDiscount() {
    if(!this.coupon){
      return 0
    }
    const itemsPrice = this.getItemsPrice();
    return itemsPrice * (this.coupon?.discountPercent / 100);
  }

  getTotal() {
    return (this.getItemsPrice() + this.shippingPrice) - this.getTotalDiscount();
  }

  getShippingPrice() : number {
    return this.shippingPrice
  }

  getCpf () {
		return this.cpf.value;
	}

	getCoupon () {
		return this.coupon?.code;
	}

	getCode () {
		return this.number.value;
	}

	getOrderItems () {
		return this.items;
	}
  

}
