import { useEffect, useState } from "react";
import type { ExemplarEntity } from "../../../services/exemplares/exemplares.types";
import { buscaTaxonomiaPorNomeCientifico } from "../../../services/taxonomia/taxonomia";
import {
  atualizaExemplar,
  buscaExemplarPorId,
  deletarExemplar,
  enviaArquivoExemplar,
} from "../../../services/exemplares/exemplares";
import { useParams } from "react-router-dom";

export const useExemplarContainer = () => {
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
  const { id } = useParams<{ id?: string }>();

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
    if (id) {
      await atualizaExemplar(id, formulario);

      if (arquivos && arquivos.length > 0) {
        console.log(`Iniciando upload de ${arquivos.length} arquivos...`);

        const uploadPromises = arquivos.map((arquivo) => {
          console.log("Preparando arquivo:", arquivo.name);
          return enviaArquivo(id, arquivo);
        });

        await Promise.all(uploadPromises);

        console.log("Todos os arquivos foram enviados com sucesso!");
      }

      window.location.href = "/home";
    }
  };

  const handleOnDelete = async () => {
    if (id) {
      const response = await deletarExemplar(id);
      if (response) {
        window.location.href = "/home";
      }
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

  const buscaDados = async () => {
    try {
      const response = await buscaExemplarPorId(id || "");
      if (response) {
        setFormulario({
          ...response,
          fotos: response.fotos || [],
        });
      }
    } catch (error) {
      console.error("Erro ao buscar exemplar:", error);
    }
    setIsCarregando(false);
  };

  useEffect(() => {
    buscaDados();
  }, []);

  const handleOnRemoverFoto = (index: number) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      fotos: (prevFormulario.fotos ?? []).filter((_, i) => i !== index),
    }));
    setArquivos((prevArquivos) => prevArquivos.filter((_, i) => i !== index));
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
    formulario,
    handleOnDelete,
    handleOnRemoverFoto,
  };
};
