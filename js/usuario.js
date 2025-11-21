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

//carrega o login no nav

document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuarioLogado");
  const linkUsuario = document.getElementById("idUsuario");

  if (usuario && linkUsuario) {
    linkUsuario.textContent = usuario;
    linkUsuario.href = "pages/usuario.html";
    
  } else if (linkUsuario) {
    
    linkUsuario.textContent = "Login";
    linkUsuario.href = "login.html";
  }
});

//aba login

document.addEventListener("DOMContentLoaded", () => {
  const usuarioNome = localStorage.getItem("usuarioLogado");
  const idLogado = localStorage.getItem("usuarioLogado");
  const linkUsuario = document.querySelector(".idUsuario");
  const linkLogin = document.querySelector(".linkLogin");
  const linkLogout = document.getElementById("linkLogout");

  if (usuarioNome) {
    // ✅ Mostra o nome do usuário logado
    linkUsuario.textContent = usuarioNome;
    linkUsuario.href = "pages/usuario.html";

    // ✅ Esconde o link de login
    if (linkLogin) linkLogin.style.display = "none";

    // ✅ Mostra o link de sair
    if (linkLogout) linkLogout.style.display = "inline";

    // ✅ Quando clicar em “Sair”
    linkLogout.addEventListener("click", (event) => {
      event.preventDefault(); // evita recarregar a página
      localStorage.removeItem("usuarioLogado");
      alert("Você saiu da sua conta.");
      window.location.href = "index.html"; // redireciona pro login
    });
  } else {
    // ✅ Usuário não logado
    linkUsuario.textContent = "Usuário";
    linkUsuario.href = "index.html";

    if (linkLogout) linkLogout.style.display = "none";
  }
});


document.addEventListener("DOMContentLoaded", carregarUsuario);

async function carregarUsuario() {
    const usuarioId = localStorage.getItem("usuarioLogadoId");

    if (!usuarioId) {
        alert("Nenhum usuário logado.");
        window.location.href = "login.html";
        return;
    }

    try {
        const resposta = await fetch(`https://projeto-site-autocars.onrender.com/usuarios/${usuarioId}`);
        const usuario = await resposta.json();

        // Preenche todos os campos com base no seu formulário
        document.getElementById("id").value = usuario.id || "";
        document.getElementById("nome").value = usuario.nome || "";
        document.getElementById("email").value = usuario.email || "";
        document.getElementById("datanascimento").value = usuario.datanascimento || usuario.nascimento || "";
        document.getElementById("telefone").value = usuario.telefone || "";
        document.getElementById("cpf").value = usuario.cpf || "";
        document.getElementById("cnpj").value = usuario.cnpj || "";
        document.getElementById("cep").value = usuario.cep || "";
        document.getElementById("rua").value = usuario.rua || "";
        document.getElementById("numero").value = usuario.numero || "";
        document.getElementById("complemento").value = usuario.complemento || "";
        document.getElementById("bairro").value = usuario.bairro || "";
        document.getElementById("cidade").value = usuario.cidade || "";
        document.getElementById("estado").value = usuario.estado || "";

    } catch (erro) {
        console.error("Erro ao carregar usuário:", erro);
        alert("Erro ao carregar os dados do usuário.");
    }
}

sync function salvarAlteracoes(event) {
    event.preventDefault(); // impede recarregar a página

    const usuarioId = document.getElementById("id").value;

    const usuarioAtualizado = {
        id: usuarioId,
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        datanascimento: document.getElementById("datanascimento").value,
        telefone: document.getElementById("telefone").value,
        cpf: document.getElementById("cpf").value,
        cnpj: document.getElementById("cnpj").value,
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value
    };

    try {
        const resposta = await fetch(`https://projeto-site-autocars.onrender.com/usuarios/${usuarioId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioAtualizado)
        });

        if (resposta.ok) {
            alert("Dados atualizados com sucesso!");
        } else {
            alert("Erro ao salvar as alterações.");
        }

    } catch (erro) {
        console.error("Erro ao atualizar usuário:", erro);
        alert("Erro ao salvar as alterações.");
    }
}
