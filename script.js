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
    `
