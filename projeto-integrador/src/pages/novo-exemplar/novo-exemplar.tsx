import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { TextFieldCustom } from "./components/textFieldCustom/textFieldCustom";
import { FileDropper } from "./components/fileDropper/file-dropper";
import { useNovoExemplarContainer } from "./container/novo-exemplar.container";
import { ListaTaxonomias } from "./components/listaTaxonomias/lista-taxonomias";
import simbolo from "../../assets/simbolo.png";

export const NovoExemplar = () => {
  const {
    arquivos,
    handleOnChangeArquivo,
    handleOnDeleteArquivo,
    handleOnChangeStringBusca,
    taxonomias,
    buscarDadosTaxonomias,
    handleOnChangeDescricao,
    handleOnChangeIdade,
    handleOnChangeIdentificadorJardim,
    handleOnChangeLocalizacao,
    handleOnChangePrecedencia,
    handleOnSubmit,
    isCarregando,
    handleOnChangeTaxonomia,
    isFormularioValido,
  } = useNovoExemplarContainer();

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
          <Box display={"flex"} flexDirection={"row"}>
            <IconButton
              onClick={() => {
                window.history.back();
              }}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
            <Typography variant="h3" marginX={"16px"}>
              Jardim Botânico UFSM
            </Typography>
          </Box>
          <Paper>
            <Box
              paddingX={"16px"}
              paddingTop={"16px"}
              display="flex"
              flexDirection="column"
              gap={"16px"}
            >
              <Typography variant="h5">Precedencia e descrições</Typography>
              <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
                <Box display={"flex"} flexDirection={"row"} gap={"16px"}>
                  <TextFieldCustom
                    label="Identificador do Jardim"
                    defaultValue=""
                    disabled={false}
                    onChangeProp={(e) =>
                      handleOnChangeIdentificadorJardim(Number(e))
                    }
                  />
                  <TextFieldCustom
                    label="Idade"
                    defaultValue=""
                    disabled={false}
                    onChangeProp={(e) => handleOnChangeIdade(Number(e))}
                  />
                </Box>

                <TextFieldCustom
                  label="Descrição"
                  defaultValue=""
                  disabled={false}
                  multiline={true}
                  onChangeProp={(e) => handleOnChangeDescricao(e)}
                />
                <TextFieldCustom
                  label="Precedência"
                  defaultValue=""
                  disabled={false}
                  multiline={true}
                  onChangeProp={(e) => handleOnChangePrecedencia(e)}
                />
              </Box>

              <Typography variant="h5">Coordenadas geograficas</Typography>
              <Box display={"flex"} flexDirection={"row"} gap={"16px"}>
                <TextFieldCustom
                  label="Latitude"
                  defaultValue=""
                  disabled={false}
                  onChangeProp={(e) =>
                    handleOnChangeLocalizacao({ lat: Number(e) })
                  }
                />
                <TextFieldCustom
                  label="Longitude"
                  defaultValue=""
                  disabled={false}
                  onChangeProp={(e) =>
                    handleOnChangeLocalizacao({ lon: Number(e) })
                  }
                />
              </Box>

              <Typography variant="h5">Fotos do exemplar</Typography>

              <FileDropper
                onChange={handleOnChangeArquivo}
                arquivos={arquivos}
                onDelete={handleOnDeleteArquivo}
              />

              <Typography variant="h5">Taxonomia</Typography>

              <ListaTaxonomias
                onChange={(index) => {
                  handleOnChangeTaxonomia(index);
                }}
                taxonomias={taxonomias}
                onChangeStringBusca={handleOnChangeStringBusca}
                onSubmit={buscarDadosTaxonomias}
                isCarregando={isCarregando}
              />

              <Box
                display={"flex"}
                flexDirection={"row"}
                gap={"8px"}
                justifyContent={"end"}
                paddingBottom={"16px"}
              >
                <Button
                  variant="contained"
                  onClick={handleOnSubmit}
                  disabled={!isFormularioValido}
                >
                  Adicionar exemplar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};
