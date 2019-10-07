/*
Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
o código, conforme vimos na aula anterior. Quebrar as responsabilidades
em funções, onde cada função faça somente uma única coisa, e faça bem feito.

- Remova as duplicações de código;
- agrupe os códigos que estão soltos em funções (declarações de variáveis,
listeners de eventos, etc);
- faça refactories para melhorar esse código, mas de forma que o mantenha com a
mesma funcionalidade.
*/

const $visor = selectByQuery('[data-js="visor"]');
const $buttonsNumbers = selectByQuery('[data-js="button-number"]');
const $buttonsOperations = selectByQuery('[data-js="button-operation"]');
const $buttonCE = selectByQuery('[data-js="button-ce"]');
const $buttonEqual = selectByQuery('[data-js="button-equal"]');

createOnClickListener($buttonsNumbers, handleClickNumber);
createOnClickListener($buttonsOperations, handleClickOperation);
createOnClickListener($buttonCE, handleClickCE);
createOnClickListener($buttonEqual, handleClickEqual);

function selectByQuery(query) {
  const selector = document.querySelectorAll(query);
  return selector.length === 1 ? selector[0] : selector;
}

function createOnClickListener(elements, functionToHandle) {
  if (elements.length) {
    Array.prototype.forEach.call(elements, function(element) {
      element.addEventListener('click', functionToHandle, false);
    });
  } else {
    elements.addEventListener('click', functionToHandle, false);
  }
}

function handleClickNumber() {
  $visor.value += this.value;
}

function handleClickOperation() {
  $visor.value = removeLastItemIfItIsAnOperator($visor.value);
  $visor.value += this.value;
}

function handleClickCE() {
  $visor.value = 0;
}

function isLastItemAnOperation(number) {
  const operations = ['+', '-', 'x', '÷'];
  const lastItem = number.split('').pop();
  return operations.some(function(operator) {
    return operator === lastItem;
  });
}

function removeLastItemIfItIsAnOperator(number) {
  if (isLastItemAnOperation(number)) {
    return number.slice(0, -1);
  }
  return number;
}

function handleClickEqual() {
  $visor.value = removeLastItemIfItIsAnOperator($visor.value);
  $visor.value = getVisorCalculation($visor.value);
}

function getVisorCalculation(visor) {
  const allValues = visor.match(/\d+[+x÷-]?/g);
  return allValues.reduce(function(accumulated, actual) {
    const firstValue = accumulated.slice(0, -1);
    const operator = accumulated.split('').pop();
    const lastValue = removeLastItemIfItIsAnOperator(actual);
    const lastOperator = isLastItemAnOperation(actual) ? actual.split('').pop() : '';

    return calculateValue(firstValue, lastValue, operator) + lastOperator;
  });
}

function calculateValue(firstValue, lastValue, operator) {
  switch(operator) {
    case '+':
    default:
      return Number(firstValue) + Number(lastValue);
    case '-':
      return Number(firstValue) - Number(lastValue);
    case 'x':
      return Number(firstValue) * Number(lastValue);
    case '÷':
      return Number(firstValue) / Number(lastValue);
  }
}
