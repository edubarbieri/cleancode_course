export default class Item {
  constructor(private description: string, 
    private quantity: number,
    private price: number){}

  getTotalPrice(): number {
    return this.quantity * this.price;
  }
}