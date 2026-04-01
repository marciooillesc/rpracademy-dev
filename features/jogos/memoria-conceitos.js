/**
 * features/jogos/memoria-conceitos.js
 * Memória de Conceitos — relaciona termos com definições / emojis.
 * 4 níveis: Infantil (emoji+nome), Fund.I (periféricos), Fund.II (conceitos), Médio (termos técnicos).
 */

const NIVEIS = [
  {
    id: 'infantil',
    nome: 'Infantil',
    emoji: '🎨',
    cor: '#34d399',
    descricao: 'Combine o emoji com o nome do dispositivo',
    pares: [
      { a: '📱', b: 'Celular' },
      { a: '💻', b: 'Notebook' },
      { a: '🖨️', b: 'Impressora' },
      { a: '🖱️', b: 'Mouse' },
      { a: '⌨️', b: 'Teclado' },
      { a: '📷', b: 'Câmera' },
    ],
  },
  {
    id: 'fundamental1',
    nome: 'Fund. I',
    emoji: '🖥️',
    cor: '#38bdf8',
    descricao: 'Combine o periférico com sua função',
    pares: [
      { a: 'Monitor',     b: 'Exibe imagens e vídeos' },
      { a: 'Teclado',     b: 'Serve para digitar' },
      { a: 'Mouse',       b: 'Aponta e clica na tela' },
      { a: 'Impressora',  b: 'Imprime documentos' },
      { a: 'Fone de ouvido', b: 'Reproduz sons' },
      { a: 'Webcam',      b: 'Capta imagens ao vivo' },
    ],
  },
  {
    id: 'fundamental2',
    nome: 'Fund. II',
    emoji: '💾',
    cor: '#818cf8',
    descricao: 'Combine o termo com o conceito correto',
    pares: [
      { a: 'CPU',      b: 'Processa as instruções do computador' },
      { a: 'RAM',      b: 'Memória temporária de trabalho' },
      { a: 'HD / SSD', b: 'Armazena dados permanentemente' },
      { a: 'GPU',      b: 'Processa gráficos e imagens' },
      { a: 'BIOS',     b: 'Firmware que inicializa o hardware' },
      { a: 'Placa-mãe',b: 'Conecta todos os componentes' },
      { a: 'Firewall', b: 'Barreira de proteção de rede' },
      { a: 'Driver',   b: 'Software que controla um hardware' },
    ],
  },
  {
    id: 'medio',
    nome: 'Médio',
    emoji: '🔐',
    cor: '#fbbf24',
    descricao: 'Combine o protocolo / tecnologia com sua definição',
    pares: [
      { a: 'HTTP',       b: 'Protocolo de transferência de hipertexto' },
      { a: 'DNS',        b: 'Traduz domínios em endereços IP' },
      { a: 'SSH',        b: 'Acesso remoto seguro a servidores' },
      { a: 'VPN',        b: 'Rede privada virtual criptografada' },
      { a: 'API',        b: 'Interface de comunicação entre sistemas' },
      { a: 'SQL',        b: 'Linguagem de consulta de banco de dados' },
      { a: 'Criptografia', b: 'Codificação de dados para protegê-los' },
      { a: 'Phishing',   b: 'Golpe para roubar dados pessoais' },
    ],
  },
];

// ── ESTADO ────────────────────────────────────────────────────────────────────

let estado = {
  nivel: null,
  cartas: [],
  viradas: [],
  acertos: 0,
  tentativas: 0,
  bloqueado: false,
};

function embaralhar(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function gerarCartas(pares) {
  const cartas = [];
  pares.forEach((par, idx) => {
    cartas.push({ uid: `a-${idx}`, grupoId: idx, texto: par.a, virada: false, acertada: false });
    cartas.push({ uid: `b-${idx}`, grupoId: idx, texto: par.b, virada: false, acertada: false });
  });
  return embaralhar(cartas);
}

// ── RENDER ────────────────────────────────────────────────────────────────────

export function render(container) {
  container.innerHTML = `
    <div class="jogo-area" id="mc-root">
      <div class="page-header">
        <span class="page-header__eyebrow">Memória</span>
        <h1 class="page-header__titulo">🃏 Memória de Conceitos</h1>
        <p class="page-header__desc">Encontre os pares que se relacionam. Escolha um nível.</p>
      </div>

      <!-- Seleção de nível -->
      <div id="mc-tela-nivel">
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem;">
          ${NIVEIS.map(n => `
            <button class="card mc-btn-nivel" data-nivel="${n.id}" style="
              cursor:pointer; text-align:left; padding:1.4rem;
              border-color:${n.cor}33; transition:transform 0.15s;">
              <div style="font-size:2rem; margin-bottom:0.5rem">${n.emoji}</div>
              <div style="font-family:var(--font-display); font-weight:700; color:var(--text); margin-bottom:0.2rem">${n.nome}</div>
              <div style="font-size:0.78rem; color:var(--text-3)">${n.descricao}</div>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Tela do jogo -->
      <div id="mc-tela-jogo" style="display:none;">
        <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap; margin-bottom:1rem;">
          <button class="btn btn--ghost btn--sm" id="mc-btn-voltar">← Níveis</button>
          <span id="mc-nivel-nome" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.1em;"></span>
          <span style="flex:1"></span>
          <span class="cp-stat">✅ <span id="mc-acertos">0</span> pares</span>
          <span class="cp-stat">🔄 <span id="mc-tentativas">0</span> tentativas</span>
          <button class="btn btn--ghost btn--sm" id="mc-btn-reiniciar">↺</button>
        </div>

        <div id="mc-grid" style="display:grid; gap:0.6rem;"></div>

        <!-- Vitória -->
        <div id="mc-vitoria" style="display:none; text-align:center; padding:2.5rem 1rem;">
          <div style="font-size:3.5rem; margin-bottom:1rem;">🎉</div>
          <h2 style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--text); margin-bottom:0.5rem;">Parabéns!</h2>
          <p id="mc-vitoria-msg" style="color:var(--text-2); margin-bottom:2rem;"></p>
          <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap;">
            <button class="btn btn--primary" id="mc-btn-jogar-novamente">🔄 Jogar Novamente</button>
            <button class="btn btn--ghost" id="mc-btn-outro-nivel">📋 Outros Níveis</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init(container) {
  container.querySelectorAll('.mc-btn-nivel').forEach(btn => {
    btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateY(-2px)'; });
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
    cartas: gerarCartas(nivel.pares),
    viradas: [],
    acertos: 0,
    tentativas: 0,
    bloqueado: false,
  };

  container.querySelector('#mc-tela-nivel').style.display = 'none';
  container.querySelector('#mc-tela-jogo').style.display = '';
  container.querySelector('#mc-vitoria').style.display = 'none';
  container.querySelector('#mc-nivel-nome').textContent = `${nivel.emoji} ${nivel.nome}`;

  container.querySelector('#mc-btn-voltar').onclick = () => {
    container.querySelector('#mc-tela-nivel').style.display = '';
    container.querySelector('#mc-tela-jogo').style.display = 'none';
  };
  container.querySelector('#mc-btn-reiniciar').onclick = () => iniciarJogo(nivel, container);
  container.querySelector('#mc-btn-jogar-novamente').onclick = () => iniciarJogo(nivel, container);
  container.querySelector('#mc-btn-outro-nivel').onclick = () => {
    container.querySelector('#mc-tela-nivel').style.display = '';
    container.querySelector('#mc-tela-jogo').style.display = 'none';
  };

  // Colunas: 2 para infantil/fund1, 3 para fund2/medio (textos mais longos → 2)
  const colunas = nivel.pares.length <= 6 ? 'repeat(3,1fr)' : 'repeat(2,1fr)';
  container.querySelector('#mc-grid').style.gridTemplateColumns = colunas;

  renderCartas(container);
}

function renderCartas(container) {
  const grid = container.querySelector('#mc-grid');
  grid.innerHTML = '';

  estado.cartas.forEach(carta => {
    const el = document.createElement('div');
    el.dataset.uid = carta.uid;

    const isEmoji = carta.texto.match(/\p{Emoji}/u) && carta.texto.length <= 3;

    if (carta.acertada) {
      el.style.cssText = `
        padding:0.9rem 0.75rem; border-radius:10px; min-height:3.5rem;
        display:flex; align-items:center; justify-content:center;
        background:#22c55e18; border:1.5px solid #22c55e44;
        font-size:${isEmoji ? '1.6rem' : '0.82rem'}; color:#4ade80;
        font-family:${isEmoji ? 'inherit' : 'var(--font-body)'};
        text-align:center; line-height:1.35;
      `;
      el.textContent = carta.texto;
    } else if (carta.virada) {
      el.style.cssText = `
        padding:0.9rem 0.75rem; border-radius:10px; min-height:3.5rem;
        display:flex; align-items:center; justify-content:center;
        background:var(--primary-dim); border:1.5px solid var(--primary);
        font-size:${isEmoji ? '1.6rem' : '0.82rem'}; color:var(--text);
        font-family:${isEmoji ? 'inherit' : 'var(--font-body)'};
        text-align:center; line-height:1.35; cursor:pointer;
      `;
      el.textContent = carta.texto;
    } else {
      el.style.cssText = `
        padding:0.9rem 0.75rem; border-radius:10px; min-height:3.5rem;
        display:flex; align-items:center; justify-content:center;
        background:var(--bg-2); border:1.5px solid var(--border);
        font-size:1.4rem; color:var(--text-3);
        cursor:pointer; transition:background 0.15s, border-color 0.15s;
        user-select:none;
      `;
      el.textContent = '?';
      el.addEventListener('mouseenter', () => {
        if (!carta.virada && !carta.acertada) el.style.borderColor = 'var(--primary)';
      });
      el.addEventListener('mouseleave', () => {
        if (!carta.virada && !carta.acertada) el.style.borderColor = 'var(--border)';
      });
    }

    if (!carta.acertada) {
      el.addEventListener('click', () => virarCarta(carta.uid, container));
      el.addEventListener('touchend', e => { e.preventDefault(); virarCarta(carta.uid, container); });
    }

    grid.appendChild(el);
  });

  container.querySelector('#mc-acertos').textContent = estado.acertos;
  container.querySelector('#mc-tentativas').textContent = estado.tentativas;
}

function virarCarta(uid, container) {
  if (estado.bloqueado) return;
  const carta = estado.cartas.find(c => c.uid === uid);
  if (!carta || carta.virada || carta.acertada) return;
  if (estado.viradas.length >= 2) return;

  carta.virada = true;
  estado.viradas.push(carta);
  renderCartas(container);

  if (estado.viradas.length === 2) {
    estado.bloqueado = true;
    estado.tentativas++;

    const [c1, c2] = estado.viradas;
    const acertou = c1.grupoId === c2.grupoId;

    if (acertou) {
      c1.acertada = true;
      c2.acertada = true;
      c1.virada   = false;
      c2.virada   = false;
      estado.viradas = [];
      estado.acertos++;
      estado.bloqueado = false;
      renderCartas(container);

      if (estado.acertos === estado.nivel.pares.length) {
        setTimeout(() => mostrarVitoria(container), 300);
      }
    } else {
      setTimeout(() => {
        c1.virada = false;
        c2.virada = false;
        estado.viradas = [];
        estado.bloqueado = false;
        renderCartas(container);
      }, 900);
    }
  }
}

function mostrarVitoria(container) {
  container.querySelector('#mc-vitoria').style.display = '';
  const nota = estado.tentativas <= estado.nivel.pares.length
    ? '🌟 Incrível! Pouquíssimas tentativas!'
    : estado.tentativas <= estado.nivel.pares.length * 2
      ? '🎉 Muito bem! Ótima memória!'
      : '👍 Parabéns! Continue praticando!';
  container.querySelector('#mc-vitoria-msg').textContent =
    `${nota} Você completou com ${estado.tentativas} tentativas.`;
}
