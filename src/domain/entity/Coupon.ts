export default class Coupon {
  constructor(
    readonly code: string,
    readonly discountPercent: number,
    readonly expirationDate?: Date
  ) {}

  isExpired(currentDate: Date = new Date()): boolean {
    if (!this.expirationDate){
      return false;
    }
    return currentDate > this.expirationDate;

  }
}
