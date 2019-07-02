/**
 * convert string output to a and b values
 * @param {str} eq - equation to be converted to array
 * @param {regex} regex - chars for equation to be split on
 */
const parseOutput = (eq, regex) => {
  const vals = eq.split(regex);
  return vals;
}

/**
 * return result of given equation
 * @param {number} a - first character of the operation
 * @param {number} b - second character of the operation
 * @param {string} operation - operation to be performed
 */
const getResult = (a, b, operation) => {
  switch (operation) {
    case "add":
      const add = a + b;
      return Number.isInteger(add) ? add : add.toFixed(2);
      break;
    case "subtract":
      const subtract = a - b;
      return Number.isInteger(subtract) ? subtract : subtract.toFixed(2);
      break;
    case "divide":
      const divide = a / b
      return Number.isInteger(divide) ? divide : divide.toFixed(2);
      break;
    case "multiply":
      const multiply = a * b;
      return Number.isInteger(multiply) ? multiply : multiply.toFixed(2);
      break;
    default:
      console.error(`${operation} is not a valid operation`);
  }
}

/**
 * check if the equation has 2 arguments
 * @param {str} eq - equation to be passed
 * @param {regex} regex - chars for equation to be split on
 */
const equationIsValid = (eq, regex) => {
  const arr = eq.split(regex);
  return arr.length === 2 && !arr.includes('');
}

// create tag for toast message
const toastMsg = (msg) => {
  const tag = document.createElement('p');
  tag.classList.add('toast-msg');
  tag.innerHTML = msg;
  return tag;
}

// create custom toast message to let user know that result was submitted to the server
const triggerToast = () => {
  const toastContainer = document.querySelector('.toast');
  toastContainer.appendChild(toastMsg('Result saved!'));
  setTimeout(() => {
    toastContainer.innerHTML = "";
  }, 3000);
}

module.exports = {
  parseOutput,
  getResult,
  equationIsValid,
  triggerToast
}