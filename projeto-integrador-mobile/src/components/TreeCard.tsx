import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported"; // Ícone para placeholder

interface TreeCardProps {
  tree: {
    descricao: string;
    scientificName: string;
    imageUrl: string;
  };
  onClick?: () => void; // Função opcional para lidar com cliques
}

export const TreeCard: React.FC<TreeCardProps> = ({ tree, onClick }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        onClick={onClick}
        component="div"
        sx={{
          height: 190,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.200",
        }}
      >
        {tree.imageUrl ? (
          <img
            src={tree.imageUrl}
            alt={tree.scientificName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <ImageNotSupportedIcon sx={{ fontSize: 60, color: "grey.500" }} />
        )}
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {tree.scientificName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tree.descricao}
        </Typography>
      </CardContent>
    </Card>
  );
};
