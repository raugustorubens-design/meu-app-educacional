// ===== ESTADO =====
const ranks = ["Aprendiz", "Adepto", "Mago"];
let rankLevel = 0;
let title = "Aprendiz Iniciado";

// ===== MISSÕES =====
const missions = [
  {
    title: "Primeiro Feitiço",
    description: "Use print() para exibir algo.",
    check: code => code.startsWith("print"),
    completed: false
  },
  {
    title: "Criando Variáveis",
    description: "Crie uma variável usando =",
    check: code => code.includes("="),
    completed: false
  },
  {
    title: "Tomando Decisões",
    description: "Use if para tomar uma decisão.",
    check: code => code.includes("if"),
    completed: false
  }
];

let activeMission = null;

// ===== LOAD / SAVE =====
function saveState() {
  localStorage.setItem("renascerState", JSON.stringify({
    missions: missions.map(m => m.completed),
    rankLevel,
    title,
    ato1Completo: localStorage.getItem("ato1Completo")
  }));
}

function loadState() {
  const saved = localStorage.getItem("renascerState");
  if (!saved) return;

  const data = JSON.parse(saved);
  data.missions.forEach((done, i) => missions[i].completed = done);
  rankLevel = data.rankLevel ?? 0;
  title = data.title ?? title;
}

loadState();
renderAll();

// ===== UI =====
function renderAll() {
  document.getElementById("rankLabel").innerText =
    `Rank: ${ranks[rankLevel]}`;
  document.getElementById("titleLabel").innerText =
    `Título: ${title}`;
  renderMissions();
  document.getElementById("mageText").innerText =
    "Escolha uma missão para avançar no Ato.";
}

function renderMissions() {
  const list = document.getElementById("missionList");
  list.innerHTML = "";

  missions.forEach((m, i) => {
    const li = document.createElement("li");
    li.textContent = m.title;
    if (m.completed) li.classList.add("completed");
    li.onclick = () => startMission(i);
    list.appendChild(li);
  });

  checkBossUnlock();
}

// ===== MISSÕES =====
function startMission(index) {
  activeMission = missions[index];
  document.getElementById("missionTitle").innerText = activeMission.title;
  document.getElementById("mageText").innerText = activeMission.description;
  document.getElementById("ide").classList.remove("hidden");
}

function runMission() {
  const code = document.getElementById("codeInput").value.trim();
  const out = document.getElementById("consoleOutput");
  out.textContent = "";

  if (!activeMission) return;

  if (activeMission.check(code)) {
    activeMission.completed = true;
    out.textContent = "✔ Missão concluída.";
    document.getElementById("mageText").innerText =
      "Muito bem. Você avançou em seu aprendizado.";
    promote();
    saveState();
    renderMissions();
  } else {
    out.textContent = "✖ A magia falhou.";
    document.getElementById("mageText").innerText =
      "Reflita sobre o feitiço e tente novamente.";
  }
}

// ===== PROGRESSÃO =====
function promote() {
  const completed = missions.filter(m => m.completed).length;
  if (completed === 1) rankLevel = 1;
  if (completed === 3) rankLevel = 2;
}

// ===== BOSS =====
function checkBossUnlock() {
  if (missions.every(m => m.completed)) {
    document.getElementById("boss").classList.remove("hidden");
    document.getElementById("bossText").innerText = bossIntroByRank();
  }
}

function bossIntroByRank() {
  if (rankLevel === 0) {
    return "Como Aprendiz, demonstre o feitiço básico: use print().";
  }
  if (rankLevel === 1) {
    return "Como Adepto, use print() e controle valores com variáveis.";
  }
  return "Como Mago, una print(), variáveis e decisões com if.";
}

function runBoss() {
  const code = document.getElementById("bossInput").value.trim();
  const out = document.getElementById("bossOutput");
  out.textContent = "";

  const hasPrint = code.includes("print");
  const hasVar = code.includes("=");
  const hasIf = code.includes("if");

  let passed = false;
  if (rankLevel === 0) passed = hasPrint;
  else if (rankLevel === 1) passed = hasPrint && hasVar;
  else passed = hasPrint && hasVar && hasIf;

  if (passed) {
    out.textContent = "✔ O Guardião foi derrotado.";
    document.getElementById("mageText").innerText =
      "Você provou domínio sobre este Ato.";

    localStorage.setItem("ato1Completo", "true");
    localStorage.setItem("ato2Liberado", "true");

    generateBossReport();
    saveState();
  } else {
    out.textContent = "✖ O feitiço é insuficiente.";
    document.getElementById("mageText").innerText =
      "O Guardião exige mais. Reúna todo o conhecimento aprendido.";
  }
}

// ===== RELATÓRIO =====
function generateBossReport() {
  const list = document.getElementById("reportList");
  list.innerHTML = "";

  list.innerHTML += "<li>✔ Uso correto de print()</li>";
  if (rankLevel >= 1) list.innerHTML += "<li>✔ Uso de variáveis</li>";
  if (rankLevel >= 2) list.innerHTML += "<li>✔ Uso de decisões com if</li>";

  document.getElementById("bossReport").classList.remove("hidden");
}

function closeReport() {
  document.getElementById("bossReport").classList.add("hidden");
  document.getElementById("mageText").innerText =
    "Ato concluído. Um novo caminho se abre no mapa.";
}
