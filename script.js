let user = { premium: false };
let flow = [];
let index = 0;

const screen = document.getElementById("screen");

// Carrega conteúdo FREE
fetch("ato_free.json")
  .then(res => res.json())
  .then(data => {
    buildFlow(data);
    render();
  })
  .catch(() => {
    screen.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
  });

function buildFlow(data) {
  data.acts.forEach(act => {
    act.steps.forEach(step => flow.push(step));
  });
}

function render() {
  const step = flow[index];
  screen.innerHTML = "";

  if (!step) {
    screen.innerHTML = "<h2>Fim do conteúdo FREE</h2>";
    return;
  }

  // Exemplo prático (obrigatório quando existir)
  if (step.example) {
    screen.innerHTML += `
      <h3>Exemplo prático</h3>
      <pre>${step.example}</pre>
    `;
  }

  // Conteúdo / Narrativa
  if (step.type === "content" || step.type === "narrative") {
    screen.innerHTML += `
      <h1>${step.title}</h1>
      <p>${step.text}</p>
      <button onclick="next()">Avançar</button>
    `;
  }

  // Quiz (sintaxe / leitura)
  if (step.type === "quiz") {
    screen.innerHTML += `
      <p>${step.question}</p>
      ${step.options.map(opt => `
        <label>
          <input type="radio" name="q" value="${opt.correct}">
          ${opt.text}
        </label>
      `).join("")}
      <button onclick="checkQuiz()">Confirmar</button>
    `;
  }

  // Feitiço (domínio)
  if (step.type === "spell") {
    screen.innerHTML += `
      <h2>${step.title || "Feitiço"}</h2>
      <p>${step.prompt}</p>
      <textarea placeholder="Escreva seu código e/ou explicação..."></textarea>
      <button onclick="next()">Lançar Feitiço</button>
    `;
  }

  // Portal (paywall)
  if (step.type === "portal") {
    if (!user.premium) {
      screen.innerHTML = `
        <h1>${step.title}</h1>
        <p>${step.text}</p>
        <button onclick="unlock()">Desbloquear Portal</button>
      `;
    } else {
      next();
    }
  }
}

function next() {
  index++;
  render();
}

function checkQuiz() {
  const selected = document.querySelector("input[name='q']:checked");
  if (selected && selected.value === "true") {
    alert("Correto!");
    next();
  } else {
    alert("Observe o exemplo prático e tente novamente.");
  }
}

function unlock() {
  alert("Simulação de assinatura realizada.");
  user.premium = true;
  next();
}
