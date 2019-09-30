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

    const BUTTON_NUMBER = 'button-number';
    const BUTTON_OPERATOR = 'button-operator';
    const BUTTON_CLEAR = 'button-clear';
    const BUTTON_RESULT = 'button-result';

    const inputText = doc.getElementById('text_calc');

    doc.addEventListener('click', event => {

        const elementTarget = event.target;

        if (elementTarget.className === BUTTON_NUMBER) {
            addNumber(elementTarget.innerText);
        }
        
        if (elementTarget.className === BUTTON_OPERATOR) {
            addOperator(elementTarget.innerText);
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

        if (inputText.value.length === 0) {
            return inputText.value = '';
        }

        const lastChar = inputText.value[inputText.value.length - 1];

        if (isNaN(lastChar)) {
            inputText.value = inputText.value.substring(0, inputText.value.length - 1) + operator;
        } else {
            inputText.value += operator;
        }

    }

    function clearInput() {
        inputText.value = 0;
    }

    function setResult() {

    }
    

})(window, document);