import { useEffect, useState } from "react";
import type { ExemplarEntityComId } from "../service/exemplares/exemplares.types";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { TreeCard } from "../components/TreeCard";
import {
  buscaExemplaresPorNomeCientifico,
  buscaExemplaresPorNomePopular,
} from "../service/exemplares/exemplares";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const useBuscaExemplares = () => {
  const [exemplares, setExemplares] = useState<ExemplarEntityComId[]>([]);
  const [stringBuscaPopular, setStringBuscaPopular] = useState("");
  const [stringBuscaCientifico, setStringBuscaCientifico] = useState("");
  const [paginacao, setPaginacao] = useState({
    total: 0,
    quantidadePorPagina: 8,
    paginaAtual: 1,
  });

  const { stringBusca, tipoBusca } = useParams();

  console.log("stringBusca:", stringBusca, "tipoBusca:", tipoBusca);

  const buscarDadosExemplares = async (qnt: number, paginaAtual: number) => {
    if (tipoBusca === "busca-cientifico") {
      try {
        const { data, total } = await buscaExemplaresPorNomeCientifico(
          stringBusca ?? "",
          paginaAtual,
          qnt
        );
        setExemplares(data);
        setPaginacao((prev) => ({
          ...prev,
          total,
        }));
      } catch (error) {
        console.error("Erro ao buscar exemplares:", error);
      }
    } else {
      try {
        const { data, total } = await buscaExemplaresPorNomePopular(
          stringBusca ?? "",
          paginaAtual,
          qnt
        );
        setExemplares(data);
        setPaginacao((prev) => ({
          ...prev,
          total,
        }));
      } catch (error) {
        console.error("Erro ao buscar exemplares:", error);
      }
    }
  };

  useEffect(() => {
    buscarDadosExemplares(paginacao.quantidadePorPagina, paginacao.paginaAtual);
  }, [paginacao.quantidadePorPagina, paginacao.paginaAtual]);

  const handleOnChangeBuscaPopular = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStringBuscaPopular(event.target.value);
  };

  const handleOnChangeBuscaCientifico = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStringBuscaCientifico(event.target.value);
  };

  const handleBusca = async () => {
    if (stringBuscaPopular) {
      window.location.href = `/exemplares/busca-popular/${stringBuscaPopular}`;
    } else if (stringBuscaCientifico) {
      window.location.href = `/exemplares/busca-cientifico/${stringBuscaCientifico}`;
    }
  };

  const isBuscaDisabled =
    (stringBuscaPopular === "" && stringBuscaCientifico === "") ||
    (stringBuscaPopular !== "" && stringBuscaCientifico !== "");

  const handleOnClickExemplar = (id: string) => {
    window.location.href = `/exemplares/${id}`;
  };

  const handleVoltar = () => {
    window.history.back(); // Volta para a página anterior
  };

  return {
    exemplares,
    paginacao,
    setPaginacao,
    handleOnChangeBuscaCientifico,
    handleOnChangeBuscaPopular,
    isBuscaDisabled,
    handleBusca,
    tipoBusca,
    stringBusca,
    handleOnClickExemplar,
    handleVoltar,
  };
};

export const BuscaExemplar = () => {
  const {
    exemplares,
    paginacao,
    setPaginacao,
    handleOnChangeBuscaCientifico,
    handleOnChangeBuscaPopular,
    isBuscaDisabled,
    handleBusca,
    tipoBusca,
    stringBusca,
    handleOnClickExemplar,
    handleVoltar,
  } = useBuscaExemplares();

  return (
    <Box sx={{ bgcolor: "grey.100" }}>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="voltar"
            onClick={handleVoltar}
            sx={{ color: "text.primary" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "text.primary" }}
            >
              Jardim Botânico UFSM
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ bgcolor: "grey.100", minHeight: "100vh" }}>
        <Box
          sx={{
            pt: 8,
            pb: 8,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container maxWidth="md">
            <Paper
              elevation={8}
              sx={{
                p: 4,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(4px)",
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  fontWeight="bold"
                >
                  Procure uma árvore pelo nome
                </Typography>
              </Box>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                {tipoBusca === "busca-cientifico" ? (
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Nome científico. Exemplo: Laranjeira"
                    name="scientificName"
                    autoFocus
                    onChange={handleOnChangeBuscaCientifico}
                  />
                ) : (
                  <TextField
                    margin="normal"
                    fullWidth
                    name="commonName"
                    label="Nome popular. Exemplo: Laranjeira"
                    onChange={handleOnChangeBuscaPopular}
                  />
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  disabled={isBuscaDisabled}
                  onClick={handleBusca}
                >
                  Pesquisar
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            color="text.primary"
            paddingBottom={2}
          >
            Exibindo resultados para: <strong>{stringBusca}</strong>
          </Typography>
          <Box
            display={"grid"}
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={2}
          >
            {exemplares &&
              exemplares.map((tree) => (
                <Box key={tree.id}>
                  <TreeCard
                    tree={{
                      descricao: tree.descricao ?? "Descrição não disponível",
                      imageUrl: tree.fotos?.[0] ?? "",
                      scientificName: tree.taxonomia.nome_cientifico,
                    }}
                    onClick={() => handleOnClickExemplar(tree.id)}
                  />
                </Box>
              ))}

            {exemplares.length === 0 && (
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
              >
                Nenhum exemplar encontrado para a busca:{" "}
                <strong>{stringBusca}</strong>
              </Typography>
            )}
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            sx={{ mt: 4, mb: 2 }}
            padding={2}
            gap={4}
          >
            <Button
              variant="contained"
              onClick={() =>
                setPaginacao((prev) => ({
                  ...prev,
                  paginaAtual: Math.max(1, prev.paginaAtual - 1),
                }))
              }
              disabled={paginacao.paginaAtual === 1}
              size="large"
            >
              Anterior
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                setPaginacao((prev) => ({
                  ...prev,
                  paginaAtual: prev.paginaAtual + 1,
                }))
              }
              disabled={
                paginacao.paginaAtual * paginacao.quantidadePorPagina >=
                paginacao.total
              }
              size="large"
            >
              Próximo
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
