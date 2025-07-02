import type { FC } from "react";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { ITabelaUsuarios } from "./tabela-usuarios.types";

export const TabelaUsuarios: FC<ITabelaUsuarios> = ({
  usuarios,
  isCarregando,
  onClickLinha,
}) => {
  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={"bold"}>Email</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={"bold"}>
                  Permissão para criar
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={"bold"}>
                  Permissão para editar
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={"bold"}>
                  Permissão para deletar
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
              usuarios?.map((usuario, index) => (
                <TableRow
                  hover={true}
                  key={usuario.id}
                  onClick={() => onClickLinha(index)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {usuario.email ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {usuario.permissoes.includes("CRIAR") ? "Sim" : "Não"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {usuario.permissoes.includes("EDITAR") ? "Sim" : "Não"}
                  </TableCell>
                  <TableCell align="right">
                    {usuario.permissoes.includes("DELETAR") ? "Sim" : "Não"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
