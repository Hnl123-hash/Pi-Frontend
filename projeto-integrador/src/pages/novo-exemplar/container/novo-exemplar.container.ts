import { useState } from "react";
import type { ExemplarEntity } from "../../../services/exemplares/exemplares.types";
import { buscaTaxonomiaPorNomeCientifico } from "../../../services/taxonomia/taxonomia";
import {
  cadastraExemplar,
  enviaArquivoExemplar,
} from "../../../services/exemplares/exemplares";

export const useNovoExemplarContainer = () => {
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [formulario, setFormulario] = useState<ExemplarEntity>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    taxonomia: {} as any,
    descricao: "",
    idade: undefined,
    localizacao: undefined,
    fotos: [],
    precedencia: "",
    identificadorJardim: undefined,
  });
  const [stringBusca, setStringBusca] = useState<string>("");
  const [isCarregando, setIsCarregando] = useState<boolean>(false);
  const [taxonomias, setTaxonomias] = useState([]);

  const handleOnChangeArquivo = (files: File[]) => {
    setArquivos((prevArquivos) => [...prevArquivos, ...files]);
  };

  const handleOnChangeDescricao = (descricao: string) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      descricao,
    }));
  };

  const handleOnChangeIdade = (idade: number | undefined) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      idade,
    }));
  };

  const handleOnChangeLocalizacao = (localizacao: {
    lat?: number;
    lon?: number;
  }) => {
    const localizacaoValidada = {
      lat:
        localizacao.lat !== undefined
          ? localizacao.lat
          : formulario.localizacao?.lat || 0,
      lon:
        localizacao.lon !== undefined
          ? localizacao.lon
          : formulario.localizacao?.lon || 0,
    };

    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      localizacao: {
        ...prevFormulario.localizacao,
        ...localizacaoValidada,
      },
    }));
  };

  const handleOnChangePrecedencia = (precedencia: string) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      precedencia,
    }));
  };

  const handleOnChangeIdentificadorJardim = (
    identificador: number | undefined
  ) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      identificadorJardim: identificador,
    }));
  };

  const handleOnSubmit = async () => {
    const response = await cadastraExemplar(formulario);

    for (let i = 0; i < arquivos.length; i++) {
      const arquivo = arquivos[i];
      if (arquivo && response?.id) {
        await enviaArquivo(response.id, arquivo);
      }
    }

    if (response) {
      window.location.href = "/home";
    }
  };

  const handleOnDeleteArquivo = (index: number) => {
    setArquivos((prevArquivos) => prevArquivos.filter((_, i) => i !== index));
  };

  const buscarDadosTaxonomias = async () => {
    setIsCarregando(true);

    try {
      const { data } = await buscaTaxonomiaPorNomeCientifico(
        10,
        1,
        stringBusca
      );
      setTaxonomias(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }

    setIsCarregando(false);
  };

  const handleOnChangeStringBusca = (value: string) => {
    setStringBusca(value);
  };

  const handleOnChangeTaxonomia = (index: number) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      taxonomia: taxonomias[index] || {},
    }));
  };

  const enviaArquivo = async (idExemplar: string, arquivo: File) => {
    try {
      const response = await enviaArquivoExemplar(idExemplar, arquivo);
      if (!response) {
        throw new Error("Erro ao enviar arquivo do exemplar");
      }
    } catch (error) {
      console.error("Erro ao enviar arquivo do exemplar:", error);
    }
  };

  const isFormularioValido =
    formulario.localizacao?.lat !== undefined &&
    formulario.localizacao?.lon !== undefined &&
    formulario.descricao !== "";

  return {
    arquivos,
    handleOnChangeArquivo,
    handleOnChangeDescricao,
    handleOnChangeIdade,
    handleOnChangeLocalizacao,
    handleOnChangePrecedencia,
    handleOnChangeIdentificadorJardim,
    handleOnSubmit,
    handleOnDeleteArquivo,
    isCarregando,
    taxonomias,
    buscarDadosTaxonomias,
    handleOnChangeStringBusca,
    handleOnChangeTaxonomia,
    isFormularioValido,
  };
};
