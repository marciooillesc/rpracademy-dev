/**
 * features/jogos/index.js
 */

import * as Memoria1Ano      from './memoria-1ano.js';
import * as Arrastar3Ano     from './arrastar-3ano.js';
import * as CacaPalavras     from './caca-palavras.js';
import * as DigitacaoJogo    from './digitacao-jogo.js';
import * as SequenciaLogica  from './sequencia-logica.js';
import * as QuizUnificado    from './quiz-unificado.js';
import * as ClickerJogo      from './clicker-jogo.js';
import * as PaintJogo        from './paint-jogo.js';

export const JOGOS = [
  {
    id: 'memoria-computador',
    nome: 'Memória — Computador',
    descricao: 'Encontre os pares de peças do computador',
    emoji: '💻',
    modulo: Memoria1Ano,
  },
  {
    id: 'arrastar-3ano',
    nome: 'Arrastar e Soltar',
    descricao: 'Classifique Software, Hardware e Internet',
    emoji: '🖱️',
    modulo: Arrastar3Ano,
  },
  {
    id: 'caca-palavras',
    nome: 'Caça-Palavras',
    descricao: '5 níveis do Infantil ao Expert',
    emoji: '🔤',
    modulo: CacaPalavras,
  },
  {
    id: 'digitacao',
    nome: 'Digitação',
    descricao: 'Teste sua velocidade no teclado',
    emoji: '⌨️',
    modulo: DigitacaoJogo,
  },
  {
    id: 'sequencia-logica',
    nome: 'Sequência Lógica',
    descricao: '4 níveis · Complete o padrão lógico',
    emoji: '🔢',
    modulo: SequenciaLogica,
  },
  {
    id: 'quiz',
    nome: 'Quiz',
    descricao: 'Perguntas e Verdadeiro ou Falso · vários temas',
    emoji: '🧠',
    modulo: QuizUnificado,
  },
  {
    id: 'clicker',
    nome: 'Clicker Veloz',
    descricao: 'Clique o máximo que puder no tempo!',
    emoji: '💥',
    modulo: ClickerJogo,
  },
  {
    id: 'paint',
    nome: 'Paint',
    descricao: 'Desenhe e pinte — Minecraft, Minnie, Sonic e mais',
    emoji: '🎨',
    modulo: PaintJogo,
  },
];

export function buscarJogo(id) {
  return JOGOS.find(j => j.id === id) ?? null;
}
