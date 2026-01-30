let dialogIndex = 0;
const dialogs = [
  "Bem-vindo, aprendiz. Este é o início da sua jornada.",
  "Você percorreu todos os caminhos do conhecimento.",
  "Agora seu domínio pode ser comprovado."
];

const ranks = ["Iniciado", "Aprendiz", "Adepto", "Mestre"];
let rankLevel = 3;
let title = "Mestre do Renascer";

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
}

function closeProfile() {
  document.getElementById("studentProfile").classList.add("hidden");
}

function generateCertificateId() {
  let existing = localStorage.getItem("certificateId");
  if (existing) return existing;

  const seed = ranks[rankLevel] + title;
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

  const id = generateCertificateId();
  document.getElementById("certId").innerText = id;

  const url =
    "https://raugustorubens-design.github.io/projeto-renascer/verificar/verificar.html?id=" + id;

  document.getElementById("qrCode").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(url);
}

function closeCertificate() {
  document.getElementById("certificate").classList.add("hidden");
}

function openFinalReport() {
  document.getElementById("finalReport").classList.remove("hidden");
  document.getElementById("reportRank").innerText = ranks[rankLevel];
  document.getElementById("reportTitle").innerText = title;
  document.getElementById("reportId").innerText = generateCertificateId();

  const skills = [
    "Pensamento Lógico",
    "Decisão Condicional",
    "Repetição (Laços)",
    "Abstração (Funções)",
    "Estruturas de Dados"
  ];

  const ul = document.getElementById("reportSkills");
  ul.innerHTML = "";
  skills.forEach(s => {
    const li = document.createElement("li");
    li.innerText = s;
    ul.appendChild(li);
  });
}

function closeFinalReport() {
  document.getElementById("finalReport").classList.add("hidden");
}

function exportPDF() {
  window.print();
}

function generateCertificateRecord() {
  const record = {
    id: generateCertificateId(),
    projeto: "RENASCER",
    status: "válido",
    ano: 2026,
    dominios: [
      "Pensamento Lógico",
      "Decisão Condicional",
      "Repetição (Laços)",
      "Abstração (Funções)",
      "Estruturas de Dados"
    ]
  };

  alert(
    "COPIE ESTE REGISTRO E COLE EM certificados.json:\n\n" +
    JSON.stringify(record, null, 2)
  );
}
