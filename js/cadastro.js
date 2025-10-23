// Ao sair do campo de CEP, busca o endereço
document.getElementById("CEP").addEventListener("blur", function () {
  const cep = this.value.trim();
  const mensagem = document.getElementById("mensagem");

  if (cep.length !== 8 || isNaN(cep)) {
    mensagem.textContent = "CEP inválido. Digite 8 números.";
    return; 
  }

  

  // Faz a requisição à API ViaCEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        mensagem.textContent = "CEP não encontrado.";
      } else {
        document.getElementById("txtRua").value = data.logradouro;
        document.getElementById("txtBairro").value = data.bairro;
        document.getElementById("txtCidade").value = data.localidade;
        document.getElementById("txtEstado").value = data.uf;
        
      }
    })
    .catch(() => {
      mensagem.textContent = "Erro ao buscar o CEP.";
    });
});