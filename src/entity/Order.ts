import Item from "./Item";
import * as Cpf from "../tools/Cpf";
import Coupon from "./Coupon";

export default class Order {
  items: Item[];
  coupons: Coupon[];
  constructor(private cpf: string) {
    if (!Cpf.validate(this.cpf)) {
      throw new Error("Invalid Cpf");
    }
    this.items = [];
    this.coupons = [];
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  addCoupon(coupon: Coupon) {
    this.coupons.push(coupon);
  }

  getItemsPrice() {
    return this.items
      .map((item) => item.getTotalPrice())
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
        const discount = itemsPrice * (currentValue / 100)
        return prevValue + discount 
      }, 0);
  }

  getTotalPrice() {
    return this.getItemsPrice() - this.getTotalDiscount();
  }
}
