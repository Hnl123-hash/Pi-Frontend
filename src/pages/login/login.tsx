import {
  Box,
  Button,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLogin } from "./container/useLogin";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const Login = () => {
  const {
    email,
    handleOnChangeEmail,
    handleOnChangeSenha,
    handleOnLogin,
    senha,
    erroLogin,
    isNovoUsuario,
    comparaSenhas,
    handleNovoUsuario,
    handleOnChangeSenhaTemp,
    senhaTemp,
  } = useLogin();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"90vh"}
      gap={"36px"}
    >
      <Paper sx={{ width: "fit-content" }}>
        <Box display={"flex"} justifyContent={"end"}>
          <Box position={"absolute"} padding={"4px"}>
            <Tooltip
              title={"Caso seja o seu primeiro login, deixe a senha em branco."}
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          minWidth={"500px"}
          width={"30vw"}
          padding={"24px"}
          gap={"24px"}
        >
          <Typography variant="h4" textAlign={"center"}>
            {isNovoUsuario ? "Defina sua senha" : "Faça seu login"}
          </Typography>

          {!isNovoUsuario && (
            <>
              <TextField
                label="Email"
                type="email"
                onChange={(event) => handleOnChangeEmail(event.target.value)}
                value={email}
                error={!!erroLogin}
              />

              <TextField
                label="Senha"
                type="password"
                onChange={(event) => handleOnChangeSenha(event.target.value)}
                value={senha}
                error={!!erroLogin}
                helperText={erroLogin}
              />

              <Button variant="contained" onClick={handleOnLogin}>
                Login
              </Button>
            </>
          )}

          {isNovoUsuario && (
            <>
              <TextField
                label="Senha"
                type="password"
                onChange={(event) => handleOnChangeSenha(event.target.value)}
                value={senha}
                error={!comparaSenhas()}
              />

              <TextField
                label="Confirme sua senha"
                type="password"
                onChange={(event) =>
                  handleOnChangeSenhaTemp(event.target.value)
                }
                value={senhaTemp}
                error={!comparaSenhas()}
              />

              <Button
                variant="contained"
                onClick={handleNovoUsuario}
                disabled={!comparaSenhas()}
              >
                Definir senha
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
