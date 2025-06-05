import { useEffect, useState } from "react";
import {
  buscaTaxonomia,
  buscaTaxonomiaPorNomeCientifico,
} from "../../../services/taxonomia/taxonomia";

export const useHome = () => {
  const [isCarregando, setIsCarregando] = useState(true);
  const [taxonomias, setTaxonomias] = useState([]);
  const [stringBusca, setStringBusca] = useState("");
  const [paginacao, setPaginacao] = useState({
    total: 0,
    quantidadePorPagina: 20,
    paginaAtual: 1,
  });

  const buscarDados = async (qnt: number, paginaAtual: number) => {
    setIsCarregando(true);
    if (!stringBusca) {
      try {
        const { data, tamanhoTotal } = await buscaTaxonomia(qnt, paginaAtual);
        setTaxonomias(data);
        setPaginacao((prev) => ({
          ...prev,
          total: tamanhoTotal,
        }));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    } else {
      try {
        const { data, tamanhoTotal } = await buscaTaxonomiaPorNomeCientifico(
          qnt,
          paginaAtual,
          stringBusca
        );
        setTaxonomias(data);
        setPaginacao((prev) => ({
          ...prev,
          total: tamanhoTotal,
        }));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    setIsCarregando(false);
  };

  useEffect(() => {
    buscarDados(paginacao.quantidadePorPagina, paginacao.paginaAtual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginacao.quantidadePorPagina, paginacao.paginaAtual, stringBusca]);

  const handleOnChangeQuantidadePorPagina = (value: number) => {
    setPaginacao((prev) => ({
      ...prev,
      quantidadePorPagina: value,
      paginaAtual: 1,
    }));
  };

  const handleOnChangePaginaAtual = (value: number) => {
    setPaginacao((prev) => ({
      ...prev,
      paginaAtual: value,
    }));
  };

  const handleOnChangeStringBusca = (value: string) => {
    setStringBusca(value);
    setPaginacao((prev) => ({
      ...prev,
      paginaAtual: 1,
    }));
  };

  return {
    isCarregando,
    taxonomias,
    buscarDados,
    paginaAtual: paginacao.paginaAtual,
    quantidadePorPagina: paginacao.quantidadePorPagina,
    totalPaginas: paginacao.total,
    handleOnChangeQuantidadePorPagina,
    handleOnChangePaginaAtual,
    handleOnChangeStringBusca,
  };
};
