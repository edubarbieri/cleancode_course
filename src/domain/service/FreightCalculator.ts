import Product from "../entity/Product";

export default class FreightCalculator {
  static calculate(item: Product) {
    const dim = item.dimension;
    const freight =
      1000 * dim.calculateVolume() * (dim.calculateDensity() / 100);
    return freight < 10 ? 10 : freight;
  }
}
