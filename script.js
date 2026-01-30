// ===== RANKS =====
const ranks = ["Aprendiz", "Adepto", "Mago"];
let rankLevel = 0;

// ===== PERSISTÊNCIA =====
function saveState() {
  localStorage.setItem("renascerState", JSON.stringify({
    rankLevel
  }));
}

function loadState() {
  const saved = localStorage.getItem("renascerState");
  if (saved) {
    rankLevel = JSON.parse(saved).rankLevel;
  }
}

loadState();
updateRankUI();

// ===== MENSAGENS =====
const messages = [
  "Bem-vindo, aprendiz.",
  "Dominar feitiços eleva seu rank.",
  "Prove seu valor."
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
  document.getElementById("ide").classList.remove("hidden");
  document.getElementById("grimorio").classList.remove("hidden");
  updateGrimorio();
}

// ===== IDE =====
function runCode() {
  const code = document.getElementById("codeInput").value.trim();
  const out = document.getElementById("consoleOutput");
  out.textContent = "";

  if (rankLevel === 0 && code.startsWith("print")) {
    success("Você dominou o feitiço básico.");
    promote();
  } else if (rankLevel === 1 && code.includes("=")) {
    success("Você agora controla valores.");
    promote();
  } else if (rankLevel === 2 && code.includes("if")) {
    success("Você domina decisões mágicas.");
  } else {
    document.getElementById("mageText").innerText =
      "Esse feitiço está além do seu rank atual.";
  }
}

function success(text) {
  document.getElementById("mageText").innerText = text;
}

function promote() {
  if (rankLevel < ranks.length - 1) {
    rankLevel++;
    document.getElementById("mageText").innerText =
      `Parabéns. Você alcançou o rank ${ranks[rankLevel]}.`;
    saveState();
    updateRankUI();
    updateGrimorio();
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
