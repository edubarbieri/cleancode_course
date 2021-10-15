import ValidateCoupon from "../../src/application/usecase/ValidateCoupon";
import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";

test("Deve validar o cupom de desconto", async function () {
	const couponRepository = new CouponRepositoryDatabase(new DatabaseConnectionAdapter());
	const validateCoupon = new ValidateCoupon(couponRepository);
	const isValid = await validateCoupon.execute("VALE20", new Date("2021-10-01"));
	expect(isValid).toBeTruthy();
});