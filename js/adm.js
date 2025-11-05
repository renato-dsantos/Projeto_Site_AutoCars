function openTabs(evt, tabsName) {
// variavel
  var i, tabcontent, tablinks;

  

// atribuindo o conteudo na variavel
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
 // mostra os elemtno class="tablinks" e remove com o"active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
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


//lista os usuários

async function carregarUsuarios() {
  const resposta = await fetch("https://seu-projeto.onrender.com/usuarios");
  const usuarios = await resposta.json();

  const tabela = document.getElementById("tabelaUsuarios").querySelector("tbody");

  tabela.innerHTML = ""; // limpa a tabela antes de preencher

  usuarios.forEach((user) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>${user.cpf}</td>
      <td>
        <button class="btnExcluir" data-id="${user.id}">Excluir</button>
      </td>
    `;

    tabela.appendChild(tr);
  });
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarUsuarios);