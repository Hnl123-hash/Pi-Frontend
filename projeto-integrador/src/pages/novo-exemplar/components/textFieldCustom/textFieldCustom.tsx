import { TextField } from "@mui/material";
import type { FC } from "react";

interface ITextFieldCustom {
  label: string;
  onChangeProp: (valor: string) => void;
  defaultValue: string;
  disabled: boolean;
  multiline?: boolean;
  onSubmit?: () => void;
}

export const TextFieldCustom: FC<ITextFieldCustom> = ({
  label,
  onChangeProp,
  defaultValue,
  disabled,
  multiline,
  onSubmit,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      defaultValue={defaultValue}
      disabled={disabled}
      slotProps={{ inputLabel: { shrink: true } }}
      multiline={multiline}
      rows={multiline ? 4 : 1}
      onChange={(event) => {
        onChangeProp(event.target.value);
      }}
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "rgba(0, 0, 0, 0.87)", // Cor do texto
        },
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" && onSubmit) {
          event.preventDefault(); // Evita o comportamento padrão de nova linha
          onSubmit();
        }
      }}
    />
  );
};
