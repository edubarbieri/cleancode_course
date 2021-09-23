
const NON_DIGIT_REGEX = /\D/g

export function validate(input: string) {
  const cpf = sanitizeCpfInput(input);
  if (cpf.length != 11 || hasOnlySameCharacter(cpf)) {
    return false;
  }
  const digit1 = calculateFirstDigit(cpf);
  const expectedCheckDigits = "" + digit1 + calculateSecondDigit(cpf, digit1);
  const checkDigits = cpf.substring(cpf.length - 2, cpf.length);
  return expectedCheckDigits == checkDigits;
}

function sanitizeCpfInput(cpf: string) {
  if (!cpf) {
    return "";
  }
  return cpf.replace(NON_DIGIT_REGEX, "");
}

function hasOnlySameCharacter(cpf: string) {
  const firstDigit = cpf[0];
  return cpf.split("").every((currentDigit) => currentDigit === firstDigit);
}

function calculateFirstDigit(cpf: string) {
  return calculateDigit(cpf.split("").slice(0, 9));
}

function calculateSecondDigit(cpf: string, firstDigit: number) {
  const cpfAndDigit1 = cpf.split("").slice(0, 9);
  cpfAndDigit1.push(firstDigit.toString());
  return calculateDigit(cpfAndDigit1);
}

function calculateDigit(digits: string[]) {
  const digit = reduceDigits(digits);
  const modDigit = digit % 11;
  return modDigit < 2 ? 0 : 11 - modDigit;
}

function reduceDigits(digits: string[]) {
  const divider = digits.length + 1;
  return digits.reduce((previousValue, currentValue, index) => {
    const factor = divider - index;
    return previousValue + parseInt(currentValue) * factor;
  }, 0);
}
