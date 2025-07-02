import { useEffect, useState } from "react";
import {
  buscaTaxonomia,
  buscaTaxonomiaPorNomeCientifico,
} from "../../../services/taxonomia/taxonomia";
import {
  buscaExemplares,
  buscaExemplaresPorNomeCientifico,
  buscaExemplaresPorNomePopular,
} from "../../../services/exemplares/exemplares";
import type { ExemplarEntityComId } from "../../../services/exemplares/exemplares.types";
import QRCode from "qrcode";

export const useHome = () => {
  const [isCarregando, setIsCarregando] = useState(true);
  const [taxonomias, setTaxonomias] = useState([]);
  const [exemplares, setExemplares] = useState<ExemplarEntityComId[]>([]);
  const [stringBusca, setStringBusca] = useState("");
  const [tabAtual, setTabAtual] = useState(0);
  const [tipoDeBusca, setTipoDeBusca] = useState<
    "nome_cientifico" | "nome_popular"
  >("nome_cientifico");
  const [paginacao, setPaginacao] = useState({
    total: 0,
    quantidadePorPagina: 20,
    paginaAtual: 1,
  });

  const [paginacaoExemplares, setPaginacaoExemplares] = useState({
    total: 0,
    quantidadePorPagina: 20,
    paginaAtual: 1,
  });

  const buscarDadosTaxonomia = async (qnt: number, paginaAtual: number) => {
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

  const buscarDadosExemplares = async (qnt: number, paginaAtual: number) => {
    setIsCarregando(true);

    if (!stringBusca) {
      try {
        const { data, total } = await buscaExemplares(qnt, paginaAtual);
        setExemplares(data);
        setPaginacaoExemplares((prev) => ({
          ...prev,
          total,
        }));
      } catch (error) {
        console.error("Erro ao buscar exemplares:", error);
      }
    } else {
      if (tipoDeBusca === "nome_cientifico") {
        try {
          const { data, total } = await buscaExemplaresPorNomeCientifico(
            stringBusca,
            paginaAtual,
            qnt
          );
          setExemplares(data);
          setPaginacaoExemplares((prev) => ({
            ...prev,
            total: total,
          }));
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      } else if (tipoDeBusca === "nome_popular") {
        try {
          const { data, total } = await buscaExemplaresPorNomePopular(
            stringBusca,
            paginaAtual,
            qnt
          );
          setExemplares(data);
          setPaginacaoExemplares((prev) => ({
            ...prev,
            total: total,
          }));
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      }
    }

    setIsCarregando(false);
  };

  useEffect(() => {
    if (tabAtual === 0) {
      buscarDadosExemplares(
        paginacao.quantidadePorPagina,
        paginacao.paginaAtual
      );
    } else {
      buscarDadosTaxonomia(
        paginacaoExemplares.quantidadePorPagina,
        paginacaoExemplares.paginaAtual
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paginacao.quantidadePorPagina,
    paginacao.paginaAtual,
    stringBusca,
    tabAtual,
    paginacaoExemplares.quantidadePorPagina,
    paginacaoExemplares.paginaAtual,
  ]);

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

  const handleOnChangeTab = () => {
    setTabAtual(tabAtual === 0 ? 1 : 0);
    setPaginacao((prev) => ({
      ...prev,
      paginaAtual: 1,
      quantidadePorPagina: 20,
    }));
  };

  const handleOnChangeQuantidadePorPaginaExemplar = (value: number) => {
    setPaginacaoExemplares((prev) => ({
      ...prev,
      quantidadePorPagina: value,
      paginaAtual: 1,
    }));
  };

  const handleOnChangePaginaAtualExemplar = (value: number) => {
    setPaginacaoExemplares((prev) => ({
      ...prev,
      paginaAtual: value,
    }));
  };

  const handleQrCode = (id: string) => {
    QRCode.toDataURL(`https://example.com/exemplar/${id}`, {
      errorCorrectionLevel: "H",
    })
      .then((url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = `${id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("Erro ao gerar QR Code:", err);
      });
  };

  return {
    isCarregando,
    taxonomias,
    buscarDadosTaxonomia,
    paginaAtual: paginacao.paginaAtual,
    quantidadePorPagina: paginacao.quantidadePorPagina,
    totalPaginas: paginacao.total,
    handleOnChangeQuantidadePorPagina,
    handleOnChangePaginaAtual,
    handleOnChangeStringBusca,
    handleOnChangeTab,
    tabAtual,
    tipoDeBusca,
    setTipoDeBusca,
    exemplares,
    buscarDadosExemplares,
    paginacaoExemplares,
    handleOnChangeQuantidadePorPaginaExemplar,
    handleOnChangePaginaAtualExemplar,
    handleQrCode,
  };
};
