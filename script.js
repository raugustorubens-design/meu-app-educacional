let user = { premium: false };
let flow = [];
let index = 0;

const screen = document.getElementById("screen");

fetch("ato_free.json")
  .then(res => {
    if (!res.ok) throw new Error("Fetch falhou");
    return res.json();
  })
  .then(data => {
    buildFlow(data);
    render();
  })
  .catch(err => {
    console.error(err);
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

  if (step.example) {
    screen.innerHTML += `
      <h3>Exemplo prático</h3>
      <pre>${step.example}</pre>
    `;
  }

  if (step.type === "narrative" || step.type === "content") {
    screen.innerHTML += `
      <h1>${step.title}</h1>
      <p>${step.text}</p>
      <button onclick="next()">Avançar</button>
    `;
  }

  if (step.type === "quiz") {
    screen.innerHTML += `
      <p>${step.question}</p>
      ${step.options.map((o, i) => `
        <label>
          <input type="radio" name="q" value="${o.correct}">
          ${o.text}
        </label>
      `).join("")}
      <button onclick="checkQuiz()">Confirmar</button>
    `;
  }

  if (step.type === "ordering") {
    screen.innerHTML += `
      <h2>Ordene corretamente</h2>
      <ul>
        ${step.items.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <button onclick="next()">Continuar</button>
    `;
  }

  if (step.type === "spell") {
    screen.innerHTML += `
      <h2>${step.title || "Feitiço"}</h2>
      <p>${step.prompt}</p>
      <textarea placeholder="Escreva sua resposta..."></textarea>
      <button onclick="next()">Lançar Feitiço</button>
    `;
  }

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
    alert("Observe o exemplo e tente novamente.");
  }
}

function unlock() {
  alert("Simulação de assinatura realizada.");
  user.premium = true;
  next();
}
