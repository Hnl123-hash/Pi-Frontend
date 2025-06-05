import { useEffect, useState } from "react";
import type {
  INovoUsuario,
  IUsuarioSemSenha,
} from "../../../services/usuarios/usuarios.type";
import {
  atualizaPermissoesUsuario,
  buscaUsuarios,
  criaUsuario,
  deletaUsuario,
} from "../../../services/usuarios/usuarios";

export const useUsuarios = () => {
  const [isCarregando, setIsCarregando] = useState(false);
  const [usuarios, setUsuarios] = useState<IUsuarioSemSenha[] | undefined>(
    undefined
  );
  const [erro, setErro] = useState(false);
  const [isDialogAberto, setIsDialogAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<
    IUsuarioSemSenha | undefined
  >(undefined);
  const [isDialogNovoUsuarioAberto, setIsDialogNovoUsuarioAberto] =
    useState(false);

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    setIsCarregando(true);
    try {
      const response = await buscaUsuarios();
      setUsuarios(response);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setErro(true);
    }
    setIsCarregando(false);
  };

  const toggleDialog = () => {
    setIsDialogAberto(isDialogAberto ? false : true);
  };

  const toggleDialogNovoUsuario = () => {
    setIsDialogNovoUsuarioAberto(isDialogNovoUsuarioAberto ? false : true);
  };

  const selecionaUsuario = (index: number) => {
    setUsuarioSelecionado(usuarios?.[index]);
  };

  const handleOnCriarNovoUsuario = async (
    email: string,
    permissoes: string[]
  ) => {
    const novoUsuario: INovoUsuario = {
      email,
      permissoes,
      role: "USUARIO",
      senhaHash: "",
    };

    try {
      await criaUsuario(novoUsuario);
      setTimeout(() => buscarDados(), 1000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnDeletarUsuario = async () => {
    if (!usuarioSelecionado) return;
    try {
      await deletaUsuario(usuarioSelecionado?.id);
      setTimeout(() => buscarDados(), 1000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnAtualizarPermissoes = async (novasPermissoes: string[]) => {
    if (!usuarioSelecionado) return;
    try {
      await atualizaPermissoesUsuario(usuarioSelecionado?.id, novasPermissoes);
      setTimeout(() => buscarDados(), 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isCarregando,
    usuarios,
    erro,
    buscarDados,
    toggleDialog,
    isDialogAberto,
    usuarioSelecionado,
    selecionaUsuario,
    toggleDialogNovoUsuario,
    isDialogNovoUsuarioAberto,
    handleOnCriarNovoUsuario,
    handleOnDeletarUsuario,
    handleOnAtualizarPermissoes,
  };
};
