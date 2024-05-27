import React, { Suspense } from "react";

import { Box } from "@mui/system";
import { Grid, Skeleton, useMediaQuery } from "@mui/material";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// React Router
import { Outlet, useLocation } from "react-router-dom";

// MainLogo
import MainLogo from "../../assets/mainLogo.svg";

// Styles
import styles from "./Login.module.css";

// Illustration
import SignInImageDark from "../../assets/authenticationImages/loginDark.svg";
import SignInImageLight from "../../assets/authenticationImages/loginLight.svg";
import ResetPassDark from "../../assets/authenticationImages/ResetPassDark.svg";
import ResetPassLight from "../../assets/authenticationImages/ResetPassLight.svg";
import ForgotPassDark from "../../assets/authenticationImages/ForgotPassDark.svg";
import ForgotPassLight from "../../assets/authenticationImages/ForgotPassLight.svg";
import OTPImageDark from "../../assets/authenticationImages/otpDark.svg";
import OTPImageLight from "../../assets/authenticationImages/otpLight.svg";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

// Lazy Load Image COmponent
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

const Login = () => {
  const theme = useTheme();
  const location = useLocation();

  // For mobile devices only
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box bgcolor={theme.palette.background.default}>
      {/* For Bigger Devices */}
      {!isMobile && (
        <Box
          bgcolor={theme.palette.background.default}
          className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
        >
          <Grid container columns={{ xs: 1, md: 12 }}>
            <Grid item xs={1} md={1}>
              <Box className={styles.logoBox}>
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={60}
                      height={60}
                    />
                  }
                >
                  <LazyImageComponent
                    style={{ width: "50px", height: "50px" }}
                    src={MainLogo}
                  />
                </Suspense>
              </Box>
            </Grid>
            <Grid item xs={1} md={6}>
              <Outlet />
            </Grid>
            <Grid item xs={1} md={5}>
              <Box
                className={styles.illustrationBox}
                bgcolor={
                  theme.palette.mode === "dark"
                    ? "#2b2b2b"
                    : "rgba(255, 230, 0, 0.13)"
                }
              >
                {location.pathname === "/login/sign-in" && (
                  <Suspense fallback={<ComponentLoader />}>
                    {theme.palette.mode === "dark" ? (
                      <LazyImageComponent
                        className={styles.loginImage}
                        src={SignInImageDark}
                      />
                    ) : (
                      <LazyImageComponent
                        className={styles.loginImage}
                        src={SignInImageLight}
                      />
                    )}
                  </Suspense>
                )}
                {location.pathname === "/login/forgot-pass" && (
                  <Suspense fallback={<ComponentLoader />}>
                    {theme.palette.mode === "dark" ? (
                      <LazyImageComponent
                        className={styles.forgotPassImage}
                        src={ForgotPassDark}
                      />
                    ) : (
                      <LazyImageComponent
                        className={styles.forgotPassImage}
                        src={ForgotPassLight}
                      />
                    )}
                  </Suspense>
                )}
                {location.pathname === "/login/reset-pass" && (
                  <Suspense fallback={<ComponentLoader />}>
                    {theme.palette.mode === "dark" ? (
                      <LazyImageComponent
                        className={styles.resetPassImage}
                        src={ResetPassDark}
                      />
                    ) : (
                      <LazyImageComponent
                        className={styles.resetPassImage}
                        src={ResetPassLight}
                      />
                    )}
                  </Suspense>
                )}
                {location.pathname === "/login/otp-verification" && (
                  <Suspense fallback={<ComponentLoader />}>
                    {theme.palette.mode === "dark" ? (
                      <LazyImageComponent
                        className={styles.otpImage}
                        src={OTPImageDark}
                      />
                    ) : (
                      <LazyImageComponent
                        className={styles.otpImage}
                        src={OTPImageLight}
                      />
                    )}
                  </Suspense>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* For Mobile Devices */}
      <Box bgcolor={theme.palette.background.paper}>
        {isMobile && <Outlet />}
      </Box>
    </Box>
  );
};

export default Login;
