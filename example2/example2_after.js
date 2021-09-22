module.exports = {
  validate
};

const NON_DIGIT_REGEX = /\D/g

function validate(input) {
  const cpf = sanitizeCpfInput(input);
  if (cpf.length != 11 || hasOnlySameCharacter(cpf)) {
    return false;
  }
  const digit1 = calculateFirstDigit(cpf);
  const expectedCheckDigits = "" + digit1 + calculateSecondDigit(cpf, digit1);
  const checkDigits = cpf.substring(cpf.length - 2, cpf.length);
  return expectedCheckDigits == checkDigits;
}

function sanitizeCpfInput(cpf) {
  if (!cpf) {
    return "";
  }
  return cpf.replace(NON_DIGIT_REGEX, "");
}

function hasOnlySameCharacter(cpf) {
  const firstDigit = cpf[0];
  return cpf.split("").every((currentDigit) => currentDigit === firstDigit);
}

function calculateFirstDigit(cpf) {
  return calculateDigit(cpf.split("").slice(0, 9));
}

function calculateSecondDigit(cpf, firstDigit) {
  const cpfAndDigit1 = cpf.split("").slice(0, 9);
  cpfAndDigit1.push(firstDigit);
  return calculateDigit(cpfAndDigit1);
}

function calculateDigit(digits) {
  const digit = reduceDigits(digits);
  const modDigit = digit % 11;
  return modDigit < 2 ? 0 : 11 - modDigit;
}

function reduceDigits(digits) {
  const divider = digits.length + 1;
  return digits.reduce((previousValue, currentValue, index) => {
    const factor = divider - index;
    return previousValue + currentValue * factor;
  }, 0);
}
