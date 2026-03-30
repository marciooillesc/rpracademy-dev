/**
 * features/jogos/memoria-pre3.js
 * Jogo da Memória — Pré 3 (3–4 anos)
 * Tema: Dispositivos do dia a dia (6 pares, bem visual)
 */

export const META = {
  id: 'memoria-pre3',
  nome: 'Memória — Dispositivos',
  descricao: 'Pré 3 · Encontre os pares de dispositivos!',
  emoji: '🧠',
};

const PARES = [
  { id: 'celular',   emoji: '📱', nome: 'Celular'   },
  { id: 'tablet',    emoji: '📲', nome: 'Tablet'    },
  { id: 'notebook',  emoji: '💻', nome: 'Notebook'  },
  { id: 'tv',        emoji: '📺', nome: 'TV'        },
  { id: 'camera',    emoji: '📷', nome: 'Câmera'    },
  { id: 'headphone', emoji: '🎧', nome: 'Fone'      },
];

let _estado = null;

function _embaralhar(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function _estadoInicial() {
  const cartas = _embaralhar([...PARES, ...PARES].map((p, i) => ({
    uid: i, id: p.id, emoji: p.emoji, nome: p.nome,
    virada: false, acertada: false,
  })));
  return { cartas, viradas: [], acertos: 0, bloqueado: false, tentativas: 0 };
}

export function render(container) {
  container.innerHTML = `
    <div class="jogo-area">
      <div class="page-header">
        <span class="page-header__eyebrow">🧠 Pré 3</span>
        <h1 class="page-header__titulo">Jogo da Memória</h1>
        <p class="page-header__desc">Encontre os pares de dispositivos! Clique nas cartas para virar.</p>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap">
        <span class="cp-stat">✅ Pares: <strong id="mem-acertos">0</strong>/6</span>
        <span class="cp-stat">🔄 Tentativas: <strong id="mem-tentativas">0</strong></span>
        <button class="btn btn--ghost btn--sm" id="mem-reiniciar">Reiniciar</button>
      </div>
      <div id="mem-grid" style="
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:0.75rem;
        max-width:520px;
      "></div>
      <div id="mem-vitoria" style="display:none;text-align:center;padding:2rem 0">
        <div style="font-size:3.5rem">🎉</div>
        <h2 style="font-family:var(--font-display);font-size:1.8rem;color:var(--primary);margin:0.5rem 0">
          Parabéns!
        </h2>
        <p style="color:var(--text-2);margin-bottom:1.5rem">
          Você achou todos os pares em <strong id="mem-total-tent">0</strong> tentativas!
        </p>
        <button class="btn btn--primary" id="mem-jogar-novamente">Jogar de novo 🔄</button>
      </div>
    </div>
  `;
}

export function init(container) {
  _estado = _estadoInicial();
  _renderCartas(container);

  container.querySelector('#mem-reiniciar')?.addEventListener('click', () => {
    _estado = _estadoInicial();
    container.querySelector('#mem-vitoria').style.display = 'none';
    container.querySelector('#mem-grid').style.display = 'grid';
    container.querySelector('#mem-acertos').textContent = '0';
    container.querySelector('#mem-tentativas').textContent = '0';
    _renderCartas(container);
  });

  container.querySelector('#mem-jogar-novamente')?.addEventListener('click', () => {
    _estado = _estadoInicial();
    container.querySelector('#mem-vitoria').style.display = 'none';
    container.querySelector('#mem-grid').style.display = 'grid';
    container.querySelector('#mem-acertos').textContent = '0';
    container.querySelector('#mem-tentativas').textContent = '0';
    _renderCartas(container);
  });
}

function _renderCartas(container) {
  const grid = container.querySelector('#mem-grid');
  grid.innerHTML = _estado.cartas.map((c, i) => `
    <button class="mem-carta ${c.virada || c.acertada ? 'virada' : ''} ${c.acertada ? 'acertada' : ''}"
      data-idx="${i}"
      style="
        aspect-ratio:1;
        border-radius:12px;
        border:2px solid var(--border);
        background:var(--bg-2);
        cursor:pointer;
        font-size:2.8rem;
        display:flex;flex-direction:column;
        align-items:center;justify-content:center;
        gap:0.2rem;
        transition:transform 0.2s,border-color 0.2s,background 0.2s;
        ${c.acertada ? 'border-color:#22c55e;background:#22c55e18;cursor:default;' : ''}
      ">
      <span style="display:${c.virada || c.acertada ? 'block' : 'none'}">${c.emoji}</span>
      <span style="font-size:0.65rem;font-family:var(--font-mono);color:var(--text-2);display:${c.virada || c.acertada ? 'block' : 'none'}">${c.nome}</span>
      <span style="display:${c.virada || c.acertada ? 'none' : 'block'};font-size:2rem">❓</span>
    </button>
  `).join('');

  grid.querySelectorAll('.mem-carta').forEach(btn => {
    btn.addEventListener('click', () => _clicarCarta(container, parseInt(btn.dataset.idx)));
  });
}

function _clicarCarta(container, idx) {
  if (_estado.bloqueado) return;
  const carta = _estado.cartas[idx];
  if (carta.virada || carta.acertada) return;
  if (_estado.viradas.length >= 2) return;

  carta.virada = true;
  _estado.viradas.push(idx);
  _renderCartas(container);

  if (_estado.viradas.length === 2) {
    _estado.tentativas++;
    container.querySelector('#mem-tentativas').textContent = _estado.tentativas;
    const [a, b] = _estado.viradas;
    if (_estado.cartas[a].id === _estado.cartas[b].id) {
      _estado.cartas[a].acertada = true;
      _estado.cartas[b].acertada = true;
      _estado.acertos++;
      container.querySelector('#mem-acertos').textContent = _estado.acertos;
      _estado.viradas = [];
      _renderCartas(container);
      if (_estado.acertos === PARES.length) {
        setTimeout(() => _mostrarVitoria(container), 400);
      }
    } else {
      _estado.bloqueado = true;
      setTimeout(() => {
        _estado.cartas[a].virada = false;
        _estado.cartas[b].virada = false;
        _estado.viradas = [];
        _estado.bloqueado = false;
        _renderCartas(container);
      }, 900);
    }
  }
}

function _mostrarVitoria(container) {
  container.querySelector('#mem-grid').style.display = 'none';
  container.querySelector('#mem-total-tent').textContent = _estado.tentativas;
  container.querySelector('#mem-vitoria').style.display = 'block';
}
