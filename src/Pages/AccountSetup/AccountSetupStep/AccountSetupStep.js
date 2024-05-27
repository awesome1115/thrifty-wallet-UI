import React, { useState } from "react";
import {
  Button,
  Typography,
  styled,
  Input,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import styles from "./AccountSetupStep.module.css";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

// Custom input style
const ImageInput = styled("input")({
  display: "none",
});

const AccountSetupStep = () => {
  const [userAvatar, setUserAvatar] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleImageUpload = (e) => {
    setUserAvatar(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box p={!isMobile ? 5 : 3} bgcolor="background.paper">
      <Typography
        variant={!isMobile ? "h4" : "h3"}
        color="primary"
        fontWeight={700}
      >
        Account Setup
      </Typography>
      {!isMobile ? (
        <Typography className={styles.textUnderScore}></Typography>
      ) : (
        <Box width={"10%"}>
          <GrowwBar />
        </Box>
      )}
      <Box className={styles.imageUploadBox}>
        {!userAvatar ? (
          <Box>
            <Box
              sx={{
                border: `${
                  theme.palette.mode === "dark"
                    ? "2px dashed #f5f5f5"
                    : "2px dashed #c4c4c4"
                }`,
              }}
              className={styles.imageBox}
            >
              <Typography
                sx={{
                  color: `${
                    theme.palette.mode === "dark" ? "#f5f5f5" : "#c4c4c4"
                  }`,
                }}
              >
                <AddPhotoAlternateIcon sx={{ fontSize: "2.5rem" }} />
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box className={styles.uploadedImageBox}>
            <img src={userAvatar} alt="User Name" />
          </Box>
        )}
        <Box>
          <Typography variant="body2" mb={2}>
            Upload your picture
          </Typography>
          <Box>
            {!userAvatar ? (
              <label htmlFor="icon-button-file-upload">
                <ImageInput
                  accept="image/*"
                  id="icon-button-file-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                <Button
                  variant="outlined"
                  aria-label="upload picture"
                  component="span"
                >
                  Upload
                </Button>
              </label>
            ) : (
              <Button onClick={() => setUserAvatar(null)} variant="outlined">
                Remove
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="body2" mb={1}>
          Username
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          autoCapitalize="off"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Typography variant="body2" mt={3} mb={1}>
          Phone number
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
      </Box>
    </Box>
  );
};

export default AccountSetupStep;
