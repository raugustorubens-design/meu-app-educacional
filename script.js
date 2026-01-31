// ===============================
// PROJETO RENASCER — SCRIPT BASE
// Estado: FREE | Estrutura Canônica
// ===============================

// -------------------------------
// CONTROLE DE ABAS (NAVEGAÇÃO)
// -------------------------------
// Regra: nenhuma aba abre automaticamente
// Exceto "Início"

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("nav button");
  const tabs = document.querySelectorAll(".tab");

  function openTab(tabId) {
    tabs.forEach(tab => tab.classList.remove("active"));
    const target = document.getElementById(tabId);
    if (target) target.classList.add("active");
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;
      openTab(tabId);
    });
  });

  // Estado inicial explícito
  openTab("inicio");
});


// ===============================
// CHECKPOINT FASE 1 — ESTADO GLOBAL
// ===============================

const gameState = {
  version: "1.0.0",
  mode: "FREE", // FREE | PREMIUM
  portalLocked: true,

  player: {
    id: null,
    name: null,
    createdAt: null
  },

  progress: {
    python: {
      introCompleted: false,
      basicCompleted: false
    }
  }
};


// -------------------------------
// PERSISTÊNCIA LOCAL
// -------------------------------

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
  gameState.player.name = "Aprendiz";
}


// -------------------------------
// LOCK CANÔNICO DO PORTAL
// -------------------------------

function canAccessPortal() {
  return gameState.progress.python.basicCompleted === true;
}


// ===============================
// FASE 2 — COMPLIANCE TÉCNICO INVISÍVEL
// ===============================

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

function guardAction(level) {
  if (!canAttemptLevel(level)) {
    console.warn("Ação bloqueada por regra canônica");
    return false;
  }
  return true;
}

function unlockNextPhase() {
  gameState.progress.python.basicCompleted = true;
  saveState();
}


// ===============================
// FASE 3 — ERRO CONSCIENTE
// ===============================

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

function canTraversePortal() {
  return (
    gameState.progress.python.basicCompleted &&
    validationState.level1Passed &&
    learningState.consciousErrorValidated
  );
}


// ===============================
// FASE 4 — INFRAESTRUTURA BLOQUEADA
// ===============================

const grimorio = {
  enabled: false,
  entries: [],
  open() {
    if (!this.enabled) {
      console.warn("Grimório indisponível no modo atual");
      return false;
    }
    return true;
  }
};

const ideSimulator = {
  enabled: false,
  lastExecution: null,
  run(code) {
    if (!this.enabled) {
      console.warn("IDE simulada indisponível");
      return null;
    }
    return {
      output: null,
      error: "Execução ainda não habilitada"
    };
  }
};

function enablePremiumFeatures() {
  if (gameState.mode !== "PREMIUM") return false;

  grimorio.enabled = true;
  ideSimulator.enabled = true;
  return true;
}


// ===============================
// INICIALIZAÇÃO FINAL
// ===============================

loadState();
