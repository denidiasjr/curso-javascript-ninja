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

        let inputValue = inputText.value;
        
        // Check if lastChar is an operator. If it is, remove it.
        if (isLastItemOperator(inputValue)) {
            inputValue = inputValue.slice(0, -1);
        }

        const arrayOperators = ['x', '\\/', '\\+', '-'];
        
        while (arrayOperators.some((operator => inputValue.indexOf(operator) !== -1))) {
            
            arrayOperators.forEach((operator, index) => {
                
                const indexOperator = inputValue.indexOf(operator);

                if (indexOperator === -1) {
                    return arrayOperators.splice(index, 1);
                }

                const regexForOperator = new RegExp(`(\\d+)\\${inputValue[indexOperator]}(\\d+)`);

                const matchValuesOperator = inputValue.match(regexForOperator); 
            });
        }
    }

    function isLastItemOperator(text) {
        
        const lastChar = text.split('').pop();
        return OPERATORS.some(operator => operator === lastChar);
    }


})(window, document);