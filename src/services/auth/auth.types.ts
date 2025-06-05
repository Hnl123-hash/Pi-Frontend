export interface IUsuario {
  permissoes: string[];
  senhaHash: string;
  role: "ADMIN" | "USUARIO";
  id: string;
  email: string;
}
