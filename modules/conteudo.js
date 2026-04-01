
import { supabase } from "./supabase.js";

export async function salvarConteudo(dados){
  const { error } = await supabase.from("conteudos").insert([dados]);
  if(error){
    console.error(error);
    alert("Erro ao salvar");
  } else {
    alert("Salvo com sucesso");
  }
}
