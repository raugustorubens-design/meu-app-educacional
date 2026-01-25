document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("btnEntrar");
  const castelo = document.querySelector(".castelo");
  const vortexContent = document.querySelector(".vortex-content");

  if (!botao || !castelo || !vortexContent) {
    console.error("Elementos não encontrados no DOM");
    return;
  }

  botao.addEventListener("click", () => {
    // some a entrada
    vortexContent.style.opacity = "0";
    vortexContent.style.pointerEvents = "none";

    // ativa o castelo
    castelo.classList.add("ativo");
  });
});
