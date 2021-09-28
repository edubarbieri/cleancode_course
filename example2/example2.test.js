const example2 = require('./example2_after')

test("Deve validar cpf", () =>{
  const cpf = "31139584073"
  const valid = example2.validate(cpf);
  expect(valid).toBeTruthy()
})

test("Deve tentar validar cpf inválido", () =>{
  const cpf = "31139583071"
  const valid = example2.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf valido com pontuação", () =>{
  const cpf = "061.584.100-71"
  const valid = example2.validate(cpf);
  expect(valid).toBeTruthy()
})

test("Deve validar cpf inválido com pontuação", () =>{
  const cpf = "061.544.100-71"
  const valid = example2.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf com todos digitos iguais", () =>{
  const cpf = "000.000.000-000"
  const valid = example2.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf com quantidade invalida de caracteres", () =>{
  const cpf = "0"
  const valid = example2.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf com valor null", () =>{
  const cpf = null
  const valid = example2.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf com valor undefined", () =>{
  const cpf = undefined
  const valid = example2.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf com caracteres inválidos", () =>{
  const cpf = "311395830YG"
  const valid = example2.validate(cpf);
  expect(valid).toBeFalsy()
})