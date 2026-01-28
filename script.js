let flow = [];
let index = 0;
let student = {
  name: null
};

const screen = document.getElementById("screen");

// ====== PERSISTÊNCIA ======
function saveProgress() {
  localStorage.setItem("renascer_progress", index);
  localStorage.setItem("renascer_student", JSON.stringify(student));
}

function loadProgress() {
  const savedIndex = localStorage.getItem("renascer_progress");
  const savedStudent = localStorage.getItem("renascer_student");

  if (savedStudent) student = JSON.parse(savedStudent);
  if (savedIndex !== null) index = parseInt(savedIndex);
}

// ====== CARREGAMENTO ======
fetch("ato_free.json")
  .then(r => r.json())
  .then(data => {
    data.acts.forEach(act => {
      act.steps.forEach(step => flow.push(step));
    });

    loadProgress();

    if (!student.name) {
      renderNameScreen();
    } else {
      render();
    }
  })
  .catch(err => {
    console.error(err);
    screen.innerHTML = "Erro ao carregar conteúdo.";
  });

// ====== TELAS ======
function renderNameScreen() {
  screen.innerHTML = `
    <h1>Bem-vindo, viajante</h1>
    <p>Antes de iniciar, diga seu nome.</p>
    <input id="nameInput" placeholder="Seu nome" style="width:100%;padding:8px;">
    <button onclick="saveName()">Iniciar Jornada</button>
  `;
}

function saveName() {
  const input = document.getElementById("nameInput");
  if (!input.value.trim()) return alert("Digite seu nome.");
  student.name = input.value.trim();
  saveProgress();
  render();
}

function render() {
  const step = flow[index];
  screen.innerHTML = "";

  if (!step) {
    screen.innerHTML = `
      <h2>Jornada concluída</h2>
      <p>Parabéns, ${student.name}. Você concluiu o conteúdo gratuito.</p>
      <button onclick="reset()">Reiniciar Jornada</button>
    `;
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
      ${step.options.map(o => `
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
      <h2>${step.title}</h2>
      <p>${step.text}</p>
      <ul>
        ${step.items.map(i => `<li>${i}</li>`).join("")}
      </ul>
      <button onclick="next()">Continuar</button>
    `;
  }

  if (step.type === "spell") {
    screen.innerHTML += `
      <h2>${step.title}</h2>
      <p>${step.prompt}</p>
      <textarea placeholder="Escreva sua resposta..."></textarea>
      <button onclick="next()">Lançar Feitiço</button>
    `;
  }

  if (step.type === "portal") {
    screen.innerHTML += `
      <h2>${step.title}</h2>
      <p>${step.text}</p>
    `;
  }
}

// ====== CONTROLE ======
function next() {
  index++;
  saveProgress();
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

function reset() {
  if (!confirm("Deseja reiniciar sua jornada?")) return;
  localStorage.clear();
  location.reload();
}
