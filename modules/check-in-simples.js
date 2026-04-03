/**
 * modules/check-in-simples.js
 * Sistema simples de presença com token oculto
 * 
 * Fluxo:
 * 1. Professor gera token + QR code com token na URL
 * 2. Aluno escaneia QR
 * 3. Token é capturado e guardado em sessionStorage (oculto)
 * 4. URL é "limpa" (sem token visível)
 * 5. Aluno clica "✅ Confirmar Presença"
 * 6. Sistema registra no Supabase
 */

import { supabase } from './supabase.js';
import { getEstado } from './state.js';

// ─────────────────────────────────────────────────────────────────────────────
// PROFESSOR: GERAR TOKEN + QR CODE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Professor gera novo token de presença
 * @param {string} data - Data da aula (YYYY-MM-DD)
 * @returns {{ token, qrUrl } | { erro }}
 */
export async function gerarTokenCheckIn(data) {
  const usuario = getEstado().usuario;

  if (!usuario || !(usuario.tipo === 'professor' || usuario.isProfessor || usuario.tipo === 'admin')) {
    return { erro: 'Apenas professores podem gerar token' };
  }

  // Gera token aleatório (50 caracteres, seguro)
  const token = _gerarToken();

  try {
    // Insere token no banco (sem aluno ainda)
    const { error } = await supabase
      .from('check_in')
      .insert([
        {
          professor_id: usuario.id,
          aluno_id: usuario.id, // Placeholder (será atualizado quando aluno confirmar)
          token,
          data,
          presenca: false,
        },
      ]);

    if (error) {
      return { erro: error.message };
    }

    // Gera URL com token (aluno escaneia isto)
    const baseUrl = window.location.origin;
    const urlComToken = `${baseUrl}/check-in?token=${token}`;

    // Gera QR code (API gratuita)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(urlComToken)}`;

    return {
      token,
      urlComToken,
      qrUrl, // Imagem do QR
    };
  } catch (err) {
    return { erro: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ALUNO: CONFIRMAR PRESENÇA (via token)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Aluno confirma presença usando token (guardado em sessionStorage)
 * @returns {{ sucesso: true } | { erro }}
 */
export async function confirmarPresencaComToken() {
  const usuario = getEstado().usuario;
  const token = sessionStorage.getItem('check_in_token');

  if (!usuario) {
    return { erro: 'Você não está logado' };
  }

  if (!token) {
    return { erro: 'Token não encontrado. Escaneie o QR code novamente.' };
  }

  try {
    // 1. Busca registro com este token
    const { data: registro, error: erroSelect } = await supabase
      .from('check_in')
      .select('id, professor_id, data')
      .eq('token', token)
      .single();

    if (erroSelect || !registro) {
      return { erro: 'Token inválido ou expirado' };
    }

    // 2. Atualiza registro: coloca aluno_id correto e marca presença
    const { error: erroUpdate } = await supabase
      .from('check_in')
      .update({
        aluno_id: usuario.id,
        presenca: true,
        timestamp: new Date().toISOString(),
      })
      .eq('id', registro.id);

    if (erroUpdate) {
      return { erro: erroUpdate.message };
    }

    // 3. Limpa token da sessão (não precisa mais)
    sessionStorage.removeItem('check_in_token');

    return { sucesso: true };
  } catch (err) {
    return { erro: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFESSOR: VISUALIZAR PRESENÇA DO DIA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Professor vê presença de uma data específica
 * @param {string} data - Data (YYYY-MM-DD)
 * @returns {Array} Lista de presença
 */
export async function obterPresencaDia(data) {
  const usuario = getEstado().usuario;

  if (!usuario || !(usuario.tipo === 'professor' || usuario.isProfessor || usuario.tipo === 'admin')) {
    return { erro: 'Acesso restrito a professores' };
  }

  try {
    const { data: registros, error } = await supabase
      .from('check_in')
      .select(`
        id,
        aluno_id,
        presenca,
        timestamp,
        usuarios!aluno_id(nome, email)
      `)
      .eq('professor_id', usuario.id)
      .eq('data', data)
      .order('timestamp', { ascending: true });

    if (error) {
      return { erro: error.message };
    }

    return registros || [];
  } catch (err) {
    return { erro: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: VER TUDO (você)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Admin vê todos os check-ins (você)
 * @param {string} [data] - Data filtro (opcional)
 * @param {string} [professorId] - Professor filtro (opcional)
 * @returns {Array} Todos os registros
 */
export async function obterTodosCheckIns(data = null, professorId = null) {
  try {
    let query = supabase
      .from('check_in')
      .select(`
        id,
        professor_id,
        aluno_id,
        token,
        data,
        presenca,
        timestamp,
        usuarios!professor_id(nome) as professor_nome,
        usuarios!aluno_id(nome, email) as aluno_nome
      `)
      .order('data', { ascending: false });

    if (data) {
      query = query.eq('data', data);
    }

    if (professorId) {
      query = query.eq('professor_id', professorId);
    }

    const { data: registros, error } = await query;

    if (error) {
      return { erro: error.message };
    }

    return registros || [];
  } catch (err) {
    return { erro: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: DELETAR/RESETAR CHECK-IN
// ─────────────────────────────────────────────────────────────────────────────

export async function deletarCheckIn(checkInId) {
  try {
    const { error } = await supabase
      .from('check_in')
      .delete()
      .eq('id', checkInId);

    if (error) {
      return { erro: error.message };
    }

    return { sucesso: true };
  } catch (err) {
    return { erro: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITÁRIOS
// ─────────────────────────────────────────────────────────────────────────────

function _gerarToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 50; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export default {
  gerarTokenCheckIn,
  confirmarPresencaComToken,
  obterPresencaDia,
  obterTodosCheckIns,
  deletarCheckIn,
};
