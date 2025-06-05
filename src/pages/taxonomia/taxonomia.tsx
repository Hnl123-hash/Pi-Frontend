import {
  Alert,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { useTaxonomia } from "./container/taxonomia.container";
import GroupIcon from "@mui/icons-material/Group";
import ParkIcon from "@mui/icons-material/Park";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { TextFieldCustom } from "./components/textFieldCustom/textFieldCustom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const Taxonomia = () => {
  const {
    taxonomia,
    formularioDesabilitado,
    toggleFormulario,
    adicionaNomePopular,
    handleClickEditar,
    atualizaStateGenerico,
    atualizaStateGenericoNomePopular,
    handleClickDeletarNomePopular,
    snackbar,
    toggleSnackBar,
    updateSucesso,
  } = useTaxonomia();

  if (!taxonomia) {
    return <Box>a</Box>;
  }

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
          <Box display={"flex"} flexDirection={"row"}>
            <IconButton
              onClick={() => {
                window.history.back();
              }}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
            <Typography variant="h3" marginX={"16px"}>
              Jardim botanico UFSM
            </Typography>
          </Box>
          <Paper>
            <Box padding={"24px"}>
              <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
                <Typography variant="h5">Identificação</Typography>
                <Box display={"flex"} flexDirection={"row"} gap={"24px"}>
                  <TextFieldCustom
                    label="TaxonId"
                    defaultValue={taxonomia.taxonID!}
                    disabled={formularioDesabilitado}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("taxonID", valor)
                    }
                  />
                  <TextFieldCustom
                    label="Nome cientifico"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.nome_cientifico!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("nome_cientifico", valor)
                    }
                  />
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography variant="h5">Nomes populares</Typography>
                  {!formularioDesabilitado && (
                    <IconButton onClick={adicionaNomePopular}>
                      <AddIcon></AddIcon>
                    </IconButton>
                  )}
                </Box>
                {taxonomia?.nomesPopulares?.map((nomePopular, index) => (
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    gap={"24px"}
                    key={index + 1}
                  >
                    <TextFieldCustom
                      label="Nome popular"
                      defaultValue={nomePopular.vernacularName!}
                      disabled={formularioDesabilitado}
                      onChangeProp={(valor) =>
                        atualizaStateGenericoNomePopular(
                          index,
                          "vernacularName",
                          valor
                        )
                      }
                    />
                    <TextFieldCustom
                      label="Linguagem"
                      defaultValue={nomePopular.language!}
                      disabled={formularioDesabilitado}
                      onChangeProp={(valor) =>
                        atualizaStateGenericoNomePopular(
                          index,
                          "language",
                          valor
                        )
                      }
                    />
                    {!formularioDesabilitado && (
                      <IconButton
                        onClick={() => handleClickDeletarNomePopular(index)}
                      >
                        <DeleteIcon color="error"></DeleteIcon>
                      </IconButton>
                    )}
                  </Box>
                ))}
                {taxonomia.nomesPopulares?.length === 0 && (
                  <Box width={"100%"}>
                    <Typography color={"textSecondary"} justifySelf={"center"}>
                      Não existe nenhum cadastro de nome popular para esta
                      taxonomia.
                    </Typography>
                  </Box>
                )}
                <Typography variant="h5">Catalogação taxonomica</Typography>
                <Box display={"flex"} flexDirection={"row"} gap={"24px"}>
                  <TextFieldCustom
                    label="Especie"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.especie!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("especie", valor)
                    }
                  />
                  <TextFieldCustom
                    label="Genero"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.genero!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("genero", valor)
                    }
                  />
                </Box>
                <Box display={"flex"} flexDirection={"row"} gap={"24px"}>
                  <TextFieldCustom
                    label="Familia"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.familia!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("familia", valor)
                    }
                  />
                  <TextFieldCustom
                    label="Ordem"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.order!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("order", valor)
                    }
                  />
                </Box>
                <Box display={"flex"} flexDirection={"row"} gap={"24px"}>
                  <TextFieldCustom
                    label="Classe"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.class!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("class", valor)
                    }
                  />
                  <TextFieldCustom
                    label="Filo"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.phylum!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("phylum", valor)
                    }
                  />
                </Box>
                <Box display={"flex"} flexDirection={"row"} gap={"24px"}>
                  <TextFieldCustom
                    label="Reino"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.kingdom!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("kingdom", valor)
                    }
                  />
                  <TextFieldCustom
                    label="Classificação"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.higherClassification!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("higherClassification", valor)
                    }
                  />
                </Box>
                <Typography variant="h5">Referencia</Typography>
                <Box display={"flex"} flexDirection={"row"} gap={"24px"}>
                  <TextFieldCustom
                    label="Link reflora"
                    disabled={formularioDesabilitado}
                    defaultValue={taxonomia.references!}
                    onChangeProp={(valor) =>
                      atualizaStateGenerico("references", valor)
                    }
                  />
                </Box>
              </Box>
              <Box
                paddingTop={"16px"}
                justifyContent="end"
                width={"100%"}
                display={"flex"}
                gap={"24px"}
              >
                {!formularioDesabilitado && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleClickEditar();
                      toggleFormulario();
                    }}
                    color="warning"
                  >
                    Enviar dados
                  </Button>
                )}
                {formularioDesabilitado && (
                  <Button
                    variant="contained"
                    onClick={toggleFormulario}
                    color="info"
                  >
                    Editar formulario
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={toggleSnackBar}
      >
        <Alert
          onClose={toggleSnackBar}
          severity={updateSucesso ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {updateSucesso
            ? "Taxonomia editada com sucesso."
            : "Houve um erro ao tentar atualizar a taxonomia."}
        </Alert>
      </Snackbar>
    </>
  );
};
