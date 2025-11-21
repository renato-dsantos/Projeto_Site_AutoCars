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


document.addEventListener("DOMContentLoaded", async () => {

    const idLogado = localStorage.getItem("usuarioLogadoId");

    if (!idLogado) {
        alert("Nenhum usuário logado!");
        return;
    }

    // Buscar usuário na API
    try {
        const res = await fetch(`https://projeto-site-autocars.onrender.com/usuarios/${idLogado}`);

        if (!res.ok) {
            throw new Error("Erro ao buscar usuário");
        }

        const usuario = await res.json();

        // Preencher formulário
        document.getElementById("nome").value = usuario.nome || "";
        document.getElementById("email").value = usuario.email || "";
        document.getElementById("datanascimento").value = usuario.datanascimento || "";
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
        document.getElementById("password").value = usuario.password || "";
        document.getElementById("confirmarpassword").value = usuario.confirmarpassword || "";
        document.getElementById("id").value = usuario.id;

    } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados do usuário!");
    }
});
