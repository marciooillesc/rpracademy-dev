
import { supabase } from "./supabase.js";

export async function login(email, senha){
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if(error){
    alert("Erro no login");
    return null;
  }

  const perfil = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if(perfil.data.status !== "aprovado"){
    alert("Aguardando aprovação");
    return null;
  }

  return perfil.data;
}
