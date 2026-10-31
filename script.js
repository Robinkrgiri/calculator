let currentNumber = "0";
let previousNumber = "";
let operator = null;
let shouldResetScreen = false;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");


// Display number
function updateDisplay() {
    currentDisplay.innerText = currentNumber;
    previousDisplay.innerText = previousNumber;
}


// Add number
function appendNumber(number) {

    if (shouldResetScreen) {
        currentNumber = "";
        shouldResetScreen = false;
    }

    // Prevent multiple decimal points
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    // Prevent leading zero
    if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


// Select operator
function chooseOperator(selectedOperator) {

    if (operator !== null && !shouldResetScreen) {
        calculate();
    }

    previousNumber = currentNumber;
    operator = selectedOperator;
    shouldResetScreen = true;

    updateDisplay();
}


// Calculate result
function calculate() {

    if (operator === null || previousNumber === "") {
        return;
    }

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operator = null;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    // Remove unnecessary decimal digits
    result = Number(result.toFixed(10));

    currentNumber = result.toString();
    previousNumber = "";
    operator = null;
    shouldResetScreen = true;

    updateDisplay();
}


// Clear calculator
function clearCalculator() {

    currentNumber = "0";
    previousNumber = "";
    operator = null;
    shouldResetScreen = false;

    updateDisplay();
}


// Delete last number
function deleteNumber() {

    if (shouldResetScreen || currentNumber === "Error") {
        return;
    }

    if (currentNumber.length === 1) {
        currentNumber = "0";
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }

    updateDisplay();
}


// Percentage
function percentage() {

    if (currentNumber === "Error") {
        return;
    }

    currentNumber = (parseFloat(currentNumber) / 100).toString();

    updateDisplay();
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    // Decimal
    else if (key === ".") {
        appendNumber(".");
    }

    // Operators
    else if (key === "+") {
        chooseOperator("+");
    }

    else if (key === "-") {
        chooseOperator("-");
    }

    else if (key === "*") {
        chooseOperator("*");
    }

    else if (key === "/") {
        event.preventDefault();
        chooseOperator("/");
    }

    // Enter or =
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        deleteNumber();
    }

    // Escape
    else if (key === "Escape") {
        clearCalculator();
    }

    // Percentage
    else if (key === "%") {
        percentage();
    }

});