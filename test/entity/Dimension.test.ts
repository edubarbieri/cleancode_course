import Dimension from "../../src/entity/Dimension"

test("Deve calcular o volume", () => {
  const dimension = new Dimension(20, 15, 10, 1)
  const volume = dimension.calculateVolume()
  expect(volume).toBe(0.003)
})

test("Deve calcular a densidade", () => {
  const dimension = new Dimension(20, 15, 10, 1)
  const density = dimension.calculateDensity()
  expect(density).toBe(333)
})
