import { useState } from "react";
import { realizaLogin } from "../../../services/auth/auth";
import { adicionaSenhaNovoUsuario } from "../../../services/usuarios/usuarios";

export const useLogin = () => {
  const [senha, setSenha] = useState("");
  const [senhaTemp, setSenhaTemp] = useState("");
  const [email, setEmail] = useState("");
  const [erroLogin, setErroLogin] = useState("");
  const [isNovoUsuario, setIsNovoUsuario] = useState(false);

  const handleOnLogin = async () => {
    if (!senha) {
      setIsNovoUsuario(true);
      return;
    }

    const loginSucesso = await realizaLogin(email, senha);

    if (loginSucesso) {
      window.location.href = "/home";
    } else {
      setErroLogin("Senha ou email invalido.");
    }
  };

  const handleOnChangeEmail = (novaString: string) => {
    setEmail(novaString);
  };

  const handleOnChangeSenha = (novaSenha: string) => {
    setSenha(novaSenha);
  };

  const handleNovoUsuario = async () => {
    const loginSucesso = await adicionaSenhaNovoUsuario(email, senha);

    if (loginSucesso) {
      setTimeout(async () => {
        await realizaLogin(email, senha);
        window.location.href = "/home";
      }, 1000);
    } else {
      setErroLogin("Senha ou email invalido.");
    }
  };

  const handleOnChangeSenhaTemp = (novaSenha: string) => {
    setSenhaTemp(novaSenha);
  };

  const comparaSenhas = () => {
    return senha === senhaTemp;
  };

  return {
    handleOnLogin,
    handleOnChangeEmail,
    handleOnChangeSenha,
    erroLogin,
    senha,
    email,
    isNovoUsuario,
    handleNovoUsuario,
    senhaTemp,
    comparaSenhas,
    handleOnChangeSenhaTemp,
  };
};
