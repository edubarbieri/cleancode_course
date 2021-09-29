import Product from "./Product";

export default class OrderItem {
  constructor(readonly product: Product, 
    readonly quantity: number,
    readonly price: number){}

  getTotal(): number {
    return this.quantity * this.price;
  }
}