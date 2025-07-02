import type { INovoUsuario, IUsuarioSemSenha } from "./usuarios.type";

export const buscaUsuarios = async () => {
  const url = "http://localhost:3000/usuario/listaUsuarios";

  const response = await fetch(url, {
    method: "GET",
    headers: localStorage.getItem("token")
      ? { authorization: localStorage.getItem("token") as string }
      : undefined,
  });

  const retornoJson = (await response.json()) as IUsuarioSemSenha[];
  return retornoJson;
};

export const criaUsuario = async (body: INovoUsuario) => {
  const url = "http://localhost:3000/usuario/criaUsuario";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")!,
    },
    body: JSON.stringify(body),
  });

  if (response.status === 200) {
    return true;
  }
  return false;
};

export const deletaUsuario = async (id: string) => {
  const url = "http://localhost:3000/usuario/deletaUsuario" + `?id=${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")!,
    },
  });

  if (response.status === 200) {
    return true;
  }
  return false;
};

export const atualizaPermissoesUsuario = async (
  id: string,
  permissoes: string[]
) => {
  const url = "http://localhost:3000/usuario/atualizaPermissao" + `?id=${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")!,
    },
    body: JSON.stringify({
      permissoes,
    }),
  });

  if (response.status === 200) {
    return true;
  }
  return false;
};

export const adicionaSenhaNovoUsuario = async (
  email: string,
  senha: string
) => {
  const url = "http://localhost:3000/usuario/adicionaSenhaNovoUsuario";

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")!,
    },
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  if (response.status === 200) {
    return true;
  }
  return false;
};
