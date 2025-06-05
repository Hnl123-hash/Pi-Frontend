import type { IUsuarioSemSenha } from "../../../../services/usuarios/usuarios.type";

export interface IDetalhesUsuario {
  usuario?: IUsuarioSemSenha;
  isNovoUsuario: boolean;
  novoUsuario?: IUsuarioSemSenha;
  onCriarNovoUsuario?: (email: string, permissoes: string[]) => void;
  onDeletarUsuario?: () => void;
  onAtualizarPermissoes?: (permissoes: string[]) => void;
  onFechar: () => void;
}
