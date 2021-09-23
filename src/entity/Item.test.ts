import Item from "./Item"

test("Deve calcular o valor total do item", () => {
  const item = new Item("1", 2, 10)
  const itemPrice = item.getTotalPrice()
  expect(itemPrice).toBe(20)
})