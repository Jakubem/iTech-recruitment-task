/**
 * convert string output to a and b values
 * @param {string} eq - equation to be converted to array
 * @param {regex} regex - chars for equation to be split on
 */
const parseOutput = (eq, regex) => {
  const vals = eq.split(regex);
  return vals;
}

/** TODO: do isInteger once
 * return result of given equation
 * @param {number} a - first character of the operation
 * @param {number} b - second character of the operation
 * @param {string} operation - operation to be performed
 */
const getResult = (a, b, operation) => {
  let value = '';
  switch (operation) {
    case "add":
      value = a + b;
      break;
    case "subtract":
      value = a - b;
      break;
    case "divide":
      value = a / b
      break;
    case "multiply":
      value = a * b;
      break;
    default:
      console.error(`${operation} is not a valid operation`);
  }
  return Number.isInteger(value) ? value : value.toFixed(2);
}

/**
 * check if the equation has 2 arguments
 * @param {string} eq - equation to be passed
 * @param {regex} regex - chars for equation to be split on
 */
const equationIsValid = (eq, regex) => {
  const arr = eq.split(regex);
  return arr.length === 2 && !arr.includes('');
}

/**
 * create <p> tag for toast message
 * @param {string} msg - message to be displayed
 */
const toastMsg = (msg) => {
  const tag = document.createElement('p');
  tag.classList.add('toast-msg');
  tag.innerHTML = msg;
  return tag;
}

/**
 * create custom toast message to let user know that result was submitted to the server
 */
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