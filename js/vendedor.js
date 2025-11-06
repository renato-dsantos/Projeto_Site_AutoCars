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