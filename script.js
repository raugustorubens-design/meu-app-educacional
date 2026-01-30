// ===== ESTADO =====
const ranks = ["Aprendiz", "Adepto", "Mago"];
let rankLevel = 0;
let missionsProgress = [];

// ===== MISSÕES DO ATO I =====
const missions = [
  {
    title: "Missão 1 — Primeiro Feitiço",
    description: "Use print() para exibir algo.",
    successCheck: code => code.startsWith("print"),
    completed: false
  },
  {
    title: "Missão 2 — Criando Variáveis",
    description: "Crie uma variável usando =",
    successCheck: code => code.includes("="),
    completed: false
  },
  {
    title: "Missão 3 — Tomando Decisões",
    description: "Use if para tomar uma decisão.",
    successCheck: code => code.includes("if"),
    completed: false
  }
];

let activeMission = null;

// ===== LOAD =====
function loadState() {
  const saved = localStorage.getItem("renascerMissions");
  if (saved) {
    missionsProgress = JSON.parse(saved);
    missionsProgress.forEach((done, i) => missions[i].completed = done);
  }
}

function saveState() {
  localStorage.setItem(
    "renascerMissions",
    JSON.stringify(missions.map(m => m.completed))
  );
}

loadState();
renderMissions();

// ===== UI =====
function renderMissions() {
  const list = document.getElementById("missionList");
  list.innerHTML = "";

  missions.forEach((mission, index) => {
    const li = document.createElement("li");
    li.textContent = mission.title;
    li.className = mission.completed ? "completed" : "";
    li.onclick = () => startMission(index);
    list.appendChild(li);
  });

  document.getElementById("rankLabel").innerText =
    `Rank: ${ranks[rankLevel]}`;
}

function startMission(index) {
  const mission = missions[index];
  activeMission = mission;

  document.getElementById("missionTitle").innerText = mission.title;
  document.getElementById("mageText").innerText = mission.description;
  document.getElementById("ide").classList.remove("hidden");

  document.querySelectorAll(".missions li").forEach(li =>
    li.classList.remove("active")
  );
  document.querySelectorAll(".missions li")[index].classList.add("active");
}

// ===== EXECUÇÃO =====
function runMission() {
  const code = document.getElementById("codeInput").value.trim();
  const out = document.getElementById("consoleOutput");
  out.textContent = "";

  if (!activeMission) return;

  if (activeMission.successCheck(code)) {
    activeMission.completed = true;
    out.textContent = "✔ Missão concluída com sucesso.";
    document.getElementById("mageText").innerText =
      "Muito bem. Você dominou este desafio.";
    saveState();
    renderMissions();
  } else {
    out.textContent = "✖ A magia falhou.";
    document.getElementById("mageText").innerText =
      "Observe o grimório e tente novamente.";
  }
}
