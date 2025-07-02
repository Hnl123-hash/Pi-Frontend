import type { ExemplarEntityComId } from "../../../../services/exemplares/exemplares.types";

export interface ITabelaExemplares {
  exemplares: ExemplarEntityComId[];
  isCarregando: boolean;
  onChangePaginaAtual: (pagina: number) => void;
  onChangeQuantidadePorPagina: (quantidade: number) => void;
  quantidadePorPagina?: number;
  paginaAtual?: number;
  totalExemplares?: number;
  onClickQrCode?: (id: string) => void;
}
