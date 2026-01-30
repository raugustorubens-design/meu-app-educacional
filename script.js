// ===============================
// PERSONAGENS — CANÔNICO
// ===============================

const characters = {
  mentor: {
    id: "mago",
    name: "Mago do Renascer",
    role: "mentor",
    img: "assets/characters/mago.png"
  },

  players: [
    {
      id: "giu",
      name: "Giu",
      role: "jogadora",
      profile: "exploradora",
      img: "assets/characters/players/01_Giu_jogadora.png"
    },
    {
      id: "bi",
      name: "Bi",
      role: "jogadora",
      profile: "estrategista",
      img: "assets/characters/players/02_Bi_jogadora.png"
    },
    {
      id: "neto",
      name: "Neto",
      role: "jogador",
      profile: "equilibrado",
      img: "assets/characters/players/03_Neto_jogador.png"
    },
    {
      id: "jack",
      name: "Jack",
      role: "jogadora",
      profile: "resiliente",
      img: "assets/characters/players/04_Jack_jogadora.png"
    }
  ]
};

/* =========================
   NARRATIVA INICIAL
========================= */
let dialogIndex = 0;

const dialogs = [
  "Bem-vindo, aprendiz. Este é o início da sua jornada.",
  "Cada decisão fortaleceu seu domínio.",
  "Agora seu percurso pode ser comprovado."
];

/* =========================
   PERFIL BASE
========================= */
const ranks = ["Iniciado", "Aprendiz", "Adepto", "Mestre"];
let rankLevel = 3;
let title = "Mestre do Renascer";

/* =========================
   ATOS (MODELO DINÂMICO)
========================= */
const acts = [
  { name: "Fundamentos", hours: 4, missions: 1, boss: 1, exam: 1 },
  { name: "Lógica", hours: 6, missions: 1, boss: 1, exam: 1 },
  { name: "Decisão", hours: 6, missions: 1, boss: 1, exam: 1 },
  { name: "Repetição", hours: 8, missions: 1, boss: 1, exam: 1 },
  { name: "Abstração", hours: 8, missions: 1, boss: 1, exam: 1 },
  { name: "Estruturas de Dados", hours: 8, missions: 1, boss: 1, exam: 1 }
];

/* =========================
   CÁLCULOS PEDAGÓGICOS
========================= */
function actPerformance(act) {
  return (
    act.missions * 0.4 +
    act.boss * 0.4 +
    act.exam * 0.2
  ) * 100;
}

function totalPerformance() {
  const sum = acts.reduce((acc, act) => acc + actPerformance(act), 0);
  return Math.round(sum / acts.length);
}

function totalHours() {
  let total = 0;
  acts.forEach(act => {
    total += act.hours * (actPerformance(act) / 100);
  });
  return total.toFixed(1);
}

/* =========================
   FLUXO NARRATIVO
========================= */
function nextDialog() {
  dialogIndex++;

  if (dialogIndex < dialogs.length) {
    document.getElementById("dialogText").innerText = dialogs[dialogIndex];
  } else {
    document.getElementById("dialogBox").classList.add("hidden");
    openProfile();
  }
}

/* 🔑 EXPOSIÇÃO GLOBAL (BUG FIX) */
window.nextDialog = nextDialog;

/* =========================
   PERFIL DO ALUNO
========================= */
function openProfile() {
  const profile = document.getElementById("studentProfile");
  if (!profile) return;

  profile.classList.remove("hidden");
  document.getElementById("profileRank").innerText = ranks[rankLevel];
  document.getElementById("profileTitle").innerText = title;
  document.getElementById("profilePerformance").innerText = totalPerformance();
  document.getElementById("profileHours").innerText = totalHours();
}

function closeProfile() {
  document.getElementById("studentProfile").classList.add("hidden");
}

/* =========================
   CERTIFICADO
========================= */
function generateCertificateId() {
  let existing = localStorage.getItem("certificateId");
  if (existing) return existing;

  const seed = title + totalPerformance();
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const code = Math.abs(hash).toString(16).toUpperCase().slice(0, 6);
  const id = `REN-2026-${code}`;

  localStorage.setItem("certificateId", id);
  return id;
}

function openCertificate() {
  const cert = document.getElementById("certificate");
  if (!cert) return;

  cert.classList.remove("hidden");

  document.getElementById("certRank").innerText = ranks[rankLevel];
  document.getElementById("certTitle").innerText = title;
  document.getElementById("certHours").innerText = totalHours();
  document.getElementById("certPerformance").innerText = totalPerformance();

  const id = generateCertificateId();
  document.getElementById("certId").innerText = id;

  const verifyUrl =
    "https://raugustorubens-design.github.io/projeto-renascer/verificar/verificar.html?id=" + id;

  document.getElementById("qrCode").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(verifyUrl);
}

function closeCertificate() {
  document.getElementById("certificate").classList.add("hidden");
}

/* =========================
   RELATÓRIO PEDAGÓGICO
========================= */
function openFinalReport() {
  const report = document.getElementById("finalReport");
  if (!report) return;

  report.classList.remove("hidden");

  document.getElementById("reportRank").innerText = ranks[rankLevel];
  document.getElementById("reportTitle").innerText = title;
  document.getElementById("reportId").innerText = generateCertificateId();

  const ul = document.getElementById("reportActs");
  ul.innerHTML = "";

  acts.forEach(act => {
    const li = document.createElement("li");
    li.innerText =
      `${act.name}: ${actPerformance(act)}% — ` +
      `${(act.hours * (actPerformance(act) / 100)).toFixed(1)}h`;
    ul.appendChild(li);
  });

  document.getElementById("reportHours").innerText = totalHours();
  document.getElementById("reportPerformance").innerText = totalPerformance();
}

function closeFinalReport() {
  document.getElementById("finalReport").classList.add("hidden");
}

/* =========================
   PDF E REGISTRO
========================= */
function exportPDF() {
  window.print();
}

function generateCertificateRecord() {
  const record = {
    id: generateCertificateId(),
    projeto: "RENASCER",
    status: "válido",
    ano: 2026,
    cargaHoraria: totalHours(),
    aproveitamento: totalPerformance() + "%",
    dominios: acts.map(act => act.name)
  };

  alert(
    "COPIE ESTE REGISTRO E COLE EM certificados.json:\n\n" +
    JSON.stringify(record, null, 2)
  );
}

// ===============================
// TESTE DE CARREGAMENTO DE IMAGENS
// ===============================

window.addEventListener("DOMContentLoaded", () => {
  const testArea = document.createElement("div");
  testArea.style.display = "flex";
  testArea.style.gap = "16px";
  testArea.style.flexWrap = "wrap";
  testArea.style.padding = "16px";

  // Mago
  const magoImg = document.createElement("img");
  magoImg.src = characters.mentor.img;
  magoImg.alt = characters.mentor.name;
  magoImg.style.width = "150px";
  testArea.appendChild(magoImg);

  // Jogadores
  characters.players.forEach(p => {
    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.name;
    img.style.width = "120px";
    testArea.appendChild(img);
  });

  document.body.appendChild(testArea);
});
