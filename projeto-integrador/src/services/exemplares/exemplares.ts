import type {
  ExemplarEntity,
  RetornoBuscaExemplares,
} from "./exemplares.types";

export const buscaExemplares = async (
  qntPagina: number,
  pagina: number
): Promise<RetornoBuscaExemplares> => {
  const url = `http://localhost:3000/exemplares/lista-exemplares?pagina=${pagina}&qntPagina=${qntPagina}`;

  const response = await fetch(url, {
    method: "GET",
    headers: localStorage.getItem("token")
      ? { authorization: localStorage.getItem("token") as string }
      : undefined,
  });

  const { data, total } = await response.json();
  return {
    data,
    total,
  };
};

export const cadastraExemplar = async (exemplar: ExemplarEntity) => {
  const url = "http://localhost:3000/exemplares/cadastra-exemplar";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(exemplar),
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token")
        ? { authorization: localStorage.getItem("token") as string }
        : {}),
    },
  });

  if (!response.ok) {
    return false;
  }

  return await response.json();
};

export const buscaExemplarPorId = async (id: string) => {
  const url = `http://localhost:3000/exemplares/exemplar/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: localStorage.getItem("token")
      ? { authorization: localStorage.getItem("token") as string }
      : undefined,
  });

  if (!response.ok) {
    return null;
  }

  const exemplar = await response.json();
  return exemplar;
};

export const atualizaExemplar = async (
  id: string,
  exemplar: ExemplarEntity
) => {
  const url = `http://localhost:3000/exemplares/atualiza-exemplar/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(exemplar),
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token")
        ? { authorization: localStorage.getItem("token") as string }
        : {}),
    },
  });

  if (!response.ok) {
    return false;
  }

  return true;
};

export const deletarExemplar = async (id: string) => {
  const url = `http://localhost:3000/exemplares/deleta-exemplar/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: localStorage.getItem("token")
      ? { authorization: localStorage.getItem("token") as string }
      : undefined,
  });

  if (!response.ok) {
    return false;
  }

  return true;
};

export const buscaExemplaresPorNomePopular = async (
  nomePopular: string,
  pagina: number,
  qntPagina: number
): Promise<RetornoBuscaExemplares> => {
  const url = `http://localhost:3000/exemplares/busca-nome-popular?nome=${nomePopular}&pagina=${pagina}&qntPagina=${qntPagina}`;

  const response = await fetch(url, {
    method: "GET",
    headers: localStorage.getItem("token")
      ? { authorization: localStorage.getItem("token") as string }
      : undefined,
  });

  const { data, total } = await response.json();
  return {
    data,
    total,
  };
};

export const buscaExemplaresPorNomeCientifico = async (
  nomeCientifico: string,
  pagina: number,
  qntPagina: number
): Promise<RetornoBuscaExemplares> => {
  const url = `http://localhost:3000/exemplares/busca-nome-cientifico?nome=${nomeCientifico}&pagina=${pagina}&qntPagina=${qntPagina}`;

  const response = await fetch(url, {
    method: "GET",
    headers: localStorage.getItem("token")
      ? { authorization: localStorage.getItem("token") as string }
      : undefined,
  });

  const { data, total } = await response.json();
  return {
    data,
    total,
  };
};

export const enviaArquivoExemplar = async (
  idExemplar: string,
  arquivo: File
): Promise<boolean> => {
  const url = `http://localhost:3000/exemplares/upload-imagem`;

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);

      reader.onerror = (error) => reject(error);
    });

  const imagemBase64 = await getBase64(arquivo);

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      id: idExemplar,
      imagem: imagemBase64,
      nome: arquivo.name,
    }),
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token")
        ? { authorization: localStorage.getItem("token") as string }
        : {}),
    },
  });

  if (!response.ok) {
    return false;
  }

  return true;
};
