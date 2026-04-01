/**
 * features/jogos/verdadeiro-falso.js
 * Verdadeiro ou Falso — afirmações de informática.
 * 4 níveis escolares, 15 afirmações por nível, timer por questão,
 * sistema de vidas (3 erros = game over), streak multiplier.
 */

// ── AFIRMAÇÕES POR NÍVEL ──────────────────────────────────────────────────────

const NIVEIS = [
  {
    id: 'infantil',
    nome: 'Infantil',
    emoji: '🌟',
    cor: '#34d399',
    tempo: 8,
    descricao: 'Pré / Infantil — Verdades e mentiras simples',
    afirmacoes: [
      { texto: 'O mouse serve para mover o cursor na tela.', v: true },
      { texto: 'O teclado é usado para assistir filmes.', v: false },
      { texto: 'O monitor mostra imagens e vídeos.', v: true },
      { texto: 'O celular é um tipo de computador.', v: true },
      { texto: 'A impressora serve para tirar fotos.', v: false },
      { texto: 'O computador usa energia elétrica.', v: true },
      { texto: 'A internet existe dentro do computador sem precisar de conexão.', v: false },
      { texto: 'Com o teclado podemos digitar letras e números.', v: true },
      { texto: 'O fone de ouvido serve para ouvir sons.', v: true },
      { texto: 'O mouse é conectado ao monitor diretamente.', v: false },
      { texto: 'Um tablet é parecido com um computador portátil.', v: true },
      { texto: 'A câmera fotográfica serve para capturar imagens.', v: true },
      { texto: 'O mouse tem teclas para digitar textos.', v: false },
      { texto: 'Podemos salvar arquivos no computador.', v: true },
      { texto: 'O computador pode ligar sozinho sem ninguém apertar o botão.', v: false },
    ],
  },
  {
    id: 'fundamental1',
    nome: 'Fund. I',
    emoji: '📖',
    cor: '#38bdf8',
    tempo: 10,
    descricao: '1º ao 5º Ano — Hardware e uso básico',
    afirmacoes: [
      { texto: 'O HD armazena arquivos mesmo quando o computador está desligado.', v: true },
      { texto: 'A RAM é usada para armazenamento permanente de dados.', v: false },
      { texto: 'O processador (CPU) é o componente que executa as instruções.', v: true },
      { texto: 'Um pen drive serve para transportar arquivos.', v: true },
      { texto: 'O sistema operacional é um tipo de hardware.', v: false },
      { texto: 'Windows e Linux são sistemas operacionais.', v: true },
      { texto: 'Um arquivo .mp3 contém um vídeo.', v: false },
      { texto: 'Ao desligar o computador, os dados da RAM são apagados.', v: true },
      { texto: 'O teclado é um periférico de entrada.', v: true },
      { texto: 'O monitor é um periférico de entrada de dados.', v: false },
      { texto: 'É possível ter mais de um programa aberto ao mesmo tempo.', v: true },
      { texto: 'Um arquivo .jpg é uma imagem.', v: true },
      { texto: 'A lixeira do computador exclui arquivos permanentemente.', v: false },
      { texto: 'O Wi-Fi permite conexão à internet sem cabos.', v: true },
      { texto: 'Quanto mais RAM, mais lento o computador fica.', v: false },
    ],
  },
  {
    id: 'fundamental2',
    nome: 'Fund. II',
    emoji: '💡',
    cor: '#818cf8',
    tempo: 12,
    descricao: '6º ao 9º Ano — Redes, segurança e conceitos',
    afirmacoes: [
      { texto: 'O protocolo HTTP é usado para transferência de páginas web.', v: true },
      { texto: 'HTTPS é menos seguro do que HTTP.', v: false },
      { texto: 'Um firewall protege a rede contra acessos não autorizados.', v: true },
      { texto: 'Phishing é um tipo de ataque que tenta roubar dados pessoais.', v: true },
      { texto: 'Um endereço IP identifica um dispositivo na rede.', v: true },
      { texto: 'Vírus e antivírus são a mesma coisa.', v: false },
      { texto: 'A nuvem (cloud) armazena dados em servidores remotos.', v: true },
      { texto: 'Quanto mais simples a senha, mais segura ela é.', v: false },
      { texto: 'O DNS traduz nomes de domínio em endereços IP.', v: true },
      { texto: 'Um backup serve para recuperar dados perdidos.', v: true },
      { texto: 'Ransomware criptografa arquivos e pede resgate.', v: true },
      { texto: 'Usar a mesma senha em todos os sites é uma boa prática.', v: false },
      { texto: 'O Wi-Fi público pode ser perigoso para dados sensíveis.', v: true },
      { texto: 'VPN significa Rede Privada Virtual.', v: true },
      { texto: 'Atualizar o sistema operacional não tem relação com segurança.', v: false },
    ],
  },
  {
    id: 'medio',
    nome: 'Médio',
    emoji: '🎯',
    cor: '#fbbf24',
    tempo: 15,
    descricao: 'Ensino Médio — Programação, redes e sistemas',
    afirmacoes: [
      { texto: 'Em Python, os blocos de código são definidos por indentação.', v: true },
      { texto: 'O protocolo TCP garante a entrega dos pacotes de dados.', v: true },
      { texto: 'HTML é uma linguagem de programação.', v: false },
      { texto: 'SQL é usado para consultar bancos de dados relacionais.', v: true },
      { texto: 'Em binário, o número 10 representa o decimal 2.', v: true },
      { texto: 'Uma API permite a comunicação entre sistemas diferentes.', v: true },
      { texto: 'O modelo OSI possui 5 camadas.', v: false },
      { texto: 'Criptografia simétrica usa a mesma chave para cifrar e decifrar.', v: true },
      { texto: 'JavaScript só pode ser executado no servidor.', v: false },
      { texto: 'Um loop infinito é sempre um erro de programação.', v: false },
      { texto: 'Git é um sistema de controle de versão.', v: true },
      { texto: 'O endereço IPv6 tem 128 bits.', v: true },
      { texto: 'Compiladores traduzem código-fonte diretamente para linguagem de máquina.', v: true },
      { texto: 'O protocolo UDP garante a entrega ordenada dos pacotes.', v: false },
      { texto: 'Machine Learning é um ramo da Inteligência Artificial.', v: true },
    ],
  },
];

// ── ESTADO ────────────────────────────────────────────────────────────────────

let estado = {
  nivel: null,
  afirmacoes: [],
  indice: 0,
  pontos: 0,
  vidas: 3,
  streak: 0,
  maxStreak: 0,
  acertos: 0,
  respondeuAtual: false,
  tempoRestante: 0,
  intervalo: null,
};

function embaralhar(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── RENDER ────────────────────────────────────────────────────────────────────

export function render(container) {
  container.innerHTML = `
    <div class="jogo-area" id="vf-root">
      <div class="page-header">
        <span class="page-header__eyebrow">Conhecimento</span>
        <h1 class="page-header__titulo">✅ Verdadeiro ou Falso</h1>
        <p class="page-header__desc">Julgue cada afirmação antes do tempo acabar. 3 erros e é game over!</p>
      </div>

      <!-- Seleção de nível -->
      <div id="vf-tela-nivel">
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem;">
          ${NIVEIS.map(n => `
            <button class="card vf-btn-nivel" data-nivel="${n.id}" style="
              cursor:pointer; text-align:left; padding:1.4rem;
              border-color:${n.cor}33; transition:transform 0.15s;">
              <div style="font-size:2rem; margin-bottom:0.5rem">${n.emoji} <span style="font-family:var(--font-mono); font-size:0.7rem; color:${n.cor};">⏱ ${n.tempo}s</span></div>
              <div style="font-family:var(--font-display); font-weight:700; color:var(--text); margin-bottom:0.2rem">${n.nome}</div>
              <div style="font-size:0.78rem; color:var(--text-3)">${n.descricao}</div>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Tela do jogo -->
      <div id="vf-tela-jogo" style="display:none; max-width:620px;">
        <!-- HUD -->
        <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap; margin-bottom:1.25rem;">
          <button class="btn btn--ghost btn--sm" id="vf-btn-voltar">← Níveis</button>
          <span id="vf-nivel-nome" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.1em;"></span>
          <span style="flex:1"></span>
          <span id="vf-vidas" style="font-size:1.1rem; letter-spacing:2px;"></span>
          <span id="vf-streak" style="font-family:var(--font-mono); font-size:0.8rem; color:var(--warning);"></span>
          <span id="vf-pontos" style="font-family:var(--font-mono); font-size:0.8rem; color:var(--primary);">⭐ 0</span>
        </div>

        <!-- Progresso e timer -->
        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem;">
          <div style="flex:1; background:var(--bg-2); border-radius:4px; height:6px; overflow:hidden; border:1px solid var(--border);">
            <div id="vf-timer-barra" style="height:100%; background:var(--primary); border-radius:4px; transition:width 1s linear;"></div>
          </div>
          <span id="vf-timer" style="font-family:var(--font-display); font-weight:800; font-size:1.2rem; color:var(--primary); min-width:2rem; text-align:right;"></span>
        </div>

        <!-- Questão -->
        <div class="card" style="padding:2rem; margin-bottom:1.25rem; text-align:center; min-height:160px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem;">
          <div id="vf-numero" style="font-family:var(--font-mono); font-size:0.7rem; color:var(--primary); letter-spacing:0.1em; text-transform:uppercase;"></div>
          <p id="vf-afirmacao" style="font-size:1.05rem; font-weight:500; color:var(--text); line-height:1.65; margin:0;"></p>
        </div>

        <!-- Botões V/F -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <button id="vf-btn-v" style="
            padding:1.25rem; border-radius:12px; font-family:var(--font-display);
            font-weight:800; font-size:1.2rem; cursor:pointer;
            background:#22c55e18; border:2px solid #22c55e44; color:#4ade80;
            transition:background 0.15s, transform 0.15s;
          ">✅ VERDADEIRO</button>
          <button id="vf-btn-f" style="
            padding:1.25rem; border-radius:12px; font-family:var(--font-display);
            font-weight:800; font-size:1.2rem; cursor:pointer;
            background:rgba(248,113,113,0.08); border:2px solid rgba(248,113,113,0.3); color:var(--danger);
            transition:background 0.15s, transform 0.15s;
          ">❌ FALSO</button>
        </div>

        <!-- Feedback -->
        <div id="vf-feedback" style="display:none; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; font-size:0.9rem; text-align:center;"></div>
      </div>

      <!-- Game Over -->
      <div id="vf-tela-gameover" style="display:none; max-width:480px; text-align:center; padding:2rem 0;">
        <div style="font-size:4rem; margin-bottom:1rem;">💀</div>
        <h2 style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--danger); margin-bottom:0.5rem;">Game Over!</h2>
        <p id="vf-go-msg" style="color:var(--text-2); margin-bottom:2rem;"></p>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin-bottom:2rem;">
          <div class="card" style="padding:1rem; text-align:center;">
            <div id="vf-go-pontos" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--primary);"></div>
            <div style="font-size:0.7rem; color:var(--text-3); text-transform:uppercase; margin-top:0.25rem;">Pontos</div>
          </div>
          <div class="card" style="padding:1rem; text-align:center;">
            <div id="vf-go-acertos" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--success);"></div>
            <div style="font-size:0.7rem; color:var(--text-3); text-transform:uppercase; margin-top:0.25rem;">Acertos</div>
          </div>
          <div class="card" style="padding:1rem; text-align:center;">
            <div id="vf-go-streak" style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--warning);"></div>
            <div style="font-size:0.7rem; color:var(--text-3); text-transform:uppercase; margin-top:0.25rem;">Max streak</div>
          </div>
        </div>
        <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn--primary" id="vf-btn-repetir">🔄 Tentar Novamente</button>
          <button class="btn btn--ghost" id="vf-btn-outros">📋 Níveis</button>
        </div>
      </div>
    </div>
  `;
}

export function init(container) {
  container.querySelectorAll('.vf-btn-nivel').forEach(btn => {
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

  estado = {
    nivel,
    afirmacoes: embaralhar(nivel.afirmacoes),
    indice: 0,
    pontos: 0,
    vidas: 3,
    streak: 0,
    maxStreak: 0,
    acertos: 0,
    respondeuAtual: false,
    tempoRestante: nivel.tempo,
    intervalo: null,
  };

  container.querySelector('#vf-tela-nivel').style.display = 'none';
  container.querySelector('#vf-tela-gameover').style.display = 'none';
  container.querySelector('#vf-tela-jogo').style.display = '';
  container.querySelector('#vf-nivel-nome').textContent = `${nivel.emoji} ${nivel.nome}`;

  container.querySelector('#vf-btn-voltar').onclick = () => {
    clearInterval(estado.intervalo);
    container.querySelector('#vf-tela-nivel').style.display = '';
    container.querySelector('#vf-tela-jogo').style.display = 'none';
  };

  const btnV = container.querySelector('#vf-btn-v');
  const btnF = container.querySelector('#vf-btn-f');
  btnV.addEventListener('mouseenter', () => { if (!estado.respondeuAtual) btnV.style.transform = 'translateY(-2px)'; });
  btnV.addEventListener('mouseleave', () => { btnV.style.transform = ''; });
  btnF.addEventListener('mouseenter', () => { if (!estado.respondeuAtual) btnF.style.transform = 'translateY(-2px)'; });
  btnF.addEventListener('mouseleave', () => { btnF.style.transform = ''; });

  btnV.onclick = () => { if (!estado.respondeuAtual) responder(true, container); };
  btnF.onclick = () => { if (!estado.respondeuAtual) responder(false, container); };

  mostrarAfirmacao(container);
}

function mostrarAfirmacao(container) {
  if (estado.indice >= estado.afirmacoes.length) {
    // Completou todas — vitória!
    mostrarGameOver(container, true);
    return;
  }

  const af = estado.afirmacoes[estado.indice];
  const total = estado.afirmacoes.length;

  container.querySelector('#vf-numero').textContent = `${estado.indice + 1} / ${total}`;
  container.querySelector('#vf-afirmacao').textContent = af.texto;
  container.querySelector('#vf-feedback').style.display = 'none';
  container.querySelector('#vf-vidas').textContent = '❤️'.repeat(estado.vidas) + '🖤'.repeat(3 - estado.vidas);
  container.querySelector('#vf-streak').textContent = estado.streak >= 2 ? `🔥 ${estado.streak}x` : '';
  container.querySelector('#vf-pontos').textContent = `⭐ ${estado.pontos}`;

  estado.respondeuAtual = false;
  estado.tempoRestante = estado.nivel.tempo;
  atualizarTimerBarra(container);

  // Inicia timer
  clearInterval(estado.intervalo);
  estado.intervalo = setInterval(() => {
    estado.tempoRestante--;
    atualizarTimerBarra(container);
    if (estado.tempoRestante <= 0) {
      clearInterval(estado.intervalo);
      if (!estado.respondeuAtual) {
        // Tempo esgotado = erro
        responder(null, container);
      }
    }
  }, 1000);
}

function atualizarTimerBarra(container) {
  const t = estado.tempoRestante;
  const pct = (t / estado.nivel.tempo) * 100;
  container.querySelector('#vf-timer').textContent = t;
  container.querySelector('#vf-timer').style.color = t <= 3 ? 'var(--danger)' : 'var(--primary)';
  const barra = container.querySelector('#vf-timer-barra');
  barra.style.width = `${pct}%`;
  barra.style.background = t <= 3 ? 'var(--danger)' : t <= 5 ? 'var(--warning)' : 'var(--primary)';
}

function responder(resposta, container) {
  clearInterval(estado.intervalo);
  estado.respondeuAtual = true;

  const af = estado.afirmacoes[estado.indice];
  const correta = resposta === af.v;
  const timeout = resposta === null;

  const fb = container.querySelector('#vf-feedback');
  fb.style.display = '';

  if (correta) {
    estado.streak++;
    estado.maxStreak = Math.max(estado.maxStreak, estado.streak);
    const bonus = Math.min(estado.streak - 1, 5) * 2;
    estado.pontos += 10 + bonus;
    estado.acertos++;
    fb.style.cssText = 'display:block; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; background:#22c55e18; border:1px solid #22c55e44; color:#4ade80; font-size:0.9rem; text-align:center;';
    fb.innerHTML = `✅ Correto!${bonus > 0 ? ` +${bonus} bônus 🔥` : ''}`;
  } else {
    estado.streak = 0;
    estado.vidas--;
    fb.style.cssText = 'display:block; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; background:rgba(248,113,113,0.08); border:1px solid rgba(248,113,113,0.3); color:var(--danger); font-size:0.9rem; text-align:center;';
    fb.textContent = timeout
      ? `⏰ Tempo esgotado! Era ${af.v ? 'VERDADEIRO' : 'FALSO'}.`
      : `❌ Errado! Era ${af.v ? 'VERDADEIRO' : 'FALSO'}.`;
  }

  container.querySelector('#vf-vidas').textContent = '❤️'.repeat(estado.vidas) + '🖤'.repeat(3 - estado.vidas);
  container.querySelector('#vf-streak').textContent = estado.streak >= 2 ? `🔥 ${estado.streak}x` : '';
  container.querySelector('#vf-pontos').textContent = `⭐ ${estado.pontos}`;

  if (estado.vidas <= 0) {
    setTimeout(() => mostrarGameOver(container, false), 700);
    return;
  }

  setTimeout(() => {
    estado.indice++;
    mostrarAfirmacao(container);
  }, correta ? 600 : 1000);
}

function mostrarGameOver(container, vitoria) {
  clearInterval(estado.intervalo);
  container.querySelector('#vf-tela-jogo').style.display = 'none';
  const telaGO = container.querySelector('#vf-tela-gameover');
  telaGO.style.display = '';

  if (vitoria) {
    telaGO.querySelector('div').textContent = '🏆';
    telaGO.querySelector('h2').style.color = 'var(--primary)';
    telaGO.querySelector('h2').textContent = 'Completou!';
  }

  container.querySelector('#vf-go-msg').textContent = vitoria
    ? `Você respondeu todas as ${estado.afirmacoes.length} afirmações!`
    : `Você chegou na questão ${estado.indice + 1} de ${estado.afirmacoes.length}.`;

  container.querySelector('#vf-go-pontos').textContent  = estado.pontos;
  container.querySelector('#vf-go-acertos').textContent = estado.acertos;
  container.querySelector('#vf-go-streak').textContent  = estado.maxStreak;

  container.querySelector('#vf-btn-repetir').onclick = () => iniciarJogo(estado.nivel, container);
  container.querySelector('#vf-btn-outros').onclick = () => {
    telaGO.style.display = 'none';
    container.querySelector('#vf-tela-nivel').style.display = '';
  };
}
