/**
 * features/jogos/caca-palavras.js
 * Caça-palavras com 5 níveis de dificuldade.
 * Suporte a drag/touch. Palavras ao contrário apenas nos níveis Hard/Expert.
 */

// ── CONFIGURAÇÃO DOS NÍVEIS ───────────────────────────────────────────────────

const NIVEIS = [
  {
    id: 'infantil',
    nome: 'Infantil',
    emoji: '',
    cor: '#34d399',
    descricao: 'Palavras simples e curtas',
    grid: 8,
    direcoes: ['H', 'V'],
    invertidas: false,
    palavras: [
      'GATO', 'CÃO', 'SOL', 'LUA', 'MAR', 'RIO',
      'PAI', 'MÃE', 'COR', 'OVO', 'PÉ', 'MÃO',
    ],
  },
  {
    id: 'fundamental1',
    nome: 'Fund. I',
    emoji: '📚',
    cor: '#38bdf8',
    descricao: '1º ao 5º ano',
    grid: 10,
    direcoes: ['H', 'V', 'D'],
    invertidas: false,
    palavras: [
      'ESCOLA', 'LIVRO', 'LÁPIS', 'BORRACHA', 'CADERNO',
      'AMIGO', 'FESTA', 'BOLA', 'FLOR', 'CHUVA',
      'PEIXE', 'FRUTA', 'LETRA', 'NÚMERO', 'CLASSE',
    ],
  },
  {
    id: 'fundamental2',
    nome: 'Fund. II',
    emoji: '🔬',
    cor: '#818cf8',
    descricao: '6º ao 9º ano',
    grid: 12,
    direcoes: ['H', 'V', 'D'],
    invertidas: false,
    palavras: [
      'CIÊNCIA', 'HISTÓRIA', 'BIOLOGIA', 'QUÍMICA',
      'PLANETA', 'CÉLULA', 'ÁTOMO', 'ENERGIA',
      'CULTURA', 'SISTEMA', 'FÓRMULA', 'PROJETO',
      'TEOREMA', 'EQUAÇÃO', 'MOLÉCULA',
    ],
  },
  {
    id: 'medio',
    nome: 'Médio',
    emoji: '🎓',
    cor: '#fbbf24',
    descricao: 'Ensino Médio',
    grid: 14,
    direcoes: ['H', 'V', 'D'],
    invertidas: true,
    palavras: [
      'FILOSOFIA', 'SOCIOLOGIA', 'LITERATURA',
      'GEOMETRIA', 'TRIGONOMETRIA', 'LOGARITMO',
      'FOTOSSÍNTESE', 'MITOCÔNDRIA', 'ECOSISTEMA',
      'REVOLUÇÃO', 'DEMOCRACIA', 'CONSTITUIÇÃO',
      'TERMODINÂMICA', 'ELETRICIDADE', 'GRAVITAÇÃO',
    ],
  },
  {
    id: 'expert',
    nome: 'Expert',
    emoji: '🧠',
    cor: '#f87171',
    descricao: 'Todas as direções + invertidas',
    grid: 16,
    direcoes: ['H', 'V', 'D'],
    invertidas: true,
    palavras: [
      'EPISTEMOLOGIA', 'FENOMENOLOGIA', 'HERMENÊUTICA',
      'INTERDISCIPLINAR', 'ELETROMAGNETISMO',
      'TERMODINÂMICA', 'FOTOSSÍNTESE', 'BIODIVERSIDADE',
      'MICROBIOLOGIA', 'NANOTECNOLOGIA', 'CRIPTOGRAFIA',
      'ALGORITMO', 'INTELIGÊNCIA', 'SUSTENTABILIDADE',
      'RELATIVIDADE', 'PROBABILIDADE',
    ],
  },
];

// ── ESTADO DO JOGO ────────────────────────────────────────────────────────────

let _estado = null;

function _estadoInicial() {
  return {
    fase: 'nivel',      // 'nivel' | 'jogando' | 'vitoria'
    nivel: null,
    grid: [],
    tamanho: 0,
    palavrasNoGrid: [], // { palavra, celulas: [{r,c}], encontrada }
    arrastandoDe: null, // {r, c}
    selecaoAtual: [],   // [{r, c}]
    encontradas: 0,
    inicio: null,
    tempoDecorrido: 0,
    timerInterval: null,
  };
}

// ── RENDER PRINCIPAL ──────────────────────────────────────────────────────────

export function render(container) {
  _estado = _estadoInicial();
  _renderTelaInicio(container);
}

export function init(container) {
  // lógica iniciada após render de cada tela
}

// ── TELA DE SELEÇÃO DE NÍVEL ──────────────────────────────────────────────────

function _renderTelaInicio(container) {
  if (_estado.timerInterval) clearInterval(_estado.timerInterval);

  const niveisHTML = NIVEIS.map(n => `
    <button class="cp-nivel-card" data-nivel="${n.id}" style="--nivel-cor: ${n.cor}">
      <span class="cp-nivel-emoji">${n.emoji}</span>
      <span class="cp-nivel-nome">${n.nome}</span>
      <span class="cp-nivel-desc">${n.descricao}</span>
      <div class="cp-nivel-info">
        <span>${n.grid}×${n.grid}</span>
        <span>${n.palavras.length} palavras</span>
      </div>
    </button>
  `).join('');

  container.innerHTML = `
    <div class="cp-wrap">
      <div class="page-header">
        <span class="page-header__eyebrow">Jogo</span>
        <h1 class="cp-titulo">Caça-Palavras</h1>
        <p class="cp-sub">Escolha o nível de dificuldade para começar.</p>
      </div>
      <div class="cp-niveis-grid" id="cp-niveis-grid"></div>
    </div>
  `;

  // Preenche os cards de nível
  container.querySelector('#cp-niveis-grid').innerHTML = niveisHTML;

  // Eventos
  container.querySelector('#cp-niveis-grid').addEventListener('click', e => {
    const card = e.target.closest('[data-nivel]');
    if (!card) return;
    const nivel = NIVEIS.find(n => n.id === card.dataset.nivel);
    if (nivel) _iniciarJogo(container, nivel);
  });
}

// ── INICIAR JOGO ──────────────────────────────────────────────────────────────

function _iniciarJogo(container, nivel) {
  if (_estado.timerInterval) clearInterval(_estado.timerInterval);

  const tamanho = nivel.grid;
  const { grid, palavrasNoGrid } = _gerarGrid(nivel);

  _estado = {
    ..._estadoInicial(),
    fase: 'jogando',
    nivel,
    grid,
    tamanho,
    palavrasNoGrid,
    encontradas: 0,
    inicio: Date.now(),
    tempoDecorrido: 0,
  };

  _renderTelaJogo(container);
  _iniciarTimer(container);
}

// ── TIMER ─────────────────────────────────────────────────────────────────────

function _iniciarTimer(container) {
  _estado.timerInterval = setInterval(() => {
    if (_estado.fase !== 'jogando') {
      clearInterval(_estado.timerInterval);
      return;
    }
    _estado.tempoDecorrido = Math.floor((Date.now() - _estado.inicio) / 1000);
    const el = container.querySelector('#cp-tempo');
    if (el) el.textContent = _formatarTempo(_estado.tempoDecorrido);
  }, 1000);
}

function _formatarTempo(seg) {
  const m = Math.floor(seg / 60).toString().padStart(2, '0');
  const s = (seg % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ── RENDER TELA DE JOGO ───────────────────────────────────────────────────────

function _renderTelaJogo(container) {
  const { nivel, tamanho, palavrasNoGrid } = _estado;

  const palavrasHTML = palavrasNoGrid.map((p, i) => `
    <div class="cp-palavra-item ${p.encontrada ? 'achada' : ''}" id="cp-pw-${i}">
      ${p.palavra}
    </div>
  `).join('');

  const total = palavrasNoGrid.length;

  container.querySelector('.cp-wrap').innerHTML = `
    <div class="cp-toolbar">
      <div>
        <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-3);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:2px">
          ${nivel.emoji} ${nivel.nome}
        </div>
        <div class="cp-toolbar-titulo">Caça-Palavras</div>
      </div>
      <div class="cp-stat">⏱️ <strong id="cp-tempo">00:00</strong></div>
      <div class="cp-stat">✅ <strong id="cp-encontradas">0</strong>/${total}</div>
      <button class="btn btn--ghost btn--sm" id="cp-btn-niveis">Níveis</button>
      <button class="btn btn--ghost btn--sm" id="cp-btn-novo">Novo</button>
    </div>

    <div class="cp-jogo-wrap">
      <div>
        <div class="cp-grid-outer" id="cp-grid-outer">
          <div class="cp-grid" id="cp-grid"
            style="grid-template-columns: repeat(${tamanho}, 1fr);">
          </div>
        </div>
      </div>
      <div class="cp-painel">
        <div class="cp-painel-titulo">Encontre as palavras</div>
        <div class="cp-lista-palavras" id="cp-lista-palavras">
          ${palavrasHTML}
        </div>
      </div>
    </div>
  `;

  _renderGrid(container);
  _bindEventosJogo(container);
}

// ── RENDER GRID ───────────────────────────────────────────────────────────────

function _renderGrid(container) {
  const { grid, tamanho, palavrasNoGrid } = _estado;
  const gridEl = container.querySelector('#cp-grid');
  if (!gridEl) return;

  // Células encontradas
  const encontradasSet = new Set();
  palavrasNoGrid.filter(p => p.encontrada).forEach(p => {
    p.celulas.forEach(c => encontradasSet.add(`${c.r},${c.c}`));
  });

  // Células selecionadas
  const selecionadasSet = new Set(_estado.selecaoAtual.map(c => `${c.r},${c.c}`));

  const cellSize = Math.max(26, Math.min(40, Math.floor(480 / tamanho)));

  let html = '';
  for (let r = 0; r < tamanho; r++) {
    for (let c = 0; c < tamanho; c++) {
      const key = `${r},${c}`;
      const enc = encontradasSet.has(key);
      const sel = selecionadasSet.has(key);
      html += `
        <div class="cp-celula ${enc ? 'encontrada' : ''} ${sel && !enc ? 'selecionada' : ''}"
          data-r="${r}" data-c="${c}"
          style="width:${cellSize}px;height:${cellSize}px;font-size:${Math.max(10, cellSize * 0.42)}px">
          ${grid[r][c]}
        </div>
      `;
    }
  }
  gridEl.innerHTML = html;
}

// ── EVENTOS DE ARRASTAR ───────────────────────────────────────────────────────

function _bindEventosJogo(container) {
  const outer = container.querySelector('#cp-grid-outer');

  // ── Mouse
  outer.addEventListener('mousedown', e => {
    const cel = e.target.closest('.cp-celula');
    if (!cel) return;
    e.preventDefault();
    _estado.arrastandoDe = { r: +cel.dataset.r, c: +cel.dataset.c };
    _estado.selecaoAtual = [_estado.arrastandoDe];
    _renderGrid(container);
  });

  outer.addEventListener('mousemove', e => {
    if (!_estado.arrastandoDe) return;
    const cel = document.elementFromPoint(e.clientX, e.clientY)?.closest('.cp-celula');
    if (!cel) return;
    _atualizarSelecao(container, +cel.dataset.r, +cel.dataset.c);
  });

  document.addEventListener('mouseup', () => {
    if (!_estado.arrastandoDe) return;
    _verificarPalavra(container);
    _estado.arrastandoDe = null;
    _estado.selecaoAtual = [];
    _renderGrid(container);
  });

  // ── Touch
  outer.addEventListener('touchstart', e => {
    const t = e.touches[0];
    const cel = document.elementFromPoint(t.clientX, t.clientY)?.closest('.cp-celula');
    if (!cel) return;
    e.preventDefault();
    _estado.arrastandoDe = { r: +cel.dataset.r, c: +cel.dataset.c };
    _estado.selecaoAtual = [_estado.arrastandoDe];
    _renderGrid(container);
  }, { passive: false });

  outer.addEventListener('touchmove', e => {
    if (!_estado.arrastandoDe) return;
    e.preventDefault();
    const t = e.touches[0];
    const cel = document.elementFromPoint(t.clientX, t.clientY)?.closest('.cp-celula');
    if (!cel) return;
    _atualizarSelecao(container, +cel.dataset.r, +cel.dataset.c);
  }, { passive: false });

  outer.addEventListener('touchend', () => {
    if (!_estado.arrastandoDe) return;
    _verificarPalavra(container);
    _estado.arrastandoDe = null;
    _estado.selecaoAtual = [];
    _renderGrid(container);
  });

  // Botões
  container.querySelector('#cp-btn-niveis')?.addEventListener('click', () => {
    clearInterval(_estado.timerInterval);
    _renderTelaInicio(container);
  });

  container.querySelector('#cp-btn-novo')?.addEventListener('click', () => {
    _iniciarJogo(container, _estado.nivel);
  });
}

function _atualizarSelecao(container, r2, c2) {
  const { arrastandoDe } = _estado;
  if (!arrastandoDe) return;
  const { r: r1, c: c1 } = arrastandoDe;

  // Calcula direção válida (H, V, D)
  const dr = r2 - r1;
  const dc = c2 - c1;
  const abs_dr = Math.abs(dr);
  const abs_dc = Math.abs(dc);

  let celulas = [arrastandoDe];

  if (abs_dr === 0 && abs_dc > 0) {
    // Horizontal
    const step = dc > 0 ? 1 : -1;
    for (let c = c1 + step; c !== c2 + step; c += step) celulas.push({ r: r1, c });
  } else if (abs_dc === 0 && abs_dr > 0) {
    // Vertical
    const step = dr > 0 ? 1 : -1;
    for (let r = r1 + step; r !== r2 + step; r += step) celulas.push({ r, c: c1 });
  } else if (abs_dr === abs_dc && abs_dr > 0) {
    // Diagonal
    const sr = dr > 0 ? 1 : -1;
    const sc = dc > 0 ? 1 : -1;
    let r = r1 + sr, c = c1 + sc;
    while (r !== r2 + sr || c !== c2 + sc) {
      celulas.push({ r, c });
      r += sr; c += sc;
    }
  }

  _estado.selecaoAtual = celulas;
  _renderGrid(container);
}

// ── VERIFICAR PALAVRA ─────────────────────────────────────────────────────────

function _verificarPalavra(container) {
  const { selecaoAtual, palavrasNoGrid } = _estado;
  if (selecaoAtual.length < 2) return;

  const letras = selecaoAtual.map(c => _estado.grid[c.r][c.c]).join('');

  for (let i = 0; i < palavrasNoGrid.length; i++) {
    const pw = palavrasNoGrid[i];
    if (pw.encontrada) continue;

    // Verifica se as células batem
    const celulasBatem = _celulasBatem(selecaoAtual, pw.celulas);
    if (celulasBatem) {
      pw.encontrada = true;
      _estado.encontradas++;

      // Atualiza item na lista
      const item = container.querySelector(`#cp-pw-${i}`);
      if (item) item.classList.add('achada');

      // Atualiza contador
      const enc = container.querySelector('#cp-encontradas');
      if (enc) enc.textContent = _estado.encontradas;

      // Flash nas células
      _flashCelulas(container, pw.celulas);

      // Verifica vitória
      if (_estado.encontradas === palavrasNoGrid.length) {
        setTimeout(() => _renderVitoria(container), 600);
      }
      return;
    }
  }
}

function _celulasBatem(sel, alvo) {
  if (sel.length !== alvo.length) return false;
  // Verifica nas duas direções (normal e invertida)
  const selKey  = sel.map(c => `${c.r},${c.c}`).join('|');
  const alvoKey = alvo.map(c => `${c.r},${c.c}`).join('|');
  const alvoInv = [...alvo].reverse().map(c => `${c.r},${c.c}`).join('|');
  return selKey === alvoKey || selKey === alvoInv;
}

function _flashCelulas(container, celulas) {
  celulas.forEach(({ r, c }) => {
    const el = container.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    if (el) {
      el.classList.add('encontrada', 'acerto-flash');
      setTimeout(() => el.classList.remove('acerto-flash'), 400);
    }
  });
}

// ── TELA DE VITÓRIA ───────────────────────────────────────────────────────────

function _renderVitoria(container) {
  clearInterval(_estado.timerInterval);
  _estado.fase = 'vitoria';
  const { nivel, tempoDecorrido, palavrasNoGrid } = _estado;

  const wrap = container.querySelector('.cp-wrap');
  wrap.innerHTML = `
    <div class="cp-vitoria">
      <span class="cp-vitoria-emoji">🏆</span>
      <div class="cp-vitoria-titulo">Parabéns!</div>
      <p style="color:var(--text-2);font-size:0.95rem">
        Você encontrou todas as palavras do nível <strong style="color:${nivel.cor}">${nivel.nome}</strong>!
      </p>
      <div class="cp-vitoria-stats">
        <div class="cp-vitoria-stat">
          <span class="cp-vitoria-stat-valor">${_formatarTempo(tempoDecorrido)}</span>
          <span class="cp-vitoria-stat-label">Tempo</span>
        </div>
        <div class="cp-vitoria-stat">
          <span class="cp-vitoria-stat-valor">${palavrasNoGrid.length}</span>
          <span class="cp-vitoria-stat-label">Palavras</span>
        </div>
        <div class="cp-vitoria-stat">
          <span class="cp-vitoria-stat-valor">${nivel.grid}×${nivel.grid}</span>
          <span class="cp-vitoria-stat-label">Grid</span>
        </div>
      </div>
      <div class="cp-vitoria-btns">
        <button class="btn btn--primary" id="cp-btn-repetir">Jogar Novamente</button>
        <button class="btn btn--ghost" id="cp-btn-proximo">Próximo Nível</button>
        <button class="btn btn--ghost" id="cp-btn-menu">← Níveis</button>
      </div>
    </div>
  `;

  container.querySelector('#cp-btn-repetir')?.addEventListener('click', () => {
    _iniciarJogo(container, nivel);
  });

  container.querySelector('#cp-btn-menu')?.addEventListener('click', () => {
    _renderTelaInicio(container);
  });

  container.querySelector('#cp-btn-proximo')?.addEventListener('click', () => {
    const idx = NIVEIS.findIndex(n => n.id === nivel.id);
    const proximo = NIVEIS[idx + 1];
    if (proximo) _iniciarJogo(container, proximo);
    else _renderTelaInicio(container);
  });
}

// ── GERAÇÃO DO GRID ───────────────────────────────────────────────────────────

function _gerarGrid(nivel) {
  const { grid: tamanho, palavras, direcoes, invertidas } = nivel;

  // Embaralha e limita palavras que cabem no grid
  const pool = _embaralhar([...palavras]).filter(p => _removerAcentos(p).length <= tamanho);
  const maxPalavras = Math.min(pool.length, Math.floor(tamanho * 1.2));
  const selecionadas = pool.slice(0, maxPalavras);

  // Cria grid vazio
  const grid = Array.from({ length: tamanho }, () => Array(tamanho).fill(''));

  const palavrasNoGrid = [];

  for (const palavra of selecionadas) {
    const limpa = _removerAcentos(palavra.toUpperCase());
    const colocada = _tentarColocar(grid, limpa, tamanho, direcoes, invertidas);
    if (colocada) {
      palavrasNoGrid.push({ palavra: palavra.toUpperCase(), celulas: colocada, encontrada: false });
    }
  }

  // Preenche espaços vazios com letras aleatórias
  const letras = 'ABCDEFGHIJKLMNOPRSTUVZ';
  for (let r = 0; r < tamanho; r++) {
    for (let c = 0; c < tamanho; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letras[Math.floor(Math.random() * letras.length)];
      }
    }
  }

  return { grid, palavrasNoGrid };
}

function _tentarColocar(grid, palavra, tamanho, direcoes, invertidas) {
  const DIRS = {
    H:  { dr: 0,  dc: 1  },
    V:  { dr: 1,  dc: 0  },
    D:  { dr: 1,  dc: 1  },
    DA: { dr: 1,  dc: -1 },
    DI: { dr: -1, dc: 1  },
    DB: { dr: -1, dc: -1 },
  };

  // Monta lista de direções permitidas
  let dirs = [];
  if (direcoes.includes('H')) dirs.push('H');
  if (direcoes.includes('V')) dirs.push('V');
  if (direcoes.includes('D')) dirs.push('D', 'DA', 'DI', 'DB');
  if (invertidas) {
    if (direcoes.includes('H')) dirs.push('HI'); // horizontal invertida
    if (direcoes.includes('V')) dirs.push('VI');
  }

  // Adiciona direções invertidas simples como rotações
  const DIRS_EXTRA = {
    HI: { dr: 0,  dc: -1 },
    VI: { dr: -1, dc: 0  },
  };
  const allDirs = { ...DIRS, ...DIRS_EXTRA };

  dirs = _embaralhar(dirs);

  for (let tentativa = 0; tentativa < 80; tentativa++) {
    const dir = dirs[tentativa % dirs.length];
    const { dr, dc } = allDirs[dir];
    const len = palavra.length;

    // Calcula posição de início válida
    const rMax = tamanho - dr * (len - 1);
    const cMax = tamanho - dc * (len - 1);
    const rMin = -dr * (len - 1);
    const cMin = -dc * (len - 1);

    const r0 = Math.floor(Math.random() * (Math.abs(rMax - rMin) + 1)) + Math.min(rMin, rMax - 1);
    const c0 = Math.floor(Math.random() * (Math.abs(cMax - cMin) + 1)) + Math.min(cMin, cMax - 1);

    if (r0 < 0 || c0 < 0 || r0 >= tamanho || c0 >= tamanho) continue;

    // Verifica se cabe
    const celulas = [];
    let ok = true;
    for (let i = 0; i < len; i++) {
      const r = r0 + dr * i;
      const c = c0 + dc * i;
      if (r < 0 || r >= tamanho || c < 0 || c >= tamanho) { ok = false; break; }
      if (grid[r][c] && grid[r][c] !== palavra[i]) { ok = false; break; }
      celulas.push({ r, c });
    }

    if (ok) {
      celulas.forEach(({ r, c }, i) => { grid[r][c] = palavra[i]; });
      return celulas;
    }
  }
  return null;
}

// ── UTILITÁRIOS ───────────────────────────────────────────────────────────────

function _removerAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z]/g, '');
}

function _embaralhar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}