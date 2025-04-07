// https://www.youtube.com/watch?v=_x8mNUBhLSk
// https://www.youtube.com/watch?v=I5kj-YsmWjM&t=10s
// https://www.youtube.com/watch?v=j59qQ7YWLxw

function updateDisplay() {
  display.textContent = displayValue;
  if (displayValue.length > 9) {
    display.innerText = displayValue.substring(0, 9);
  }
}

updateDisplay();

function clickButton() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      if (buttons[i].classList.contains("operand")) {
        inputOperand(buttons[i].value);
        updateDisplay();
      } else if (buttons[i].classList.contains("operator")) {
        inputOperator(buttons[i].value);
      } else if (buttons[i].classList.contains("equals")) {
        inputEquals();
        updateDisplay();
      } else if (buttons[i].classList.contains("decimal")) {
        inputDecimal(buttons[i].value);
        updateDisplay();
      } else if (buttons[i].classList.contains("sign")) {
        inputSign(displayValue);
        updateDisplay();
      } else if (buttons[i].classList.contains("clear")) clearDisplay();
      updateDisplay();
    });
  }
}

clickButton();

function inputOperand(operand) {
  if (firstOperator === null) {
    if (displayValue === "0" || displayValue === 0) {
      //1st click - handles first operand input
      displayValue = operand;
    } else if (displayValue === firstOperand) {
      //starts new operation after inputEquals()
      displayValue = operand;
    } else {
      displayValue += operand;
    }
  } else {
    //3rd/5th click - inputs to secondOperand
    if (displayValue === firstOperand) {
      displayValue = operand;
    } else {
      displayValue += operand;
    }
  }
}

function inputOperator(operator) {
  if (firstOperator != null && secondOperator === null) {
    //4th click - handles input of second operator
    secondOperator = operator;
    secondOperand = displayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      firstOperator
    );
    displayValue = roundAccurately(result, 15).toString();
    firstOperand = displayValue;
    result = null;
  } else if (firstOperator != null && secondOperator != null) {
    //6th click - new secondOperator
    secondOperand = displayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      secondOperator
    );
    secondOperator = operator;
    displayValue = roundAccurately(result, 15).toString();
    firstOperand = displayValue;
    result = null;
  } else {
    //2nd click - handles first operator input
    firstOperator = operator;
    firstOperand = displayValue;
  }
}

function clearDisplay() {
  displayValue = 0;
  firstOperand = null;
  secondOperand = null;
  firstOperator = null;
  secondOperator = null;
  result = 0;
}

function inputBackspace() {
  if (firstOperand != null) {
    firstOperand = null;
    updateDisplay();
  }
}

// function operate(x, y, op) {
//   if (op === "+") {
//     return x + y;
//   } else if (op === "-") {
//     return x - y;
//   } else if (op === "*") {
//     return x * y;
//   } else if (op === "/") {
//     if (y === 0) {
//       return "lmao";
//     } else {
//       return x / y;
//     }
//   }
// }

function roundAccurately(num, places) {
  return parseFloat(Math.round(num + "e" + places) + "e-" + places);
}

///////////////////////////////////////////////////////////////////////

// function add(firstNumber, secondNumber) {
//   return firstNumber + secondNumber;
// }
// function subtract(firstNumber, secondNumber) {
//   return firstNumber - secondNumber;
// }
// function multiply(firstNumber, secondNumber) {
//   return firstNumber * secondNumber;
// }
// function divide(firstNumber, secondNumber) {
//   return firstNumber / secondNumber;
// }

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      // return add(firstNumber, secondNumber);
      return firstNumber + secondNumber;
      break;
    case "-":
      // return subtract(firstNumber, secondNumber);
      return firstNumber - secondNumber;
      break;
    case "*":
      // return multiply(firstNumber, secondNumber);
      return firstNumber * secondNumber;
      break;
    case "/":
      // return divide(firstNumber, secondNumber);
      return firstNumber / secondNumber;
      break;
    case secondNumber === 0:
      return "yoooooooooooo!!!";
      break;
  }
}

function updateOperations() {
  firstNumber = Number(calculation.shift());
  operator = calculation.shift();
  secondNumber = Number(calculation.shift());

  calculation.push(operate(firstNumber, operator, secondNumber));
}

function clear() {
  calculation = [];
  display.value = 0;
}

// function updateNum() {}

// buttons.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     if (btn.textContent == "=" && calculation.length == 3) updateOperations();
//     else if (btn.textContent == "C") clear();
//     else {
//       calculation.push(btn.textContent);

//       if (calculation[0] == Number && calculation[1]) {
//         calculation = [];
//         calculation.push(add(calculation[0], calculation[1]));
//       }
//       if (!specialSigns.includes(calculation[calculation.length - 1]))
//         display.value = calculation[calculation.length - 1];
//     }
//   });
// });

// //////////////////////////////////////////////////////////////////////////////////////////////
const buttonContainer = document.querySelector(".buttons-container");
const mainContainer = document.querySelector(".container");
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      // return add(firstNumber, secondNumber);
      return firstNumber + secondNumber;
      break;
    case "-":
      // return subtract(firstNumber, secondNumber);
      return firstNumber - secondNumber;
      break;
    case "*":
      // return multiply(firstNumber, secondNumber);
      return firstNumber * secondNumber;
      break;
    case "/":
      // return divide(firstNumber, secondNumber);
      return Number(firstNumber / secondNumber).toFixed(2);
      break;
    case secondNumber === 0:
      return "yoooooooooooo!!!";
      break;
  }
}

// adding event for all buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn.value);
  });
});

function updateDisplay() {
  display.value = displayValue;
}

updateDisplay();
