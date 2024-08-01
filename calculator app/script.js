document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentValue = '0';
    let operator = null;
    let firstValue = null;
    let secondValue = false;

    const updateDisplay = () => {
        display.textContent = currentValue;
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value >= '0' && value <= '9') {
                if (currentValue === '0' || secondValue) {
                    currentValue = value;
                    secondValue = false;
                } else {
                    currentValue += value;
                }
            } else if (value === '.') {
                if (!currentValue.includes('.')) {
                    currentValue += '.';
                }
            } else if (value === 'C') {
                currentValue = '0';
                operator = null;
                firstValue = null;
                secondValue = false;
            } else if (value === '=') {
                if (operator && firstValue !== null) {
                    currentValue = String(eval(`${firstValue} ${operator} ${currentValue}`));
                    operator = null;
                    firstValue = null;
                    secondValue = false;
                }
            } else {
                if (!secondValue) {
                    firstValue = currentValue;
                    secondValue = true;
                }
                operator = value;
            }

            updateDisplay();
        });
    });
});
