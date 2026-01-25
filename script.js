// ===============================
// ELEMENTOS PRINCIPAIS
// ===============================
const botaoEntrar = document.querySelector(".btn-entrar");
const vortex = document.querySelector(".vortex");
const conteudoInicial = document.querySelector(".vortex-content");
const castelo = document.querySelector(".castelo");

// ===============================
// FUNÇÃO DE ENTRADA NO COSMOS
// ===============================
botaoEntrar.addEventListener("click", () => {
  
  // 1️⃣ Acelera o vórtice (sensação de ser puxado)
  vortex.style.transition = "transform 4s ease-in, opacity 4s ease-in";
  vortex.style.transform =
    "translate(-50%, -50%) scale(3) rotate(1080deg)";
  vortex.style.opacity = "0";

  // 2️⃣ Esconde o conteúdo inicial
  conteudoInicial.classList.add("oculto");

  // 3️⃣ Após o zoom, entra no castelo
  setTimeout(() => {
    castelo.classList.add("ativo");
  }, 2500);
});
