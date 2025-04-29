class Calculator {
  constructor(currentOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
    this.justComputed = false;
  }

  removeElementsFromArray(arr) {
    const elementsToRemove = ["+", "-", "*", "/"];
    return arr.filter((item) => !elementsToRemove.includes(item));
  }

  clear() {
    this.currentOperand = "0";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (this.currentOperand === "Error!") {
      this.currentOperand = "";
    }

    if (this.justComputed) {
      this.currentOperand = "";
      this.justComputed = false;
    }
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand =
      this.currentOperand === "0"
        ? number.toString()
        : this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === 0 || this.currentOperand === "Error!") return;

    if (this.justComputed) {
      this.justComputed = false;
      this.operation = operation;
      this.currentOperand = this.currentOperand.toString() + operation;
      return;
    }
    if (this.operation) {
      this.compute();
    }
    this.operation = operation;
    this.currentOperand = this.currentOperand.toString();
    this.currentOperand += this.operation;
  }

  compute() {
    if (!this.operation) return;

    let computation;

    const [firstNumber, secondNumber] = this.currentOperand.split(
      this.operation
    );

    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);

    if (isNaN(first) || isNaN(second)) return;

    const current = parseFloat(this.currentOperand);

    if (isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = first + second;
        break;
      case "-":
        computation = first - second;
        break;
      case "*":
        computation = first * second;
        break;
      case "/":
        if (second == 0) {
          computation = "Error!";
        } else {
          computation = first / second;
        }
        break;

      default:
        return;
    }
    this.currentOperand =
      typeof computation === "number"
        ? parseFloat(computation.toFixed(2))
        : computation;
    this.operation = undefined;
    this.justComputed = true;
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
