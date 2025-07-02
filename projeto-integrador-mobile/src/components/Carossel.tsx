import { useTheme, type Theme } from "@mui/material/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, MobileStepper, Button } from "@mui/material";
import React from "react";

type Image = {
  label: string;
  imgPath: string;
};

interface ImageCarouselProps {
  imageList: Image[];
}

export const ImageCarousel = ({ imageList }: ImageCarouselProps) => {
  const theme = useTheme<Theme>();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imageList.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        component="img"
        sx={{
          height: 400,
          display: "block",
          maxWidth: 600,
          overflow: "hidden",
          width: "100%",
          objectFit: "cover", // Garante que a imagem cubra a área sem distorção
        }}
        src={imageList[activeStep].imgPath}
        alt={imageList[activeStep].label}
      />
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Próximo
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Anterior
          </Button>
        }
      />
    </Box>
  );
};
