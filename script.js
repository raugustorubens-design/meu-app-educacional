// ===== RANK =====
const ranks = ["Aprendiz", "Adepto", "Mago"];
let rankLevel = 0;
let premium = false;

// ===== PERSISTÊNCIA =====
function saveState() {
  localStorage.setItem("renascerState", JSON.stringify({
    rankLevel,
    premium
  }));
}

function loadState() {
  const saved = localStorage.getItem("renascerState");
  if (saved) {
    const data = JSON.parse(saved);
    rankLevel = data.rankLevel;
    premium = data.premium;
  }
}

loadState();
updateRankUI();

// ===== MENSAGENS =====
const messages = [
  "Você chegou até aqui, aprendiz.",
  "O próximo conhecimento não é gratuito.",
  "Decida se deseja prosseguir."
];

let msgIndex = 0;
document.getElementById("mageText").innerText = messages[msgIndex];

// ===== FLUXO =====
function nextMessage() {
  msgIndex++;
  if (msgIndex < messages.length) {
    document.getElementById("mageText").innerText = messages[msgIndex];
  } else {
    document.getElementById("continueBtn").classList.add("hidden");
    document.getElementById("castBtn").classList.remove("hidden");
  }
}

function openIDE() {
  if (!premium && rankLevel >= 1) {
    showPaywall();
    return;
  }
  document.getElementById("ide").classList.remove("hidden");
  document.getElementById("grimorio").classList.remove("hidden");
  updateGrimorio();
}

// ===== IDE =====
function runCode() {
  const code = document.getElementById("codeInput").value.trim();

  if (rankLevel === 0 && code.startsWith("print")) {
    promote();
  } else if (rankLevel === 1 && code.includes("=")) {
    promote();
  } else if (rankLevel === 2 && code.includes("if")) {
    document.getElementById("mageText").innerText =
      "Você domina este ciclo de conhecimento.";
  } else {
    document.getElementById("mageText").innerText =
      "Esse feitiço está além do seu domínio atual.";
  }
}

// ===== PAYWALL =====
function showPaywall() {
  document.getElementById("paywall").classList.remove("hidden");
  document.getElementById("mageText").innerText =
    "O portal está selado. Apenas iniciados podem atravessar.";
}

function acceptPact() {
  premium = true;
  saveState();
  document.getElementById("paywall").classList.add("hidden");
  document.getElementById("mageText").innerText =
    "O pacto foi aceito. O portal se abre diante de você.";
  openIDE();
}

// ===== RANK =====
function promote() {
  if (rankLevel < ranks.length - 1) {
    rankLevel++;
    saveState();
    updateRankUI();
    document.getElementById("mageText").innerText =
      `Você alcançou o rank ${ranks[rankLevel]}.`;
  }
}

// ===== UI =====
function updateRankUI() {
  document.getElementById("rankLabel").innerText =
    `Rank: ${ranks[rankLevel]}`;
}

function updateGrimorio() {
  document.querySelectorAll(".grimorio li").forEach(li => {
    const required = parseInt(li.dataset.rank);
    li.classList.toggle("locked", rankLevel < required);
  });
}
