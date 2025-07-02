import type { FC } from "react";
import {
  IconButton,
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
import type { ITabelaExemplares } from "./tabela-exemplares.types";
import { QrCode } from "@mui/icons-material";

export const TabelaExemplares: FC<ITabelaExemplares> = ({
  exemplares,
  isCarregando,
  onChangePaginaAtual,
  onChangeQuantidadePorPagina,
  quantidadePorPagina = 10,
  paginaAtual = 0,
  totalExemplares = 0,
  onClickQrCode,
}) => {
  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold" variant="body2">
                  Identificador Jardim
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" variant="body2">
                  Nome Científico
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" variant="body2">
                  Nome Popular
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" variant="body2">
                  Descrição
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" variant="body2">
                  QR Code
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
              exemplares?.map((exemplar) => (
                <TableRow
                  hover={true}
                  key={exemplar.id}
                  onClick={() => {
                    window.location.href = "/exemplares/" + exemplar.id;
                    console.log(exemplar);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{exemplar.identificadorJardim}</TableCell>
                  <TableCell align="right">
                    {exemplar.taxonomia.nome_cientifico}
                  </TableCell>
                  <TableCell align="right">
                    {(exemplar.taxonomia.nomesPopulares?.length ?? 0) > 0
                      ? exemplar?.taxonomia?.nomesPopulares?.[0].vernacularName
                      : "Sem nome popular"}
                  </TableCell>
                  <TableCell align="right">
                    {exemplar.descricao || "Sem descrição"}
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="textSecondary">
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (onClickQrCode) {
                            onClickQrCode(exemplar.id);
                          }
                        }}
                      >
                        <QrCode />
                      </IconButton>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component={"div"}
        count={totalExemplares}
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
