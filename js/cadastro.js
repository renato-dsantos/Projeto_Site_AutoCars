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

// Testando json na api do render, salvando os usuário

 const form = document.getElementById("formCadastro");
    const mensagem = document.getElementById("mensagem");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const tipoacesso = document.getElementById("tipoAcesso").value;
      const nome = document.getElementById("txtNome").value;
      const email = document.getElementById("txtEmail").value;
      const datanascimento = document.getElementById("dataNascimento").value;
      const telefone = document.getElementById("telefone").value;
      const cpf = document.getElementById("txtCPF").value;
      const cnpj = document.getElementById("txtCNPJ").valeu;
      const cep = document.getElementById("CEP").valeu;
      const rua = document.getElementById("txtRua").valeu;  
      const numero = document.getElementById("numero").valeu;
      const complemento = document.getElementById("txtComplemento").valeu;
      const bairro = document.getElementById("txtBairro").valeu;
      const cidade = document.getElementById("txtCidade").valeu;
      const estado = document.getElementById("txtEstado").valeu;
      const password = document.getElementById("password").valeu;
      const confirmarpassword = document.getElementById("confirmarPassword").valeu;        
       

      const usuario = { tipoacesso, nome, email, datanascimento, telefone, cpf, cnpj, cep, rua, numero, complemento, bairro, cidade, estado, password, confirmarpassword};

      try {
        const resposta = await fetch("https://projeto-site-autocars.onrender.com/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(usuario)
        });

        if (resposta.ok) {
          alert("Usuário cadastrado com sucesso!");
          form.reset();
        } else {
          alert(" Erro ao cadastrar usuário.");
        }
      } catch (erro) {
        alert( "Erro de conexão com o servidor.");
        console.error(erro);
      }
    });