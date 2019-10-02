/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/
(function(win, doc) {
    'use strict';

    const BUTTON_NUMBER = 'button-number';
    const BUTTON_OPERATOR = 'button-operator';
    const BUTTON_CLEAR = 'button-clear';
    const BUTTON_RESULT = 'button-result';
    const OPERATORS = ['x', '/', '+', '-'];

    const inputText = doc.getElementById('text_calc');

    doc.addEventListener('click', event => {

        const elementTarget = event.target;

        if (elementTarget.className === BUTTON_NUMBER) {
            addNumber(elementTarget.value);
        }
        
        if (elementTarget.className === BUTTON_OPERATOR) {
            addOperator(elementTarget.value);
        }

        if (elementTarget.className === BUTTON_CLEAR) {
            clearInput();
        }

        if (elementTarget.className === BUTTON_RESULT) {
            setResult();
        }
    });

    function addNumber(number) {
        inputText.value += number;
    }

    function addOperator(operator) {

        if (isLastItemOperator(inputText.value)) {
            inputText.value = inputText.value.slice(0, -1) + operator;
        } else {
            inputText.value += operator;
        }
    }

    function clearInput() {
        inputText.value = 0;
    }

    function setResult() {

        // Check if lastChar is an operator. If it is, remove it.
        if (isLastItemOperator(inputText.value)) {
            inputValue = inputText.value.slice(0, -1);
        }

        const result = inputText.value.match(/(?:\d+|[\+x\-\/])/g);

        OPERATORS.forEach(operator => {

            let indexOfOperator = result.indexOf(operator);
            while (indexOfOperator !== -1) {
                
                const numberA = Number(result[indexOfOperator - 1]);
                const numberB = Number(result[indexOfOperator + 1]);
                
                const calculatedValue = calculateValue(numberA, numberB, operator);

                result[indexOfOperator - 1] = calculatedValue;
                result.splice(indexOfOperator, 2);

                indexOfOperator = result.indexOf(operator);
            }
        });

        inputText.value = result.join('');
    }

    function calculateValue(numberA, numberB, operator) {

        switch (operator) {
            case '+':
                return numberA + numberB;
            case '-':
                return numberA - numberB;
            case 'x':
                return numberA * numberB;
            case '/':
                return numberA / numberB;
            default:
                return numberA;
        }
        
    }

    function isLastItemOperator(text) {
        
        const lastChar = text.split('').pop();
        return OPERATORS.some(operator => operator === lastChar);
    }


})(window, document);