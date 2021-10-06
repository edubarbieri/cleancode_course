import Product from "./Product";

export default class OrderItem {
  constructor(readonly product: Product, 
    readonly quantity: number,
    readonly price: number){}

  getTotal(): number {
    return this.quantity * this.price;
  }

  getShippingPrice(distance: number) {
    const dimension = this.product.dimension;
    let price = distance * dimension.calculateVolume() * (dimension.calculateDensity() / 100)
    return (price < 10 ? 10.0 : price) * this.quantity
  }
}