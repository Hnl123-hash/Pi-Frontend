import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ParkIcon from "@mui/icons-material/Park";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { TabelaUsuarios } from "./component/tabela-usuarios/tabela-usuarios";
import { useUsuarios } from "./container/useUsuarios";
import { DetalhesUsuario } from "./component/detalhes-usuario/detalhes-usuario";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const Usuarios = () => {
  const {
    isCarregando,
    usuarios,
    toggleDialog,
    isDialogAberto,
    usuarioSelecionado,
    selecionaUsuario,
    isDialogNovoUsuarioAberto,
    toggleDialogNovoUsuario,
    handleOnCriarNovoUsuario,
    handleOnDeletarUsuario,
    handleOnAtualizarPermissoes,
  } = useUsuarios();

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
                  <IconButton
                    onClick={() => {
                      window.location.href = "/home";
                    }}
                  >
                    <MenuBookIcon />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
              <ListItem sx={{ justifyContent: "center" }}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <GroupIcon color="primary" />
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
                Lista de usuarios
              </Typography>

              <TabelaUsuarios
                isCarregando={isCarregando}
                usuarios={usuarios}
                onClickLinha={(index) => {
                  selecionaUsuario(index);
                  toggleDialog();
                }}
              />

              <Box
                display={"flex"}
                justifyContent={"end"}
                paddingBottom={"16px"}
              >
                <Button
                  variant="contained"
                  onClick={() => toggleDialogNovoUsuario()}
                >
                  Adicionar novo usuario
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Dialog open={isDialogAberto} onClose={toggleDialog} maxWidth="lg">
        <DialogContent>
          <DetalhesUsuario
            usuario={usuarioSelecionado}
            isNovoUsuario={false}
            onAtualizarPermissoes={(permissoes) =>
              handleOnAtualizarPermissoes(permissoes)
            }
            onDeletarUsuario={handleOnDeletarUsuario}
            onFechar={toggleDialog}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDialogNovoUsuarioAberto}
        onClose={toggleDialogNovoUsuario}
        maxWidth="lg"
      >
        <DialogContent>
          <DetalhesUsuario
            usuario={undefined}
            isNovoUsuario={true}
            onCriarNovoUsuario={(email, permissoes) => {
              handleOnCriarNovoUsuario(email, permissoes);
            }}
            onFechar={toggleDialogNovoUsuario}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
