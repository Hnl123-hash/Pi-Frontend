import { useEffect, useState } from "react";
import {
  atualizaTaxonomia,
  buscaTaxonomiaPorId,
} from "../../../services/taxonomia/taxonomia";
import { useParams } from "react-router";
import type { ITaxonomia } from "../../../services/taxonomia/taxonomia.types";

export const useTaxonomia = () => {
  const [isCarregando, setIsCarregando] = useState(true);
  const [taxonomia, setTaxonomia] = useState<ITaxonomia | undefined>(undefined);
  const [formularioDesabilitado, setFormularioDesabilitado] = useState(true);
  const [snackbar, setSnackBar] = useState(false);
  const [updateSucesso, setUpdateSucesso] = useState(false);
  const { id } = useParams();

  const toggleSnackBar = () => {
    setSnackBar(snackbar ? false : true);
  };

  const buscarDados = async () => {
    setIsCarregando(true);
    try {
      const response = await buscaTaxonomiaPorId(id as string);
      setTaxonomia(response);
    } catch (e) {
      console.error(e);
    }
    setIsCarregando(false);
  };

  useEffect(() => {
    buscarDados();
  }, []);

  const toggleFormulario = () => {
    setFormularioDesabilitado((prev) => !prev);
  };

  const adicionaNomePopular = () => {
    const novoNomes = structuredClone(taxonomia?.nomesPopulares);
    novoNomes?.push({
      vernacularName: "",
      language: "",
      locality: undefined,
    });

    setTaxonomia((prev) => {
      return {
        ...prev,
        nomesPopulares: novoNomes,
      };
    });
  };

  const handleClickEditar = async () => {
    setIsCarregando(true);
    try {
      const taxonomiaBody = {
        ...taxonomia,
        id: undefined,
      };
      const response = await atualizaTaxonomia(id as string, taxonomiaBody);
      if (response) {
        setUpdateSucesso(true);
      }
      toggleSnackBar();
    } catch (e) {
      setUpdateSucesso(false);
    }
    setIsCarregando(false);
  };

  const atualizaStateGenerico = (campo: string, valor: any) => {
    setTaxonomia((prev) => {
      return {
        ...prev,
        [campo]: valor,
      };
    });
  };

  const atualizaStateGenericoNomePopular = (
    index: number,
    campo: string,
    valor: any
  ) => {
    const novoNomes = structuredClone(taxonomia?.nomesPopulares);

    if (!novoNomes) return;

    novoNomes[index] = {
      ...novoNomes[index],
      [campo]: valor,
    };

    setTaxonomia((prev) => {
      return {
        ...prev,
        nomesPopulares: novoNomes,
      };
    });
  };

  const handleClickDeletarNomePopular = (index: number) => {
    const novoNomes = structuredClone(taxonomia?.nomesPopulares);

    novoNomes?.splice(index, 1);

    setTaxonomia((prev) => {
      return {
        ...prev,
        nomesPopulares: novoNomes,
      };
    });
  };

  return {
    isCarregando,
    taxonomia,
    formularioDesabilitado,
    toggleFormulario,
    adicionaNomePopular,
    handleClickEditar,
    atualizaStateGenerico,
    atualizaStateGenericoNomePopular,
    handleClickDeletarNomePopular,
    toggleSnackBar,
    snackbar,
    updateSucesso,
  };
};
