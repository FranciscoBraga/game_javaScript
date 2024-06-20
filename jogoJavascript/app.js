 const button = document.querySelector("#button")

 button.addEventListener('click', function() {
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
        console.log(file)
            return file.test[random].question
         
     }







  
