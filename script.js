
let display = document.getElementById("display");
let previous = document.getElementById("previous");

let currentInput = "";

function appendNumber(number) {
  currentInput += number;
  display.textContent = currentInput;
}

function appendOperator(operator) {
  if (currentInput === "") return;

  let lastChar = currentInput.slice(-1);

  if (["+", "-", "*", "/"].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }

  currentInput += operator;
  display.textContent = currentInput;
}

function appendDecimal() {
  let parts = currentInput.split(/[+\-*/]/);
  let lastNumber = parts[parts.length - 1];

  if (lastNumber.includes(".")) return;

  if (lastNumber === "") {
    currentInput += "0";
  }

  currentInput += ".";
  display.textContent = currentInput;
}

function calculate() {
  try {
    if (!currentInput) return;

    let expression = currentInput;

    // Prevent incomplete calculations
    if (/[+\-*/.]$/.test(expression)) return;

    // Prevent division by zero
    if (/\/0+(?:\.0+)?(?![\d.])/.test(expression)) {
      display.textContent = "Cannot divide by zero";
      currentInput = "";
      return;
    }

    let result = Function(
      '"use strict"; return (' + expression + ')'
    )();

    if (!Number.isFinite(result)) {
      display.textContent = "Error";
      currentInput = "";
      return;
    }

    previous.textContent = expression + " =";

    currentInput = String(
      Number(result.toFixed(10))
    );

    display.textContent = currentInput;

  } catch (error) {
    display.textContent = "Error";
    currentInput = "";
  }
}

function clearDisplay() {
  currentInput = "";
  display.textContent = "0";
  previous.textContent = "";
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);

  display.textContent = currentInput || "0";
}
