class Calculator {
  constructor(currentOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  removeElementsFromArray(arr) {
    const elementsToRemove = ["+", "-", "*", "/"];
    return arr.filter((item) => !elementsToRemove.includes(item));
  }

  clear() {
    this.currentOperand = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === 0 || this.currentOperand === "") return;
    if (this.currentOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.currentOperand += this.operation;
  }

  compute() {
    let computation;
    let listOfNumbers = this.removeElementsFromArray([...this.currentOperand]);
    console.log(listOfNumbers);

    const current = parseFloat(this.currentOperand);

    if (isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = Number(listOfNumbers[0]) + Number(listOfNumbers[1]);
        break;
      case "-":
        computation = Number(listOfNumbers[0]) - Number(listOfNumbers[1]);
        break;
      case "*":
        computation = Number(listOfNumbers[0]) * Number(listOfNumbers[1]);
        break;
      case "/":
        computation = Number(listOfNumbers[0]) / Number(listOfNumbers[1]);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-delete]");
const currentOperandTextElement = document.querySelector(".display");

const calculator = new Calculator(currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
