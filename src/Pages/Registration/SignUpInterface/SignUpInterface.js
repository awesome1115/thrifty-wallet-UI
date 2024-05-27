import React, { Suspense, useState } from "react";

// Material UI
import {
  Button,
  Checkbox,
  Grid,
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
import styles from "./SignUpInterface.module.css";

// Router
import { useNavigate } from "react-router-dom";

// Logo
import MainVectorLogo from "../../../assets/mainLogo.svg";

// Illustration
import SignUpImageDark from "../../../assets/authenticationImages/signUpDark.svg";
import SignUpImageLight from "../../../assets/authenticationImages/SignUpLight.svg";

// Loader Component
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

// Authentication Hook
import useAuth from "../../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const SignUpInterface = () => {
  // States
  const [userInfo, setUserInfo] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

  // Authentication
  const { registerUser, isLoading, authError } = useAuth();

  // Theme
  const theme = useTheme();
  // Breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // Router
  const navigate = useNavigate();

  const handleUserInfo = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newUserInfo = { ...userInfo };
    newUserInfo[field] = value;
    setUserInfo(newUserInfo);
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    if (!userInfo.email) {
      setFormError("Please enter an email first");
    } else if (!userInfo.password) {
      setFormError("Please provide a password");
    } else if (userInfo.password !== userInfo.confirmPassword) {
      setFormError("Password is not matching!");
    } else {
      setFormError("");
      registerUser(userInfo.email, userInfo.confirmPassword, navigate);
    }
  };

  return (
    <React.Fragment>
      {!isMobile && (
        <Box
          bgcolor={theme.palette.background.default}
          className={styles.mainBox}
        >
          <Grid
            container
            columns={{ xs: 1, md: 12 }}
            spacing={{ xs: 3, md: 8 }}
          >
            <Grid item xs={12} md={1}>
              <Box onClick={() => navigate("/")} className={styles.logoBox}>
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{
                        backgroundColor: `${
                          theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                        }`,
                      }}
                    />
                  }
                >
                  <LazyImageComponent
                    style={{ width: "50px", height: "50px" }}
                    src={MainVectorLogo}
                  />
                </Suspense>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={styles.registerBox}>
                {/* Form Section */}
                <Box
                  className={styles.contentBox}
                  borderRadius="10px"
                  bgcolor={theme.palette.background.paper}
                >
                  <Box p={5}>
                    <Typography
                      className={styles.titleBox}
                      variant="h3"
                      color="primary"
                      fontWeight={700}
                    >
                      Sign Up
                    </Typography>
                    <Typography className={styles.textUnderScore}></Typography>
                    <Box component="form" onSubmit={handleRegisterUser} mt={4}>
                      <Stack spacing={1} mb={2}>
                        <Typography
                          variant="body1"
                          color={theme.palette.text.primary}
                        >
                          Email
                        </Typography>
                        <Input
                          disableUnderline
                          className="inputField"
                          type="email"
                          variant="outlined"
                          size="small"
                          color="secondary"
                          name="email"
                          onChange={handleUserInfo}
                        />
                      </Stack>
                      <Stack spacing={1} mb={2}>
                        <Typography
                          color={theme.palette.text.primary}
                          variant="body1"
                        >
                          Password
                        </Typography>
                        <Input
                          disableUnderline
                          className="inputField"
                          type={showPassword ? "text" : "password"}
                          variant="outlined"
                          size="small"
                          color="secondary"
                          name="password"
                          onChange={handleUserInfo}
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
                      <Stack spacing={1} mb={2}>
                        <Typography
                          color={theme.palette.text.primary}
                          variant="body1"
                        >
                          Confirm Password
                        </Typography>
                        <Input
                          disableUnderline
                          className="inputField"
                          type={showPasswordConfirmed ? "text" : "password"}
                          variant="outlined"
                          size="small"
                          color="secondary"
                          name="confirmPassword"
                          onChange={handleUserInfo}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowPasswordConfirmed(
                                    !showPasswordConfirmed
                                  )
                                }
                              >
                                {!showPasswordConfirmed ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <Typography my={1} variant="small" color="error">
                          {formError}
                        </Typography>
                        {authError && (
                          <Typography
                            sx={{
                              display: "inline-block",
                              textTransform: "capitalize",
                            }}
                            my={1}
                            variant="small"
                            color="error"
                          >
                            {authError.slice(22, -2).split("-").join(" ")}
                          </Typography>
                        )}
                      </Stack>
                      <Stack spacing={1} mb={2}>
                        <Typography
                          color={theme.palette.text.primary}
                          variant="body1"
                        >
                          Referral Code
                        </Typography>
                        <Input
                          disableUnderline
                          className="inputField"
                          type="text"
                          variant="outlined"
                          size="small"
                          color="secondary"
                          name="referralCode"
                        />
                      </Stack>
                      <Stack direction="row" alignItems="center" mb={1}>
                        <Checkbox
                          onChange={() => setIsCheck(!isCheck)}
                          sx={{ ml: -1.5 }}
                        />
                        <Typography
                          color={theme.palette.text.primary}
                          variant="body2"
                          fontWeight={300}
                        >
                          I agree to Terms & conditions of Thrifty Wallet
                        </Typography>
                      </Stack>
                      <Stack mb={2}>
                        {isLoading ? (
                          <LoadingButton loading variant="outlined">
                            Sign Up
                          </LoadingButton>
                        ) : (
                          <>
                            {theme.palette.mode === "dark" ? (
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                              >
                                Sign Up
                              </Button>
                            ) : (
                              <LightUIButtonPrimary
                                type="submit"
                                variant="contained"
                                color="primary"
                              >
                                Sign Up
                              </LightUIButtonPrimary>
                            )}
                          </>
                        )}
                      </Stack>
                      <Stack mb={4} alignItems="center">
                        <Typography
                          color={theme.palette.text.primary}
                          variant="body2"
                          fontWeight={300}
                          sx={{ textDecoration: "underline" }}
                        >
                          Already have an account?{" "}
                          <Typography
                            component="span"
                            color="primary"
                            variant="body2"
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate("/login/sign-in")}
                          >
                            Sign In
                          </Typography>
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
                                  sx={{
                                    backgroundColor: `${
                                      theme.palette.mode === "dark"
                                        ? "#111"
                                        : "#f5f5f5"
                                    }`,
                                  }}
                                />
                              }
                            >
                              <LazyImageComponent
                                className={styles.providerLogos}
                                src={GoogleIcon}
                              />
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
                                  sx={{
                                    backgroundColor: `${
                                      theme.palette.mode === "dark"
                                        ? "#111"
                                        : "#f5f5f5"
                                    }`,
                                  }}
                                />
                              }
                            >
                              <LazyImageComponent
                                className={styles.providerLogos}
                                src={TwitterIcon}
                              />
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
                                  sx={{
                                    backgroundColor: `${
                                      theme.palette.mode === "dark"
                                        ? "#111"
                                        : "#f5f5f5"
                                    }`,
                                  }}
                                />
                              }
                            >
                              <LazyImageComponent
                                className={styles.providerLogos}
                                src={FacebookIcon}
                              />
                            </Suspense>
                          </IconButton>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className={styles.illustrationBox}
                bgcolor={
                  theme.palette.mode === "dark"
                    ? "#2B2B2B"
                    : "rgba(255, 230, 0, 0.13)"
                }
              >
                <Suspense fallback={<ComponentLoader />}>
                  {theme.palette.mode === "dark" ? (
                    <LazyImageComponent
                      className={styles.signUpIMageStyle}
                      src={SignUpImageDark}
                    />
                  ) : (
                    <LazyImageComponent
                      className={styles.signUpIMageStyle}
                      src={SignUpImageLight}
                    />
                  )}
                </Suspense>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {isMobile && (
        <Box
          bgcolor={theme.palette.background.paper}
          className={styles.registerBoxMobile}
        >
          {/* Form Section */}
          <Box
            className={styles.contentBoxMobile}
            bgcolor={theme.palette.background.paper}
          >
            <Box width="100%">
              <Typography variant="h3" color="primary" fontWeight={700}>
                Sign Up
              </Typography>
              <Box width={"10%"}>
                <GrowwBar />
              </Box>
              <Box component="form" onSubmit={handleRegisterUser} mt={8}>
                <Stack spacing={1} mb={2}>
                  <Typography
                    variant="body1"
                    color={theme.palette.text.primary}
                  >
                    Email
                  </Typography>
                  <Input
                    disableUnderline
                    className="inputField"
                    type="email"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    name="email"
                    onChange={handleUserInfo}
                  />
                </Stack>
                <Stack spacing={1} mb={2}>
                  <Typography
                    color={theme.palette.text.primary}
                    variant="body1"
                  >
                    Password
                  </Typography>
                  <Input
                    disableUnderline
                    className="inputField"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    name="password"
                    onChange={handleUserInfo}
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
                <Stack spacing={1} mb={2}>
                  <Typography
                    color={theme.palette.text.primary}
                    variant="body1"
                  >
                    Confirm Password
                  </Typography>
                  <Input
                    disableUnderline
                    className="inputField"
                    type={showPasswordConfirmed ? "text" : "password"}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    name="confirmPassword"
                    onChange={handleUserInfo}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPasswordConfirmed(!showPasswordConfirmed)
                          }
                        >
                          {!showPasswordConfirmed ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <Typography my={2} variant="small" color="error">
                    {formError}
                  </Typography>
                </Stack>
                <Stack spacing={1} mb={2}>
                  <Typography
                    color={theme.palette.text.primary}
                    variant="body1"
                  >
                    Referral Code
                  </Typography>
                  <Input
                    disableUnderline
                    className="inputField"
                    type="text"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    name="referralCode"
                  />
                </Stack>
                <Stack direction="row" alignItems="center" mb={1}>
                  <Checkbox
                    sx={{ ml: -1.5 }}
                    onChange={() => setIsCheck(!isCheck)}
                  />
                  <Typography
                    color={theme.palette.text.primary}
                    variant="caption"
                    fontWeight={300}
                  >
                    I agree to Terms & conditions of Thrifty Wallet
                  </Typography>
                </Stack>
                <Stack mb={2}>
                  {isLoading ? (
                    <LoadingButton loading variant="outlined">
                      Sign Up
                    </LoadingButton>
                  ) : (
                    <>
                      {theme.palette.mode === "dark" ? (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Sign Up
                        </Button>
                      ) : (
                        <LightUIButtonPrimary
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Sign Up
                        </LightUIButtonPrimary>
                      )}
                    </>
                  )}
                </Stack>
                <Stack mb={4} alignItems="center">
                  <Typography
                    color={theme.palette.text.primary}
                    variant="body2"
                    fontWeight={300}
                    sx={{ textDecoration: "underline" }}
                  >
                    Already have an account?{" "}
                    <Typography
                      component="span"
                      color="primary"
                      variant="body2"
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate("/login/sign-in")}
                    >
                      Sign In
                    </Typography>
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
                            sx={{
                              backgroundColor: `${
                                theme.palette.mode === "dark"
                                  ? "#111"
                                  : "#f5f5f5"
                              }`,
                            }}
                          />
                        }
                      >
                        <LazyImageComponent
                          className={styles.providerLogos}
                          src={GoogleIcon}
                        />
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
                            sx={{
                              backgroundColor: `${
                                theme.palette.mode === "dark"
                                  ? "#111"
                                  : "#f5f5f5"
                              }`,
                            }}
                          />
                        }
                      >
                        <LazyImageComponent
                          className={styles.providerLogos}
                          src={TwitterIcon}
                        />
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
                            sx={{
                              backgroundColor: `${
                                theme.palette.mode === "dark"
                                  ? "#111"
                                  : "#f5f5f5"
                              }`,
                            }}
                          />
                        }
                      >
                        <LazyImageComponent
                          className={styles.providerLogos}
                          src={FacebookIcon}
                        />
                      </Suspense>
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default SignUpInterface;
