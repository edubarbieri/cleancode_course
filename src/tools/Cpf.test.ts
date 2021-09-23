import * as Cpf from "./Cpf"

test("Deve validar cpf valido", () =>{
  const cpf = "31139584073"
  const valid = Cpf.validate(cpf);
  expect(valid).toBeTruthy()
})

test("Deve validar cpf inválido", () =>{
  const cpf = "31139583071"
  const valid = Cpf.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf valido com pontuação", () =>{
  const cpf = "061.584.100-71"
  const valid = Cpf.validate(cpf);
  expect(valid).toBeTruthy()
})

test("Deve validar cpf inválido com pontuação", () =>{
  const cpf = "061.544.100-71"
  const valid = Cpf.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf com todos digitos iguais", () =>{
  const cpf = "000.000.000-000"
  const valid = Cpf.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf com quantidade invalida de caracteres", () =>{
  const cpf = "0";
  const valid = Cpf.validate(cpf);
  expect(valid).toBeFalsy()
})

test("Deve validar cpf com valor vazio", () =>{
  const cpf = ""
  const valid = Cpf.validate(cpf);
  expect(valid).toBeFalsy()
})


test("Deve validar cpf com caracteres inválidos", () =>{
  const cpf = "311395830YG"
  const valid = Cpf.validate(cpf);
  expect(valid).toBeFalsy()
})