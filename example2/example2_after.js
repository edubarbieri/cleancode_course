module.exports = {
  validate
};

const NON_DIGIT_REGEX = /\D/g

function validate(input) {
  const cpf = sanitizeCpfInput(input);
  if (cpf.length != 11 || hasOnlySameCharacter(cpf)) {
    return false;
  }
  const expectedCheckDigits = `${calculateFirstDigit(cpf)}${calculateSecondDigit(cpf)}`;
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
  return [...cpf].every((currentDigit) => currentDigit === firstDigit);
}

function calculateFirstDigit(cpf) {
  return calculateDigit([...cpf].slice(0, 9));
}

function calculateSecondDigit(cpf) {
  const cpfAndDigit1 = [...cpf].slice(0, 10);
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
    return previousValue + parseInt(currentValue) * factor;
  }, 0);
}