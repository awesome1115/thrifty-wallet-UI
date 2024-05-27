import React, { Suspense, useState } from "react";

// Material UI
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Icons
import GoogleIcon from "../../../assets/googleFlatColorIcon.svg";
import TwitterIcon from "../../../assets/twitterFlatColorIcon.svg";
import FacebookIcon from "../../../assets/facebookFlatColorIcon.svg";

// CSS Module
import styles from "./SignInInterface.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const SignInInterface = () => {
  // State
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passError, setPassError] = useState("");

  // Hooks
  const { logInUser, authError, isLoading } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Fake login creds
  const fakeEmail = "john@doe.com";
  const fakePass = "123456";

  const handleLoginUser = (e) => {
    e.preventDefault();

    logInUser(
      userEmail ? userEmail : fakeEmail,
      userPass ? userPass : fakePass,
      location,
      navigate
    );
  };

  return (
    <Box
      bgcolor={
        !isMobile
          ? theme.palette.background.default
          : theme.palette.background.paper
      }
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    >
      <Box
        className={!isMobile ? styles.registerBox : styles.registerBoxMobile}
      >
        {/* Form Section */}
        <Box
          className={!isMobile ? styles.contentBox : styles.contentBoxMobile}
          sx={!isMobile ? { borderRadius: "10px" } : {}}
        >
          <Box
            bgcolor={theme.palette.background.paper}
            p={!isMobile ? 5 : 3}
            borderRadius="10px"
          >
            <Typography
              className={!isMobile ? styles.titleBox : ""}
              variant="h3"
              color="primary"
              fontWeight={700}
            >
              Welcome Back!
            </Typography>
            {!isMobile ? (
              <Typography className={styles.textUnderScore}></Typography>
            ) : (
              <Box width={"10%"}>
                <GrowwBar />
              </Box>
            )}
            <Box
              component="form"
              onSubmit={handleLoginUser}
              mt={!isMobile ? 4 : 8}
            >
              <Stack spacing={1} mb={2}>
                <Typography variant="body1" color={theme.palette.text.primary}>
                  Email
                </Typography>
                <Input
                  defaultValue={fakeEmail}
                  error={mailError ? true : false}
                  disableUnderline
                  className="inputField"
                  type="email"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  name="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                {mailError && (
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      display: "inline-block",
                    }}
                    my={1}
                    variant="small"
                    color="error"
                  >
                    {mailError}
                  </Typography>
                )}
              </Stack>
              <Stack spacing={1} mb={2}>
                <Typography variant="body1" color={theme.palette.text.primary}>
                  Password
                </Typography>
                <Input
                  defaultValue={fakePass}
                  error={passError ? true : false}
                  disableUnderline
                  className="inputField"
                  type={showPassword ? "text" : "password"}
                  variant="filled"
                  size="small"
                  color="secondary"
                  name="password"
                  onChange={(e) => setUserPass(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Stack>
              {authError && (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    display: "inline-block",
                  }}
                  my={1}
                  variant="small"
                  color="error"
                >
                  {authError.slice(22, -2).split("-").join(" ")}
                </Typography>
              )}
              {passError && (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    display: "inline-block",
                  }}
                  my={1}
                  variant="small"
                  color="error"
                >
                  {passError}
                </Typography>
              )}
              <Stack
                alignItems="flex-start"
                justifyContent="flex-start"
                spacing={1}
                mb={2}
              >
                <Typography
                  variant="body2"
                  component="span"
                  color="primary"
                  sx={{
                    borderBottom: "1px solid #F9E006",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/login/forgot-pass")}
                >
                  Forgot Password?
                </Typography>
              </Stack>
              <Stack mb={2}>
                {isLoading ? (
                  <LoadingButton loading variant="outlined">
                    Login
                  </LoadingButton>
                ) : (
                  <>
                    {theme.palette.mode === "dark" ? (
                      <Button type="submit" variant="contained" color="primary">
                        Login
                      </Button>
                    ) : (
                      <LightUIButtonPrimary
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Login
                      </LightUIButtonPrimary>
                    )}
                  </>
                )}
              </Stack>
              <Stack
                mb={4}
                alignItems="center"
                direction="row"
                justifyContent="center"
                spacing={0.2}
              >
                <Typography
                  variant="body2"
                  fontWeight={300}
                  sx={{ textDecoration: "underline" }}
                  color={theme.palette.text.primary}
                >
                  Don't have an account?{" "}
                </Typography>{" "}
                <Typography
                  onClick={() => navigate("/registration/sign-up")}
                  component="span"
                  color="primary"
                  variant="body2"
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Sign Up
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
              >
                <Box>
                  <IconButton>
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                      }
                    >
                      <LazyImageComponent src={GoogleIcon} />
                    </Suspense>
                  </IconButton>
                </Box>
                <Box>
                  <IconButton>
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                      }
                    >
                      <LazyImageComponent src={TwitterIcon} />
                    </Suspense>
                  </IconButton>
                </Box>
                <Box>
                  <IconButton>
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                      }
                    >
                      <LazyImageComponent src={FacebookIcon} />
                    </Suspense>
                  </IconButton>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInInterface;
