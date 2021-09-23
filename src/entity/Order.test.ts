import Coupon from "./Coupon"
import Item from "./Item"
import Order from "./Order"

test("Não deve criar pedido com CPF invalid", () => {
  const invalidCpf = "111.222.222-22"
  expect(() => new Order(invalidCpf)).toThrow()
})
test("Deve adicionar 3 items ao pedido", () => {
  const cpf = "061.584.100-71"

  const order = new Order(cpf)
  order.addItem(new Item("Camiseta", 2, 59.90))
  order.addItem(new Item("Calça", 1, 149.90))
  order.addItem(new Item("Meia", 1, 29.90))

  expect(order.items.length).toBe(3)

})

test("Deve calcular o valor total dos itens", () => {
  const cpf = "061.584.100-71"

  const order = new Order(cpf)
  order.addItem(new Item("Camiseta", 2, 10.00))
  order.addItem(new Item("Calça", 1, 20.0))
  order.addItem(new Item("Meia", 1, 30.00))

  expect(order.getItemsPrice()).toBe(70.0)

})


test("Deve calcular o total de descontos", () => {
  const cpf = "061.584.100-71"

  const order = new Order(cpf)
  order.addItem(new Item("Camiseta", 2, 50.00))
  order.addCoupon(new Coupon("1323", 30))
  expect(order.getTotalDiscount()).toBe(30.0)

})

test("Deve calcular o total do pedido incluindo discontos", () => {
  const cpf = "061.584.100-71"

  const order = new Order(cpf)
  order.addItem(new Item("Camiseta", 2, 50.00))
  order.addCoupon(new Coupon("1323", 30))
  expect(order.getTotalPrice()).toBe(70.0)

})