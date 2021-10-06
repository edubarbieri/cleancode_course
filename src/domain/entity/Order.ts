import OrderItem from "./OrderItem";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Product from "./Product";

export default class Order {
  private cpf: Cpf;
  items: OrderItem[];
  coupons: Coupon[];

  constructor(cpf: string, readonly issueDate: Date = new Date()) {
    this.cpf = new Cpf(cpf);
    this.items = [];
    this.coupons = [];
  }

  addItem(product: Product, quantity: number) {
    this.items.push(new OrderItem(product, quantity, product.price));
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.issueDate)) {
      throw new Error("Coupon is expired");
    }
    this.coupons.push(coupon);
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
    const itemsPrice = this.getItemsPrice();
    return this.coupons
      .map((coupon) => coupon.discountPercent)
      .reduce((prevValue: number, currentValue: number) => {
        const discount = itemsPrice * (currentValue / 100);
        return prevValue + discount;
      }, 0);
  }

  getTotal() {
    return this.getItemsPrice() - this.getTotalDiscount();
  }

  getShippingPrice(distance: number) : number {
    return this.items
      .map(item => item.getShippingPrice(distance))
      .reduce((previous: number, current: number) => previous + current, 0)
  }
  

}
