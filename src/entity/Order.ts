import OrderItem from "./OrderItem";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Product from "./Product";

export default class Order {
  cpf: Cpf;
  items: OrderItem[];
  coupons: Coupon[];
  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.items = [];
    this.coupons = [];
  }

  addItem(product: Product, quantity: number) {
    this.items.push(new OrderItem(product, quantity, product.price));
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired()) {
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

  getShippingPrice(distance: number) {
    const dimensions = this.items
      .map((item) => item.product)
      .map((product) => product.dimension);
    let price = 0;
    for (const dimension of dimensions) {
      price += distance * dimension.calculateVolume() * (dimension.calculateDensity() / 100)
    }
    return price < 10 ? 10.0 : price
  }
}
