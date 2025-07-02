import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

interface MapaComMarcadorProps {
  center: { lat: number; lng: number };
}

export const MapaComMarcador = ({ center }: MapaComMarcadorProps) => {
  const apiKey = "CHAVE_DA_API_DO_GOOGLE_MAPS"; // Substitua pela sua chave da API do Google Maps

  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      setMapLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      const scriptElement = document.querySelector(`script[src*="${apiKey}"]`);
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
      // @ts-expect-error erro
      delete window.initMap;
    };
  }, [apiKey]);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 13,
      });
      new window.google.maps.Marker({
        position: center,
        map: map,
      });
    }
  }, [mapLoaded]);

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "grey.100",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: "800px",
          height: "600px",
          p: 2,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          Mapa Interativo
        </Typography>
        <Box
          sx={{
            height: "calc(100% - 48px)",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {mapLoaded ? (
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          ) : (
            <Box
              sx={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <CircularProgress />
              <Typography>Carregando Mapa...</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

declare global {
  interface Window {
    initMap: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any;
  }
}
