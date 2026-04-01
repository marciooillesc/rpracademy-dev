/**
 * features/jogos/arrastar-3ano.js
 * Arrastar e Soltar — 3º Ano (7–8 anos)
 * Tema: Classificar itens em Software, Hardware e Internet Segura
 */

export const META = {
  id: 'arrastar-3ano',
  nome: 'Arrastar e Soltar',
  descricao: '3º Ano · Software, Hardware e Internet',
  emoji: '🖱️',
};

const RODADAS = [
  {
    titulo: 'Software ou Hardware?',
    instrucao: 'Arraste cada item para a categoria correta.',
    categorias: [
      { id: 'hardware', label: '⚙️ Hardware', cor: '#38bdf8', corFundo: 'rgba(56,189,248,0.05)' },
      { id: 'software', label: '💿 Software', cor: '#a78bfa', corFundo: 'rgba(167,139,250,0.05)' },
    ],
    itens: [
      { id: 'teclado',   label: '⌨️ Teclado',      categoria: 'hardware' },
      { id: 'word',      label: '📝 Word',          categoria: 'software' },
      { id: 'mouse',     label: '🖱️ Mouse',         categoria: 'hardware' },
      { id: 'youtube',   label: '▶️ YouTube',       categoria: 'software' },
      { id: 'monitor',   label: '🖥️ Monitor',       categoria: 'hardware' },
      { id: 'paint',     label: '🎨 Paint',         categoria: 'software' },
      { id: 'pendrive',  label: '💾 Pen Drive',     categoria: 'hardware' },
      { id: 'navegador', label: '🌐 Navegador',     categoria: 'software' },
    ],
  },
  {
    titulo: 'Seguro ou Perigoso na Internet?',
    instrucao: 'Classifique cada situação como segura ou perigosa.',
    categorias: [
      { id: 'seguro',   label: '✅ Seguro',   cor: '#22c55e', corFundo: 'rgba(34,197,94,0.05)'  },
      { id: 'perigoso', label: '⚠️ Perigoso', cor: '#f87171', corFundo: 'rgba(248,113,113,0.05)' },
    ],
    itens: [
      { id: 'senha',    label: '🔐 Não compartilhar senha',   categoria: 'seguro'   },
      { id: 'estranho', label: '👤 Falar com estranhos',      categoria: 'perigoso' },
      { id: 'pais',     label: '👨‍👩‍👧 Usar com os pais',        categoria: 'seguro'   },
      { id: 'dados',    label: '📋 Dar seu endereço online',  categoria: 'perigoso' },
      { id: 'escola',   label: '🏫 Sites da escola',          categoria: 'seguro'   },
      { id: 'link',     label: '🔗 Clicar em link suspeito',  categoria: 'perigoso' },
      { id: 'logoff',   label: '🚪 Sair da conta ao terminar',categoria: 'seguro'   },
      { id: 'foto',     label: '📸 Postar foto pessoal',      categoria: 'perigoso' },
    ],
  },
];

let _estado = null;

function _estadoInicial(rodada = 0) {
  const itens = RODADAS[rodada].itens
    .map(i => ({ ...i, colocado: null }))
    .sort(() => Math.random() - 0.5);
  return { rodada, itens, arrastando: null, verificado: false };
}

export function render(container) {
  container.innerHTML = `
    <div class="jogo-area">
      <div class="page-header">
        <span class="page-header__eyebrow">🖱️ 3º Ano</span>
        <h1 class="page-header__titulo" id="arr-titulo"></h1>
        <p class="page-header__desc" id="arr-instrucao"></p>
      </div>
      <div style="display:flex;gap:0.75rem;align-items:center;margin-bottom:1rem;flex-wrap:wrap">
        <span class="cp-stat" id="arr-progresso"></span>
        <span class="chip" id="arr-badge"></span>
        <button class="btn btn--ghost btn--sm" id="arr-reiniciar">Reiniciar</button>
      </div>
      <div id="arr-itens" style="
        display:flex;flex-wrap:wrap;gap:0.5rem;
        padding:1rem;background:var(--bg-2);
        border:1px solid var(--border);border-radius:10px;
        min-height:68px;margin-bottom:1rem;
      "></div>
      <div id="arr-zonas" style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;"></div>
      <div style="display:flex;gap:0.75rem;margin-top:1rem;flex-wrap:wrap">
        <button class="btn btn--primary" id="arr-verificar">✅ Verificar</button>
        <button class="btn btn--ghost" id="arr-proxima" style="display:none">Próxima rodada →</button>
      </div>
      <div id="arr-resultado" style="margin-top:1rem;display:none"></div>
      <div id="arr-fim" style="display:none;text-align:center;padding:2.5rem 0">
        <div style="font-size:3.5rem">🏆</div>
        <h2 style="font-family:var(--font-display);font-size:1.8rem;color:var(--primary);margin:0.5rem 0">
          Você completou tudo!
        </h2>
        <p style="color:var(--text-2);margin-bottom:1.5rem">
          Ótimo trabalho! Você sabe classificar Software, Hardware<br>e usar a Internet com segurança.
        </p>
        <button class="btn btn--primary" id="arr-novo">Jogar de novo 🔄</button>
      </div>
    </div>
  `;
}

export function init(container) {
  _estado = _estadoInicial(0);
  _renderRodada(container);

  container.querySelector('#arr-reiniciar').addEventListener('click', () => {
    _estado = _estadoInicial(0);
    container.querySelector('#arr-fim').style.display = 'none';
    _renderRodada(container);
  });

  container.querySelector('#arr-novo').addEventListener('click', () => {
    _estado = _estadoInicial(0);
    container.querySelector('#arr-fim').style.display = 'none';
    _renderRodada(container);
  });

  container.querySelector('#arr-verificar').addEventListener('click', () => _verificar(container));
}

function _renderRodada(container) {
  const r = RODADAS[_estado.rodada];
  container.querySelector('#arr-titulo').textContent = r.titulo;
  container.querySelector('#arr-instrucao').textContent = r.instrucao;
  container.querySelector('#arr-badge').textContent = `Rodada ${_estado.rodada + 1} de ${RODADAS.length}`;
  container.querySelector('#arr-verificar').style.display = '';
  container.querySelector('#arr-proxima').style.display = 'none';
  container.querySelector('#arr-resultado').style.display = 'none';
  container.querySelector('#arr-resultado').innerHTML = '';
  _renderItens(container);
  _renderZonas(container);
  _atualizarProgresso(container);
}

function _renderItens(container) {
  const naoColocados = _estado.itens.filter(i => i.colocado === null);
  const box = container.querySelector('#arr-itens');
  if (naoColocados.length === 0) {
    box.innerHTML = `<span style="color:var(--text-2);font-size:0.85rem;margin:auto">
      Todos colocados! Clique em Verificar ou arraste de volta para corrigir.
    </span>`;
    return;
  }
  box.innerHTML = naoColocados.map(item => `
    <div class="arr-item" draggable="true" data-id="${item.id}"
      style="padding:0.45rem 0.8rem;background:var(--bg);border:1.5px solid var(--border);
      border-radius:8px;cursor:grab;font-size:0.88rem;color:var(--text);user-select:none;
      transition:opacity 0.15s;">
      ${item.label}
    </div>
  `).join('');

  box.querySelectorAll('.arr-item').forEach(el => {
    el.addEventListener('dragstart', e => {
      _estado.arrastando = el.dataset.id;
      setTimeout(() => el.style.opacity = '0.4', 0);
    });
    el.addEventListener('dragend', () => {
      el.style.opacity = '';
      _estado.arrastando = null;
    });
  });
}

function _renderZonas(container) {
  const r = RODADAS[_estado.rodada];
  const zonas = container.querySelector('#arr-zonas');
  zonas.innerHTML = r.categorias.map(cat => {
    const dentro = _estado.itens.filter(i => i.colocado === cat.id);
    return `
      <div class="arr-zona" data-zona="${cat.id}"
        style="min-height:110px;border:2px dashed ${cat.cor};border-radius:10px;
        padding:0.75rem;background:${cat.corFundo};transition:background 0.15s;">
        <div style="font-size:0.85rem;font-weight:600;color:${cat.cor};margin-bottom:0.5rem">${cat.label}</div>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem">
          ${dentro.map(item => `
            <div class="arr-item-zona" data-id="${item.id}"
              style="padding:0.4rem 0.65rem;background:var(--bg);border:1.5px solid ${cat.cor}55;
              border-radius:7px;font-size:0.82rem;color:var(--text);cursor:pointer;"
              title="Clique para devolver">
              ${item.label}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  zonas.querySelectorAll('.arr-zona').forEach(zona => {
    zona.addEventListener('dragover', e => { e.preventDefault(); zona.style.opacity = '0.85'; });
    zona.addEventListener('dragleave', () => { zona.style.opacity = ''; });
    zona.addEventListener('drop', e => {
      e.preventDefault();
      zona.style.opacity = '';
      _soltar(container, zona.dataset.zona);
    });
  });

  zonas.querySelectorAll('.arr-item-zona').forEach(el => {
    el.addEventListener('click', () => {
      if (_estado.verificado) return;
      const item = _estado.itens.find(i => i.id === el.dataset.id);
      if (item) { item.colocado = null; _renderItens(container); _renderZonas(container); _atualizarProgresso(container); }
    });
  });
}

function _soltar(container, zonaId) {
  if (!_estado.arrastando || _estado.verificado) return;
  const item = _estado.itens.find(i => i.id === _estado.arrastando);
  if (!item) return;
  item.colocado = zonaId;
  _estado.arrastando = null;
  _renderItens(container);
  _renderZonas(container);
  _atualizarProgresso(container);
}

function _atualizarProgresso(container) {
  const n = _estado.itens.filter(i => i.colocado !== null).length;
  container.querySelector('#arr-progresso').textContent = `📦 ${n}/${_estado.itens.length} colocados`;
}

function _verificar(container) {
  if (_estado.itens.some(i => i.colocado === null)) {
    alert('Coloque todos os itens antes de verificar!');
    return;
  }
  _estado.verificado = true;
  const r = RODADAS[_estado.rodada];
  let acertos = 0;
  const erros = [];
  _estado.itens.forEach(item => {
    if (item.colocado === item.categoria) {
      acertos++;
    } else {
      const cat = r.categorias.find(c => c.id === item.categoria);
      erros.push(`${item.label} → ${cat?.label}`);
    }
  });
  const total = _estado.itens.length;
  const ok = acertos === total;
  const res = container.querySelector('#arr-resultado');
  res.style.display = 'block';
  res.innerHTML = `
    <div style="padding:1rem 1.25rem;border-radius:10px;
      background:${ok ? 'rgba(34,197,94,0.08)' : 'rgba(248,113,113,0.08)'};
      border:1.5px solid ${ok ? '#22c55e' : '#f87171'}">
      <div style="font-size:1.4rem;margin-bottom:0.2rem">${ok ? '🎉' : '😅'}</div>
      <strong style="color:${ok ? '#4ade80' : '#f87171'}">${acertos}/${total} corretos${ok ? ' — Perfeito!' : ''}</strong>
      ${erros.length ? `<ul style="margin:0.6rem 0 0;padding-left:1.2rem;color:var(--text-2);font-size:0.84rem;line-height:1.9">
        ${erros.map(e => `<li>${e}</li>`).join('')}
      </ul>` : ''}
    </div>
  `;
  container.querySelector('#arr-verificar').style.display = 'none';
  const proxIdx = _estado.rodada + 1;
  if (proxIdx < RODADAS.length) {
    const btn = container.querySelector('#arr-proxima');
    btn.style.display = '';
    btn.onclick = () => { _estado = _estadoInicial(proxIdx); _renderRodada(container); };
  } else {
    setTimeout(() => { container.querySelector('#arr-fim').style.display = 'block'; }, 1000);
  }
}
