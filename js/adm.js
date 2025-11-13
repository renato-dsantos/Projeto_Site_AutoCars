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
  const API_URL = "https://projeto-site-autocars.onrender.com/usuarios";

  async function carregarUsuarios() {
  const resposta = await fetch(API_URL);
  const usuarios = await resposta.json();

  const tabela = document.getElementById("tabelaUsuarios").querySelector("tbody");

  tabela.innerHTML = ""; // limpa a tabela antes de preencher

  usuarios.forEach((user) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.tipoacesso}</td>
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>${user.cpf}</td>
      <td>
        <button class="btnExcluirUser" data-id="${user.id}">Excluir</button>
      </td>
    `;

    tabela.appendChild(tr);
  });
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarUsuarios);

//Excluir o usuário
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btnExcluirUser")) {
    const id = event.target.getAttribute("data-id");
    await excluirUsuario(id);
  }
});

async function excluirUsuario(id) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
      
    });

    if (resposta.ok) {
      alert("Usuário excluído com sucesso!");
      carregarUsuarios();
    } else {
      alert("Erro ao excluir usuário.");
    }
  }
}

// Testando json na api do render, salvando os carros

 const form = document.getElementById("formCarro");
    const mensagem = document.getElementById("mensagem");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const marcacarro = document.getElementById("marcaCarro").value;
      const modelocarro = document.getElementById("modeloCarro").value;
      const anoveiculo = document.getElementById("anoVeiculo").value;
      const km = document.getElementById("km").value;
      const descricaocarro = document.getElementById("descricaoCarro").value;

           
       

      const carro = { marcacarro, modelocarro, anoveiculo, km, descricaocarro};

      try {
        const resposta = await fetch("https://projeto-site-autocars.onrender.com/carros", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(carro)
        });

        if (resposta.ok) {
          alert("Veículo cadastrado com sucesso!");
          form.reset();
        } else {
          alert(" Erro ao cadastrar o veículo.");
        }
      } catch (erro) {
        alert( "Erro de conexão com o servidor.");
        console.error(erro);
      }
    });

    //lista os carros
  const API_URL_CAR = "https://projeto-site-autocars.onrender.com/carros";

  async function carregarCarros() {
  const resposta = await fetch(API_URL_CAR);
  const carros = await resposta.json();

  const tabela = document.getElementById("tabelaCarros").querySelector("tbody");

  tabela.innerHTML = ""; // limpa a tabela antes de preencher

  carros.forEach((car) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${car.id}</td>
      <td>${car.marcacarro}</td>
      <td>${car.modelocarro}</td>
      <td>${car.anoveiculo}</td>
      <td>${car.km}</td>
      <td>
        <button class="btnEditar" data-id="${car.id}">Editar</button>
        <button class="btnExcluirCar" data-id="${car.id}">Excluir</button>
      </td>
    `;

    tabela.appendChild(tr);
  });
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarCarros);

//Excluir o caroos
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btnExcluirCar")) {
    const id = event.target.getAttribute("data-id");
    await excluirCarro(id);
  }
});

async function excluirCarro(id) {
  if (confirm("Tem certeza que deseja excluir este carro?")) {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
      
    });

    if (resposta.ok) {
      alert("Carro excluído com sucesso!");
      carregarUsuarios();
    } else {
      alert("Erro ao excluir carro.");
    }
  }
}