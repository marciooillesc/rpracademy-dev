/**
 * features/jogos/sequencia-logica.js
 * Sequência Lógica — complete o padrão.
 * 4 níveis: Infantil (emojis), Fund. I (números), Fund. II (operações), Médio (padrões complexos).
 */

// ── NÍVEIS ────────────────────────────────────────────────────────────────────

const NIVEIS = [
  {
    id: 'infantil',
    nome: 'Infantil',
    emoji: '🌈',
    cor: '#34d399',
    descricao: 'Pré / Infantil — Complete a sequência de emojis',
    questoes: [
      { seq: ['🐱','🐶','🐱','🐶','🐱','❓'], resp: '🐶', opcoes: ['🐶','🐸','🐷','🐭'] },
      { seq: ['🔴','🔵','🔴','🔵','🔴','❓'], resp: '🔵', opcoes: ['🔴','🟡','🔵','🟢'] },
      { seq: ['⭐','⭐','🌙','⭐','⭐','❓'], resp: '🌙', opcoes: ['⭐','🌙','☀️','🌟'] },
      { seq: ['🍎','🍌','🍎','🍌','🍎','❓'], resp: '🍌', opcoes: ['🍎','🍇','🍌','🍓'] },
      { seq: ['🟦','🟥','🟦','🟥','❓','🟥'], resp: '🟦', opcoes: ['🟥','🟦','🟨','🟩'] },
      { seq: ['🐘','🐘','🐭','🐘','🐘','❓'], resp: '🐭', opcoes: ['🐘','🐭','🦁','🐻'] },
      { seq: ['☀️','🌧️','☀️','☀️','🌧️','❓'], resp: '☀️', opcoes: ['🌧️','⛅','🌈','☀️'] },
      { seq: ['🎈','🎈','🎉','🎈','🎈','❓'], resp: '🎉', opcoes: ['🎈','🎉','🎀','🎁'] },
      { seq: ['🟢','🟡','🟢','🟡','🟢','❓'], resp: '🟡', opcoes: ['🟢','🔵','🟡','🔴'] },
      { seq: ['🐔','🐣','🐔','🐣','❓','🐣'], resp: '🐔', opcoes: ['🐣','🐔','🦆','🦉'] },
    ],
  },
  {
    id: 'fundamental1',
    nome: 'Fund. I',
    emoji: '🔢',
    cor: '#38bdf8',
    descricao: '1º ao 5º Ano — Sequências numéricas simples',
    questoes: [
      { seq: [2, 4, 6, 8, '❓'], resp: 10, opcoes: [9, 10, 11, 12], dica: '+2' },
      { seq: [1, 3, 5, 7, '❓'], resp: 9,  opcoes: [8, 9, 10, 11], dica: '+2' },
      { seq: [5, 10, 15, 20, '❓'], resp: 25, opcoes: [22, 23, 24, 25], dica: '+5' },
      { seq: [100, 90, 80, 70, '❓'], resp: 60, opcoes: [60, 65, 55, 50], dica: '-10' },
      { seq: [3, 6, 9, 12, '❓'], resp: 15, opcoes: [13, 14, 15, 16], dica: '+3' },
      { seq: [1, 2, 4, 8, '❓'], resp: 16, opcoes: [12, 14, 16, 18], dica: '×2' },
      { seq: [10, 20, 30, 40, '❓'], resp: 50, opcoes: [45, 48, 50, 52], dica: '+10' },
      { seq: [64, 32, 16, 8, '❓'], resp: 4, opcoes: [4, 6, 2, 8], dica: '÷2' },
      { seq: [7, 14, 21, 28, '❓'], resp: 35, opcoes: [33, 35, 36, 40], dica: '+7' },
      { seq: [1, 4, 9, 16, '❓'], resp: 25, opcoes: [20, 22, 25, 28], dica: 'n²' },
    ],
  },
  {
    id: 'fundamental2',
    nome: 'Fund. II',
    emoji: '🔬',
    cor: '#818cf8',
    descricao: '6º ao 9º Ano — Sequências com operações',
    questoes: [
      { seq: [2, 6, 18, 54, '❓'], resp: 162, opcoes: [108, 162, 180, 216], dica: '×3' },
      { seq: [1, 1, 2, 3, 5, 8, '❓'], resp: 13, opcoes: [11, 12, 13, 14], dica: 'Fibonacci' },
      { seq: [256, 128, 64, 32, '❓'], resp: 16, opcoes: [16, 18, 20, 24], dica: '÷2' },
      { seq: [3, 9, 27, 81, '❓'], resp: 243, opcoes: [162, 200, 243, 270], dica: '×3' },
      { seq: [2, 3, 5, 7, 11, '❓'], resp: 13, opcoes: [12, 13, 14, 15], dica: 'Primos' },
      { seq: [1, 8, 27, 64, '❓'], resp: 125, opcoes: [100, 120, 125, 128], dica: 'n³' },
      { seq: [0, 1, 1, 2, 3, 5, 8, '❓'], resp: 13, opcoes: [11, 12, 13, 14], dica: 'Fibonacci' },
      { seq: [100, 95, 85, 70, 50, '❓'], resp: 25, opcoes: [25, 30, 35, 40], dica: '-5,-10,-15...' },
      { seq: [4, 8, 16, 32, '❓'], resp: 64, opcoes: [56, 60, 64, 68], dica: '×2' },
      { seq: [1, 4, 9, 16, 25, '❓'], resp: 36, opcoes: [30, 33, 36, 40], dica: 'n²' },
    ],
  },
  {
    id: 'medio',
    nome: 'Médio',
    emoji: '🎓',
    cor: '#fbbf24',
    descricao: 'Ensino Médio — Padrões complexos',
    questoes: [
      { seq: [1, 2, 6, 24, 120, '❓'], resp: 720, opcoes: [480, 600, 720, 840], dica: 'n! (fatorial)' },
      { seq: [2, 5, 10, 17, 26, '❓'], resp: 37, opcoes: [33, 35, 37, 39], dica: '+3,+5,+7,+9...' },
      { seq: [1, 3, 7, 15, 31, '❓'], resp: 63, opcoes: [55, 61, 63, 65], dica: '×2+1' },
      { seq: [0, 1, 3, 6, 10, 15, '❓'], resp: 21, opcoes: [18, 20, 21, 22], dica: 'Triangulares' },
      { seq: [2, 3, 5, 8, 13, 21, '❓'], resp: 34, opcoes: [30, 32, 34, 36], dica: 'Fibonacci' },
      { seq: [1, 2, 4, 7, 11, 16, '❓'], resp: 22, opcoes: [20, 21, 22, 23], dica: '+1,+2,+3...' },
      { seq: [512, 256, 128, 64, 32, '❓'], resp: 16, opcoes: [14, 16, 18, 20], dica: '÷2' },
      { seq: [1, 5, 14, 30, 55, '❓'], resp: 91, opcoes: [77, 84, 91, 99], dica: 'Piramidais' },
      { seq: [3, 7, 13, 21, 31, '❓'], resp: 43, opcoes: [39, 41, 43, 45], dica: '+4,+6,+8...' },
      { seq: [1, 2, 4, 8, 16, 32, '❓'], resp: 64, opcoes: [56, 60, 64, 68], dica: '2ⁿ' },
    ],
  },
];

// ── ESTADO ────────────────────────────────────────────────────────────────────

let estado = {
  nivel: null,
  questoes: [],
  indice: 0,
  pontos: 0,
  acertos: 0,
  respondeuAtual: false,
};

function embaralhar(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── RENDER ────────────────────────────────────────────────────────────────────

export function render(container) {
  container.innerHTML = `
    <div class="jogo-area" id="sl-root">
      <div class="page-header">
        <span class="page-header__eyebrow">Lógica</span>
        <h1 class="page-header__titulo">🔢 Sequência Lógica</h1>
        <p class="page-header__desc">Complete o padrão. Escolha um nível para começar.</p>
      </div>

      <!-- Seleção de nível -->
      <div id="sl-tela-nivel">
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem;">
          ${NIVEIS.map(n => `
            <button class="card sl-btn-nivel" data-nivel="${n.id}" style="
              cursor:pointer; text-align:left; padding:1.4rem;
              border-color:${n.cor}33; transition:transform 0.15s, border-color 0.15s;">
              <div style="font-size:2rem; margin-bottom:0.5rem">${n.emoji}</div>
              <div style="font-family:var(--font-display); font-weight:700; color:var(--text); margin-bottom:0.2rem">${n.nome}</div>
              <div style="font-size:0.78rem; color:var(--text-3)">${n.descricao}</div>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Tela do jogo -->
      <div id="sl-tela-jogo" style="display:none; max-width:620px;">
        <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap; margin-bottom:1.5rem;">
          <button class="btn btn--ghost btn--sm" id="sl-btn-voltar">← Níveis</button>
          <span id="sl-nivel-nome" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.1em;"></span>
          <span style="flex:1"></span>
          <span id="sl-pontos" style="font-family:var(--font-mono); font-size:0.8rem; color:var(--primary);">⭐ 0 pts</span>
        </div>

        <!-- Barra de progresso -->
        <div style="background:var(--bg-2); border-radius:4px; height:4px; margin-bottom:1.5rem; overflow:hidden;">
          <div id="sl-barra" style="height:100%; background:var(--primary); border-radius:4px; transition:width 0.4s;"></div>
        </div>

        <!-- Questão -->
        <div class="card" style="padding:1.5rem; margin-bottom:1rem;">
          <div id="sl-numero" style="font-family:var(--font-mono); font-size:0.7rem; color:var(--primary); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:1rem;"></div>

          <!-- Sequência visual -->
          <div id="sl-sequencia" style="
            display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center;
            justify-content:center; margin-bottom:1.5rem;
            padding:1.25rem; background:var(--bg); border-radius:10px; border:1px solid var(--border);
          "></div>

          <div id="sl-dica" style="font-size:0.78rem; color:var(--text-3); text-align:center; margin-bottom:1rem;"></div>

          <!-- Opções -->
          <div id="sl-opcoes" style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem;"></div>
        </div>

        <!-- Feedback -->
        <div id="sl-feedback" style="display:none; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; font-size:0.9rem;"></div>

        <button class="btn btn--primary" id="sl-btn-proxima" style="display:none; width:100%; justify-content:center;">Próxima →</button>
      </div>

      <!-- Resultado -->
      <div id="sl-tela-resultado" style="display:none; max-width:480px; text-align:center; padding:2rem 0;">
        <div id="sl-res-emoji" style="font-size:4rem; margin-bottom:1rem;"></div>
        <h2 id="sl-res-titulo" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--text); margin-bottom:0.5rem;"></h2>
        <p id="sl-res-desc" style="color:var(--text-2); margin-bottom:2rem;"></p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:2rem;">
          <div class="card" style="padding:1rem; text-align:center;">
            <div id="sl-res-pontos" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--primary);"></div>
            <div style="font-size:0.75rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.05em; margin-top:0.25rem;">Pontos</div>
          </div>
          <div class="card" style="padding:1rem; text-align:center;">
            <div id="sl-res-acertos" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--success);"></div>
            <div style="font-size:0.75rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.05em; margin-top:0.25rem;">Acertos</div>
          </div>
        </div>
        <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn--primary" id="sl-btn-repetir">🔄 Repetir</button>
          <button class="btn btn--ghost" id="sl-btn-outros">📋 Níveis</button>
        </div>
      </div>
    </div>
  `;
}

export function init(container) {
  container.querySelectorAll('.sl-btn-nivel').forEach(btn => {
    btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateY(-2px)'; btn.style.borderColor = ''; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    btn.addEventListener('click', () => {
      const nivel = NIVEIS.find(n => n.id === btn.dataset.nivel);
      iniciarJogo(nivel, container);
    });
  });
}

function iniciarJogo(nivel, container) {
  estado = {
    nivel,
    questoes: embaralhar(nivel.questoes),
    indice: 0,
    pontos: 0,
    acertos: 0,
    respondeuAtual: false,
  };

  container.querySelector('#sl-tela-nivel').style.display = 'none';
  container.querySelector('#sl-tela-resultado').style.display = 'none';
  container.querySelector('#sl-tela-jogo').style.display = '';
  container.querySelector('#sl-nivel-nome').textContent = `${nivel.emoji} ${nivel.nome} — ${nivel.descricao}`;

  container.querySelector('#sl-btn-voltar').onclick = () => {
    container.querySelector('#sl-tela-nivel').style.display = '';
    container.querySelector('#sl-tela-jogo').style.display = 'none';
  };
  container.querySelector('#sl-btn-proxima').onclick = () => avancar(container);

  mostrarQuestao(container);
}

function mostrarQuestao(container) {
  const { questoes, indice, pontos } = estado;
  const q = questoes[indice];
  const total = questoes.length;

  container.querySelector('#sl-barra').style.width = `${(indice / total) * 100}%`;
  container.querySelector('#sl-numero').textContent = `Questão ${indice + 1} de ${total}`;
  container.querySelector('#sl-pontos').textContent = `⭐ ${pontos} pts`;

  // Dica (só Fund.I+)
  const dicaEl = container.querySelector('#sl-dica');
  dicaEl.textContent = q.dica ? `💡 Dica: ${q.dica}` : '';

  // Sequência visual
  const seqEl = container.querySelector('#sl-sequencia');
  seqEl.innerHTML = q.seq.map(item => `
    <div style="
      min-width:2.8rem; min-height:2.8rem; display:flex; align-items:center; justify-content:center;
      background:${item === '❓' ? 'var(--primary-dim)' : 'var(--bg-2)'};
      border:1.5px solid ${item === '❓' ? 'var(--primary)' : 'var(--border)'};
      border-radius:8px; font-size:${typeof item === 'string' && item.match(/\p{Emoji}/u) ? '1.5rem' : '1.1rem'};
      font-family:var(--font-display); font-weight:700; color:${item === '❓' ? 'var(--primary)' : 'var(--text)'};
      padding:0.3rem;
    ">${item}</div>
  `).join('');

  // Opções
  const opcoesEl = container.querySelector('#sl-opcoes');
  opcoesEl.innerHTML = '';
  const opcoes = embaralhar(q.opcoes);
  opcoes.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'alternativa';
    btn.style.justifyContent = 'center';
    btn.style.fontSize = typeof op === 'string' && op.match(/\p{Emoji}/u) ? '1.5rem' : '1rem';
    btn.textContent = op;
    btn.addEventListener('click', () => {
      if (estado.respondeuAtual) return;
      responder(op, container);
    });
    opcoesEl.appendChild(btn);
  });

  container.querySelector('#sl-feedback').style.display = 'none';
  container.querySelector('#sl-btn-proxima').style.display = 'none';
  estado.respondeuAtual = false;
}

function responder(opcao, container) {
  estado.respondeuAtual = true;
  const q = estado.questoes[estado.indice];
  const correta = String(opcao) === String(q.resp);

  if (correta) { estado.pontos += 10; estado.acertos++; }

  // Colore opções
  container.querySelectorAll('.alternativa').forEach(btn => {
    btn.style.pointerEvents = 'none';
    if (String(btn.textContent.trim()) === String(q.resp)) btn.classList.add('correta');
    else if (String(btn.textContent.trim()) === String(opcao) && !correta) btn.classList.add('incorreta');
  });

  const fb = container.querySelector('#sl-feedback');
  fb.style.display = '';
  if (correta) {
    fb.style.cssText = 'display:block; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; background:#22c55e18; border:1px solid #22c55e44; color:#4ade80; font-size:0.9rem;';
    fb.textContent = '✅ Correto! Muito bem!';
  } else {
    fb.style.cssText = 'display:block; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; background:rgba(248,113,113,0.08); border:1px solid rgba(248,113,113,0.3); color:var(--danger); font-size:0.9rem;';
    fb.textContent = `❌ Errado. A resposta era: ${q.resp}${q.dica ? ` (${q.dica})` : ''}`;
  }

  const btnP = container.querySelector('#sl-btn-proxima');
  btnP.style.display = '';
  btnP.textContent = estado.indice >= estado.questoes.length - 1 ? 'Ver Resultado 🏁' : 'Próxima →';
  container.querySelector('#sl-pontos').textContent = `⭐ ${estado.pontos} pts`;
}

function avancar(container) {
  estado.indice++;
  if (estado.indice >= estado.questoes.length) {
    mostrarResultado(container);
  } else {
    mostrarQuestao(container);
  }
}

function mostrarResultado(container) {
  container.querySelector('#sl-tela-jogo').style.display = 'none';
  const telaRes = container.querySelector('#sl-tela-resultado');
  telaRes.style.display = '';

  const total = estado.questoes.length;
  const pct   = Math.round((estado.acertos / total) * 100);

  let emoji, titulo, desc;
  if (pct === 100) { emoji = '🏆'; titulo = 'Perfeito!'; desc = 'Você acertou tudo!'; }
  else if (pct >= 80) { emoji = '🎉'; titulo = 'Excelente!'; desc = 'Ótimo raciocínio lógico!'; }
  else if (pct >= 60) { emoji = '👍'; titulo = 'Bom trabalho!'; desc = 'Continue praticando!'; }
  else { emoji = '💪'; titulo = 'Continue tentando!'; desc = 'A lógica se aprende com a prática!'; }

  container.querySelector('#sl-res-emoji').textContent = emoji;
  container.querySelector('#sl-res-titulo').textContent = titulo;
  container.querySelector('#sl-res-desc').textContent = `${desc} (${estado.acertos}/${total} — ${pct}%)`;
  container.querySelector('#sl-res-pontos').textContent = estado.pontos;
  container.querySelector('#sl-res-acertos').textContent = `${estado.acertos}/${total}`;
  container.querySelector('#sl-barra').style.width = '100%';

  container.querySelector('#sl-btn-repetir').onclick = () => iniciarJogo(estado.nivel, container);
  container.querySelector('#sl-btn-outros').onclick = () => {
    telaRes.style.display = 'none';
    container.querySelector('#sl-tela-nivel').style.display = '';
  };
}
