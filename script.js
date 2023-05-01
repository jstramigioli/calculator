function add(num1, num2) {
    return (parseFloat(num1)+parseFloat(num2))
}

function substract(num1, num2) {
    return (num1-num2)
}

function multiply(num1, num2) {
    return (num1*num2)
}

function divide(num1, num2) {
    return (num1/num2)
}

let operand1
let operand2
let operator

let maxCharDisplay = 11

const btns = document.querySelectorAll('.button');

const display = document.querySelector('.display')

function operate(operand1, operand2, operator) {
    if (operand2 && operator) {
        switch(operator) {
            case '+' : 
                var result = add(operand1, operand2);
                break;
            case '-' :
                var result = substract(operand1, operand2);
                break;
            case '*' :
                var result = multiply(operand1, operand2);
                break;
            case '/' :
                var result = divide(operand1, operand2);
                break;
            default:
                console.log('Operator not found');
                break;
        }
        if (result % 1 != 0) { // Check if the result has decimals
            return result.toFixed(2);
        } else {
            return parseInt(result);
        }
    }
    else return operand1
}

function addBtnEventListener() {
   for (let i=0; i < btns.length; i++) {
    btns[i].addEventListener('click', buttonPressed)
   }
}

function addKeyEventListener() {
    document.addEventListener('keydown', function(event) {
        const keyPressed = event.key;
        const button = document.querySelector(`button[data-key="${keyPressed}"]`);
  if (button) {
    button.click();
  }
    })
}

function buttonPressed(e) {
    updateOperands(e.target);
    updateDisplay(e.target.id);
    console.log(e.target.classList)
}

function updateOperands(charToUpdate) {
    if (charToUpdate.classList.contains('operator')) {
        if (operand2) {
            operand1 = operate(operand1, operand2, operator)
            operand2 = undefined
            operator = charToUpdate.id
        }
        else {
            operator = charToUpdate.id
        }
    }
    else if (charToUpdate.classList.contains('number')) {
        if (operator) {
            if (operand2 == undefined) {
                operand2 = parseFloat(charToUpdate.id)
            }
            else {
            operand2 += charToUpdate.id 
            }
         }
         else {
            if (operand1 == undefined) {
                operand1 = parseFloat(charToUpdate.id) 
            }
            else {
            operand1 += charToUpdate.id 
            }
         }
    }
    else if (charToUpdate.id == 'clear') {
        operand1 = undefined
        operand2 = undefined
        operator = undefined
    }
    else if (charToUpdate.id == 'equals') {
        operand1 = operate(operand1, operand2, operator)
        operand2 = undefined
        operator = undefined
    }
    else if (charToUpdate.id == 'back') {
        if (operand2) {
            operand2 = operand2.slice(0, -1)
        }
        else if (operator) {
            operator = undefined
        }
        else if (operand1) {
            operand1 = operand1.slice(0, -1)
        }
    }
}

function updateDisplay(charToShow) {
    if (operand2) {
        display.textContent = operand1+operator+operand2
    }
    else if (operator) {
        display.textContent = operand1+operator
    }
    else if (operand1) {
        display.textContent = operand1
    }
    else {display.textContent = ' '}
}



addBtnEventListener()
addKeyEventListener()