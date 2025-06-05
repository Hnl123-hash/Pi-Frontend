export interface IUsuarioSemSenha {
  permissoes: string[];
  role: "ADMIN" | "USUARIO";
  id: string;
  email: string;
}

export interface INovoUsuario {
  permissoes: string[];
  role: "ADMIN" | "USUARIO";
  email: string;
  senhaHash: "";
}
