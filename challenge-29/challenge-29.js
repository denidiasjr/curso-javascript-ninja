(function() {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app() {
    
    function getCompanyInfo() {

      const ajaxRequest = new XMLHttpRequest();
      ajaxRequest.open('GET', 'http://localhost:8080/company.json');
      ajaxRequest.send();
      
      return new Promise((resolve, reject) => {
        ajaxRequest.onreadystatechange = function() {
  
          if (ajaxRequest.readyState !== ajaxRequest.DONE)  {
            return;
          }

          if (ajaxRequest.status !== 200) {
            reject('Erro ao obter os dados da empresa');
          }

          resolve(JSON.parse(ajaxRequest.response));
        };
      });
    }

    function showCompanyInfo(company) {
      const nameElement = document.querySelector('#company h2');
      const phoneElement = document.querySelector('#company h3');

      nameElement.innerHTML = company.name;
      phoneElement.innerHTML = company.phone;
    }

    function addCar() {
      const carAttributes = [...document.querySelectorAll('#car_form input')];
      const carsTable = document.querySelector('#cars_table tbody');
      const newCarRow = document.createElement('tr'); 
  
      carAttributes.forEach((elem, index) => {
  
        const newCarColumn = document.createElement('td');
  
        if (index === 0) {
          newCarColumn.innerHTML = `<img src="${elem.value}"/>`;
        } else {
          newCarColumn.innerHTML = elem.value;
        }
  
        newCarRow.appendChild(newCarColumn);
      }); 
  
      carsTable.appendChild(newCarRow);
    }

    function listenToAddcar() {

      const carForm = document.querySelector('#car_form');

      carForm.addEventListener('submit', event => {

        event.preventDefault();
        addCar();
      });
    }

    function initialize() {

      // Get and show company info
      getCompanyInfo()
        .then((company) => {
          showCompanyInfo(company);
        })
        .catch(alert);
        
      // Listener to add car operation
      listenToAddcar();
    }

    initialize();
  }

  window.app = app;

  app();

})();
