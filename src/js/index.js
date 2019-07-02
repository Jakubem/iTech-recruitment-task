const parseOutput = require('./utils.js').parseOutput;
const getResult = require('./utils.js').getResult;
const equationIsValid = require('./utils.js').equationIsValid;

const acBtn = document.querySelector('.button__ac');

const output = document.querySelector('.screen__output');
const equation = document.querySelector('.screen__equation');
const numbers = document.querySelector('.buttons__numbers');
const operations = document.querySelector('.buttons__operations');

const operationsRegex = /\+|\-|\x|\÷/g;

let currentOperation = '';
let calculatedFinish = false;

/**
 * reset all previous states
 */
const resetState = () => {
  currentOperation = '';
  equation.value = '';
  output.innerHTML = '0';
  calculatedFinish = false;
}

resetState();

acBtn.addEventListener('click', resetState);

operations.addEventListener('click', (e) => {

  if (calculatedFinish) {
    resetState();
    return;
  } else if (equation.value !== '') {
    inputOperator(e);
  }
})

numbers.addEventListener('click', (e) => {

  if (calculatedFinish) {
    resetState();
    return;
  }

  const key = e.target.dataset.value || '';

  if (key === '.') {
    inputDecimal(key);
  } else {
    inputNumber(key);
  }
});

const inputOperator = (e) => {
  const currentVal = equation.value;
  const displayOperation = e.target.innerHTML;
  const operation = e.target.dataset.operation;

  if (operation === 'equals' && equationIsValid(currentVal, operationsRegex)) {
    calculate();
    equation.value += '=';
    calculatedFinish = true;
    return;
  } else {
    if (currentVal.match(operationsRegex)) {
      calculate();
      return;
    } else {
      currentOperation = operation;
      equation.value += displayOperation;
    }
  }

}

const inputNumber = (key) => {
  equation.value += key;
}

const inputDecimal = (key) => {
  const currentVal = equation.value;
  if (!currentVal.includes('.') && currentVal !== '') {
    equation.value = currentVal + key;
  }
}

const calculate = () => {
  const currentEquation = equation.value;
  if (equationIsValid(currentEquation, operationsRegex)) {
    const [a, b] = parseOutput(currentEquation, operationsRegex);
    output.innerHTML = getResult(Number(a), Number(b), currentOperation);
  }
}