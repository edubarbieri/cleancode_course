import Dimension from "./Dimension";

export default class Product {
  constructor(
    readonly id: string,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly dimension: Dimension
  ) {}
}
