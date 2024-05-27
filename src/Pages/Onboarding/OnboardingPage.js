import React, { Suspense, useMemo, useState } from "react";
import { Box } from "@mui/system";
import {
  MobileStepper,
  Button,
  Typography,
  Stack,
  Skeleton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import FastForwardIcon from "@mui/icons-material/FastForward";

// Styles
import styles from "./OnboardingPage.module.css";
import StepComponent from "./StepComponent";

// Images
import StepOneImage from "../../assets/onboardingStepOneImage.svg";
import StepTwoImage from "../../assets/onboardingStepTwoImage.svg";
import StepThreeImage from "../../assets/onboardingStepThreeImage.svg";
import StepFourImage from "../../assets/onboardingStepFourImage.svg";
import StepFiveImage from "../../assets/onboardingStepFiveImage.svg";

// Logo
import MainOnboardingLogo from "../../assets/onboardingLogo.svg";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

const steps = [
  {
    image: StepOneImage,
    title: "Crypto Wallet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra urna, sit in luctus. Id sodales gravida amet risus arcu. Volutpat.",
  },
  {
    image: StepTwoImage,
    title: "Send & Receive Crypto",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra urna, sit in luctus. Id sodales gravida amet risus arcu. Volutpat.",
  },
  {
    image: StepThreeImage,
    title: "Fiat Wallet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra urna, sit in luctus. Id sodales gravida amet risus arcu. Volutpat.",
  },
  {
    image: StepFourImage,
    title: "Deposit & Withdraw Fund",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra urna, sit in luctus. Id sodales gravida amet risus arcu. Volutpat.",
  },
  {
    image: StepFiveImage,
    title: "Loyalty Wallet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra urna, sit in luctus. Id sodales gravida amet risus arcu. Volutpat.",
  },
];

const OnboardingPage = () => {
  const mode = "dark";
  const [activeStep, setActiveStep] = useState(0);

  const handleSkip = () => {
    setActiveStep(4);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  main: "#F9E006",
                },
                secondary: {
                  main: "#111111",
                },
                accent: {
                  main: "#6C63FF",
                },
                orange: {
                  main: "#FF5722",
                },
                error: {
                  main: "#FF003D",
                  dark: "#FF003F",
                },
                success: {
                  main: "#8DD070",
                  dark: "#58BD7D",
                },
                background: {
                  default: "#fdfdfd",
                  paper: "#fbfbfb",
                  surface: "#ffffff",
                  card: "#f8f8f8",
                  primary: "#F9E006",
                },
                text: {
                  primary: "#111111",
                  secondary: "#C4C4C4",
                  tertiary: "#F9E006",
                  success: "#58BD7D",
                  orange: "#FF9100",
                },
                common: {
                  black: "#111111",
                  white: "#ffffff",
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "#F9E006",
                },
                secondary: {
                  main: "#FFFFFF",
                },
                accent: {
                  main: "#6C63FF",
                },
                orange: {
                  main: "#FF5722",
                },
                error: {
                  main: "#FF003D",
                  dark: "#FF003F",
                },
                success: {
                  main: "#8DD070",
                  dark: "#58BD7D",
                },
                background: {
                  default: "#111111",
                  paper: "#252628",
                  surface: "#2B2B2B",
                  card: "#1B1B1B",
                  primary: "#F9E006",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#C4C4C4",
                  tertiary: "#F9E006",
                  success: "#58BD7D",
                  orange: "#FF9100",
                },
                common: {
                  black: "#111111",
                  white: "#ffffff",
                },
              }),
        },
        typography: {
          fontFamily: "'Poppins', sans-serif",
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 700,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        p={3}
        className={styles.mainBox}
        bgcolor={theme.palette.background.paper}
      >
        <Stack
          mb={8}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={styles.topBox}
        >
          <Box>
            <Suspense
              fallback={<Skeleton variant="circular" height={30} width={30} />}
            >
              <LazyImageComponent
                className={styles.logo}
                src={MainOnboardingLogo}
              />
            </Suspense>
          </Box>
          <Box>
            <Button
              onClick={activeStep < 4 ? handleSkip : () => {}}
              color="secondary"
              endIcon={<FastForwardIcon />}
            >
              <Typography variant="caption" color="secondary">
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href="/login/sign-in"
                >
                  Skip
                </a>
              </Typography>
            </Button>
          </Box>
        </Stack>
        <SwipeableViews
          containerStyle={{ width: "90vw" }}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {steps.map((step, index) => (
            <div key={step.title}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box component="div">
                  <StepComponent
                    image={step.image}
                    title={step.title}
                    content={step.message}
                  />
                </Box>
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        <Box className={styles.stepperBox}>
          <MobileStepper
            variant="dots"
            steps={5}
            position="static"
            activeStep={activeStep}
            sx={{
              background: `${
                theme.palette.mode === "dark" ? "#252628" : "#fbfbfb"
              }`,
            }}
          />
        </Box>
        {activeStep === 4 && (
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="/login/sign-in"
          >
            <Button sx={{ mt: 2 }} fullWidth variant="contained">
              Proceed
            </Button>
          </a>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default OnboardingPage;
