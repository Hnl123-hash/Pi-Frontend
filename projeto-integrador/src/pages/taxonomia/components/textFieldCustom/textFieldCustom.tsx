import { TextField } from "@mui/material";
import type { FC } from "react";

interface ITextFieldCustom {
  label: string;
  onChangeProp: (valor: string) => void;
  defaultValue: string;
  disabled: boolean;
}

export const TextFieldCustom: FC<ITextFieldCustom> = ({
  label,
  onChangeProp,
  defaultValue,
  disabled,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      defaultValue={defaultValue}
      disabled={disabled}
      slotProps={{ inputLabel: { shrink: true } }}
      onChange={(event) => {
        onChangeProp(event.target.value);
      }}
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "rgba(0, 0, 0, 0.87)", // Cor do texto
        },
      }}
    />
  );
};
