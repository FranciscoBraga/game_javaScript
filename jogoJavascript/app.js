 const button = document.querySelector("#button")
 let minutos = document.getElementById('minutos')
 let segundos = document.getElementById('segundos')
 let min = '00'
 let seg = '00'
 let tempoCorrido = false
 let resposta = null



 button.addEventListener('click', function() {
      tempoCorrido = true
      min ='00'
      seg = '00'
      resposta = null
        fetch('question_response.json')
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

     function tratarJson(file){
        let random = Math.floor(Math.random()*file.test.length)
            resposta = file.test[random].response
            return file.test[random].question
         
     }

     function duracaoTempo(valor){
        min = valor
        if(min < 10){
          min = '0'+valor
          console.log(min)
        }
        document.getElementById('')
      }

     function cronometro(valor){
    if(seg == 0){
        seg = 60
    }
    if(tempoCorrido){
      seg -= valor
      minutos.innerHTML = min
      segundos.innerHTML = seg
      if(seg < 10){
        segundos.innerHTML = '0'+seg 
      }
      if(seg == 0){
        min --
        minutos.innerHTML = '0'+min
        if(min > 0){
            seg = 60
        }
        if(min < 0 ){
            minutos.innerHTML = '00' 
        }
 
    
      }
      if(min <= 0 && seg <= 0){
        tempoCorrido = false
        mostrarResposta()
      }
    }

     }

     function mostrarResposta(){
        console.log(resposta)
     }

     setInterval(cronometro,1000,1)








  
