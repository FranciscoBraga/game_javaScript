# Sistema de Temporizador e Questionário

Este sistema consiste em um temporizador combinado com um questionário simples que carrega perguntas e respostas de um arquivo JSON. Abaixo está um README detalhado para orientar sobre a configuração e uso do sistema.

## Estrutura do Projeto

* index.html: Contém o layout básico da página com botões, campos de entrada e elementos para exibir o temporizador e o questionário.
* script.js: Contém toda a lógica JavaScript para controlar o temporizador e manipular o questionário.
question_response.json: Arquivo JSON que contém as perguntas e respostas do questionário.
Arquivo JSON
O arquivo question_response.json deve estar no seguinte formato:

json exemplo
```
{
  "test": [
    {
      "question": "Pergunta 1",
      "response": "Resposta 1",
      "level":"Fácil"
    },
    {
      "question": "Pergunta 2",
      "response": "Resposta 2",
       "level":"Fácil"
    }
  ]
}
```

### Código JavaScript

**Variáveis**

button: Seleciona o botão que inicia o temporizador e o questionário.
minutos, segundos: Elementos que exibem os minutos e segundos do temporizador.
min, seg: Variáveis que armazenam os minutos e segundos atuais.
tempoCorrido: Booleano que indica se o temporizador está ativo.
resposta: Armazena a resposta da pergunta atual.
Eventos
Clique no Botão
O evento de clique no botão inicializa o temporizador e carrega uma pergunta do arquivo JSON.

javascript
```
button.addEventListener('click', function () {
  tempoCorrido = true;
  seg = '00';
  resposta = null;
  document.getElementById('resposta').className = '';
  if (document.getElementById('respostaJson')) {
    document.getElementById('tempo').removeChild(document.getElementById('respostaJson'));
  }
  duracaoTempo(document.getElementById('duracaoTempo').value);
  fetch('question_response.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('output').textContent = tratarJson(data);
    })
    .catch(error => {
      document.getElementById('output').textContent = 'Erro: ' + error.message;
    });
});
```
## Funções

* tratarJson(file)
Seleciona uma pergunta aleatória do arquivo JSON e armazena a resposta correspondente.

javascript
```
function tratarJson(file) {
  let random = Math.floor(Math.random() * file.test.length);
  resposta = file.test[random].response;
  return file.test[random].question;
}
```
* duracaoTempo(valor)
Configura a duração do temporizador com base na entrada do usuário.

javascript
```
function duracaoTempo(valor) {
  if (valor == '') {
    valor = 0;
  }
  if (valor < 10) {
    min = '0' + valor;
  } else {
    min = valor;
  }
}
```
* cronometro(valor)
Controla a contagem regressiva do temporizador e chama a função mostrarResposta() quando o tempo acaba.

javascript
```
function cronometro(valor) {
  if (seg == 0) {
    seg = 60;
    min = min == 0 ? '00' : min;
  }
  if (tempoCorrido) {
    seg -= valor;
    minutos.innerHTML = min;
    segundos.innerHTML = seg;
    segundos.innerHTML = (seg < 10) ? '0' + seg : seg;
    if (seg == 0) {
      min--;
      if (min >= 0) {
        min = (min < 10) ? '0' + min : min;
        minutos.innerHTML = min;
      }
      console.log(min);
      if (min > 0) {
        seg = 60;
      } else {
        minutos.innerHTML = '00';
      }
    }
    if (min < 0 && seg <= 0) {
      tempoCorrido = false;
      mostrarResposta();
    }
  }
}
```

* setInterval(cronometro, 1000, 1);
* mostrarResposta()
Exibe a resposta da pergunta após o término do temporizador.

javascript
```
function mostrarResposta() {
  document.getElementById('resposta').className = 'hide';
  let p = document.createElement('p');
  p.id = 'respostaJson';
  p.innerHTML = resposta;
  document.getElementById('tempo').appendChild(p);
}
```
* settings()
Alterna a visibilidade das configurações.

javascript
```
function settings() {
  let configuracao = document.getElementById('configuracao');
  configuracao.classList.toggle('hide');
}
```
## Uso
* Abra o arquivo index.html em um navegador web.
* Insira a duração desejada do temporizador em minutos.
* Clique no botão para iniciar o temporizador.
* Após o término do temporizador, a resposta da pergunta será exibida.
  
**Este sistema é ideal para testes, quizzes ou atividades educativas que requerem um controle de tempo.**
