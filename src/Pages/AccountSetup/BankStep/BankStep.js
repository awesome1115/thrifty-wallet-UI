import React from "react";
import { Input, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

import styles from "./BankStep.module.css";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

const BankStep = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={!isMobile ? 5 : 3} bgcolor="background.paper">
      <Typography
        variant={!isMobile ? "h4" : "h3"}
        color="primary"
        fontWeight={700}
      >
        Bank Details
      </Typography>
      {!isMobile ? (
        <Typography className={styles.textUnderScore}></Typography>
      ) : (
        <Box width={"10%"}>
          <GrowwBar />
        </Box>
      )}
      <Box mt={!isMobile ? 4 : 8}>
        <Typography variant="body2" mb={1}>
          Account holder name
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Typography variant="body2" mt={3} mb={1}>
          IFSC Code
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Typography variant="body2" mt={3} mb={1}>
          Account Number
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
        <Typography variant="body2" mt={3} mb={1}>
          Confirm account number
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

export default BankStep;
