import Dimension from "../../src/domain/entity/Dimension"
import Product from "../../src/domain/entity/Product"
import OrderItem from "../../src/domain/entity/OrderItem"

test("Deve calcular o valor do frete", () => {
  const dim = new Dimension(100, 30, 10, 3);
  const product = new Product("1", "Guitarra", "Guitarra", 5000.00, dim)
  const orderItem = new OrderItem(product, 1, 50);
  const shippingPrice = orderItem.getShippingPrice(1000)
  expect(shippingPrice).toBe(30)
})

test("Deve calcular o valor do frete com valor minimo de R$10,00", () => {
  const dim = new Dimension(20, 15, 10, 1);
  const product = new Product("1", "Masculino", "Camiseta", 50.00, dim);
  const orderItem = new OrderItem(product, 1, product.price);
  const shippingPrice = orderItem.getShippingPrice(1000)
  expect(shippingPrice).toBe(10)
})

test("Deve calcular o valor do frete da geladeira", () => {
  const dim = new Dimension(200, 100, 50, 40);
  const product = new Product("1", "Geladeira", "Geladeira", 5000.00, dim)
  const orderItem = new OrderItem(product, 1, product.price);
  const shippingPrice = orderItem.getShippingPrice(1000)
  expect(shippingPrice).toBe(400)
})