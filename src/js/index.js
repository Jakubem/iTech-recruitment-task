const {
  parseOutput,
  getResult,
  equationIsValid,
  triggerToast
} = require('./utils.js'); // 😎

const acBtn = document.querySelector('.button__ac');
const saveBtn = document.querySelector('.button__save');

const output = document.querySelector('.screen__output');
const equation = document.querySelector('.screen__equation');
const numbers = document.querySelector('.buttons__numbers');
const operations = document.querySelector('.buttons__operations');

// all possible operations
const operationsRegex = /\+|\-|\x|\÷/g;

// current state
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
  // check if result is ready, and data was not send yet
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
    // trigger toast message to let user know when data was send
    triggerToast();
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
  const eqValid = equationIsValid(currentVal, operationsRegex);

  if (operation === 'equals') {
    if (eqValid) {
      calculate();
      equation.value += '=';
      calculatedFinish = true;
    }
    return;
  }

  if (currentVal.match(operationsRegex) && eqValid) {
    // when operation is pressed before equals, replace result with first equation argument
    calculate();
    calculateNext(operation, displayOperation);
    return;
  } else if (currentVal.match(operationsRegex)) {
    return;
  } else {
    currentOperation = operation;
    equation.value += displayOperation;
  }
}


/**
 * calculate next equation when operation was pressed before '='
 * @param {string} displayOp - operation to be added to equation
 * @param {string} op - operation to be performed
 */
const calculateNext = (op, displayOp) => {
  const currentVal = output.innerHTML;
  equation.value = currentVal + displayOp;
  currentOperation = op;
}

const inputNumber = (key) => {
  if (equation.value === '0' && equation.value === key) {
    return;
  }
  equation.value += key;
}

const inputDecimal = (key) => {
  const currentVal = equation.value;
  // prevent input of more than 1 dot
  if (!currentVal.includes('.') && currentVal !== '') {
    equation.value = currentVal + key;
  }
}

const calculate = () => {
  const currentEquation = equation.value;
  if (equationIsValid(currentEquation, operationsRegex)) {
    // parseOutput will return array with 2 items, so we can destructure it 😎
    const [a, b] = parseOutput(currentEquation, operationsRegex);
    output.innerHTML = getResult(Number(a), Number(b), currentOperation);
  }
}