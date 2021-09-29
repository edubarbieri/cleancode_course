export default class Dimension {
  
  constructor(
    readonly height: number,
    readonly width: number,
    readonly length: number,
    readonly weight: number
  ) {}
  calculateVolume() {
    return (this.height * this.width * this.length) / 1000 / 1000
  }

  calculateDensity() {
    return Math.trunc(this.weight / this.calculateVolume())
  }
}
