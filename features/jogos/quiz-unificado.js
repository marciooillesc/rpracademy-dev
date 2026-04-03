/**
 * features/jogos/quiz-unificado.js
 * Quiz unificado — múltipla escolha + Verdadeiro ou Falso
 * Importa questões dos módulos existentes.
 */


export const META = {
  id: 'quiz',
  nome: 'Quiz',
  descricao: 'Perguntas e Verdadeiro ou Falso · vários temas',
  emoji: '🧠',

const CAT_INFORMATICA = [
  {
    id: 'hardware', nome: 'Hardware', emoji: '🖥️',
    questoes: [
      { pergunta: 'Qual componente é o "cérebro" do computador?', opcoes: ['HD', 'RAM', 'CPU', 'GPU'], correta: 2 },
      { pergunta: 'O que significa a sigla RAM?', opcoes: ['Rede de Acesso Móvel', 'Memória de Acesso Aleatório', 'Registro de Armazenamento Múltiplo', 'Recurso de Alta Memória'], correta: 1 },
      { pergunta: 'Qual dispositivo armazena dados permanentemente sem energia?', opcoes: ['RAM', 'Cache', 'HD/SSD', 'Memória Virtual'], correta: 2 },
      { pergunta: 'A placa-mãe serve para:', opcoes: ['Armazenar arquivos', 'Conectar todos os componentes do PC', 'Processar gráficos', 'Fornecer energia'], correta: 1 },
      { pergunta: 'O que é um periférico de entrada?', opcoes: ['Monitor', 'Impressora', 'Teclado', 'Caixa de som'], correta: 2 },
      { pergunta: 'SSD é mais rápido que HD porque:', opcoes: ['Usa mais energia', 'Não tem partes mecânicas móveis', 'É maior', 'Conecta por Wi-Fi'], correta: 1 },
      { pergunta: 'Qual porta é mais comum em dispositivos modernos?', opcoes: ['PS/2', 'Paralela', 'Serial', 'USB'], correta: 3 },
      { pergunta: 'GPU é responsável principalmente por:', opcoes: ['Processar sons', 'Processar gráficos e imagens', 'Gerenciar a rede', 'Executar o SO'], correta: 1 },
    ],
  },
  {
    id: 'software', nome: 'Software', emoji: '💾',
    questoes: [
      { pergunta: 'Qual é a função do sistema operacional?', opcoes: ['Processar textos', 'Gerenciar hardware e software', 'Navegar na internet', 'Editar fotos'], correta: 1 },
      { pergunta: 'Qual desses é um sistema operacional?', opcoes: ['Word', 'Photoshop', 'Linux', 'Chrome'], correta: 2 },
      { pergunta: 'O que faz um antivírus?', opcoes: ['Acelera o PC', 'Detecta e remove programas maliciosos', 'Organiza arquivos', 'Conecta à internet'], correta: 1 },
      { pergunta: 'O que é um backup?', opcoes: ['Tipo de vírus', 'Cópia de segurança dos dados', 'Programa de compressão', 'Tipo de conexão'], correta: 1 },
      { pergunta: 'Um arquivo .zip é:', opcoes: ['Arquivo de vídeo', 'Arquivo compactado', 'Arquivo de sistema', 'Arquivo de imagem'], correta: 1 },
      { pergunta: 'O que é um bug?', opcoes: ['Atualização de software', 'Erro ou falha em um programa', 'Tipo de vírus', 'Extensão de arquivo'], correta: 1 },
      { pergunta: 'Qual ferramenta serve para criar planilhas?', opcoes: ['Word', 'Excel / Calc', 'PowerPoint', 'Notepad'], correta: 1 },
    ],
  },
  {
    id: 'internet', nome: 'Internet', emoji: '🌐',
    questoes: [
      { pergunta: 'O que significa HTTP?', opcoes: ['Hipertexto de Transferência de Protocolo', 'Protocolo de Transferência de Hipertexto', 'Rede de Alta Tecnologia', 'Protocolo de Rede Privada'], correta: 1 },
      { pergunta: 'O que é um navegador (browser)?', opcoes: ['Provedor de internet', 'Software para acessar páginas web', 'Tipo de servidor', 'Protocolo de rede'], correta: 1 },
      { pergunta: 'O HTTPS é mais seguro que HTTP porque:', opcoes: ['É mais rápido', 'Criptografa os dados transmitidos', 'Usa menos banda', 'Não precisa de senha'], correta: 1 },
      { pergunta: 'O que é phishing?', opcoes: ['Tipo de firewall', 'Golpe para roubar dados pessoais', 'Protocolo de rede', 'Software de segurança'], correta: 1 },
      { pergunta: 'Wi-Fi é:', opcoes: ['Um cabo de rede', 'Tecnologia de rede sem fio', 'Tipo de modem', 'Protocolo de segurança'], correta: 1 },
      { pergunta: 'Cloud (nuvem) significa armazenar dados:', opcoes: ['No próprio computador', 'Em servidores remotos via internet', 'Em pen drives', 'Em DVDs'], correta: 1 },
      { pergunta: 'O que faz um firewall?', opcoes: ['Aumenta a velocidade', 'Bloqueia acessos não autorizados à rede', 'Comprime arquivos', 'Acelera downloads'], correta: 1 },
    ],
  },
  {
    id: 'seguranca', nome: 'Segurança', emoji: '🔒',
    questoes: [
      { pergunta: 'Uma senha forte deve ter:', opcoes: ['Só letras minúsculas', 'Nome e data de nascimento', 'Letras, números e símbolos misturados', 'Menos de 6 caracteres'], correta: 2 },
      { pergunta: 'O que é autenticação de dois fatores?', opcoes: ['Duas senhas iguais', 'Segunda verificação além da senha', 'Dois antivírus', 'Login com dois usuários'], correta: 1 },
      { pergunta: 'Ransomware é um malware que:', opcoes: ['Exibe propagandas', 'Sequestra arquivos e pede resgate', 'Rouba contatos', 'Deixa o PC lento'], correta: 1 },
      { pergunta: 'Engenharia social é:', opcoes: ['Curso de tecnologia', 'Manipulação para obter informações', 'Software de segurança', 'Tipo de rede'], correta: 1 },
      { pergunta: 'O que é criptografia?', opcoes: ['Compressão de arquivos', 'Codificação de dados para proteger informações', 'Tipo de vírus', 'Formato de imagem'], correta: 1 },
      { pergunta: 'Atualizar o sistema operacional é importante porque:', opcoes: ['Deixa o PC mais bonito', 'Corrige falhas e vulnerabilidades', 'Aumenta o armazenamento', 'Muda a interface'], correta: 1 },
    ],
  },
];

// ── BANCO V ou F (do verdadeiro-falso original) ───────────────────────────────
const BANCO_VF = [
  { texto: 'O CPU é chamado de cérebro do computador.', correto: true },
  { texto: 'RAM significa "Memória de Acesso Aleatório".', correto: true },
  { texto: 'Um SSD possui partes mecânicas móveis.', correto: false },
  { texto: 'O teclado é um periférico de entrada.', correto: true },
  { texto: 'O monitor é um periférico de entrada.', correto: false },
  { texto: 'A placa-mãe conecta todos os componentes do PC.', correto: true },
  { texto: 'USB significa "Universal Serial Bus".', correto: true },
  { texto: 'Malware é um software que protege o computador.', correto: false },
  { texto: 'O sistema operacional gerencia o hardware e software.', correto: true },
  { texto: 'Phishing é uma técnica de ataque que rouba senhas.', correto: true },
  { texto: 'Wi-Fi e Bluetooth usam o mesmo protocolo.', correto: false },
  { texto: 'PDF significa "Portable Document Format".', correto: true },
  { texto: 'A RAM mantém os dados mesmo sem energia.', correto: false },
  { texto: 'HTTPS é mais seguro que HTTP.', correto: true },
  { texto: 'Um pixel é a menor unidade de uma imagem digital.', correto: true },
  { texto: 'O HD é mais rápido que o SSD.', correto: false },
  { texto: 'Firewall é um tipo de vírus de computador.', correto: false },
  { texto: 'O Windows é um sistema operacional.', correto: true },
  { texto: 'Backup significa cópia de segurança dos dados.', correto: true },
  { texto: 'A internet foi criada nos anos 1940.', correto: false },
];

function embaralhar(arr) {
  return [...arr].sort(() => Math.random() - .5);
}

// ── RENDER ────────────────────────────────────────────────────────────────────
export function render(container) {
  container.innerHTML = `
    <div class="quiz-uni" id="quiz-uni-root">
      <style>
        .quiz-uni { max-width:600px; margin:0 auto; padding:1.5rem 1rem; }
        .quiz-uni__header { text-align:center; margin-bottom:1.5rem; }
        .quiz-uni__titulo { font-family:var(--font-display); font-size:2rem; color:var(--primary); }
        .quiz-uni__modos { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1rem; }
        .quiz-uni__modo-btn {
          padding:1.5rem 1rem; border-radius:1rem; border:2px solid var(--border);
          background:var(--surface-2); cursor:pointer; text-align:center; transition:.2s;
          display:flex; flex-direction:column; gap:.4rem; align-items:center;
        }
        .quiz-uni__modo-btn:hover { border-color:var(--primary); transform:translateY(-2px); }
        .quiz-uni__modo-btn .modo-emoji { font-size:2.5rem; }
        .quiz-uni__modo-btn .modo-nome { font-family:var(--font-display); color:var(--text-1); font-size:1.1rem; }
        .quiz-uni__modo-btn .modo-desc { font-size:.8rem; color:var(--text-3); }

        /* Seletor de categoria */
        .quiz-cats { display:flex; flex-direction:column; gap:.75rem; }
        .quiz-cat-btn {
          padding:1rem 1.2rem; border-radius:.75rem; border:2px solid var(--border);
          background:var(--surface-2); cursor:pointer; display:flex; align-items:center;
          gap:.75rem; transition:.2s; text-align:left;
        }
        .quiz-cat-btn:hover { border-color:var(--primary); }
        .quiz-cat-btn .cat-emoji { font-size:1.5rem; }
        .quiz-cat-btn .cat-nome { font-family:var(--font-display); color:var(--text-1); }
        .quiz-cat-btn .cat-total { font-size:.8rem; color:var(--text-3); margin-left:auto; }

        /* Questão */
        .quiz-progresso { display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; }
        .quiz-progresso__barra { flex:1; height:8px; background:var(--surface-2); border-radius:999px; overflow:hidden; }
        .quiz-progresso__fill { height:100%; background:var(--primary); border-radius:999px; transition:width .3s; }
        .quiz-progresso__txt { font-size:.8rem; color:var(--text-3); white-space:nowrap; }
        .quiz-pontos { text-align:right; font-family:var(--font-display); color:var(--primary); font-size:1.1rem; margin-bottom:.5rem; }
        .quiz-enunciado {
          background:var(--surface-2); border:1px solid var(--border);
          border-radius:1rem; padding:1.25rem; margin-bottom:1rem;
          font-size:1rem; line-height:1.6; color:var(--text-1);
        }
        .quiz-opcoes { display:flex; flex-direction:column; gap:.6rem; }
        .quiz-opcao {
          padding:.9rem 1rem; border-radius:.75rem; border:2px solid var(--border);
          background:var(--surface-2); cursor:pointer; text-align:left;
          transition:.15s; font-size:.95rem; color:var(--text-1);
          display:flex; gap:.6rem; align-items:center;
        }
        .quiz-opcao:hover:not(:disabled) { border-color:var(--primary); background:rgba(56,189,248,.08); }
        .quiz-opcao.correta { border-color:#22c55e !important; background:rgba(34,197,94,.15) !important; }
        .quiz-opcao.errada  { border-color:#ef4444 !important; background:rgba(239,68,68,.12) !important; }
        .quiz-opcao .opcao-letra { font-weight:700; color:var(--primary); min-width:1.2rem; }

        /* V ou F */
        .quiz-vf-bts { display:flex; gap:1rem; margin-top:1rem; }
        .quiz-vf-btn {
          flex:1; padding:1.2rem; border-radius:1rem; border:none; cursor:pointer;
          font-size:1.1rem; font-weight:700; transition:.15s;
        }
        .quiz-vf-btn.v { background:rgba(34,197,94,.2); color:#22c55e; border:2px solid #22c55e; }
        .quiz-vf-btn.f { background:rgba(239,68,68,.15); color:#ef4444; border:2px solid #ef4444; }
        .quiz-vf-btn:disabled { opacity:.5; cursor:not-allowed; }

        /* Feedback */
        .quiz-feedback {
          padding:.6rem 1rem; border-radius:.5rem; margin-top:.75rem;
          font-weight:600; font-size:.9rem; text-align:center; min-height:2rem;
        }
        .quiz-feedback.certo { background:rgba(34,197,94,.15); color:#22c55e; }
        .quiz-feedback.errado { background:rgba(239,68,68,.12); color:#ef4444; }

        /* Resultado */
        .quiz-resultado { text-align:center; padding:1.5rem; }
        .quiz-resultado__nota { font-family:var(--font-display); font-size:4rem; color:var(--primary); font-weight:900; }
        .quiz-resultado__msg { font-size:1.1rem; color:var(--text-2); margin:.5rem 0 1.5rem; }
        .quiz-resultado__stats { display:flex; justify-content:center; gap:2rem; margin-bottom:1.5rem; }
        .quiz-resultado__stat { text-align:center; }
        .quiz-resultado__stat-num { font-family:var(--font-display); font-size:1.8rem; color:var(--primary); }
        .quiz-resultado__stat-label { font-size:.75rem; color:var(--text-3); }
        .btn-voltar-quiz {
          padding:.6rem 1.5rem; border-radius:999px; border:1px solid var(--border);
          background:transparent; color:var(--text-2); cursor:pointer; font-size:.9rem; margin-right:.5rem;
        }
        .btn-reiniciar-quiz {
          padding:.6rem 1.5rem; border-radius:999px; border:none;
          background:var(--primary); color:#000; font-weight:700; cursor:pointer; font-size:.9rem;
        }
      </style>

      <!-- TELA INICIAL -->
      <div id="tela-inicio">
        <div class="quiz-uni__header">
          <div class="quiz-uni__titulo">🧠 Quiz</div>
          <p style="color:var(--text-3);font-size:.9rem;margin-top:.25rem">Escolha o modo de jogo</p>
        </div>
        <div class="quiz-uni__modos">
          <button class="quiz-uni__modo-btn" id="modo-mc">
            <span class="modo-emoji">❓</span>
            <span class="modo-nome">Múltipla escolha</span>
            <span class="modo-desc">Escolha a resposta certa</span>
          </button>
          <button class="quiz-uni__modo-btn" id="modo-vf">
            <span class="modo-emoji">✅</span>
            <span class="modo-nome">Verdadeiro ou Falso</span>
            <span class="modo-desc">Afirmação certa ou errada?</span>
          </button>
        </div>
      </div>

      <!-- TELA CATEGORIAS (só múltipla escolha) -->
      <div id="tela-cats" style="display:none">
        <button class="btn-voltar-quiz" id="btn-voltar-cats" style="margin-bottom:1rem">← Voltar</button>
        <p style="color:var(--text-2);margin-bottom:.75rem;font-size:.9rem">Escolha a categoria:</p>
        <div class="quiz-cats" id="lista-cats"></div>
      </div>

      <!-- TELA QUESTÃO -->
      <div id="tela-questao" style="display:none">
        <div class="quiz-progresso">
          <div class="quiz-progresso__barra"><div class="quiz-progresso__fill" id="q-progresso-fill"></div></div>
          <span class="quiz-progresso__txt" id="q-progresso-txt"></span>
        </div>
        <div class="quiz-pontos">⭐ <span id="q-pontos">0</span></div>
        <div class="quiz-enunciado" id="q-enunciado"></div>
        <div id="q-opcoes"></div>
        <div class="quiz-feedback" id="q-feedback" style="display:none"></div>
      </div>

      <!-- TELA RESULTADO -->
      <div id="tela-resultado" style="display:none"></div>
    </div>
  `;
}

// ── INIT ──────────────────────────────────────────────────────────────────────
export function init(container) {
  let modo = null;
  let questoes = [];
  let indice = 0;
  let pontos = 0;
  let acertos = 0;
  let respondendo = false;

  const telaInicio    = container.querySelector('#tela-inicio');
  const telaCats      = container.querySelector('#tela-cats');
  const telaQuestao   = container.querySelector('#tela-questao');
  const telaResultado = container.querySelector('#tela-resultado');

  // Modo múltipla escolha
  container.querySelector('#modo-mc').addEventListener('click', () => {
    modo = 'mc';
    telaInicio.style.display = 'none';
    telaCats.style.display = '';
    renderCategorias();
  });

  // Modo V ou F
  container.querySelector('#modo-vf').addEventListener('click', () => {
    modo = 'vf';
    telaInicio.style.display = 'none';
    iniciarVF();
  });

  container.querySelector('#btn-voltar-cats').addEventListener('click', () => {
    telaCats.style.display = 'none';
    telaInicio.style.display = '';
  });

  function renderCategorias() {
    const lista = container.querySelector('#lista-cats');
    // Todas as categorias do quiz-informatica
    lista.innerHTML = CAT_INFORMATICA.map(cat => `
      <button class="quiz-cat-btn" data-catid="${cat.id}">
        <span class="cat-emoji">${cat.emoji}</span>
        <span class="cat-nome">${cat.nome}</span>
        <span class="cat-total">${cat.questoes.length} questões</span>
      </button>
    `).join('') + `
      <button class="quiz-cat-btn" data-catid="todas">
        <span class="cat-emoji">🎲</span>
        <span class="cat-nome">Todas as categorias</span>
        <span class="cat-total">${CAT_INFORMATICA.reduce((a,c)=>a+c.questoes.length,0)} questões</span>
      </button>
    `;
    lista.querySelectorAll('.quiz-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.catid;
        let banco = [];
        if (id === 'todas') {
          CAT_INFORMATICA.forEach(c => banco.push(...c.questoes.map(q => ({...q, tipo:'mc'}))));
        } else {
          const cat = CAT_INFORMATICA.find(c => c.id === id);
          banco = cat.questoes.map(q => ({...q, tipo:'mc'}));
        }
        questoes = embaralhar(banco).slice(0, 10);
        telaCats.style.display = 'none';
        iniciarRodada();
      });
    });
  }

  function iniciarVF() {
    questoes = embaralhar(BANCO_VF).slice(0, 15).map(q => ({...q, tipo:'vf'}));
    iniciarRodada();
  }

  function iniciarRodada() {
    indice = 0; pontos = 0; acertos = 0;
    telaQuestao.style.display = '';
    mostrarQuestao();
  }

  function mostrarQuestao() {
    respondendo = false;
    const q = questoes[indice];
    const total = questoes.length;

    container.querySelector('#q-progresso-fill').style.width = (indice / total * 100) + '%';
    container.querySelector('#q-progresso-txt').textContent = `${indice + 1}/${total}`;
    container.querySelector('#q-pontos').textContent = pontos;
    container.querySelector('#q-feedback').style.display = 'none';

    const enunciado = container.querySelector('#q-enunciado');
    const opcoes    = container.querySelector('#q-opcoes');

    if (q.tipo === 'mc') {
      enunciado.textContent = q.pergunta;
      const letras = ['A','B','C','D'];
      opcoes.innerHTML = `<div class="quiz-opcoes">` +
        q.opcoes.map((op, i) => `
          <button class="quiz-opcao" data-idx="${i}">
            <span class="opcao-letra">${letras[i]}</span> ${op}
          </button>
        `).join('') + `</div>`;
      opcoes.querySelectorAll('.quiz-opcao').forEach(btn => {
        btn.addEventListener('click', () => responderMC(parseInt(btn.dataset.idx), q.correta));
      });
    } else {
      enunciado.textContent = q.texto;
      opcoes.innerHTML = `
        <div class="quiz-vf-bts">
          <button class="quiz-vf-btn v" data-resp="true">✅ Verdadeiro</button>
          <button class="quiz-vf-btn f" data-resp="false">❌ Falso</button>
        </div>`;
      opcoes.querySelectorAll('.quiz-vf-btn').forEach(btn => {
        btn.addEventListener('click', () => responderVF(btn.dataset.resp === 'true', q.correto));
      });
    }
  }

  function responderMC(escolha, correta) {
    if (respondendo) return;
    respondendo = true;
    const btns = container.querySelectorAll('.quiz-opcao');
    btns.forEach(b => b.disabled = true);
    const acertou = escolha === correta;
    btns[escolha].classList.add(acertou ? 'correta' : 'errada');
    if (!acertou) btns[correta].classList.add('correta');
    darFeedback(acertou);
  }

  function responderVF(escolha, correta) {
    if (respondendo) return;
    respondendo = true;
    container.querySelectorAll('.quiz-vf-btn').forEach(b => b.disabled = true);
    darFeedback(escolha === correta);
  }

  function darFeedback(acertou) {
    if (acertou) { pontos += 10; acertos++; }
    const el = container.querySelector('#q-feedback');
    el.className = 'quiz-feedback ' + (acertou ? 'certo' : 'errado');
    el.textContent = acertou ? '✅ Correto! +10 pontos' : '❌ Errado!';
    el.style.display = '';
    setTimeout(() => {
      indice++;
      if (indice < questoes.length) mostrarQuestao();
      else mostrarResultado();
    }, 1200);
  }

  function mostrarResultado() {
    telaQuestao.style.display = 'none';
    telaResultado.style.display = '';
    const pct = Math.round(acertos / questoes.length * 100);
    const msg = pct >= 90 ? '🔥 Incrível!' : pct >= 70 ? '👏 Muito bom!' : pct >= 50 ? '👍 Bom trabalho!' : '📚 Continue praticando!';
    telaResultado.innerHTML = `
      <div class="quiz-resultado">
        <div class="quiz-resultado__nota">${pct}%</div>
        <div class="quiz-resultado__msg">${msg}</div>
        <div class="quiz-resultado__stats">
          <div class="quiz-resultado__stat">
            <div class="quiz-resultado__stat-num">${acertos}</div>
            <div class="quiz-resultado__stat-label">Acertos</div>
          </div>
          <div class="quiz-resultado__stat">
            <div class="quiz-resultado__stat-num">${questoes.length - acertos}</div>
            <div class="quiz-resultado__stat-label">Erros</div>
          </div>
          <div class="quiz-resultado__stat">
            <div class="quiz-resultado__stat-num">${pontos}</div>
            <div class="quiz-resultado__stat-label">Pontos</div>
          </div>
        </div>
        <button class="btn-voltar-quiz" id="btn-res-inicio">🏠 Menu</button>
        <button class="btn-reiniciar-quiz" id="btn-res-reiniciar">🔄 Jogar de novo</button>
      </div>
    `;
    container.querySelector('#btn-res-inicio').addEventListener('click', () => {
      telaResultado.style.display = 'none';
      telaInicio.style.display = '';
    });
    container.querySelector('#btn-res-reiniciar').addEventListener('click', () => {
      telaResultado.style.display = 'none';
      if (modo === 'vf') iniciarVF();
      else { telaCats.style.display = ''; renderCategorias(); }
    });
  }
}
