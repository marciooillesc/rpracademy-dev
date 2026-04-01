/**
 * features/jogos/memoria-1ano.js
 * Jogo da Memória — 1º Ano (5–6 anos)
 * Tema: Partes do computador (8 pares, emoji + nome)
 */

export const META = {
  id: 'memoria-1ano',
  nome: 'Memória — Computador',
  descricao: '1º Ano · Partes do computador',
  emoji: '💻',
};

const PARES = [
  { id: 'monitor',   emoji: '🖥️',  nome: 'Monitor'    },
  { id: 'teclado',   emoji: '⌨️',  nome: 'Teclado'    },
  { id: 'mouse',     emoji: '🖱️',  nome: 'Mouse'      },
  { id: 'cpu',       emoji: '🖨️',  nome: 'CPU'        },
  { id: 'headphone', emoji: '🎧',  nome: 'Fone'       },
  { id: 'pendrive',  emoji: '💾',  nome: 'Pen Drive'  },
  { id: 'webcam',    emoji: '📷',  nome: 'Webcam'     },
  { id: 'impressora',emoji: '🖨️',  nome: 'Impressora' },
];

// Fix: cpu e impressora têm mesmo emoji — diferenciar visualmente via nome
PARES[3].emoji = '🖱️'; // reusar não ideal, usar texto
PARES[3] = { id: 'cpu', emoji: '⚙️', nome: 'CPU' };

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
        <span class="page-header__eyebrow">💻 1º Ano</span>
        <h1 class="page-header__titulo">Memória do Computador</h1>
        <p class="page-header__desc">Encontre os pares das partes do computador!</p>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap">
        <span class="cp-stat">✅ Pares: <strong id="mem-acertos">0</strong>/8</span>
        <span class="cp-stat">🔄 Tentativas: <strong id="mem-tentativas">0</strong></span>
        <button class="btn btn--ghost btn--sm" id="mem-reiniciar">Reiniciar</button>
      </div>
      <div id="mem-grid" style="
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:0.65rem;
        max-width:560px;
      "></div>
      <div id="mem-vitoria" style="display:none;text-align:center;padding:2rem 0">
        <div style="font-size:3.5rem">🏆</div>
        <h2 style="font-family:var(--font-display);font-size:1.8rem;color:var(--primary);margin:0.5rem 0">
          Muito bem!
        </h2>
        <p style="color:var(--text-2);margin-bottom:1.5rem">
          Você conhece as partes do computador!<br>
          <strong id="mem-total-tent">0</strong> tentativas.
        </p>
        <button class="btn btn--primary" id="mem-jogar-novamente">Jogar de novo 🔄</button>
      </div>
    </div>
  `;
}

export function init(container) {
  _estado = _estadoInicial();
  _renderCartas(container);

  const reiniciar = () => {
    _estado = _estadoInicial();
    container.querySelector('#mem-vitoria').style.display = 'none';
    container.querySelector('#mem-grid').style.display = 'grid';
    container.querySelector('#mem-acertos').textContent = '0';
    container.querySelector('#mem-tentativas').textContent = '0';
    _renderCartas(container);
  };

  container.querySelector('#mem-reiniciar')?.addEventListener('click', reiniciar);
  container.querySelector('#mem-jogar-novamente')?.addEventListener('click', reiniciar);
}

function _renderCartas(container) {
  const grid = container.querySelector('#mem-grid');
  grid.innerHTML = _estado.cartas.map((c, i) => `
    <button class="mem-carta"
      data-idx="${i}"
      style="
        aspect-ratio:1;
        border-radius:10px;
        border:2px solid ${c.acertada ? '#22c55e' : 'var(--border)'};
        background:${c.acertada ? '#22c55e18' : 'var(--bg-2)'};
        cursor:${c.acertada ? 'default' : 'pointer'};
        font-size:2.2rem;
        display:flex;flex-direction:column;
        align-items:center;justify-content:center;
        gap:0.15rem;
        transition:transform 0.15s,border-color 0.2s;
        padding:0.25rem;
      ">
      ${c.virada || c.acertada ? `
        <span>${c.emoji}</span>
        <span style="font-size:0.6rem;font-family:var(--font-mono);color:var(--text-2);text-align:center;line-height:1.2">${c.nome}</span>
      ` : `<span style="font-size:2rem">❓</span>`}
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
        setTimeout(() => {
          container.querySelector('#mem-grid').style.display = 'none';
          container.querySelector('#mem-total-tent').textContent = _estado.tentativas;
          container.querySelector('#mem-vitoria').style.display = 'block';
        }, 400);
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
