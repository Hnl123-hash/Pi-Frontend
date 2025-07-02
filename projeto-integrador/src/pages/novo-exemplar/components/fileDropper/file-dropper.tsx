import { Box, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { type FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface IProps {
  onChange: (files: File[]) => void;
  onDelete?: (index: number) => void;
  arquivos: File[];
}

export const FileDropper: FC<IProps> = ({ onChange, arquivos, onDelete }) => {
  return (
    <Box>
      <Box
        sx={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
          padding: "16px",
          textAlign: "center",
          cursor: "pointer",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const files = Array.from(e.dataTransfer.files);
          onChange(files);
        }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".jpg,.jpeg,.png";
          input.multiple = true;
          input.onchange = (e) => {
            const files = Array.from(
              (e.target as HTMLInputElement).files || []
            );
            onChange(files);
          };
          input.click();
        }}
      >
        <Typography variant="body1">Arraste e solte arquivos aqui</Typography>
        <Box textAlign={"center"} paddingTop={"8px"}>
          <AddIcon />
        </Box>
      </Box>
      {arquivos.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Arquivos selecionados:</Typography>
          <List>
            {arquivos.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon onClick={() => onDelete?.(index)}>
                  <DeleteIcon />
                </ListItemIcon>
                <Typography variant="body2">{file.name}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};
