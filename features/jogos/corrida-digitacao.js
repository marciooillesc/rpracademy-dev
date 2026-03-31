/**
 * features/jogos/corrida-digitacao.js
 * Corrida de Digitação — textos temáticos por nível escolar.
 * Modo contagem regressiva: o jogador digita o máximo antes do tempo acabar.
 * Diferente do digitacao-jogo.js (que mede velocidade em frase única),
 * este tem textos progressivos, timer visual e ranking de precisão.
 */

// ── TEXTOS POR NÍVEL ──────────────────────────────────────────────────────────

const NIVEIS = [
  {
    id: 'infantil',
    nome: 'Infantil',
    emoji: '🐣',
    cor: '#34d399',
    tempo: 30,
    descricao: 'Pré / Infantil — Palavras curtas e simples',
    textos: [
      'gato rato pato mato bato fato',
      'sol lua mar rio céu flor paz bem',
      'mão pé nariz boca olho orelha',
      'um dois três quatro cinco seis sete',
      'casa mesa sala cama porta janela',
    ],
  },
  {
    id: 'fundamental1',
    nome: 'Fund. I',
    emoji: '📚',
    cor: '#38bdf8',
    tempo: 45,
    descricao: '1º ao 5º Ano — Frases curtas',
    textos: [
      'o gato subiu no telhado e ficou olhando para o jardim',
      'hoje o sol esta brilhando e as flores estao coloridas',
      'o computador e uma maquina que nos ajuda a aprender',
      'a escola e o lugar onde aprendemos e fazemos amigos',
      'eu gosto de ler livros e jogar no computador depois',
    ],
  },
  {
    id: 'fundamental2',
    nome: 'Fund. II',
    emoji: '🔬',
    cor: '#818cf8',
    tempo: 60,
    descricao: '6º ao 9º Ano — Textos de informática',
    textos: [
      'o computador e composto por hardware e software trabalhando juntos para processar informacoes',
      'a internet conecta bilhoes de dispositivos em todo o mundo por meio de protocolos de comunicacao',
      'o sistema operacional gerencia os recursos do computador e permite que os programas funcionem',
      'a memoria RAM armazena dados temporariamente enquanto o processador executa as instrucoes',
      'um algoritmo e uma sequencia de passos logicos para resolver um problema especifico',
    ],
  },
  {
    id: 'medio',
    nome: 'Médio',
    emoji: '🎓',
    cor: '#fbbf24',
    tempo: 60,
    descricao: 'Ensino Médio — Textos técnicos completos',
    textos: [
      'a criptografia assimetrica utiliza par de chaves publica e privada para garantir a seguranca na transmissao de dados',
      'redes neurais artificiais sao modelos computacionais inspirados no cerebro humano usados em inteligencia artificial',
      'o protocolo TCP garante a entrega confiavel de pacotes enquanto o UDP prioriza a velocidade da transmissao',
      'linguagens de programacao como Python JavaScript e Java permitem criar softwares para diversas plataformas',
      'bancos de dados relacionais organizam informacoes em tabelas com relacionamentos definidos pela linguagem SQL',
    ],
  },
];

// ── ESTADO ────────────────────────────────────────────────────────────────────

let estado = {
  nivel: null,
  texto: '',
  digitado: '',
  iniciado: false,
  terminado: false,
  tempoRestante: 0,
  intervalo: null,
  erros: 0,
  totalDigitado: 0,
};

function embaralhar(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function calcularWPM(chars, segundos) {
  return Math.round((chars / 5) / (segundos / 60));
}

function calcularPrecisao(total, erros) {
  if (total === 0) return 100;
  return Math.max(0, Math.round(((total - erros) / total) * 100));
}

// ── RENDER ────────────────────────────────────────────────────────────────────

export function render(container) {
  container.innerHTML = `
    <div class="jogo-area" id="cd-root">
      <div class="page-header">
        <span class="page-header__eyebrow">Digitação</span>
        <h1 class="page-header__titulo">⚡ Corrida de Digitação</h1>
        <p class="page-header__desc">Digite o máximo antes do tempo acabar. Escolha seu nível.</p>
      </div>

      <!-- Seleção de nível -->
      <div id="cd-tela-nivel">
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem;">
          ${NIVEIS.map(n => `
            <button class="card cd-btn-nivel" data-nivel="${n.id}" style="
              cursor:pointer; text-align:left; padding:1.4rem;
              border-color:${n.cor}33; transition:transform 0.15s;">
              <div style="font-size:2rem; margin-bottom:0.5rem">${n.emoji} <span style="font-family:var(--font-mono); font-size:0.75rem; color:${n.cor};">⏱ ${n.tempo}s</span></div>
              <div style="font-family:var(--font-display); font-weight:700; color:var(--text); margin-bottom:0.2rem">${n.nome}</div>
              <div style="font-size:0.78rem; color:var(--text-3)">${n.descricao}</div>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Tela do jogo -->
      <div id="cd-tela-jogo" style="display:none; max-width:700px;">
        <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap; margin-bottom:1.25rem;">
          <button class="btn btn--ghost btn--sm" id="cd-btn-voltar">← Níveis</button>
          <span id="cd-nivel-nome" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.1em;"></span>
          <span style="flex:1"></span>
          <span class="cp-stat">⚡ WPM: <strong id="cd-wpm-live">0</strong></span>
          <span class="cp-stat">🎯 <strong id="cd-precisao-live">100</strong>%</span>
        </div>

        <!-- Timer -->
        <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1rem;">
          <div style="flex:1; background:var(--bg-2); border-radius:4px; height:8px; overflow:hidden; border:1px solid var(--border);">
            <div id="cd-timer-barra" style="height:100%; background:var(--primary); border-radius:4px; transition:width 1s linear; width:100%;"></div>
          </div>
          <div id="cd-timer" style="font-family:var(--font-display); font-weight:800; font-size:1.4rem; color:var(--primary); min-width:2.5rem; text-align:right;"></div>
        </div>

        <!-- Texto para digitar -->
        <div id="cd-texto-wrap" style="
          font-family:var(--font-mono); font-size:1rem; line-height:2;
          padding:1.25rem; background:var(--bg); border:1px solid var(--border);
          border-radius:10px; margin-bottom:1rem; min-height:80px; word-break:break-word;
        " id="cd-texto-display"></div>

        <!-- Input -->
        <textarea id="cd-input"
          placeholder="Clique aqui e comece a digitar para iniciar o contador..."
          rows="3"
          style="
            width:100%; padding:1rem; border-radius:10px;
            background:var(--bg-2); border:1.5px solid var(--border);
            color:var(--text); font-family:var(--font-mono); font-size:1rem;
            resize:none; outline:none; transition:border-color 0.15s;
          "
        ></textarea>
        <div style="display:flex; gap:0.75rem; margin-top:0.75rem; flex-wrap:wrap; align-items:center;">
          <button class="btn btn--ghost btn--sm" id="cd-btn-reiniciar">↺ Reiniciar</button>
          <span style="font-size:0.78rem; color:var(--text-3);" id="cd-instrucao">Digite para começar!</span>
        </div>
      </div>

      <!-- Resultado -->
      <div id="cd-tela-resultado" style="display:none; max-width:500px; text-align:center; padding:2rem 0;">
        <div id="cd-res-emoji" style="font-size:4rem; margin-bottom:1rem;"></div>
        <h2 id="cd-res-titulo" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--text); margin-bottom:0.5rem;"></h2>
        <p id="cd-res-desc" style="color:var(--text-2); margin-bottom:2rem;"></p>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin-bottom:2rem;">
          <div class="card" style="padding:1rem; text-align:center;">
            <div id="cd-res-wpm" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--primary);"></div>
            <div style="font-size:0.7rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.05em; margin-top:0.25rem;">WPM</div>
          </div>
          <div class="card" style="padding:1rem; text-align:center;">
            <div id="cd-res-precisao" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--success);"></div>
            <div style="font-size:0.7rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.05em; margin-top:0.25rem;">Precisão</div>
          </div>
          <div class="card" style="padding:1rem; text-align:center;">
            <div id="cd-res-chars" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--accent);"></div>
            <div style="font-size:0.7rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.05em; margin-top:0.25rem;">Caracteres</div>
          </div>
        </div>
        <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn--primary" id="cd-btn-repetir">🔄 Repetir</button>
          <button class="btn btn--ghost" id="cd-btn-outros">📋 Níveis</button>
        </div>
      </div>
    </div>
  `;
}

export function init(container) {
  container.querySelectorAll('.cd-btn-nivel').forEach(btn => {
    btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateY(-2px)'; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    btn.addEventListener('click', () => {
      const nivel = NIVEIS.find(n => n.id === btn.dataset.nivel);
      iniciarJogo(nivel, container);
    });
  });
}

function iniciarJogo(nivel, container) {
  if (estado.intervalo) clearInterval(estado.intervalo);

  const textoAleatorio = embaralhar(nivel.textos)[0];

  estado = {
    nivel,
    texto: textoAleatorio,
    digitado: '',
    iniciado: false,
    terminado: false,
    tempoRestante: nivel.tempo,
    tempoTotal: nivel.tempo,
    intervalo: null,
    erros: 0,
    totalDigitado: 0,
  };

  container.querySelector('#cd-tela-nivel').style.display = 'none';
  container.querySelector('#cd-tela-resultado').style.display = 'none';
  container.querySelector('#cd-tela-jogo').style.display = '';
  container.querySelector('#cd-nivel-nome').textContent = `${nivel.emoji} ${nivel.nome}`;

  renderTexto(container);
  atualizarTimer(container);

  const input = container.querySelector('#cd-input');
  input.value = '';
  input.disabled = false;

  container.querySelector('#cd-btn-voltar').onclick = () => {
    if (estado.intervalo) clearInterval(estado.intervalo);
    container.querySelector('#cd-tela-nivel').style.display = '';
    container.querySelector('#cd-tela-jogo').style.display = 'none';
  };

  container.querySelector('#cd-btn-reiniciar').onclick = () => iniciarJogo(nivel, container);

  input.addEventListener('focus', () => {
    input.style.borderColor = 'var(--primary)';
  });
  input.addEventListener('blur', () => {
    input.style.borderColor = 'var(--border)';
  });

  input.addEventListener('input', () => {
    if (estado.terminado) return;

    // Inicia o timer na primeira digitação
    if (!estado.iniciado) {
      estado.iniciado = true;
      container.querySelector('#cd-instrucao').textContent = 'Boa sorte! ⚡';
      iniciarTimer(container);
    }

    const digitado = input.value;
    estado.digitado = digitado;
    estado.totalDigitado = digitado.length;

    // Conta erros comparando com o texto
    let erros = 0;
    for (let i = 0; i < digitado.length; i++) {
      if (i >= estado.texto.length || digitado[i] !== estado.texto[i]) erros++;
    }
    estado.erros = erros;

    // Atualiza WPM e precisão ao vivo
    const segundosPassados = estado.tempoTotal - estado.tempoRestante;
    if (segundosPassados > 0) {
      const charsCorretos = Math.max(0, digitado.length - erros);
      container.querySelector('#cd-wpm-live').textContent = calcularWPM(charsCorretos, segundosPassados);
    }
    container.querySelector('#cd-precisao-live').textContent =
      calcularPrecisao(digitado.length, erros) + '%';

    renderTexto(container);

    // Completou o texto — avança para o próximo
    if (digitado === estado.texto) {
      const proxTexto = embaralhar(nivel.textos).find(t => t !== estado.texto) || estado.texto;
      estado.texto = proxTexto;
      input.value = '';
      estado.digitado = '';
      renderTexto(container);
    }
  });

  setTimeout(() => input.focus(), 100);
}

function iniciarTimer(container) {
  estado.intervalo = setInterval(() => {
    estado.tempoRestante--;
    atualizarTimer(container);

    if (estado.tempoRestante <= 0) {
      clearInterval(estado.intervalo);
      estado.terminado = true;
      container.querySelector('#cd-input').disabled = true;
      mostrarResultado(container);
    }
  }, 1000);
}

function atualizarTimer(container) {
  const t = estado.tempoRestante;
  container.querySelector('#cd-timer').textContent = t;
  container.querySelector('#cd-timer').style.color = t <= 10 ? 'var(--danger)' : 'var(--primary)';

  const pct = (t / estado.tempoTotal) * 100;
  const barra = container.querySelector('#cd-timer-barra');
  barra.style.width = `${pct}%`;
  barra.style.background = t <= 10 ? 'var(--danger)' : t <= 20 ? 'var(--warning)' : 'var(--primary)';
}

function renderTexto(container) {
  const wrap = container.querySelector('#cd-texto-wrap') || container.querySelector('#cd-texto-display');
  if (!wrap) return;
  const { texto, digitado } = estado;

  let html = '';
  for (let i = 0; i < texto.length; i++) {
    const ch = texto[i];
    if (i < digitado.length) {
      const correto = digitado[i] === ch;
      html += `<span style="color:${correto ? '#4ade80' : 'var(--danger)'}; ${!correto ? 'text-decoration:underline;' : ''}">${ch === ' ' ? '&nbsp;' : ch}</span>`;
    } else if (i === digitado.length) {
      html += `<span style="background:var(--primary); color:var(--text-inv); border-radius:2px;">${ch === ' ' ? '&nbsp;' : ch}</span>`;
    } else {
      html += `<span style="color:var(--text-3);">${ch === ' ' ? '&nbsp;' : ch}</span>`;
    }
  }
  wrap.innerHTML = html;
}

function mostrarResultado(container) {
  container.querySelector('#cd-tela-jogo').style.display = 'none';
  const telaRes = container.querySelector('#cd-tela-resultado');
  telaRes.style.display = '';

  const segundos = estado.tempoTotal;
  const charsCorretos = Math.max(0, estado.totalDigitado - estado.erros);
  const wpm = calcularWPM(charsCorretos, segundos);
  const precisao = calcularPrecisao(estado.totalDigitado, estado.erros);

  let emoji, titulo, desc;
  if (wpm >= 60 && precisao >= 95) { emoji = '🚀'; titulo = 'Incrível!'; desc = 'Velocidade e precisão profissionais!'; }
  else if (wpm >= 40)  { emoji = '⚡'; titulo = 'Ótimo!'; desc = 'Digitação acima da média!'; }
  else if (wpm >= 25)  { emoji = '👍'; titulo = 'Bom!'; desc = 'Continue praticando!'; }
  else { emoji = '💪'; titulo = 'Continue!'; desc = 'A prática melhora a velocidade!'; }

  container.querySelector('#cd-res-emoji').textContent = emoji;
  container.querySelector('#cd-res-titulo').textContent = titulo;
  container.querySelector('#cd-res-desc').textContent = desc;
  container.querySelector('#cd-res-wpm').textContent = wpm;
  container.querySelector('#cd-res-precisao').textContent = precisao + '%';
  container.querySelector('#cd-res-chars').textContent = charsCorretos;

  container.querySelector('#cd-btn-repetir').onclick = () => iniciarJogo(estado.nivel, container);
  container.querySelector('#cd-btn-outros').onclick = () => {
    telaRes.style.display = 'none';
    container.querySelector('#cd-tela-nivel').style.display = '';
  };
}
