export default class Coupon {
  constructor(
    readonly code: string,
    readonly discountPercent: number,
    readonly expirationDate: Date,
    readonly currentDate: Date
  ) {}

  isExpired(): boolean {
    return this.currentDate > this.expirationDate;
  }
}
