import type { FC } from "react";
import type { ITabelaTaxonomias } from "./tabela-taxonomias.types";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

export const TabelaTaxonomias: FC<ITabelaTaxonomias> = ({
  taxonomias,
  isCarregando,
  onChangePaginaAtual,
  onChangeQuantidadePorPagina,
  quantidadePorPagina = 10,
  paginaAtual = 0,
  totalTaxonomias = 0,
}) => {
  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold" variant="body2">
                  ID Taxonomico{" "}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" variant="body2">
                  Nome Científico
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" variant="body2">
                  Espécie
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" variant="body2">
                  Gênero
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" variant="body2">
                  Família
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" variant="body2">
                  Possui nomes populares
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isCarregando ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                  <Skeleton height={"50px"}></Skeleton>
                </TableCell>
              </TableRow>
            ) : (
              taxonomias?.map((taxonomia) => (
                <TableRow
                  hover={true}
                  key={taxonomia.taxonID}
                  onClick={() => {
                    window.location.href = "/taxonomia/" + taxonomia.id;
                    console.log(taxonomia);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{taxonomia.taxonID ?? "-"}</TableCell>
                  <TableCell align="right">
                    {taxonomia.nome_cientifico ?? "-"}
                  </TableCell>
                  <TableCell align="right">
                    {taxonomia.especie ?? "-"}
                  </TableCell>
                  <TableCell align="right">{taxonomia.genero ?? "-"}</TableCell>
                  <TableCell align="right">
                    {taxonomia.familia ?? "-"}
                  </TableCell>
                  <TableCell align="right">
                    {taxonomia.nomesPopulares &&
                    taxonomia.nomesPopulares.length > 0
                      ? "Sim"
                      : "Não"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component={"div"}
        count={totalTaxonomias}
        rowsPerPage={quantidadePorPagina}
        rowsPerPageOptions={[20, 30, 40, 50]}
        defaultValue={quantidadePorPagina}
        page={paginaAtual - 1}
        onPageChange={(_, novaPagina) => {
          if (onChangePaginaAtual) {
            onChangePaginaAtual(novaPagina + 1);
          }
        }}
        onRowsPerPageChange={(event) => {
          const value = parseInt(event.target.value, 10);
          if (onChangeQuantidadePorPagina) {
            onChangeQuantidadePorPagina(value);
          }
        }}
      />
    </>
  );
};
