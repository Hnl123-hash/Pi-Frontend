import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { TabelaTaxonomias } from "./components/tabela-taxonomias/tabela-taxonomias";
import { useHome } from "./container/home.container";
import { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import ParkIcon from "@mui/icons-material/Park";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const HomeInicial = () => {
  const [buffer, setBuffer] = useState("");
  const {
    isCarregando,
    buscarDados,
    taxonomias,
    handleOnChangePaginaAtual,
    handleOnChangeQuantidadePorPagina,
    paginaAtual,
    quantidadePorPagina,
    handleOnChangeStringBusca,
    totalPaginas,
  } = useHome();

  useEffect(() => {
    buscarDados(quantidadePorPagina, paginaAtual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box display={"flex"} flexDirection={"row"}>
        <Drawer variant="permanent" anchor="left" sx={{ width: 74 }}>
          <List
            sx={{
              height: "100%",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItem>
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <ParkIcon fontSize="large" sx={{ color: "green" }} />
              </ListItemIcon>
            </ListItem>
            <Box marginBottom={60}>
              <ListItem sx={{ justifyContent: "center" }}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <MenuBookIcon color="primary" />
                </ListItemIcon>
              </ListItem>
              <ListItem sx={{ justifyContent: "center" }}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <IconButton
                    onClick={() => {
                      window.location.href = "/usuarios";
                    }}
                  >
                    <GroupIcon />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            </Box>
            <ListItem sx={{ justifyContent: "end" }}>
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <IconButton
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
        <Box
          display="flex"
          flexDirection="column"
          padding={"24px"}
          gap={"16px"}
          width={"100%"}
        >
          <Typography variant="h3" marginX={"16px"}>
            Jardim botanico UFSM
          </Typography>
          <Paper>
            <Box
              paddingX={"16px"}
              display="flex"
              flexDirection="column"
              gap={"16px"}
            >
              <Typography variant="h5" marginTop={"16px"} marginX={"16px"}>
                Lista de Taxonomias
              </Typography>
              <Box
                marginTop={"16px"}
                display={"flex"}
                flexDirection={"row"}
                gap={"16px"}
                width={"40%"}
                marginX={"16px"}
              >
                <Typography
                  variant="body1"
                  lineHeight={2}
                  minWidth={"fit-content"}
                >
                  Buscar Taxonomia:{" "}
                </Typography>
                <TextField
                  variant="standard"
                  onChange={(event) => setBuffer(event.target.value)}
                  onBlur={() => {
                    handleOnChangeStringBusca(buffer);
                  }}
                  fullWidth
                />
              </Box>
              <TabelaTaxonomias
                isCarregando={isCarregando}
                taxonomias={taxonomias}
                onChangePaginaAtual={handleOnChangePaginaAtual}
                onChangeQuantidadePorPagina={handleOnChangeQuantidadePorPagina}
                paginaAtual={paginaAtual}
                quantidadePorPagina={quantidadePorPagina}
                totalTaxonomias={totalPaginas}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};
