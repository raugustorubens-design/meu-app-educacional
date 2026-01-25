document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.getElementById("btnEntrar");
  const vortex = document.querySelector(".vortex");
  const overlay = document.querySelector(".overlay");
  const entrada = document.querySelector(".vortex-content");
  const castelo = document.querySelector(".castelo");

  if (!btnEntrar) return;

  btnEntrar.addEventListener("click", () => {
    // Sensação de ser puxado para o centro do cosmos
    vortex.style.animation = "cosmos-spin 6s linear infinite";
    vortex.style.transform = "translate(-50%, -50%) scale(1.6)";

    // Escurecimento total (túnel)
    overlay.style.background = "rgba(0, 0, 0, 0.9)";

    // Texto inicial desaparece
    entrada.style.opacity = "0";
    entrada.style.transition = "opacity 1s ease";

    // Entrada no castelo
    setTimeout(() => {
      castelo.classList.add("ativo");
    }, 1800);
  });
});

