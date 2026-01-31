// =====================================================
// PROJETO RENASCER — SCRIPT CANÔNICO
// Modo: FREE | Arquitetura pedagógica + narrativa
// =====================================================

/* =====================================================
   FASE 1 — ESTADO GLOBAL E PERSISTÊNCIA
===================================================== */

const gameState = {
  version: "1.0.0",
  mode: "FREE", // FREE | PREMIUM
  portalLocked: true,
  player: {
    id: null,
    name: "Aprendiz",
    createdAt: null
  },
  progress: {
    python: {
      introCompleted: false,
      basicCompleted: false
    }
  }
};

function saveState() {
  localStorage.setItem("renascer_state", JSON.stringify(gameState));
}

function loadState() {
  const saved = localStorage.getItem("renascer_state");
  if (saved) {
    Object.assign(gameState, JSON.parse(saved));
  } else {
    initializePlayer();
    saveState();
  }
}

function initializePlayer() {
  gameState.player.id = crypto.randomUUID();
  gameState.player.createdAt = new Date().toISOString();
}

/* =====================================================
   FASE 2 — VALIDAÇÃO E COMPLIANCE INVISÍVEL
===================================================== */

const validationState = {
  explanationViewed: false,
  level2Passed: false,
  level3Passed: false,
  level1Passed: false
};

function canAttemptLevel(level) {
  if (!validationState.explanationViewed) return false;
  if (level === 2) return true;
  if (level === 3) return validationState.level2Passed;
  if (level === 1)
    return validationState.level2Passed && validationState.level3Passed;
  return false;
}

function registerSuccess(level) {
  if (level === 2) validationState.level2Passed = true;
  if (level === 3) validationState.level3Passed = true;
  if (level === 1) {
    validationState.level1Passed = true;
    unlockNextPhase();
  }
  saveState();
}

function unlockNextPhase() {
  gameState.progress.python.basicCompleted = true;
  saveState();
}

/* =====================================================
   FASE 3 — ERRO CONSCIENTE E FEITIÇO
===================================================== */

const learningState = {
  attempts: 0,
  lastError: null,
  consciousErrorValidated: false
};

function registerAttempt(isCorrect, errorMessage = null) {
  learningState.attempts++;
  if (!isCorrect) {
    learningState.lastError = errorMessage;
    learningState.consciousErrorValidated = false;
  }
  saveState();
}

function validateConsciousError(explanationText) {
  if (!learningState.lastError) return false;
  if (explanationText && explanationText.length > 30) {
    learningState.consciousErrorValidated = true;
    saveState();
    return true;
  }
  return false;
}

function castSpell(spellText) {
  if (!learningState.consciousErrorValidated) return false;
  if (spellText && spellText.length > 50) {
    registerSuccess(1);
    return true;
  }
  return false;
}

/* =====================================================
   FASE 4 — PERSONAGENS (ASSETS)
===================================================== */

const characters = {
  mentor: {
    name: "Mago do Renascer",
    img: "assets/characters/mago.png"
  },
  players: [
    { name: "Giu", img: "assets/characters/players/01_Giu_jogadora.png" },
    { name: "Bi", img: "assets/characters/players/02_Bi_jogadora.png" },
    { name: "Neto", img: "assets/characters/players/03_Neto_jogador.png" },
    { name: "Jack", img: "assets/characters/players/04_Jack_jogadora.png" }
  ]
};

/* =====================================================
   FASE 5 — RENDERIZAÇÃO VISUAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadState();

  // ---------- MENTOR ----------
  const mentorContainer = document.createElement("div");
  mentorContainer.style.position = "fixed";
  mentorContainer.style.left = "20px";
  mentorContainer.style.bottom = "20px";
  mentorContainer.style.display = "flex";
  mentorContainer.style.alignItems = "flex-end";
  mentorContainer.style.gap = "12px";
  mentorContainer.style.zIndex = "900";

  const mentorImg = document.createElement("img");
  mentorImg.src = characters.mentor.img;
  mentorImg.alt = characters.mentor.name;
  mentorImg.style.width = "140px";

  const mentorDialog = document.createElement("div");
  mentorDialog.style.maxWidth = "300px";
  mentorDialog.style.background = "rgba(0,0,0,0.85)";
  mentorDialog.style.color = "#fff";
  mentorDialog.style.padding = "12px";
  mentorDialog.style.borderRadius = "8px";
  mentorDialog.style.fontSize = "14px";
  mentorDialog.innerText =
    "Antes de avançar, Aprendiz, compreenda a dungeon. Aqui, errar é permitido. Passar sem entender, não.";

  mentorContainer.appendChild(mentorImg);
  mentorContainer.appendChild(mentorDialog);
  document.body.appendChild(mentorContainer);

  // ---------- JOGADORES ----------
  const playersContainer = document.createElement("div");
  playersContainer.style.position = "fixed";
  playersContainer.style.right = "20px";
  playersContainer.style.top = "120px";
  playersContainer.style.display = "grid";
  playersContainer.style.gridTemplateColumns = "repeat(2, 120px)";
  playersContainer.style.gap = "12px";
  playersContainer.style.zIndex = "800";

  characters.players.forEach(p => {
    const wrapper = document.createElement("div");
    wrapper.style.textAlign = "center";
    wrapper.style.color = "#fff";
    wrapper.style.fontSize = "12px";

    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.name;
    img.style.width = "100px";
    img.style.borderRadius = "8px";

    const label = document.createElement("div");
    label.innerText = p.name;

    wrapper.appendChild(img);
    wrapper.appendChild(label);
    playersContainer.appendChild(wrapper);
  });

  document.body.appendChild(playersContainer);
});

/* =====================================================
   FASE 6 — GRIMÓRIO (CONSULTA CONSCIENTE)
===================================================== */

const grimorio = {
  enabled: true
};

const grimorioEntries = [
  {
    id: "print",
    titulo: "print()",
    categoria: "Saída",
    descricao: "Exibe informações no console.",
    armadilha: "print não retorna valor."
  },
  {
    id: "input",
    titulo: "input()",
    categoria: "Entrada",
    descricao: "Recebe dados do usuário.",
    armadilha: "Sempre retorna string."
  }
];

function listarPorCategoria(cat) {
  return grimorioEntries.filter(e => e.categoria === cat);
}

/* =====================================================
   FIM DO SCRIPT
===================================================== */
