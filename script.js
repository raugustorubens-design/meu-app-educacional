// ===== ESTADO GLOBAL =====
const ranks = ["Aprendiz", "Adepto", "Mago"];
let rankLevel = 0;
let title = "Aprendiz Iniciado";
let currentAct = localStorage.getItem("atoAtual") || "Ato1";

// ===== MISSÕES =====
const missionsAct1 = [
  { title: "Primeiro Feitiço", desc: "Use print()", check: c => c.startsWith("print"), completed: false },
  { title: "Variáveis", desc: "Crie uma variável", check: c => c.includes("="), completed: false },
  { title: "Decisão", desc: "Use if", check: c => c.includes("if"), completed: false }
];

const missionsAct2 = [
  { title: "Variável + print", desc: "Crie variável e imprima", check: c => c.includes("=") && c.includes("print"), completed: false },
  { title: "Reatribuição", desc: "Altere o valor da variável", check: c => (c.split("=").length - 1) >= 2, completed: false },
  { title: "Preparação", desc: "Use variável para decisão futura", check: c => c.includes("="), completed: false }
];

let activeMission = null;

// ===== LOAD =====
function loadState() {
  const saved = JSON.parse(localStorage.getItem("renascerState") || "{}");
  rankLevel = saved.rankLevel || 0;
  title = saved.title || title;

  if (saved.act1) saved.act1.forEach((v, i) => missionsAct1[i].completed = v);
  if (saved.act2) saved.act2.forEach((v, i) => missionsAct2[i].completed = v);
}
loadState();
renderAll();

// ===== UI =====
function renderAll() {
  document.getElementById("rankLabel").innerText = `Rank: ${ranks[rankLevel]}`;
  document.getElementById("titleLabel").innerText = `Título: ${title}`;
  document.getElementById("actTitle").innerText =
    currentAct === "Ato2" ? "Ato II — A Lógica Profunda" : "Ato I — O Despertar";
  renderMissions();
  document.getElementById("mageText").innerText =
    "Escolha uma missão para avançar.";
}

function renderMissions() {
  const list = document.getElementById("missionList");
  list.innerHTML = "";
  const missions = currentAct === "Ato2" ? missionsAct2 : missionsAct1;

  missions.forEach((m, i) => {
    const li = document.createElement("li");
    li.textContent = m.title;
    if (m.completed) li.classList.add("completed");
    li.onclick = () => startMission(i);
    list.appendChild(li);
  });

  if (missions.every(m => m.completed)) unlockBoss();
}

// ===== MISSÕES =====
function startMission(i) {
  const missions = currentAct === "Ato2" ? missionsAct2 : missionsAct1;
  activeMission = missions[i];
  document.getElementById("missionTitle").innerText = activeMission.title;
  document.getElementById("mageText").innerText = activeMission.desc;
  document.getElementById("ide").classList.remove("hidden");
}

function runMission() {
  const code = document.getElementById("codeInput").value.trim();
  if (!activeMission) return;

  if (activeMission.check(code)) {
    activeMission.completed = true;
    promote();
    saveState();
    renderAll();
  }
}

// ===== PROGRESSÃO =====
function promote() {
  const completed =
    (currentAct === "Ato2" ? missionsAct2 : missionsAct1)
      .filter(m => m.completed).length;

  if (completed >= 1) rankLevel = 1;
  if (completed >= 3) rankLevel = 2;
}

// ===== BOSS =====
function unlockBoss() {
  document.getElementById("boss").classList.remove("hidden");
  document.getElementById("bossText").innerText =
    currentAct === "Ato2"
      ? "O Guardião da Lógica exige coerência."
      : "Prove seu domínio.";
}

function runBoss() {
  const code = document.getElementById("bossInput").value;
  const hasPrint = code.includes("print");
  const hasVar = code.includes("=");
  const hasIf = code.includes("if");
  const assigns = code.split("=").length - 1;

  let passed =
    currentAct === "Ato2"
      ? hasPrint && hasVar && assigns >= 2
      : hasPrint && hasVar && hasIf;

  if (passed) {
    if (currentAct === "Ato1") {
      localStorage.setItem("ato1Completo", "true");
      currentAct = "Ato2";
      localStorage.setItem("atoAtual", "Ato2");
    } else {
      localStorage.setItem("ato2Completo", "true");
    }
    generateReport();
  }
}

// ===== RELATÓRIO =====
function generateReport() {
  const list = document.getElementById("reportList");
  list.innerHTML = "<li>✔ Progresso validado</li>";
  document.getElementById("bossReport").classList.remove("hidden");
}

function closeReport() {
  document.getElementById("bossReport").classList.add("hidden");
  renderAll();
}

// ===== PERFIL =====
function openProfile() {
  document.getElementById("studentProfile").classList.remove("hidden");
  document.getElementById("profileRank").innerText = ranks[rankLevel];
  document.getElementById("profileTitle").innerText = title;
  document.getElementById("profileStatus").innerText =
    localStorage.getItem("premium") === "true" ? "Iniciado" : "FREE";

  const list = document.getElementById("profileActs");
  list.innerHTML = "";
  if (localStorage.getItem("ato1Completo")) list.innerHTML += "<li>Ato I ✔</li>";
  if (localStorage.getItem("ato2Completo")) list.innerHTML += "<li>Ato II ✔</li>";
}

function closeProfile() {
  document.getElementById("studentProfile").classList.add("hidden");
}

// ===== SAVE =====
function saveState() {
  localStorage.setItem("renascerState", JSON.stringify({
    rankLevel,
    title,
    act1: missionsAct1.map(m => m.completed),
    act2: missionsAct2.map(m => m.completed)
  }));
}
