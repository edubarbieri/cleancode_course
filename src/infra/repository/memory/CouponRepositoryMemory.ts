import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];

  constructor() {
    this.coupons = [new Coupon("VALE20", 10, new Date("2021-11-01"))];
  }
  async findByCode(code: string): Promise<Coupon> {
    const coupon = this.coupons.find((c) => c.code === code);
    if (!coupon) {
      throw new Error("Coupon not found");
    }
    return coupon;
  }
}
