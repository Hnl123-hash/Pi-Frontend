import type { ITaxonomia } from "../../../../services/taxonomia/taxonomia.types";

export interface ITabelaTaxonomias {
  isCarregando: boolean;
  taxonomias?: ITaxonomia[];
  onChangeQuantidadePorPagina?: (value: number) => void;
  onChangePaginaAtual?: (value: number) => void;
  quantidadePorPagina?: number;
  paginaAtual?: number;
  totalTaxonomias?: number;
}
