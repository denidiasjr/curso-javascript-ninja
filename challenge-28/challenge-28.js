/*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

const formElement = document.querySelector('form');
const cepInputElement = document.querySelector('#input_cep');
const statusElement = document.querySelector('#status');

function isResponseFailed(ajaxRequest) {
  return ajaxRequest.readyState === ajaxRequest.DONE && ajaxRequest.status !== 200;
}

function clearCepInfo() {
  const cepInfos = [ ...document.querySelectorAll('#cep_info span') ];
  cepInfos.forEach(cepInfo => cepInfo.innerHTML = '');
}

function showCepInfo(response) {
  Object.keys(response).map(key => {
    const cepSelector = document.querySelector(`#cep_${key}`);

    if (cepSelector) {
      cepSelector.innerHTML = response[key];
    }
  });
}

function normalizeCepValue(cepInputValue) {
  return cepInputValue.replace(/\D/g, '');
}

function requestCep(event) {

  event.preventDefault();

  const ajaxRequest = new XMLHttpRequest();

  const cepValue = normalizeCepValue(cepInputElement.value);

  ajaxRequest.open('GET', `http://apps.widenet.com.br/busca-cep/api/cep.json?code=${cepValue}`)
  ajaxRequest.send();
  
  ajaxRequest.addEventListener('readystatechange', () => {

    if (isResponseFailed(ajaxRequest)) {
      clearCepInfo();
      return statusElement.innerHTML = `Não foi possível buscar informações para o CEP ${cepValue}.`;
    }

    if (ajaxRequest.readyState !== ajaxRequest.DONE) {
      clearCepInfo();
      return statusElement.innerHTML = `Buscando informações para o CEP ${cepValue}...`;
    }

    const response = JSON.parse(ajaxRequest.response);
    
    if (response.status === 0) {
      return statusElement.innerHTML = `Não encontramos o endereço para o CEP ${cepValue}...`;
    }

    showCepInfo(response);
    statusElement.innerHTML = `Endereço referente ao CEP ${cepValue}`;
  })

}

formElement.addEventListener('submit', requestCep);