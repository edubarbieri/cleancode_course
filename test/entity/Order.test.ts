import Coupon from "../../src/entity/Coupon"
import Dimension from "../../src/entity/Dimension"
import Order from "../../src/entity/Order"
import Product from "../../src/entity/Product"


function basicDimension(): Dimension{
  return new Dimension(1,1, 1,1)
}

test("Não deve criar pedido com CPF invalid", () => {
  const invalidCpf = "111.222.222-22"
  expect(() => new Order(invalidCpf)).toThrow()
})
test("Deve adicionar 3 items ao pedido", () => {
  const cpf = "061.584.100-71"

  const order = new Order(cpf)
  order.addItem(new Product("1", "Masculino", "Camiseta", 59.90, basicDimension()), 2)
  order.addItem(new Product("2", "Masculino", "Calça", 149.90, basicDimension()), 1)
  order.addItem(new Product("3", "Maculino", "Meia", 29.90, basicDimension()), 1)

  expect(order.items.length).toBe(3)

})

test("Deve calcular o valor total dos itens", () => {
  const cpf = "061.584.100-71"

  const order = new Order(cpf)
  order.addItem(new Product("1", "Masculino", "Camiseta", 10.0, basicDimension()), 2)
  order.addItem(new Product("2", "Masculino", "Calça", 30.0, basicDimension()), 1)
  order.addItem(new Product("3", "Maculino", "Meia", 20.0, basicDimension()), 1)

  expect(order.getItemsPrice()).toBe(70.0)

})


test("Deve calcular o total de descontos", () => {
  const cpf = "061.584.100-71"

  const order = new Order(cpf)
  order.addItem(new Product("1", "Masculino", "Camiseta", 50.00, basicDimension()), 2)
  order.addCoupon(new Coupon("1323", 30, new Date("2021-11-01"), new Date("2021-09-28")))
  expect(order.getTotalDiscount()).toBe(30.0)

})

test("Deve calcular o total do pedido incluindo discontos", () => {
  const cpf = "061.584.100-71"

  const order = new Order(cpf)
  order.addItem(new Product("1", "Masculino", "Camiseta", 50.00, basicDimension()), 2)
  order.addCoupon(new Coupon("1323", 30, new Date("2021-11-01"), new Date("2021-09-28")))
  expect(order.getTotal()).toBe(70.0)

})
test("Não deve adicionar cupom expirado", () => {
  const order = new Order("061.584.100-71")
  order.addItem(new Product("1", "Masculino", "Camiseta", 50.00, basicDimension()), 2)
  expect(() => {
    order.addCoupon(new Coupon("1323", 30, new Date("2021-11-01"), new Date("2021-12-28")))
  }).toThrow(new Error("Coupon is expired"))

})

test("Deve calcular o valor do frete", () => {
  const order = new Order("061.584.100-71")
  const dim = new Dimension(100, 30, 10, 3);
  order.addItem(new Product("1", "Guitarra", "Guitarra", 5000.00, dim), 1)
  const shippingPrice = order.getShippingPrice(1000)
  expect(shippingPrice).toBe(30)
})

test("Deve calcular o valor do frete com valor minimo de R$10,00", () => {
  const order = new Order("061.584.100-71")
  const dim = new Dimension(20, 15, 10, 1);
  order.addItem(new Product("1", "Masculino", "Camiseta", 50.00, dim), 1)
  const shippingPrice = order.getShippingPrice(1000)
  expect(shippingPrice).toBe(10)
})

test("Deve calcular o valor do frete da geladeira", () => {
  const order = new Order("061.584.100-71")
  const dim = new Dimension(200, 100, 50, 40);
  order.addItem(new Product("1", "Geladeira", "Geladeira", 5000.00, dim), 1)
  const shippingPrice = order.getShippingPrice(1000)
  expect(shippingPrice).toBe(400)
})