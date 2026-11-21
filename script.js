
let expression = "";

const display = document.getElementById("display");

function updateDisplay() {
    display.value = expression || "0";
}

function appendValue(value) {
    if (expression === "Error") {
        expression = "";
    }

    if (expression.length >= 100) return;

    expression += value;
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    if (!expression) return;

    try {
        // Allow only numbers and arithmetic operators
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        // Evaluate the arithmetic expression
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        expression = String(
            Number(result.toPrecision(12))
        );

        updateDisplay();

    } catch (error) {
        expression = "Error";
        updateDisplay();
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {

    if (/^[0-9.+\-*/%()]$/.test(event.key)) {
        appendValue(event.key);
    }

    else if (event.key === "Enter" || event.key === "=") {
        calculateResult();
    }

    else if (event.key === "Backspace") {
        deleteLast();
    }

    else if (event.key === "Escape") {
        clearDisplay();
    }

});
