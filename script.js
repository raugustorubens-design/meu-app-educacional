/* ======================
   NARRATIVA
====================== */
let dialogIndex = 0;
const dialogs = [
  "Bem-vindo, aprendiz. Este é o início da sua jornada.",
  "Cada decisão fortaleceu seu domínio.",
  "Agora seu percurso pode ser comprovado."
];

/* ======================
   PERFIL BASE
====================== */
const ranks = ["Iniciado", "Aprendiz", "Adepto", "Mestre"];
let rankLevel = 3;
let title = "Mestre do Renascer";

/* ======================
   ATOS (CANÔNICO)
====================== */
const acts = [
  { name: "Fundamentos", hours: 4, missions: 1, boss: 1, exam: 1 },
  { name: "Lógica", hours: 6, missions: 1, boss: 1, exam: 1 },
  { name: "Decisão", hours: 6, missions: 1, boss: 1, exam: 1 },
  { name: "Repetição", hours: 8, missions: 1, boss: 1, exam: 1 },
  { name: "Abstração", hours: 8, missions: 1, boss: 1, exam: 1 },
  { name: "Estruturas de Dados", hours: 8, missions: 1, boss: 1, exam: 1 }
];

/* ======================
   CÁLCULOS
====================== */
function actPerformance(act) {
  return (
    act.missions * 0.4 +
    act.boss * 0.4 +
    act.exam * 0.2
  ) * 100;
}

function totalPerformance() {
  const sum = acts.reduce((a, act) => a + actPerformance(act), 0);
  return Math.round(sum / acts.length);
}

function totalHours() {
  let total = 0;
  acts.forEach(act => {
    total += act.hours * (actPerformance(act) / 100);
  });
  return total.toFixed(1);
}

/* ======================
   FLUXO
====================== */
function nextDialog() {
  dialogIndex++;
  if (dialogIndex < dialogs.length) {
    document.getElementById("dialogText").innerText = dialogs[dialogIndex];
  } else {
    document.getElementById("dialogBox").classList.add("hidden");
    openProfile();
  }
}

function openProfile() {
  document.getElementById("studentProfile").classList.remove("hidden");
  document.getElementById("profileRank").innerText = ranks[rankLevel];
  document.getElementById("profileTitle").innerText = title;
  document.getElementById("profilePerformance").innerText = totalPerformance();
  document.getElementById("profileHours").innerText = totalHours();
}

function closeProfile() {
  document.getElementById("studentProfile").classList.add("hidden");
}

/* ======================
   CERTIFICADO
====================== */
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
  document.getElementById("certificate").classList.remove("hidden");

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

/* ======================
   RELATÓRIO
====================== */
function openFinalReport() {
  document.getElementById("finalReport").classList.remove("hidden");

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

/* ======================
   PDF + REGISTRO
====================== */
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
    dominios: acts.map(a => a.name)
  };

  alert(
    "COPIE ESTE REGISTRO E COLE EM certificados.json:\n\n" +
    JSON.stringify(record, null, 2)
  );
}
