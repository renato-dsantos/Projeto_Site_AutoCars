const wrapper = document.querySelector(".carrossel-wrapper");
const indicadores = document.querySelector(".carrossel-indicadores");
const logos = document.querySelectorAll(".logo-item");

let index = 0;
const visiveis = 5; // Quantos logos aparecem por vez
const total = logos.length;

// quantidade real de slides
const totalSlides = Math.ceil((total - visiveis) / visiveis) + 1;

// cria indicadores de forma correta
for (let i = 0; i < totalSlides; i++) {
  const span = document.createElement("span");
  if (i === 0) span.classList.add("ativo");
  indicadores.appendChild(span);
}

const dots = indicadores.querySelectorAll("span");

function mudarSlide() {
  index++;

  // impede de ir para slide vazio
  if (index >= totalSlides) index = 0;

  const deslocamento = index * (160 + 30) * visiveis;
  const limiteMax = (total * (160 + 30)) - ((160 + 30) * visiveis);

  // se deslocar além do total, trava no último grupo
  const deslocFinal = Math.min(deslocamento, limiteMax);

  wrapper.style.transform = `translateX(-${deslocFinal}px)`;

  dots.forEach(dot => dot.classList.remove("ativo"));
  dots[index].classList.add("ativo");
}

setInterval(mudarSlide, 3000);

//carrega o login no nav

document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuarioLogado");
  const linkUsuario = document.getElementById("idUsuario");

  if (usuario && linkUsuario) {
    linkUsuario.textContent = usuario;
    linkUsuario.href = "usuario.html";
    
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

  if (usuarioNome) {
    
    linkUsuario.textContent = usuarioNome;
    linkUsuario.href = "../pages/usuario.html"; 

    
    if (linkLogin) {
      linkLogin.style.display = "none";
    }
  } else {
    
    linkUsuario.textContent = "Usuário";
    linkUsuario.href = "login.html";
  }
});