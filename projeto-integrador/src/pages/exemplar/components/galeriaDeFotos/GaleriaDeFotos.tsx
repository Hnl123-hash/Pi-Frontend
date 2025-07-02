import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Este componente espera receber as fotos e a função de remoção como props
interface GaleriaDeFotosProps {
  fotos: string[];
  onRemoverFoto: (index: number) => void;
}

export const GaleriaDeFotos = ({
  fotos,
  onRemoverFoto,
}: GaleriaDeFotosProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!fotos || fotos.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        Nenhuma foto disponível.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="row" gap="16px" flexWrap="wrap">
      {fotos.map((foto, index) => (
        <Box
          key={index}
          position="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          sx={{ width: 100, height: 100 }}
        >
          <img
            src={foto}
            alt={`Foto ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              objectFit: "cover",
              display: "block",
              filter: hoveredIndex === index ? "brightness(40%)" : "none",
              transition: "filter 0.2s ease-in-out",
            }}
          />
          {hoveredIndex === index && (
            <Box
              onClick={() => onRemoverFoto(index)}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
              }}
            >
              <DeleteIcon fontSize="large" />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
