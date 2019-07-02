const parseOutput = require('./utils.js').parseOutput;
const getResult = require('./utils.js').getResult;
const equationIsValid = require('./utils.js').equationIsValid;

const acBtn = document.querySelector('.button__ac');
const saveBtn = document.querySelector('.button__save');

const output = document.querySelector('.screen__output');
const equation = document.querySelector('.screen__equation');
const numbers = document.querySelector('.buttons__numbers');
const operations = document.querySelector('.buttons__operations');

const operationsRegex = /\+|\-|\x|\÷/g;

let currentOperation = '';
let calculatedFinish = false;
let dataSend = false;

/**
 * send result to server to save it as csv
 */
const saveToCsv = () => {
  const data = {
    result: output.value
  }
  if (calculatedFinish && dataSend !== true) {
    fetch('save_csv.php', {
      method: 'POST',
      mode: "same-origin",
      credentials: "same-origin",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dataSend = true;
  }
}

saveBtn.addEventListener('click', () => {
  saveToCsv();
});

/**
 * reset all previous states
 */
const resetState = () => {
  currentOperation = '';
  equation.value = '';
  output.innerHTML = '0';
  calculatedFinish = false;
  dataSend = false;
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