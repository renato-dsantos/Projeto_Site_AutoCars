const API_URL = "https://projeto-site-autocars.onrender.com/usuarios";

document.getElementById("formId").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value.trim();
  const mensagem = document.getElementById("mensagem");

  try {
    
    const resposta = await fetch(API_URL);
    const usuarios = await resposta.json();

    
    const usuarioEncontrado = usuarios.find(
      (user) => user.email === email && user.password === senha
    );

    if (usuarioEncontrado) {
      
      localStorage.setItem("usuarioLogado", usuarioEncontrado.nome);
      

      // mostra as tela do usuario ou vendedor
      if (usuarioEncontrado.tipoacesso === "vendedor") {
        window.location.href = "vendedor.html";
      } else if (usuarioEncontrado.tipoacesso === "Administrador"){
        window.location.href = "adm.html";
      } else{
        window.location.href = "index.html";
      }
    } else {
      mensagem.textContent = "E-mail ou senha incorretos.";
    }
  } catch (erro) {
    console.error("Erro ao conectar ao servidor:", erro);
    mensagem.textContent = "Erro de conexão com o servidor.";
  }
});