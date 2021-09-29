import Cpf from "../../src/entity/Cpf"

test("Deve validar cpf valido", () =>{
  const cpf = new Cpf("31139584073")
  expect(cpf).toBeDefined()
})

test("Deve validar cpf inválido", () =>{
  expect(() => new Cpf("31139583071")).toThrow(new Error("Invalid cpf"));
})

test("Deve validar cpf valido com pontuação", () =>{
  const cpf = new Cpf("061.584.100-71")
  expect(cpf).toBeDefined()
})

test("Deve validar cpf inválido com pontuação", () =>{
  expect(() => new Cpf("061.544.100-71")).toThrow(new Error("Invalid cpf"));
})

test("Deve validar cpf com todos digitos iguais", () =>{
  expect(() => new Cpf("000.000.000-000")).toThrow(new Error("Invalid cpf"));
})

test("Deve validar cpf com quantidade invalida de caracteres", () =>{
  expect(() => new Cpf("0")).toThrow(new Error("Invalid cpf"));
})

test("Deve validar cpf com valor vazio", () =>{
  expect(() => new Cpf("")).toThrow(new Error("Invalid cpf"));
})


test("Deve validar cpf com caracteres inválidos", () =>{
  expect(() => new Cpf("311395830YG")).toThrow(new Error("Invalid cpf"));
})