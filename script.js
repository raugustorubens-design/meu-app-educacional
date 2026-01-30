// ===== ESTADO =====
const ranks = ["Aprendiz", "Adepto", "Mago"];
let rankLevel = 0;
let premium = false;

// ===== LOAD =====
function loadState() {
  const saved = localStorage.getItem("renascerState");
  if (saved) {
    const data = JSON.parse(saved);
    rankLevel = data.rankLevel ?? 0;
    premium = data.premium ?? false;
  }
}

loadState();
updateUI();

// ===== UI =====
function updateUI() {
  document.getElementById("rankLabel").innerText =
    `Rank: ${ranks[rankLevel]} ${premium ? "(Iniciado)" : "(FREE)"}`;

  document.getElementById("mageText").innerText =
    "Escolha um Ato. Cada dungeon guarda um tipo de conhecimento.";

  // Bloqueios
  const acts = document.querySelectorAll(".act");
  acts.forEach(act => {
    const index = parseInt(act.dataset.act);

    if (index === 0) {
      act.classList.remove("locked");
    } else if (index === 1 && rankLevel >= 1 && premium) {
      act.classList.remove("locked");
    } else if (index === 2 && rankLevel >= 2 && premium) {
      act.classList.remove("locked");
    }
  });
}

// ===== ENTRAR NO ATO =====
function enterAct(actIndex) {
  if (actIndex === 0) {
    alert("Entrando no Ato I — O Despertar");
  } else if (actIndex === 1 && rankLevel >= 1 && premium) {
    alert("Entrando no Ato II — A Lógica Profunda");
  } else if (actIndex === 2 && rankLevel >= 2 && premium) {
    alert("Entrando no Ato III — O Código do Mestre");
  } else {
    document.getElementById("mageText").innerText =
      "Este Ato está selado. Evolua seu rank ou aceite o pacto.";
  }
}
