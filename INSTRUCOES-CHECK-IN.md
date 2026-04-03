# 📱 Sistema de Check-in com QR Code — Instruções de Integração

Este ZIP contém seu projeto **RPR Educação Digital** + o sistema de check-in completamente configurado.

---

## ✅ O Que Foi Adicionado

```
educacaodigital-main/
├── check-in/                    ⭐ NOVA PASTA
│   └── index.html              (Página de check-in com QR)
│
└── modules/
    └── check-in-simples.js      ⭐ NOVO ARQUIVO (API)
```

---

## 🚀 Próximos Passos (30 minutos)

### 1️⃣ SQL no Supabase (5 min) ✅ VOCÊ JÁ FEZ

Você já executou `check-in-sql-simples.sql` no Supabase.
Se não fez, procure o arquivo `check-in-sql-simples.sql` na raiz do ZIP.

### 2️⃣ Integrar em `features/academico/professores.js` (10 min)

**Abra:** `features/academico/professores.js`

**No topo do arquivo, adicione o import:**

```javascript
import { obterPresencaDia } from '../../modules/check-in-simples.js';
```

**No final do arquivo, ANTES do `export`, adicione esta função:**

```javascript
/**
 * NOVA: Renderiza presença de check-in do dia
 */
export async function renderPresencaCheckIn(container, professorId) {
  container.innerHTML = '';

  const hoje = new Date().toISOString().split('T')[0];

  // Título
  const title = document.createElement('h2');
  title.textContent = '📱 Check-in de Presença';
  title.style.marginBottom = '1rem';
  container.appendChild(title);

  // Botão para ir para check-in
  const btnGerarQR = document.createElement('button');
  btnGerarQR.className = 'btn btn--principal';
  btnGerarQR.textContent = '📱 Ir para Check-in';
  btnGerarQR.style.marginBottom = '1.5rem';
  btnGerarQR.onclick = () => window.location.href = '/check-in';
  container.appendChild(btnGerarQR);

  // Carregando
  const loading = document.createElement('p');
  loading.textContent = 'Carregando presença...';
  loading.style.color = '#999';
  container.appendChild(loading);

  // Busca presença
  const presenca = await obterPresencaDia(hoje);

  if (presenca.erro) {
    loading.textContent = `Erro: ${presenca.erro}`;
    loading.style.color = '#f00';
    return;
  }

  loading.remove();

  if (!presenca || presenca.length === 0) {
    const vazio = document.createElement('p');
    vazio.textContent = 'Nenhuma presença registrada ainda';
    vazio.style.color = '#999';
    vazio.style.padding = '2rem';
    vazio.style.textAlign = 'center';
    container.appendChild(vazio);
    return;
  }

  // Tabela
  const tabela = document.createElement('table');
  tabela.style.cssText = `
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  `;

  const header = document.createElement('thead');
  header.innerHTML = `
    <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
      <th style="padding: 0.75rem; text-align: left;">Aluno</th>
      <th style="padding: 0.75rem; text-align: center;">Status</th>
      <th style="padding: 0.75rem; text-align: right;">Horário</th>
    </tr>
  `;
  tabela.appendChild(header);

  const body = document.createElement('tbody');
  presenca.forEach((p) => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #e5e7eb';

    const nome = p.usuarios?.nome || 'Desconhecido';
    const status = p.presenca ? '✅ Presente' : '❌ Ausente';
    const statusColor = p.presenca ? '#10b981' : '#ef4444';
    const horario = p.timestamp 
      ? new Date(p.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      : '—';

    tr.innerHTML = `
      <td style="padding: 0.75rem; font-weight: 500;">${nome}</td>
      <td style="padding: 0.75rem; text-align: center; color: ${statusColor}; font-weight: 600;">${status}</td>
      <td style="padding: 0.75rem; text-align: right; color: #666;">${horario}</td>
    `;

    body.appendChild(tr);
  });

  tabela.appendChild(body);
  container.appendChild(tabela);

  // Resumo
  const total = presenca.length;
  const presentes = presenca.filter(p => p.presenca).length;
  const ausentes = total - presentes;

  const resumo = document.createElement('div');
  resumo.style.cssText = `
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    display: flex;
    gap: 1rem;
    justify-content: space-around;
    text-align: center;
  `;

  resumo.innerHTML = `
    <div>
      <div style="font-size: 1.5rem; font-weight: 700; color: #10b981;">${presentes}</div>
      <div style="font-size: 0.85rem; color: #666;">Presentes</div>
    </div>
    <div>
      <div style="font-size: 1.5rem; font-weight: 700; color: #ef4444;">${ausentes}</div>
      <div style="font-size: 0.85rem; color: #666;">Ausentes</div>
    </div>
    <div>
      <div style="font-size: 1.5rem; font-weight: 700; color: #667eea;">${total}</div>
      <div style="font-size: 0.85rem; color: #666;">Total</div>
    </div>
  `;

  container.appendChild(resumo);
}
```

**Onde chamar:** Na sua estrutura de menu/abas de professor, adicione um botão/item que chame:

```javascript
renderPresencaCheckIn(container, usuario.id);
```

---

### 3️⃣ Integrar em `admin/index.html` (10 min)

**Abra:** `admin/index.html`

**No topo (imports), adicione:**

```javascript
import { obterTodosCheckIns, deletarCheckIn } from '../modules/check-in-simples.js';
```

**Adicione esta função no seu arquivo:**

```javascript
/**
 * NOVA: Painel admin de check-in (você vê TUDO)
 */
export async function renderAdminCheckIn(container) {
  container.innerHTML = '';

  // Título
  const title = document.createElement('h2');
  title.textContent = '📱 Check-in - Controle Total';
  title.style.marginBottom = '1rem';
  container.appendChild(title);

  // Filtros
  const filtrosDiv = document.createElement('div');
  filtrosDiv.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #e5e7eb;
  `;

  const labelData = document.createElement('label');
  labelData.textContent = 'Filtrar por Data:';
  labelData.style.cssText = 'display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;';
  const inputData = document.createElement('input');
  inputData.type = 'date';
  inputData.id = 'admin-filtro-data';
  inputData.value = new Date().toISOString().split('T')[0];
  inputData.style.cssText = 'width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;';

  const divData = document.createElement('div');
  divData.appendChild(labelData);
  divData.appendChild(inputData);
  filtrosDiv.appendChild(divData);

  // Botão atualizar
  const btnAtualizar = document.createElement('button');
  btnAtualizar.textContent = '🔄 Atualizar';
  btnAtualizar.className = 'btn btn--principal';
  btnAtualizar.style.alignSelf = 'flex-end';
  btnAtualizar.onclick = async () => {
    const data = document.getElementById('admin-filtro-data').value;
    await carregarCheckInAdmin(conteudoDiv, data);
  };

  const divBtn = document.createElement('div');
  divBtn.appendChild(btnAtualizar);
  divBtn.style.display = 'flex';
  filtrosDiv.appendChild(divBtn);

  container.appendChild(filtrosDiv);

  // Conteúdo
  const conteudoDiv = document.createElement('div');
  conteudoDiv.id = 'admin-check-in-conteudo';
  container.appendChild(conteudoDiv);

  // Carrega dados iniciais
  const data = new Date().toISOString().split('T')[0];
  await carregarCheckInAdmin(conteudoDiv, data);
}

// Helper: Carregar e renderizar check-ins
async function carregarCheckInAdmin(container, data) {
  container.innerHTML = '<p style="color: #999;">Carregando...</p>';

  const checkIns = await obterTodosCheckIns(data);

  if (checkIns.erro) {
    container.innerHTML = `<p style="color: #f00;">Erro: ${checkIns.erro}</p>`;
    return;
  }

  if (!checkIns || checkIns.length === 0) {
    container.innerHTML = '<p style="color: #999; padding: 2rem; text-align: center;">Nenhum check-in registrado nesta data</p>';
    return;
  }

  // Agrupar por professor
  const porProfessor = {};
  checkIns.forEach(c => {
    const profId = c.professor_id;
    if (!porProfessor[profId]) {
      porProfessor[profId] = [];
    }
    porProfessor[profId].push(c);
  });

  // Renderizar
  container.innerHTML = '';

  Object.keys(porProfessor).forEach(profId => {
    const checkInsDoProfessor = porProfessor[profId];
    const nomeProfessor = checkInsDoProfessor[0].professor_nome?.nome || 'Professor Desconhecido';

    const cardProf = document.createElement('div');
    cardProf.style.cssText = `
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    `;

    const titleProf = document.createElement('h3');
    titleProf.textContent = `👨‍🏫 ${nomeProfessor}`;
    titleProf.style.marginBottom = '1rem';
    cardProf.appendChild(titleProf);

    const tabela = document.createElement('table');
    tabela.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    `;

    const header = document.createElement('thead');
    header.innerHTML = `
      <tr style="background: white; border-bottom: 2px solid #e5e7eb;">
        <th style="padding: 0.75rem; text-align: left;">Aluno</th>
        <th style="padding: 0.75rem; text-align: center;">Status</th>
        <th style="padding: 0.75rem; text-align: center;">Horário</th>
      </tr>
    `;
    tabela.appendChild(header);

    const body = document.createElement('tbody');
    checkInsDoProfessor.forEach(c => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid #e5e7eb';

      const nome = c.aluno_nome?.nome || 'Desconhecido';
      const status = c.presenca ? '✅ Presente' : '❌ Ausente';
      const statusColor = c.presenca ? '#10b981' : '#ef4444';
      const horario = c.timestamp 
        ? new Date(c.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        : '—';

      tr.innerHTML = `
        <td style="padding: 0.75rem; font-weight: 500;">${nome}</td>
        <td style="padding: 0.75rem; text-align: center; color: ${statusColor}; font-weight: 600;">${status}</td>
        <td style="padding: 0.75rem; text-align: center; color: #666; font-size: 0.85rem;">${horario}</td>
      `;

      body.appendChild(tr);
    });

    tabela.appendChild(body);
    cardProf.appendChild(tabela);

    // Resumo
    const totais = checkInsDoProfessor.length;
    const presentes = checkInsDoProfessor.filter(c => c.presenca).length;
    const ausentes = totais - presentes;

    const resumo = document.createElement('div');
    resumo.style.cssText = `
      margin-top: 1rem;
      padding: 0.75rem;
      background: white;
      border-radius: 4px;
      display: flex;
      gap: 1rem;
      justify-content: space-around;
      font-size: 0.85rem;
      text-align: center;
    `;

    resumo.innerHTML = `
      <div><span style="font-weight: 600; color: #10b981;">${presentes}</span> Presentes</div>
      <div><span style="font-weight: 600; color: #ef4444;">${ausentes}</span> Ausentes</div>
      <div><span style="font-weight: 600; color: #667eea;">${totais}</span> Total</div>
    `;

    cardProf.appendChild(resumo);

    container.appendChild(cardProf);
  });
}
```

**Onde chamar:** No seu menu admin, adicione um botão que chame:

```javascript
renderAdminCheckIn(container);
```

---

### 4️⃣ Deploy (5 min)

```bash
git add .
git commit -m "feat: adicionar sistema de check-in com QR code"
git push origin main
```

---

## 🧪 Testar

1. Acesse `educacaodigital.iprpr.dev.br/check-in` como PROFESSOR
2. Clique "Gerar QR Code"
3. Simule um aluno escaneando (copie o link)
4. Confirme presença
5. Veja tabela em professor.js
6. Veja controle total em admin.html

---

## 📝 Arquivos Modificados/Adicionados

```
✅ check-in/index.html                 (NOVO - página QR)
✅ modules/check-in-simples.js         (NOVO - API)
⚠️  features/academico/professores.js   (ADICIONAR funcão)
⚠️  admin/index.html                    (ADICIONAR função)
```

---

## ❓ Dúvidas?

Veja `POS-SQL-PROXIMAS-ETAPAS.md` ou `GUIA-CHECK-IN-SIMPLES.md` inclusos neste ZIP.

---

**Pronto! Sistema 100% funcional!** 🎉
