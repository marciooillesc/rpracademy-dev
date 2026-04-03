/**
 * features/jogos/clicker-jogo.js
 * Clicker Veloz — bata recorde de cliques no tempo!
 */

export const META = {
  id: 'clicker',
  nome: 'Clicker Veloz',
  descricao: 'Clique o máximo que puder no tempo!',
  emoji: '💥',
};

export function render(container) {
  container.innerHTML = `
    <div class="clicker-jogo">
      <style>
        .clicker-jogo { display:flex; flex-direction:column; align-items:center; gap:1.5rem; padding:2rem 1rem; min-height:80vh; }
        .clicker-titulo { font-family:var(--font-display); font-size:2rem; color:var(--primary); text-align:center; }
        .clicker-config { display:flex; gap:.75rem; flex-wrap:wrap; justify-content:center; }
        .clicker-config button {
          padding:.5rem 1.2rem; border-radius:999px; border:2px solid var(--border);
          background:transparent; color:var(--text-2); cursor:pointer; font-size:.9rem; transition:.2s;
        }
        .clicker-config button.ativo { border-color:var(--primary); color:var(--primary); background:rgba(56,189,248,.1); }
        .clicker-placar {
          display:flex; gap:2rem; flex-wrap:wrap; justify-content:center;
        }
        .clicker-stat { text-align:center; }
        .clicker-stat__num { font-family:var(--font-display); font-size:3.5rem; font-weight:900; color:var(--primary); line-height:1; transition:transform .1s; }
        .clicker-stat__num.pulsar { transform:scale(1.25); }
        .clicker-stat__label { font-size:.75rem; color:var(--text-3); text-transform:uppercase; letter-spacing:.08em; margin-top:.25rem; }
        .clicker-timer-bar { width:100%; max-width:480px; height:12px; background:var(--surface-2); border-radius:999px; overflow:hidden; }
        .clicker-timer-bar__fill { height:100%; background:var(--primary); border-radius:999px; transition:width .1s linear; }
        .clicker-btn {
          width:200px; height:200px; border-radius:50%; border:none; cursor:pointer;
          background: radial-gradient(circle at 35% 35%, #38bdf8, #0ea5e9 60%, #0369a1);
          box-shadow: 0 8px 32px rgba(56,189,248,.4), 0 2px 8px rgba(0,0,0,.3);
          font-size:4rem; transition:transform .08s, box-shadow .08s;
          display:flex; align-items:center; justify-content:center;
          user-select:none;
        }
        .clicker-btn:active { transform:scale(.92); box-shadow:0 2px 12px rgba(56,189,248,.3); }
        .clicker-btn:disabled { opacity:.5; cursor:not-allowed; }
        .clicker-btn.idle { animation: pulseIdle 2s ease-in-out infinite; }
        @keyframes pulseIdle { 0%,100%{box-shadow:0 8px 32px rgba(56,189,248,.4)} 50%{box-shadow:0 8px 48px rgba(56,189,248,.7)} }
        .clicker-resultado {
          text-align:center; animation:fadeIn .4s ease;
          background:var(--surface-2); border:1px solid var(--border);
          border-radius:1rem; padding:1.5rem 2rem; max-width:400px; width:100%;
        }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .clicker-resultado h2 { font-family:var(--font-display); color:var(--primary); font-size:1.5rem; margin-bottom:.5rem; }
        .clicker-resultado .recorde { color:#fbbf24; font-weight:700; font-size:1.1rem; }
        .clicker-particula {
          position:fixed; pointer-events:none; font-size:1.5rem;
          animation: subir .7s ease forwards;
          z-index:9999;
        }
        @keyframes subir { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(-80px) scale(.5)} }
        .clicker-ranking { width:100%; max-width:400px; }
        .clicker-ranking h3 { font-family:var(--font-display); color:var(--text-2); font-size:.9rem; text-transform:uppercase; letter-spacing:.1em; margin-bottom:.5rem; }
        .clicker-ranking ol { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:.3rem; }
        .clicker-ranking li {
          display:flex; justify-content:space-between; align-items:center;
          background:var(--surface-2); padding:.4rem .8rem; border-radius:.5rem;
          font-size:.85rem; color:var(--text-2);
        }
        .clicker-ranking li:first-child { border:1px solid #fbbf24; color:#fbbf24; }
        .clicker-ranking li:nth-child(2) { border:1px solid #9ca3af; }
        .clicker-ranking li:nth-child(3) { border:1px solid #b45309; }
        .btn-jogar-dnv {
          padding:.7rem 2rem; border-radius:999px; border:none;
          background:var(--primary); color:#000; font-weight:700; cursor:pointer;
          font-size:1rem; margin-top:.75rem;
        }
      </style>

      <div class="clicker-titulo">💥 Clicker Veloz</div>

      <!-- Seletor de tempo -->
      <div class="clicker-config">
        <button class="tempo-btn ativo" data-tempo="10">10s</button>
        <button class="tempo-btn" data-tempo="15">15s</button>
        <button class="tempo-btn" data-tempo="30">30s</button>
        <button class="tempo-btn" data-tempo="60">60s</button>
      </div>

      <!-- Placar -->
      <div class="clicker-placar">
        <div class="clicker-stat">
          <div class="clicker-stat__num" id="ck-contagem">0</div>
          <div class="clicker-stat__label">Cliques</div>
        </div>
        <div class="clicker-stat">
          <div class="clicker-stat__num" id="ck-tempo">10</div>
          <div class="clicker-stat__label">Segundos</div>
        </div>
        <div class="clicker-stat">
          <div class="clicker-stat__num" id="ck-cps">0.0</div>
          <div class="clicker-stat__label">Por seg</div>
        </div>
      </div>

      <!-- Barra de tempo -->
      <div class="clicker-timer-bar">
        <div class="clicker-timer-bar__fill" id="ck-barra" style="width:100%"></div>
      </div>

      <!-- Botão principal -->
      <button class="clicker-btn idle" id="ck-btn">🖱️</button>

      <!-- Resultado (oculto) -->
      <div class="clicker-resultado" id="ck-resultado" style="display:none"></div>

      <!-- Ranking -->
      <div class="clicker-ranking" id="ck-ranking-box" style="display:none">
        <h3>🏆 Melhores pontuações</h3>
        <ol id="ck-ranking-lista"></ol>
      </div>
    </div>
  `;
}

export function init(container) {
  let tempoTotal = 10;
  let cliques = 0;
  let rodando = false;
  let intervalo = null;
  let tempoRestante = 10;

  const btnPrincipal = container.querySelector('#ck-btn');
  const elContagem   = container.querySelector('#ck-contagem');
  const elTempo      = container.querySelector('#ck-tempo');
  const elCps        = container.querySelector('#ck-cps');
  const elBarra      = container.querySelector('#ck-barra');
  const elResultado  = container.querySelector('#ck-resultado');
  const elRankingBox = container.querySelector('#ck-ranking-box');
  const elRankingLista = container.querySelector('#ck-ranking-lista');

  const emojis = ['💥','⚡','🔥','✨','💫','🌟','🎯','👊'];
  const medalhas = ['🥇','🥈','🥉','4','5'];

  // Seletor de tempo
  container.querySelectorAll('.tempo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (rodando) return;
      container.querySelectorAll('.tempo-btn').forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      tempoTotal = parseInt(btn.dataset.tempo);
      tempoRestante = tempoTotal;
      elTempo.textContent = tempoTotal;
      elBarra.style.width = '100%';
      elContagem.textContent = '0';
      elCps.textContent = '0.0';
      elResultado.style.display = 'none';
    });
  });

  // Partícula voando
  function spawnParticula(e) {
    const p = document.createElement('div');
    p.className = 'clicker-particula';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = (e.clientX ?? window.innerWidth/2) - 12 + 'px';
    p.style.top  = (e.clientY ?? window.innerHeight/2) - 12 + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }

  // Clique principal
  btnPrincipal.addEventListener('click', (e) => {
    if (!rodando) {
      iniciar();
      return;
    }
    cliques++;
    elContagem.textContent = cliques;
    elCps.textContent = (cliques / (tempoTotal - tempoRestante || 1)).toFixed(1);

    // Pulsar
    elContagem.classList.remove('pulsar');
    void elContagem.offsetWidth;
    elContagem.classList.add('pulsar');
    setTimeout(() => elContagem.classList.remove('pulsar'), 100);

    spawnParticula(e);
  });

  function iniciar() {
    cliques = 0;
    tempoRestante = tempoTotal;
    rodando = true;
    elResultado.style.display = 'none';
    elRankingBox.style.display = 'none';
    btnPrincipal.classList.remove('idle');
    btnPrincipal.textContent = '💥';

    intervalo = setInterval(() => {
      tempoRestante--;
      elTempo.textContent = tempoRestante;
      elBarra.style.width = (tempoRestante / tempoTotal * 100) + '%';

      // Cor da barra no final
      if (tempoRestante <= 3) elBarra.style.background = '#ef4444';
      else if (tempoRestante <= Math.floor(tempoTotal * 0.3)) elBarra.style.background = '#f59e0b';
      else elBarra.style.background = '';

      if (tempoRestante <= 0) encerrar();
    }, 1000);
  }

  function encerrar() {
    clearInterval(intervalo);
    rodando = false;
    btnPrincipal.disabled = true;
    btnPrincipal.textContent = '🏁';

    const cps = (cliques / tempoTotal).toFixed(1);

    // Salvar no ranking local
    const chave = `clicker-ranking-${tempoTotal}s`;
    let ranking = JSON.parse(localStorage.getItem(chave) || '[]');
    ranking.push({ cliques, cps: parseFloat(cps), data: new Date().toLocaleDateString('pt-BR') });
    ranking.sort((a, b) => b.cliques - a.cliques);
    ranking = ranking.slice(0, 5);
    localStorage.setItem(chave, JSON.stringify(ranking));

    const recorde = ranking[0].cliques === cliques && ranking.filter(r => r.cliques === cliques).length === 1;

    elResultado.style.display = 'block';
    elResultado.innerHTML = `
      <h2>${cliques >= 100 ? '🔥' : cliques >= 50 ? '⚡' : '🎯'} ${cliques} cliques!</h2>
      <p style="color:var(--text-2);margin:.25rem 0">${cps} cliques por segundo em ${tempoTotal}s</p>
      ${recorde ? '<p class="recorde">🏆 Novo recorde!</p>' : ''}
      <button class="btn-jogar-dnv" id="ck-dnv">Jogar de novo</button>
    `;

    container.querySelector('#ck-dnv').addEventListener('click', resetar);

    // Ranking
    elRankingBox.style.display = 'block';
    elRankingLista.innerHTML = ranking.map((r, i) => `
      <li>
        <span>${medalhas[i] || (i+1)+'º'} ${r.cliques} cliques</span>
        <span style="color:var(--text-3)">${r.cps}/s · ${r.data}</span>
      </li>
    `).join('');
  }

  function resetar() {
    clearInterval(intervalo);
    rodando = false;
    cliques = 0;
    tempoRestante = tempoTotal;
    elContagem.textContent = '0';
    elTempo.textContent = tempoTotal;
    elCps.textContent = '0.0';
    elBarra.style.width = '100%';
    elBarra.style.background = '';
    btnPrincipal.disabled = false;
    btnPrincipal.textContent = '🖱️';
    btnPrincipal.classList.add('idle');
    elResultado.style.display = 'none';
    elRankingBox.style.display = 'none';
  }
}
