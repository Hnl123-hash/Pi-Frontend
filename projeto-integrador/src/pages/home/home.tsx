import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { TabelaTaxonomias } from "./components/tabela-taxonomias/tabela-taxonomias";
import { useHome } from "./container/home.container";
import { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { TabelaExemplares } from "./components/tabela-exemplares/tabela-exemplares";
import simbolo from "../../assets/simbolo.png";

export const HomeInicial = () => {
  const [buffer, setBuffer] = useState("");
  const {
    isCarregando,
    buscarDadosExemplares,
    taxonomias,
    handleOnChangePaginaAtual,
    handleOnChangeQuantidadePorPagina,
    paginaAtual,
    quantidadePorPagina,
    handleOnChangeStringBusca,
    totalPaginas,
    tabAtual,
    handleOnChangeTab,
    tipoDeBusca,
    setTipoDeBusca,
    exemplares,
    paginacaoExemplares,
    handleOnChangePaginaAtualExemplar,
    handleOnChangeQuantidadePorPaginaExemplar,
    handleQrCode,
  } = useHome();

  useEffect(() => {
    buscarDadosExemplares(quantidadePorPagina, paginaAtual);
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
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <img src={simbolo} style={{ width: "25px", height: "auto" }} />
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
            Jardim Botânico UFSM
          </Typography>
          <Paper>
            <Box
              paddingX={"16px"}
              paddingTop={"16px"}
              display="flex"
              flexDirection="column"
              gap={"16px"}
            >
              <Typography variant="h5" paddingX={"16px"}>
                Listagem de taxonomias e exemplares
              </Typography>

              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Box>
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
                      alignContent={"center"}
                    >
                      Buscar por{" "}
                    </Typography>
                    <Select
                      defaultValue={"nome_cientifico"}
                      disabled={tabAtual === 1}
                      value={tabAtual === 1 ? "nome_cientifico" : tipoDeBusca}
                      onChange={(event) => {
                        setTipoDeBusca(
                          event.target.value as
                            | "nome_cientifico"
                            | "nome_popular"
                        );
                      }}
                      sx={{ maxHeight: "40px", width: "fit-content" }}
                    >
                      <MenuItem value="nome_cientifico">
                        Nome científico
                      </MenuItem>
                      <MenuItem value={"nome_popular"}>Nome popular</MenuItem>
                    </Select>

                    <Typography
                      variant="body1"
                      lineHeight={2}
                      minWidth={"fit-content"}
                      alignContent={"center"}
                    >
                      :
                    </Typography>

                    <TextField
                      variant="standard"
                      onChange={(event) => setBuffer(event.target.value)}
                      onBlur={() => {
                        handleOnChangeStringBusca(buffer);
                      }}
                      fullWidth
                      onSubmit={(event) => {
                        event.preventDefault();
                        handleOnChangeStringBusca(buffer);
                      }}
                      sx={{ minWidth: "300px" }}
                    />
                  </Box>
                </Box>

                <Tabs value={tabAtual}>
                  <Tab
                    label="Exemplares"
                    onClick={() => {
                      if (tabAtual !== 0) handleOnChangeTab();
                    }}
                  />
                  <Tab
                    label="Taxonomias"
                    onClick={() => {
                      if (tabAtual !== 1) handleOnChangeTab();
                    }}
                  />
                </Tabs>
              </Box>

              <Divider />

              {tabAtual === 0 && (
                <TabelaExemplares
                  exemplares={exemplares}
                  isCarregando={isCarregando}
                  onChangePaginaAtual={handleOnChangePaginaAtualExemplar}
                  onChangeQuantidadePorPagina={
                    handleOnChangeQuantidadePorPaginaExemplar
                  }
                  paginaAtual={paginacaoExemplares.paginaAtual}
                  quantidadePorPagina={paginacaoExemplares.quantidadePorPagina}
                  totalExemplares={paginacaoExemplares.total}
                  onClickQrCode={handleQrCode}
                />
              )}

              {tabAtual === 1 && (
                <TabelaTaxonomias
                  isCarregando={isCarregando}
                  taxonomias={taxonomias}
                  onChangePaginaAtual={handleOnChangePaginaAtual}
                  onChangeQuantidadePorPagina={
                    handleOnChangeQuantidadePorPagina
                  }
                  paginaAtual={paginaAtual}
                  quantidadePorPagina={quantidadePorPagina}
                  totalTaxonomias={totalPaginas}
                />
              )}
            </Box>
          </Paper>
          {tabAtual === 0 && (
            <Box alignSelf={"end"} padding={"16px"}>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  window.location.href = "/exemplares/novo-exemplar";
                }}
              >
                Novo exemplar
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
