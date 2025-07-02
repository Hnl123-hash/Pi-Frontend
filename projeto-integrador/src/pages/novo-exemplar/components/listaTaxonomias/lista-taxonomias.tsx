import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { TextFieldCustom } from "../textFieldCustom/textFieldCustom";
import type { ITaxonomia } from "../../../../services/taxonomia/taxonomia.types";
import { useState, type FC } from "react";

interface IProps {
  onChange: (index: number) => void;
  taxonomias: ITaxonomia[];
  onChangeStringBusca: (value: string) => void;
  isCarregando?: boolean;
  onSubmit?: () => void;
}

export const ListaTaxonomias: FC<IProps> = ({
  onChange,
  taxonomias,
  onChangeStringBusca,
  onSubmit,
  isCarregando,
}) => {
  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);

  return (
    <Box sx={{ width: "100%" }}>
      <Box display={"flex"} flexDirection="row" gap={2} alignItems="center">
        <Typography variant="h6" minWidth={"fit-content"}>
          Buscar Taxonomia :
        </Typography>
        <Box maxWidth={"400px"} width={"100%"}>
          <TextFieldCustom
            label="Pesquisar taxonomia"
            onChangeProp={onChangeStringBusca}
            defaultValue=""
            disabled={false}
            onSubmit={onSubmit}
          />
        </Box>
      </Box>
      <Typography variant="body2" mt={2} color="text.secondary">
        Resultados:
      </Typography>
      <Divider />
      <List>
        {taxonomias.map((taxonomia, index) => (
          <Box
            border={1}
            borderColor="grey.300"
            borderRadius={1}
            mb={1}
            key={index}
          >
            <ListItem
              key={index}
              onClick={() => {
                setItemSelecionado(index);
                onChange(index);
              }}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "grey.100",
                },
                maxHeight: "30px",
                backgroundColor:
                  itemSelecionado === index ? "grey.200" : "transparent",
              }}
            >
              <ListItemText>{taxonomia.nome_cientifico}</ListItemText>
            </ListItem>
          </Box>
        ))}

        {taxonomias.length === 0 && !isCarregando && (
          <ListItem>
            <ListItemText
              sx={{ textAlign: "center", color: "text.secondary" }}
              primary="Nenhuma taxonomia encontrada"
            />
          </ListItem>
        )}

        {isCarregando && (
          <ListItem>
            <ListItemText
              sx={{ textAlign: "center", color: "text.secondary" }}
              primary="Carregando..."
            />
          </ListItem>
        )}
      </List>
    </Box>
  );
};
