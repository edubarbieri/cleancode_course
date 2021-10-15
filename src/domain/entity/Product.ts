import Dimension from "./Dimension";

export default class Product {
  constructor(
    readonly id: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly dimension: Dimension
  ) {}
}
