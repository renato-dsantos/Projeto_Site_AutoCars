function openTabs(evt, tabsName) {
// variavel
  var i, tabcontent, tablinks;

// atribuindo o conteudo na variavel
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
 // mostra os elemetno class="tablinks" e remove com o"active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Mostrar a aba atual e adicionar uma classe "ativa" ao link que abriu a aba
  document.getElementById(tabsName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Quando a página carregar, abre a primeira aba automaticamente
window.addEventListener("DOMContentLoaded", () => {
  const firstTab = document.getElementsByClassName("tablinks")[0];
  if (firstTab) {
    firstTab.click(); // Simula o clique no primeiro botão
  }
});


document.addEventListener("DOMContentLoaded", () => {

    // Carrega o usuário do localStorage enviado pela lista
    const usuario = JSON.parse(localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    if (!usuario) {
        alert("Nenhum usuário selecionado para edição!");
        return;
    }

    // Preenche o formulário com os dados existentes
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("datanascimento").value = usuario.datanascimento;
    document.getElementById("telefone").value = usuario.telefone;
    document.getElementById("cpf").value = usuario.cpf;
    document.getElementById("cnpj").value = usuario.cnpj;
    document.getElementById("cep").value = usuario.cep;
    document.getElementById("rua").value = usuario.rua;
    document.getElementById("numero").value = usuario.numero;
    document.getElementById("complemento").value = usuario.complemento;
    document.getElementById("bairro").value = usuario.bairro;
    document.getElementById("cidade").value = usuario.cidade;
    document.getElementById("estado").value = usuario.estado;
    document.getElementById("password").value = usuario.password;
    document.getElementById("confirmarpassword").value = usuario.confirmarpassword;
    document.getElementById("id").value = usuario.id;

    // Salvar edição
    document.getElementById("formEditarUsuario").addEventListener("submit", function (e) {
        e.preventDefault();

        // Monta objeto editado
        const usuarioEditado = {
            tipoacesso: tipoacesso.value,
            nome: nome.value,
            email: email.value,
            datanascimento: datanascimento.value,
            telefone: telefone.value,
            cpf: cpf.value,
            cnpj: cnpj.value,
            cep: cep.value,
            rua: rua.value,
            numero: numero.value,
            complemento: complemento.value,
            bairro: bairro.value,
            cidade: cidade.value,
            estado: estado.value,
            password: password.value,
            confirmarpassword: confirmarpassword.value,
            id: parseInt(id.value)
        };

        // 👉 Envia para o JSON Server no Render
        fetch(`https://projeto-site-autocars.onrender.com/usuarios/${usuario.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioEditado)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao atualizar o usuário no servidor!");
            }
            return res.json();
        })
        .then(() => {
            alert("Usuário atualizado com sucesso!");
            window.location.href = "listaUsuarios.html";
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao atualizar, tente novamente!");
        });
    });
});
