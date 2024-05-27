import React, { useEffect, useRef } from "react";
import { Box } from "@mui/system";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";
import { useTheme } from "@mui/material/styles";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";
import { ReactPinField } from "react-pin-field";

// styles
import styles from "./OTPVerification.module.css";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const ref = useRef(null);

  useEffect(() => {
    ref.current?.inputs[0].focus();
  }, []);

  return (
    <Box
      bgcolor={isMobile ? theme.palette.background.paper : null}
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    >
      <Box className={!isMobile ? styles.contentBox : styles.contentBoxMobile}>
        <Box
          bgcolor={theme.palette.background.paper}
          className={
            !isMobile ? styles.verificationBox : styles.verificationBoxMobile
          }
        >
          <Typography
            variant="h3"
            className={!isMobile ? styles.titleBox : ""}
            color="primary"
            fontWeight={700}
          >
            OTP Verification
          </Typography>
          {!isMobile ? (
            <Typography className={styles.textUnderScore}></Typography>
          ) : (
            <Box width={"10%"}>
              <GrowwBar />
            </Box>
          )}
          <Typography
            color="secondary"
            variant="caption"
            mt={!isMobile ? 4 : 8}
            mb={2}
            component="p"
          >
            Enter the 5 Digit OTP sent to johndoe@gmail.com
          </Typography>
          <Box mt={2} mb={2}>
            <ReactPinField
              ref={ref}
              className={
                theme.palette.mode === "dark"
                  ? styles.pinFieldDark
                  : styles.pinFieldLight
              }
              onComplete={() => {}}
              type="password"
              validate="0123456789"
              inputMode="numeric"
              autoComplete="nope"
            />
          </Box>
          <Stack direction="row" alignItems="center" mb={4} spacing={0.2}>
            <Typography
              color="secondary"
              variant="caption"
              component="p"
              sx={{ textDecoration: "underline" }}
            >
              Didn’t recieved OTP?{" "}
            </Typography>
            <Typography
              sx={{ textDecoration: "underline" }}
              color="primary"
              variant="caption"
              component="span"
            >
              Resend OTP
            </Typography>
          </Stack>
          {theme.palette.mode === "dark" ? (
            <Button
              onClick={() => navigate("/wallets/crypto-wallet")}
              color="primary"
              variant="contained"
              fullWidth
            >
              Verify Account
            </Button>
          ) : (
            <LightUIButtonPrimary
              onClick={() => navigate("/wallets/crypto-wallet")}
              color="primary"
              variant="contained"
              fullWidth
            >
              Verify Account
            </LightUIButtonPrimary>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OTPVerification;
