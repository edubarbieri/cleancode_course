export default class Cpf {
  NON_DIGIT_REGEX = /\D/g
  value: string;
  
  constructor(value: string){
    if (!this.validate(value)) throw new Error("Invalid cpf");
    this.value = value;
  }

  validate(input: string) {
    const cpf = this.sanitizeCpfInput(input);
    if (cpf.length != 11 || this.hasOnlySameCharacter(cpf)) {
      return false;
    }
    const expectedCheckDigits = `${this.calculateFirstDigit(cpf)}${this.calculateSecondDigit(cpf)}`;
    const checkDigits = cpf.substring(cpf.length - 2, cpf.length);
    return expectedCheckDigits == checkDigits;
  }
  
  sanitizeCpfInput(cpf: string) {
    if (!cpf) {
      return "";
    }
    return cpf.replace(this.NON_DIGIT_REGEX, "");
  }
  
  hasOnlySameCharacter(cpf: string) {
    const firstDigit = cpf[0];
    return [...cpf].every((currentDigit) => currentDigit === firstDigit);
  }
  
  calculateFirstDigit(cpf: string) {
    return this.calculateDigit([...cpf].slice(0, 9));
  }
  
  calculateSecondDigit(cpf: string) {
    const cpfAndDigit1 = [...cpf].slice(0, 10);
    return this.calculateDigit(cpfAndDigit1);
  }
  
  calculateDigit(digits: string[]) {
    const digit = this.reduceDigits(digits);
    const modDigit = digit % 11;
    return modDigit < 2 ? 0 : 11 - modDigit;
  }
  
  reduceDigits(digits: string[]) {
    const divider = digits.length + 1;
    return digits.reduce((previousValue, currentValue, index) => {
      const factor = divider - index;
      return previousValue + parseInt(currentValue) * factor;
    }, 0);
  }
}


