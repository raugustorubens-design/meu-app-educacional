let flow = [];
let index = 0;

const screen = document.getElementById("screen");

fetch("ato_free.json")
  .then(r => r.json())
  .then(data => {
    data.acts.forEach(act => {
      act.steps.forEach(step => flow.push(step));
    });
    render();
  })
  .catch(err => {
    console.error(err);
    screen.innerHTML = "Erro ao carregar conteúdo.";
  });

function render() {
  const step = flow[index];
  screen.innerHTML = "";

  if (!step) {
    screen.innerHTML = "<h2>Fim do conteúdo</h2>";
    return;
  }

  // EXEMPLO PRÁTICO (NOVO, SEGURO)
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
      ${step.options.map(o => `
        <label>
          <input type="radio" name="q" value="${o.correct}">
          ${o.text}
        </label>
      `).join("")}
      <button onclick="checkQuiz()">Confirmar</button>
    `;
  }

  if (step.type === "spell") {
    screen.innerHTML += `
      <h2>${step.title}</h2>
      <p>${step.prompt}</p>
      <textarea></textarea>
      <button onclick="next()">Enviar</button>
    `;
  }

  if (step.type === "portal") {
    screen.innerHTML += `
      <h2>${step.title}</h2>
      <p>${step.text}</p>
    `;
  }
}

function next() {
  index++;
  render();
}

function checkQuiz() {
  const sel = document.querySelector("input[name=q]:checked");
  if (sel && sel.value === "true") {
    alert("Correto!");
    next();
  } else {
    alert("Observe o exemplo e tente novamente.");
  }
}
