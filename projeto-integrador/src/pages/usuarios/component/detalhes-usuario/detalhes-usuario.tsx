import { useState, type FC } from "react";
import type { IDetalhesUsuario } from "./detalhes-usuario.types";
import {
  TextField,
  Typography,
  Box,
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export const DetalhesUsuario: FC<IDetalhesUsuario> = ({
  usuario,
  isNovoUsuario,
  onAtualizarPermissoes,
  onDeletarUsuario,
  onCriarNovoUsuario,
  onFechar,
}) => {
  const [buffer, setBuffer] = useState({
    permiteEditar: usuario?.permissoes.includes("EDITAR"),
    permiteCriar: usuario?.permissoes.includes("CRIAR"),
    permiteDeletar: usuario?.permissoes.includes("DELETAR"),
  });
  const [email, setEmail] = useState("");

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"16px"}
        width={"710px"}
      >
        <Typography variant="h6">Detalhes do usuario</Typography>
        <TextField
          label="Email"
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "rgba(0, 0, 0, 0.87)", // Cor do texto
            },
          }}
          disabled={!isNovoUsuario}
          value={isNovoUsuario ? email : usuario?.email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Typography variant="h6">Permissões</Typography>
        <Box display={"flex"} flexDirection={"row"} gap={"8px"}>
          <FormControl fullWidth>
            <InputLabel>Permissão para criar</InputLabel>
            <Select
              label="Permissão para criar"
              fullWidth
              defaultValue={usuario?.permissoes.includes("CRIAR") ? "S" : "N"}
              onChange={(value) => {
                setBuffer((prev) => {
                  return {
                    ...prev,
                    permiteCriar: value.target.value === "S",
                  };
                });
              }}
            >
              <MenuItem value={"S"}>Sim</MenuItem>
              <MenuItem value={"N"}>Não</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Permissão para editar</InputLabel>
            <Select
              label="Permissão para editar"
              fullWidth
              defaultValue={usuario?.permissoes.includes("EDITAR") ? "S" : "N"}
              onChange={(value) => {
                setBuffer((prev) => {
                  return {
                    ...prev,
                    permiteEditar: value.target.value === "S",
                  };
                });
              }}
            >
              <MenuItem value={"S"}>Sim</MenuItem>
              <MenuItem value={"N"}>Não</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Permissão para deletar</InputLabel>
            <Select
              label="Permissão para deletar"
              fullWidth
              defaultValue={usuario?.permissoes.includes("DELETAR") ? "S" : "N"}
              onChange={(value) => {
                setBuffer((prev) => {
                  return {
                    ...prev,
                    permiteDeletar: value.target.value === "S",
                  };
                });
              }}
            >
              <MenuItem value={"S"}>Sim</MenuItem>
              <MenuItem value={"N"}>Não</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"end"}
          gap={"16px"}
        >
          {!isNovoUsuario && (
            <>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  if (onAtualizarPermissoes) {
                    const novasPermissoes = [];

                    if (buffer.permiteCriar) novasPermissoes.push("CRIAR");
                    if (buffer.permiteEditar) novasPermissoes.push("EDITAR");
                    if (buffer.permiteDeletar) novasPermissoes.push("DELETAR");

                    onAtualizarPermissoes(novasPermissoes);
                    onFechar();
                  }
                }}
              >
                Atualizar permissões
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  if (onDeletarUsuario) onDeletarUsuario();
                  onFechar();
                }}
              >
                Deletar usuario
              </Button>
            </>
          )}

          {isNovoUsuario && (
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                if (onCriarNovoUsuario) {
                  const novasPermissoes = [];

                  if (buffer.permiteCriar) novasPermissoes.push("CRIAR");
                  if (buffer.permiteEditar) novasPermissoes.push("EDITAR");
                  if (buffer.permiteDeletar) novasPermissoes.push("DELETAR");

                  onCriarNovoUsuario(email, novasPermissoes);
                  onFechar();
                }
              }}
            >
              Adicionar usuario
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};
