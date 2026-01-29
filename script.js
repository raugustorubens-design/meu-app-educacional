// Fases e falas do mago
const phases = [
  {
    messages: [
      "Bem-vindo, aprendiz. Este é o início da sua jornada.",
      "Antes de lançar feitiços, é preciso compreender a lógica da magia.",
      "Quando estiver pronto, tente executar seu primeiro feitiço."
    ]
  }
];

let currentPhase = 0;
let messageIndex = 0;

// Inicialização
document.getElementById("mageText").innerText =
  phases[currentPhase].messages[messageIndex];

function nextMessage() {
  messageIndex++;

  const messages = phases[currentPhase].messages;

  if (messageIndex < messages.length) {
    document.getElementById("mageText").innerText = messages[messageIndex];
  } else {
    document.getElementById("continueBtn").classList.add("hidden");
    document.getElementById("castBtn").classList.remove("hidden");
  }
}

// Início do feitiço
function castSpell() {
  document.getElementById("spellArea").classList.remove("hidden");
  document.getElementById("mageText").innerText =
    "Escreva seu feitiço. Observe o resultado com atenção.";
}

// Avaliação do feitiço (simulada)
function evaluateSpell() {
  const spell = document.getElementById("spellInput").value.trim();

  if (spell.length === 0) {
    document.getElementById("mageText").innerText =
      "A magia falhou. Um feitiço vazio não produz efeito.";
    return;
  }

  if (spell.includes("print")) {
    document.getElementById("mageText").innerText =
      "Muito bem. Seu feitiço funcionou. A magia responde à lógica.";
    openPortal();
  } else {
    document.getElementById("mageText").innerText =
      "Algo deu errado. Observe a estrutura do feitiço e tente novamente.";
  }
}

// Portal
function openPortal() {
  document.getElementById("portal").classList.remove("hidden");
}

function enterPortal() {
  document.getElementById("mageText").innerText =
    "Você atravessa o vórtice e segue para a próxima etapa da jornada.";
  document.getElementById("portal").classList.add("hidden");
}
