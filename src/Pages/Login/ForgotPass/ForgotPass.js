import React from "react";
import {
  Button,
  Input,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";
// Router
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./ForgotPass.module.css";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

const ForgotPass = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      bgcolor="Background.default"
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    >
      <Box className={!isMobile ? styles.forgotBox : styles.forgotBoxMobile}>
        <Paper
          className={!isMobile ? styles.contentBox : styles.contentBoxMobile}
          elevation={0}
          sx={!isMobile ? { borderRadius: "10px" } : {}}
        >
          <Box
            bgcolor="background.paper"
            p={!isMobile ? 5 : 3}
            borderRadius="10px"
          >
            <Typography
              className={!isMobile ? styles.titleBox : ""}
              variant="h3"
              color="primary"
              fontWeight={700}
            >
              Forgot Password?
            </Typography>
            {!isMobile ? (
              <Typography className={styles.textUnderScore}></Typography>
            ) : (
              <Box width={"10%"}>
                <GrowwBar />
              </Box>
            )}
            <Box component="form" mt={!isMobile ? 4 : 8}>
              <Stack spacing={1} mb={2}>
                <Typography variant="body1">Email</Typography>
                <Input
                  disableUnderline
                  className="inputField"
                  type="email"
                  variant="outlined"
                  size="small"
                  color="secondary"
                />
              </Stack>
              <Stack mb={4}>
                {theme.palette.mode === "dark" ? (
                  <Button
                    onClick={() => navigate("/login/reset-pass")}
                    variant="contained"
                    color="primary"
                  >
                    Send reset link
                  </Button>
                ) : (
                  <LightUIButtonPrimary
                    onClick={() => navigate("/login/reset-pass")}
                    variant="contained"
                    color="primary"
                  >
                    Send reset link
                  </LightUIButtonPrimary>
                )}
              </Stack>
              <Stack justifyContent="flex-start" alignItems="flex-start">
                <Typography
                  variant="body2"
                  onClick={() => navigate("/login/sign-in")}
                  sx={{ borderBottom: "1px solid #F9E006", cursor: "pointer" }}
                >
                  Go back to{" "}
                  <Typography variant="body2" component="span" color="primary">
                    Login
                  </Typography>
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ForgotPass;
