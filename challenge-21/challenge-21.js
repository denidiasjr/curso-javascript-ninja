/*
O desafio de hoje será um pequeno projeto: um cronômetro!
As regras para criação do cronômetro são as seguintes:
1. Crie um arquivo index.html e adicione esse script a ele;
2. Crie um campo `input` do tipo `text`, e inicie-o com um valor 0 (zero).
Ele será o nosso cronômetro;
3. Crie 3 botões para as ações do cronômetro: Start, Stop e Reset;
4. Ao clicar em Start, o valor do campo deve ser incrementado de 1 em 1, a
cada segundo;
5. Ao clicar em Stop, o cronômetro deve parar de contar;
6. Ao clicar em Reset, o cronômetro deve zerar e parar de contar.

Utilize o atributo data-js para nomear o campo e os botões. Você pode
usar o nome que achar melhor, desde que ele seja semântico, ou seja, o nome
dado ao elemento HTML deve definir o que o elemento é ou o que ele faz.
*/

(function(win, doc) {
  "use strict";

  // Constants
  const inputValue = doc.querySelector('input[type="text"]');
  const buttonStart = doc.querySelector('button[data-js="start"]');
  const buttonStop = doc.querySelector('button[data-js="stop"]');
  const buttonReset = doc.querySelector('button[data-js="reset"]');

  // Variables
  let timeoutId = null;
  let isCounterStarted = false;

  // Listeners
  buttonStart.addEventListener("click", startCounter);
  buttonStop.addEventListener("click", stopCounter);
  buttonReset.addEventListener("click", resetCounter);

  // Functions
  function incrementCounter() {
    inputValue.value = Number(inputValue.value) + 1;
    timeoutId = setTimeout(incrementCounter, 1000);
  }

  function startCounter() {
    if (isCounterStarted) {
      return;
    }

    isCounterStarted = true;
    incrementCounter();
  }

  function stopCounter() {
    clearTimeout(timeoutId);
    isCounterStarted = false;
  }

  function resetCounter() {
    stopCounter();
    inputValue.value = 0;
  }
})(window, document);
