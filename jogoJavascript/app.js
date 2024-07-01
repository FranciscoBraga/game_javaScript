const button = document.querySelector("#button")
let minutos = document.getElementById('minutos')
let segundos = document.getElementById('segundos')
let min = '00'
let seg = '00'
let tempoCorrido = false
let resposta = null
let level = null
let op = null

function inicializa() {
  tempoCorrido = true
  seg = '00'
  resposta = null
  document.getElementById('resposta').className = ''
  level = document.querySelector("input[name='level']:checked").id
  level = (level == null) ? 'easy' : level
  let sobre = document.getElementById("sobre")
  op = sobre.options[sobre.selectedIndex].value
  console.log(op)
  if (document.getElementById('respostaJson')) {
    document.getElementById('tempo').removeChild(document.getElementById('respostaJson'))
  }
  duracaoTempo(document.getElementById('duracaoTempo').value)
}

button.addEventListener('click', function () {
  inicializa()
  fetch('question_response_' + level + '_' + op + '.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('output').textContent = tratarJson(data)
    })
    .catch(error => {
      document.getElementById('output').textContent = 'Erro: ' + error.message;
    });
});

function tratarJson(file) {
  let random = Math.floor(Math.random() * file.test.length)
  resposta = file.test[random].response
  return file.test[random].question

}

function duracaoTempo(valor) {
  if (valor == '') {
    valor = 0
  }
  if (valor < 10) {
    min = '0' + valor
  } else {
    min = valor
  }

}

function cronometro(valor) {
  if (seg == 0) {
    seg = 60
    min = min == 0 ? '00' : min
  }
  if (tempoCorrido) {
    seg -= valor
    minutos.innerHTML = min
    segundos.innerHTML = seg
    segundos.innerHTML = (seg < 10) ? '0' + seg : seg
    if (seg == 0) {
      min--
      if (min >= 0) {
        min = (min < 10) ? '0' + min : min
        minutos.innerHTML = min
      }
      console.log(min)
      if (min > 0) {
        seg = 60
      }
      else {
        minutos.innerHTML = '00'
      }
    }
    if (min < 0 && seg <= 0) {
      tempoCorrido = false
      mostrarResposta()
    }
  }
}

setInterval(cronometro, 1000, 1)

function mostrarResposta() {
  document.getElementById('resposta').className = 'hide'
  let p = document.createElement('p')
  p.id = 'respostaJson'
  p.innerHTML = resposta
  document.getElementById('tempo').appendChild(p)
}

function settings() {
  let configuracao = document.getElementById('configuracao')
  configuracao.classList.toggle('hide')
}







