$(document).ready(function() {
    let display = $('#result');
    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';
    let calculationDone = false;
    
    // Handle number clicks
    $('.number').click(function() {
        const value = $(this).text();
        
        // If calculation was just done, start fresh
        if (calculationDone) {
            currentInput = value;
            calculationDone = false;
        } else {
            currentInput += value;
        }
        
        updateDisplay();
    });
    
    // Handle decimal click
    $('.decimal').click(function() {
        // If calculation was just done, start fresh with "0."
        if (calculationDone) {
            currentInput = '0.';
            calculationDone = false;
        } else if (currentInput.indexOf('.') === -1) {
            // Only add decimal if one doesn't exist already
            currentInput = currentInput === '' ? '0.' : currentInput + '.';
        }
        
        updateDisplay();
    });
    
    // Handle operator clicks
    $('.operator').click(function() {
        const operator = $(this).text();
        
        // If we already have both inputs and an operator, calculate first
        if (previousInput !== '' && currentInput !== '' && currentOperator !== '') {
            calculate();
        }
        
        // Set up for next calculation
        if (currentInput !== '') {
            previousInput = currentInput;
            currentInput = '';
            currentOperator = operator;
            calculationDone = false;
        } else if (calculationDone) {
            // Allow changing operator after calculation
            currentOperator = operator;
            calculationDone = false;
        }
    });
    
    // Handle equals button
    $('.equals').click(function() {
        if (previousInput !== '' && currentInput !== '' && currentOperator !== '') {
            calculate();
        }
    });
    
    // Handle clear button
    $('.clear').click(function() {
        clear();
        updateDisplay();
    });
    
    // Handle backspace button
    $('.backspace').click(function() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }
    });
    
    // Function to calculate result
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch (currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Tidak bisa membagi dengan nol!');
                    clear();
                    return;
                }
                result = prev / current;
                break;
        }
        
        // Limit result to avoid display overflow
        result = parseFloat(result.toFixed(8));
        
        // Format result to avoid unnecessary decimals
        result = result.toString();
        
        // Update values for next calculation
        currentInput = result;
        previousInput = '';
        currentOperator = '';
        calculationDone = true;
        
        updateDisplay();
    }
    
    // Function to clear calculator
    function clear() {
        currentInput = '';
        previousInput = '';
        currentOperator = '';
        calculationDone = false;
    }
    
    // Function to update display
    function updateDisplay() {
        display.val(currentInput || '0');
    }
    
    // Initialize display
    updateDisplay();
});