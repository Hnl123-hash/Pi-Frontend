import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MapaComMarcador } from "../components/Mapa";
import type { ExemplarEntityComId } from "../service/exemplares/exemplares.types";
import { useParams } from "react-router-dom";
import { buscaExemplarPorId } from "../service/exemplares/exemplares";
import { ImageCarousel } from "../components/Carossel";

const useExemplarDetalhe = () => {
  const [exemplar, setExemplar] = useState<ExemplarEntityComId | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  const buscaDados = async () => {
    setLoading(true);
    const response = await buscaExemplarPorId(id ?? "");
    if (response) {
      setExemplar(response);
    } else {
      setExemplar(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    buscaDados();
  }, []);

  const handleVoltar = () => {
    window.history.back(); // Volta para a página anterior
  };

  return { exemplar, loading, handleVoltar };
};

export const Exemplar = () => {
  const { exemplar, loading, handleVoltar } = useExemplarDetalhe();

  if (loading) {
    return <Typography>Carregando...</Typography>; // Ou um componente de Skeleton
  }

  if (!exemplar) {
    return <Typography>Exemplar não encontrado.</Typography>;
  }

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

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="text.primary"
        >
          {exemplar.taxonomia.nome_cientifico}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
          <Box
            sx={{ flex: "1 1 300px" }}
            display={"flex"}
            justifyContent={"center"}
          >
            <ImageCarousel
              imageList={
                exemplar.fotos?.map((foto) => {
                  return {
                    label: "Imagem do Exemplar",
                    imgPath: foto,
                  };
                }) ?? []
              }
            />
          </Box>
        </Box>

        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            mb: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            Taxonomia
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={4}
            mb={2}
            textAlign={"justify"}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Nome científico
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#38761d", fontWeight: "medium" }}
              >
                {exemplar.taxonomia.nome_cientifico}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Nome popular
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#38761d", fontWeight: "medium" }}
              >
                {exemplar.taxonomia.nomesPopulares?.[0]?.vernacularName ||
                  "Não disponível"}
              </Typography>
            </Box>
          </Box>

          <Box textAlign={"justify"}>
            <Typography variant="subtitle2" color="text.secondary">
              Especie - Genero - Familia - Ordem - Classe - Divisão
            </Typography>
            <Typography variant="body1" sx={{ color: "#38761d" }}>
              {`${exemplar.taxonomia.especie} - ${
                exemplar.taxonomia.genero
              } - ${exemplar.taxonomia.familia} - ${
                exemplar.taxonomia.order
              } - ${exemplar.taxonomia.class} - ${
                exemplar.taxonomia.divisao ?? "Não disponível"
              }`}
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            mb: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            Detalhes do Exemplar
          </Typography>
          <Box textAlign={"justify"}>
            <Typography variant="subtitle2" color="text.secondary">
              Descrição
            </Typography>
            <Typography variant="body1" sx={{ color: "#38761d" }}>
              {exemplar.descricao}
            </Typography>
          </Box>
          <Box textAlign={"justify"}>
            <Typography variant="subtitle2" color="text.secondary">
              Prescedencia
            </Typography>
            <Typography variant="body1" sx={{ color: "#38761d" }}>
              {exemplar.precedencia || "Não disponível"}
            </Typography>
          </Box>

          <Box textAlign={"justify"}>
            <Typography variant="subtitle2" color="text.secondary">
              Identificador
            </Typography>
            <Typography variant="body1" sx={{ color: "#38761d" }}>
              {exemplar.identificadorJardim || "Não disponível"}
            </Typography>
          </Box>

          <Box textAlign={"justify"}>
            <Typography variant="subtitle2" color="text.secondary">
              Referencia
            </Typography>
            <Link>{exemplar.taxonomia.references || "Não disponível"}</Link>
          </Box>
        </Paper>

        <MapaComMarcador
          center={{
            lat: exemplar.localizacao?.lat ?? 0,
            lng: exemplar.localizacao?.lon ?? 0,
          }}
        />
      </Container>
    </Box>
  );
};
