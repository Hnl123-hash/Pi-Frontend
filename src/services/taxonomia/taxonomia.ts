import type { ITaxonomia } from "./taxonomia.types";

export const buscaTaxonomia = async (qnt: number, paginaAtual: number) => {
  const url =
    "http://localhost:3000/taxonomia/dadosIniciais" +
    `?qnt=${qnt}&pagina=${paginaAtual}`;

  const response = await fetch(url, {
    method: "GET",
    headers: localStorage.getItem("token")
      ? { authorization: localStorage.getItem("token") as string }
      : undefined,
  });

  const retornoJson = await response.json();
  return {
    data: retornoJson.data,
    tamanhoTotal: retornoJson.total,
    status: response.status,
  };
};

export const buscaTaxonomiaPorNomeCientifico = async (
  qnt: number,
  paginaAtual: number,
  nomeCientifico: string
) => {
  const url =
    "http://localhost:3000/taxonomia/buscaTaxonomia" +
    `?qnt=${qnt}&pagina=${paginaAtual}&nomeCientifico=${encodeURIComponent(
      nomeCientifico
    )}`;

  const response = await fetch(url, {
    method: "GET",
    headers: localStorage.getItem("token")
      ? { authorization: localStorage.getItem("token") as string }
      : undefined,
  });

  const retornoJson = await response.json();
  return {
    data: retornoJson.data,
    tamanhoTotal: retornoJson.total,
    status: response.status,
  };
};

export const buscaTaxonomiaPorId = async (id: string): Promise<ITaxonomia> => {
  const url =
    "http://localhost:3000/taxonomia/buscaTaxonomiaPorId" + `?id=${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: localStorage.getItem("token")
      ? { authorization: localStorage.getItem("token") as string }
      : undefined,
  });

  const retornoJson = await response.json();
  return retornoJson;
};

export const atualizaTaxonomia = async (
  id: string,
  novaTaxonomia: ITaxonomia
): Promise<boolean> => {
  const url = "http://localhost:3000/taxonomia/atualizaTaxonomia" + `?id=${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")!,
    },
    body: JSON.stringify(novaTaxonomia),
  });

  if (response.status === 200) {
    return true;
  }
  return false;
};
