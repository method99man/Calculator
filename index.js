const buttonContainer = document.querySelector(".buttons-container");
const mainContainer = document.querySelector(".container");
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let firstNumber,
  secondNumber,
  operator,
  calculation = [];

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}
function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
      break;
    case "-":
      return subtract(firstNumber, secondNumber);
      break;
    case "*":
      return multiply(firstNumber, secondNumber);
      break;
    case "/":
      return divide(firstNumber, secondNumber);
      break;
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculation.push(btn.textContent);
    console.log(calculation);
  });
});
