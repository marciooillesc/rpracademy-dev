/**
 * features/jogos/paint-jogo.js
 * Paint completo — desenho livre + colorir moldes (Minecraft, Minnie, Sonic)
 * A tela ocupa 100% do espaço disponível sem scroll.
 * A barra lateral do SPA é substituída pelas ferramentas do Paint quando ativo.
 */

export const META = {
  id: 'paint',
  nome: 'Paint',
  descricao: 'Desenhe e pinte — Minecraft, Minnie, Sonic e mais',
  emoji: '🎨',
};

// ── MOLDES SVG (paths simplificados para colorir) ─────────────────────────────
const MOLDES = [
  {
    id: 'livre',
    nome: 'Tela Livre',
    emoji: '🖼️',
    svg: null,
  },
  {
    id: 'minecraft',
    nome: 'Creeper',
    emoji: '💚',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
      <!-- Cabeça -->
      <rect class="pc" data-zona="cabeca" x="50" y="10" width="100" height="100" fill="#fff" stroke="#222" stroke-width="3"/>
      <!-- Olhos -->
      <rect class="pc" data-zona="olho-e" x="65" y="35" width="25" height="25" fill="#fff" stroke="#222" stroke-width="2"/>
      <rect class="pc" data-zona="olho-d" x="110" y="35" width="25" height="25" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Boca/nariz -->
      <rect class="pc" data-zona="nariz" x="88" y="60" width="24" height="15" fill="#fff" stroke="#222" stroke-width="2"/>
      <rect class="pc" data-zona="boca-e" x="70" y="75" width="18" height="20" fill="#fff" stroke="#222" stroke-width="2"/>
      <rect class="pc" data-zona="boca-d" x="112" y="75" width="18" height="20" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Corpo -->
      <rect class="pc" data-zona="corpo" x="65" y="115" width="70" height="60" fill="#fff" stroke="#222" stroke-width="3"/>
      <!-- Pernas -->
      <rect class="pc" data-zona="perna-e" x="65" y="178" width="28" height="22" fill="#fff" stroke="#222" stroke-width="2"/>
      <rect class="pc" data-zona="perna-d" x="107" y="178" width="28" height="22" fill="#fff" stroke="#222" stroke-width="2"/>
    </svg>`,
  },
  {
    id: 'minnie',
    nome: 'Minnie',
    emoji: '🎀',
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
      <!-- Orelhas -->
      <circle class="pc" data-zona="orelha-e" cx="62" cy="55" r="30" fill="#fff" stroke="#222" stroke-width="3"/>
      <circle class="pc" data-zona="orelha-d" cx="138" cy="55" r="30" fill="#fff" stroke="#222" stroke-width="3"/>
      <!-- Cabeça -->
      <circle class="pc" data-zona="rosto" cx="100" cy="95" r="55" fill="#fff" stroke="#222" stroke-width="3"/>
      <!-- Olhos -->
      <ellipse class="pc" data-zona="olho-e" cx="82" cy="85" rx="10" ry="12" fill="#fff" stroke="#222" stroke-width="2"/>
      <ellipse class="pc" data-zona="olho-d" cx="118" cy="85" rx="10" ry="12" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Nariz -->
      <ellipse class="pc" data-zona="nariz" cx="100" cy="105" rx="10" ry="7" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Boca -->
      <path class="pc" data-zona="boca" d="M85 115 Q100 128 115 115" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/>
      <!-- Laço -->
      <polygon class="pc" data-zona="laco-e" points="55,42 80,55 68,68" fill="#fff" stroke="#222" stroke-width="2"/>
      <polygon class="pc" data-zona="laco-d" points="120,68 132,55 145,42" fill="#fff" stroke="#222" stroke-width="2"/>
      <circle class="pc" data-zona="laco-c" cx="100" cy="55" r="8" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Corpo -->
      <ellipse class="pc" data-zona="corpo" cx="100" cy="185" rx="45" ry="38" fill="#fff" stroke="#222" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'sonic',
    nome: 'Sonic',
    emoji: '💙',
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
      <!-- Espinhos -->
      <polygon class="pc" data-zona="espinho1" points="95,10 110,50 80,45" fill="#fff" stroke="#222" stroke-width="2"/>
      <polygon class="pc" data-zona="espinho2" points="115,15 125,55 100,48" fill="#fff" stroke="#222" stroke-width="2"/>
      <polygon class="pc" data-zona="espinho3" points="130,25 135,65 115,55" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Cabeça -->
      <ellipse class="pc" data-zona="cabeca" cx="100" cy="85" rx="52" ry="48" fill="#fff" stroke="#222" stroke-width="3"/>
      <!-- Rosto claro -->
      <ellipse class="pc" data-zona="rosto" cx="108" cy="92" rx="32" ry="28" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Olho -->
      <ellipse class="pc" data-zona="olho" cx="95" cy="78" rx="16" ry="18" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Nariz -->
      <ellipse class="pc" data-zona="nariz" cx="118" cy="95" rx="6" ry="5" fill="#222" stroke="#222"/>
      <!-- Boca -->
      <path class="pc" data-zona="boca" d="M100 105 Q115 118 128 108" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Orelha -->
      <polygon class="pc" data-zona="orelha" points="60,50 75,80 50,82" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Corpo -->
      <ellipse class="pc" data-zona="corpo" cx="100" cy="170" rx="38" ry="42" fill="#fff" stroke="#222" stroke-width="3"/>
      <!-- Sapatos -->
      <ellipse class="pc" data-zona="sapato-e" cx="75" cy="208" rx="22" ry="12" fill="#fff" stroke="#222" stroke-width="2"/>
      <ellipse class="pc" data-zona="sapato-d" cx="125" cy="208" rx="22" ry="12" fill="#fff" stroke="#222" stroke-width="2"/>
    </svg>`,
  },
  {
    id: 'estrela',
    nome: 'Estrela',
    emoji: '⭐',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
      <polygon class="pc" data-zona="estrela" 
        points="100,15 120,70 180,70 132,105 150,160 100,125 50,160 68,105 20,70 80,70"
        fill="#fff" stroke="#222" stroke-width="3"/>
      <!-- Olhos -->
      <circle class="pc" data-zona="olho-e" cx="82" cy="88" r="8" fill="#fff" stroke="#222" stroke-width="2"/>
      <circle class="pc" data-zona="olho-d" cx="118" cy="88" r="8" fill="#fff" stroke="#222" stroke-width="2"/>
      <!-- Sorriso -->
      <path class="pc" data-zona="boca" d="M85 108 Q100 122 115 108" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'coracao',
    nome: 'Coração',
    emoji: '❤️',
    svg: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
      <path class="pc" data-zona="coracao"
        d="M100 160 C60 130 20 110 20 70 C20 40 45 20 70 25 C82 28 92 35 100 45 C108 35 118 28 130 25 C155 20 180 40 180 70 C180 110 140 130 100 160Z"
        fill="#fff" stroke="#222" stroke-width="3"/>
    </svg>`,
  },
];

// ── PALETA DE CORES ───────────────────────────────────────────────────────────
const PALETA = [
  '#000000','#ffffff','#ef4444','#f97316','#eab308','#22c55e',
  '#3b82f6','#8b5cf6','#ec4899','#06b6d4','#84cc16','#f59e0b',
  '#6366f1','#14b8a6','#f43f5e','#a855f7','#0ea5e9','#10b981',
  '#7c3aed','#db2777','#059669','#d97706','#dc2626','#2563eb',
  '#7e5bef','#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b',
];

// ── RENDER ─────────────────────────────────────────────────────────────────────
export function render(container) {
  container.innerHTML = `
    <div id="paint-root" style="
      position:fixed; top:0; left:0; width:100vw; height:100vh;
      background:#1a1a2e; display:flex; z-index:100;
      font-family:var(--font-ui, system-ui);
    ">
      <style>
        #paint-sidebar {
          width:220px; min-width:220px; background:#0f0f1a; border-right:1px solid #2a2a3e;
          display:flex; flex-direction:column; overflow-y:auto; padding:.75rem .5rem;
          gap:.5rem;
        }
        #paint-sidebar h3 { font-size:.7rem; text-transform:uppercase; letter-spacing:.1em; color:#555; margin:.5rem .25rem .25rem; }
        .paint-tool-btn {
          display:flex; align-items:center; gap:.5rem; padding:.5rem .75rem;
          border-radius:.5rem; border:none; background:transparent; color:#aaa;
          cursor:pointer; font-size:.85rem; width:100%; text-align:left; transition:.15s;
        }
        .paint-tool-btn:hover { background:#1a1a2e; color:#fff; }
        .paint-tool-btn.ativo { background:#1e3a5f; color:#38bdf8; }
        .paint-tool-btn .tool-icon { font-size:1.1rem; width:1.4rem; text-align:center; }
        .paint-sep { height:1px; background:#2a2a3e; margin:.25rem 0; }
        .paint-tamanhos { display:flex; gap:.3rem; flex-wrap:wrap; padding:.25rem; }
        .paint-tam-btn {
          border:2px solid #2a2a3e; background:transparent; border-radius:50%;
          cursor:pointer; display:flex; align-items:center; justify-content:center; transition:.15s;
        }
        .paint-tam-btn.ativo { border-color:#38bdf8; }
        .paint-cor-atual {
          width:36px; height:36px; border-radius:.4rem; border:2px solid #444;
          cursor:pointer; margin:.25rem;
        }
        .paint-paleta { display:flex; flex-wrap:wrap; gap:4px; padding:.25rem; }
        .paint-cor-btn {
          width:22px; height:22px; border-radius:4px; border:2px solid transparent;
          cursor:pointer; transition:.1s;
        }
        .paint-cor-btn:hover { transform:scale(1.2); border-color:#fff; }
        .paint-cor-btn.ativo { border-color:#fff; transform:scale(1.15); }
        .paint-moldes { display:flex; flex-direction:column; gap:.3rem; }
        .paint-molde-btn {
          padding:.4rem .6rem; border-radius:.4rem; border:1px solid #2a2a3e;
          background:transparent; color:#aaa; cursor:pointer; font-size:.82rem;
          text-align:left; transition:.15s; display:flex; align-items:center; gap:.4rem;
        }
        .paint-molde-btn:hover { background:#1a1a2e; color:#fff; border-color:#38bdf8; }
        .paint-molde-btn.ativo { background:#1e3a5f; color:#38bdf8; border-color:#38bdf8; }
        #paint-canvas-area {
          flex:1; display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden; background:#2a2a3e;
        }
        #paint-canvas {
          background:#fff; display:block;
          box-shadow:0 4px 32px rgba(0,0,0,.5);
          cursor:crosshair;
          touch-action:none;
        }
        #paint-molde-overlay {
          position:absolute; top:0; left:0; width:100%; height:100%;
          pointer-events:none; display:flex; align-items:center; justify-content:center;
        }
        #paint-molde-overlay svg { max-width:80%; max-height:80%; }
        .pc { cursor:pointer; transition:fill .1s; pointer-events:all; }
        .pc:hover { opacity:.85; }
        #paint-topbar {
          position:absolute; top:0; left:0; right:0; height:36px;
          background:rgba(15,15,26,.9); backdrop-filter:blur(4px);
          display:flex; align-items:center; gap:.5rem; padding:0 .75rem;
          border-bottom:1px solid #2a2a3e; z-index:10;
        }
        #paint-topbar span { font-size:.8rem; color:#666; }
        .paint-top-btn {
          padding:.2rem .7rem; border-radius:.3rem; border:1px solid #2a2a3e;
          background:transparent; color:#aaa; cursor:pointer; font-size:.78rem; transition:.15s;
        }
        .paint-top-btn:hover { background:#1a1a2e; color:#fff; }
        .paint-top-btn.danger { color:#ef4444; border-color:#ef4444; }
        #paint-fechar {
          margin-left:auto; padding:.2rem .7rem; border-radius:.3rem;
          border:1px solid #ef444440; background:transparent; color:#ef4444;
          cursor:pointer; font-size:.8rem;
        }
        #paint-fechar:hover { background:#ef444420; }
        #paint-modal-nome {
          position:fixed; inset:0; background:rgba(0,0,0,.7); display:flex;
          align-items:center; justify-content:center; z-index:200;
        }
        #paint-modal-nome.oculto { display:none; }
        .paint-modal-box {
          background:#1a1a2e; border:1px solid #2a2a3e; border-radius:1rem;
          padding:1.5rem; min-width:280px; text-align:center;
        }
        .paint-modal-box h3 { color:#38bdf8; margin-bottom:1rem; font-size:1.1rem; }
        .paint-modal-box input {
          width:100%; padding:.5rem .75rem; border-radius:.5rem;
          border:1px solid #2a2a3e; background:#0f0f1a; color:#fff;
          font-size:.95rem; margin-bottom:.75rem; box-sizing:border-box;
        }
        .paint-modal-btns { display:flex; gap:.5rem; justify-content:center; }
        .paint-modal-btns button {
          padding:.4rem 1rem; border-radius:.4rem; border:none; cursor:pointer; font-size:.9rem;
        }
        .pm-ok { background:#38bdf8; color:#000; font-weight:700; }
        .pm-cancel { background:#2a2a3e; color:#aaa; }
      </style>

      <!-- SIDEBAR -->
      <div id="paint-sidebar">
        <h3>Ferramentas</h3>
        <button class="paint-tool-btn ativo" data-tool="pincel">
          <span class="tool-icon">🖌️</span> Pincel
        </button>
        <button class="paint-tool-btn" data-tool="borracha">
          <span class="tool-icon">🧹</span> Borracha
        </button>
        <button class="paint-tool-btn" data-tool="balde">
          <span class="tool-icon">🪣</span> Balde (preencher)
        </button>
        <button class="paint-tool-btn" data-tool="linha">
          <span class="tool-icon">📏</span> Linha
        </button>
        <button class="paint-tool-btn" data-tool="retangulo">
          <span class="tool-icon">⬜</span> Retângulo
        </button>
        <button class="paint-tool-btn" data-tool="circulo">
          <span class="tool-icon">⭕</span> Círculo
        </button>

        <div class="paint-sep"></div>
        <h3>Tamanho</h3>
        <div class="paint-tamanhos" id="paint-tamanhos"></div>

        <div class="paint-sep"></div>
        <h3>Cor atual</h3>
        <div style="display:flex;align-items:center;gap:.5rem;padding:.25rem">
          <div class="paint-cor-atual" id="paint-cor-atual"></div>
          <input type="color" id="paint-color-picker" style="width:36px;height:36px;border:none;background:none;cursor:pointer;padding:0"/>
        </div>
        <div class="paint-paleta" id="paint-paleta"></div>

        <div class="paint-sep"></div>
        <h3>Moldes para colorir</h3>
        <div class="paint-moldes" id="paint-moldes-lista"></div>
      </div>

      <!-- ÁREA DO CANVAS -->
      <div id="paint-canvas-area">
        <div id="paint-topbar">
          <span id="paint-molde-nome">Tela Livre</span>
          <button class="paint-top-btn" id="btn-desfazer">↩ Desfazer</button>
          <button class="paint-top-btn" id="btn-limpar" style="color:#f59e0b;border-color:#f59e0b40">🗑 Limpar</button>
          <button class="paint-top-btn" id="btn-salvar">💾 Salvar PNG</button>
          <button id="paint-fechar">✕ Fechar Paint</button>
        </div>
        <canvas id="paint-canvas"></canvas>
        <div id="paint-molde-overlay"></div>
      </div>

      <!-- Modal nome arquivo -->
      <div id="paint-modal-nome" class="oculto">
        <div class="paint-modal-box">
          <h3>💾 Salvar desenho</h3>
          <input type="text" id="paint-nome-arquivo" placeholder="meu-desenho" value="meu-desenho"/>
          <div class="paint-modal-btns">
            <button class="pm-cancel" id="pm-cancel">Cancelar</button>
            <button class="pm-ok" id="pm-ok">Salvar PNG</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── INIT ──────────────────────────────────────────────────────────────────────
export function init(container) {
  const root        = container.querySelector('#paint-root');
  const canvas      = container.querySelector('#paint-canvas');
  const ctx         = canvas.getContext('2d');
  const overlay     = container.querySelector('#paint-molde-overlay');
  const topMolde    = container.querySelector('#paint-molde-nome');

  let ferramenta = 'pincel';
  let corAtual   = '#000000';
  let tamanho    = 6;
  let desenhando = false;
  let moldeAtual = 'livre';
  let undo = [];
  let startX, startY, snapShot;

  // ── DIMENSIONAR CANVAS ──
  function dimensionarCanvas() {
    const area = container.querySelector('#paint-canvas-area');
    const W = area.clientWidth;
    const H = area.clientHeight - 36; // topbar
    const side = Math.min(W - 32, H - 32, 900);
    canvas.width  = side;
    canvas.height = side;
    canvas.style.marginTop = '36px';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  dimensionarCanvas();
  window.addEventListener('resize', dimensionarCanvas);

  // ── FERRAMENTAS ──
  container.querySelectorAll('[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      ferramenta = btn.dataset.tool;
      container.querySelectorAll('[data-tool]').forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
    });
  });

  // ── TAMANHOS ──
  const tamanhos = [2, 4, 6, 10, 16, 24];
  const elTams   = container.querySelector('#paint-tamanhos');
  tamanhos.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'paint-tam-btn' + (t === tamanho ? ' ativo' : '');
    btn.style.width = btn.style.height = (t + 10) + 'px';
    btn.style.background = '#fff';
    btn.title = t + 'px';
    btn.innerHTML = `<span style="width:${t}px;height:${t}px;border-radius:50%;background:#222;display:block"></span>`;
    btn.addEventListener('click', () => {
      tamanho = t;
      elTams.querySelectorAll('.paint-tam-btn').forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
    });
    elTams.appendChild(btn);
  });

  // ── PALETA ──
  const elPaleta  = container.querySelector('#paint-paleta');
  const elCorAtual = container.querySelector('#paint-cor-atual');
  const colorPicker = container.querySelector('#paint-color-picker');

  function selecionarCor(c) {
    corAtual = c;
    elCorAtual.style.background = c;
    colorPicker.value = c;
    elPaleta.querySelectorAll('.paint-cor-btn').forEach(b => b.classList.remove('ativo'));
    const btn = elPaleta.querySelector(`[data-cor="${c}"]`);
    if (btn) btn.classList.add('ativo');
  }

  PALETA.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'paint-cor-btn' + (c === corAtual ? ' ativo' : '');
    btn.dataset.cor = c;
    btn.style.background = c;
    btn.title = c;
    btn.addEventListener('click', () => selecionarCor(c));
    elPaleta.appendChild(btn);
  });
  selecionarCor('#000000');

  colorPicker.addEventListener('input', () => selecionarCor(colorPicker.value));

  // ── MOLDES ──
  const elMoldes = container.querySelector('#paint-moldes-lista');
  MOLDES.forEach(m => {
    const btn = document.createElement('button');
    btn.className = 'paint-molde-btn' + (m.id === 'livre' ? ' ativo' : '');
    btn.innerHTML = `<span>${m.emoji}</span> ${m.nome}`;
    btn.addEventListener('click', () => {
      moldeAtual = m.id;
      topMolde.textContent = m.nome;
      elMoldes.querySelectorAll('.paint-molde-btn').forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');

      if (m.svg) {
        overlay.innerHTML = m.svg;
        overlay.style.pointerEvents = 'all';
        // Colorir por clique nas zonas SVG
        overlay.querySelectorAll('.pc').forEach(el => {
          el.addEventListener('click', () => {
            if (ferramenta === 'balde' || ferramenta === 'pincel') {
              el.style.fill = corAtual;
            } else if (ferramenta === 'borracha') {
              el.style.fill = '#fff';
            }
          });
        });
        // Ajustar tamanho do overlay ao canvas
        const svgEl = overlay.querySelector('svg');
        if (svgEl) {
          svgEl.style.width  = canvas.width + 'px';
          svgEl.style.height = canvas.height + 'px';
          svgEl.style.position = 'absolute';
          // Centralizar sobre o canvas
          const rect = canvas.getBoundingClientRect();
          const areaRect = container.querySelector('#paint-canvas-area').getBoundingClientRect();
          svgEl.style.left = (rect.left - areaRect.left) + 'px';
          svgEl.style.top  = (rect.top - areaRect.top) + 'px';
        }
      } else {
        overlay.innerHTML = '';
        overlay.style.pointerEvents = 'none';
      }
    });
    elMoldes.appendChild(btn);
  });

  // ── UNDO ──
  function salvarEstado() {
    undo.push(canvas.toDataURL());
    if (undo.length > 20) undo.shift();
  }
  salvarEstado();

  container.querySelector('#btn-desfazer').addEventListener('click', () => {
    if (undo.length > 1) {
      undo.pop();
      const img = new Image();
      img.src = undo[undo.length - 1];
      img.onload = () => ctx.drawImage(img, 0, 0);
    }
  });

  // ── LIMPAR ──
  container.querySelector('#btn-limpar').addEventListener('click', () => {
    if (!confirm('Limpar o desenho?')) return;
    salvarEstado();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Reset cores do molde
    overlay.querySelectorAll('.pc').forEach(el => el.style.fill = '#fff');
  });

  // ── SALVAR ──
  container.querySelector('#btn-salvar').addEventListener('click', () => {
    container.querySelector('#paint-modal-nome').classList.remove('oculto');
    container.querySelector('#paint-nome-arquivo').focus();
    container.querySelector('#paint-nome-arquivo').select();
  });
  container.querySelector('#pm-cancel').addEventListener('click', () => {
    container.querySelector('#paint-modal-nome').classList.add('oculto');
  });
  container.querySelector('#pm-ok').addEventListener('click', () => {
    const nome = container.querySelector('#paint-nome-arquivo').value.trim() || 'meu-desenho';

    // Se há molde SVG, combinar canvas + SVG numa imagem
    if (moldeAtual !== 'livre' && overlay.querySelector('svg')) {
      const svgEl = overlay.querySelector('svg');
      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(svgEl);
      const blob = new Blob([svgStr], {type:'image/svg+xml'});
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const merged = document.createElement('canvas');
        merged.width = canvas.width;
        merged.height = canvas.height;
        const mctx = merged.getContext('2d');
        mctx.drawImage(canvas, 0, 0);
        mctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        baixar(merged.toDataURL('image/png'), nome);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } else {
      baixar(canvas.toDataURL('image/png'), nome);
    }
    container.querySelector('#paint-modal-nome').classList.add('oculto');
  });

  function baixar(dataUrl, nome) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = nome + '.png';
    a.click();
  }

  // ── FECHAR ──
  container.querySelector('#paint-fechar').addEventListener('click', () => {
    root.remove();
    window.removeEventListener('resize', dimensionarCanvas);
    // Volta ao menu de jogos
    const evt = new CustomEvent('paint:fechar');
    document.dispatchEvent(evt);
  });

  // ── FILL (balde) ──
  function floodFill(x, y, corAlvo, corNova) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const toIndex = (x, y) => (y * canvas.width + x) * 4;
    const r0 = data[toIndex(x,y)], g0 = data[toIndex(x,y)+1], b0 = data[toIndex(x,y)+2], a0 = data[toIndex(x,y)+3];

    const [nr,ng,nb] = hexToRgb(corAlvo);
    if (r0===nr && g0===ng && b0===nb) return;

    const stack = [[x,y]];
    const visited = new Uint8Array(canvas.width * canvas.height);

    while (stack.length) {
      const [cx,cy] = stack.pop();
      if (cx<0||cy<0||cx>=canvas.width||cy>=canvas.height) continue;
      const idx = cy*canvas.width+cx;
      if (visited[idx]) continue;
      const i = idx*4;
      if (Math.abs(data[i]-r0)>30||Math.abs(data[i+1]-g0)>30||Math.abs(data[i+2]-b0)>30) continue;
      visited[idx]=1;
      data[i]=nr; data[i+1]=ng; data[i+2]=nb; data[i+3]=255;
      stack.push([cx+1,cy],[cx-1,cy],[cx,cy+1],[cx,cy-1]);
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return [r,g,b];
  }

  // ── EVENTOS DO CANVAS ──
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.floor((clientX - rect.left) * scaleX),
      y: Math.floor((clientY - rect.top) * scaleY),
    };
  }

  canvas.addEventListener('mousedown', iniciarDesenho);
  canvas.addEventListener('mousemove', continuarDesenho);
  canvas.addEventListener('mouseup', finalizarDesenho);
  canvas.addEventListener('mouseleave', finalizarDesenho);
  canvas.addEventListener('touchstart', e => { e.preventDefault(); iniciarDesenho(e); }, {passive:false});
  canvas.addEventListener('touchmove',  e => { e.preventDefault(); continuarDesenho(e); }, {passive:false});
  canvas.addEventListener('touchend',   e => { e.preventDefault(); finalizarDesenho(e); }, {passive:false});

  function iniciarDesenho(e) {
    const {x, y} = getPos(e);
    desenhando = true;
    startX = x; startY = y;

    if (ferramenta === 'balde') {
      salvarEstado();
      floodFill(x, y, corAtual, corAtual);
      desenhando = false;
      return;
    }

    salvarEstado();
    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = ferramenta === 'borracha' ? '#ffffff' : corAtual;
    ctx.lineWidth   = ferramenta === 'borracha' ? tamanho * 3 : tamanho;
  }

  function continuarDesenho(e) {
    if (!desenhando) return;
    const {x, y} = getPos(e);

    if (ferramenta === 'pincel' || ferramenta === 'borracha') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (['linha','retangulo','circulo'].includes(ferramenta)) {
      ctx.putImageData(snapShot, 0, 0);
      ctx.strokeStyle = corAtual;
      ctx.lineWidth = tamanho;
      ctx.beginPath();
      if (ferramenta === 'linha') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (ferramenta === 'retangulo') {
        ctx.strokeRect(startX, startY, x-startX, y-startY);
      } else if (ferramenta === 'circulo') {
        const rx = Math.abs(x-startX)/2, ry = Math.abs(y-startY)/2;
        const cx = startX + (x-startX)/2, cy = startY + (y-startY)/2;
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2);
        ctx.stroke();
      }
    }
  }

  function finalizarDesenho() {
    desenhando = false;
    ctx.beginPath();
  }
}
