import type { IUsuarioSemSenha } from "../../../../services/usuarios/usuarios.type";

export interface ITabelaUsuarios {
  isCarregando: boolean;
  usuarios?: Array<IUsuarioSemSenha>;
  onClickLinha: (index: number) => void;
}
