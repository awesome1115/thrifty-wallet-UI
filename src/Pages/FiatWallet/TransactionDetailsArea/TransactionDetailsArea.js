import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Input,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

// Icons
import SearchIcon from "@mui/icons-material/Search";

// Styles
import styles from "./TransactionDetailsArea.module.css";

// Axios
import axios from "axios";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable/StyledTable";
import { DatePickerTextField } from "../../../components/DatePickerTextField/DatePickerTextField";

// Table Header
const tableHeader = [
  {
    name: "Amount",
  },
  {
    name: "Payment Method",
  },
  {
    name: "Transaction ID",
  },
  {
    name: "Time Stamp",
  },
  {
    name: "Status",
  },
];

const TransactionDetailsArea = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isReadOnlyDate, setIsReadOnlyDate] = useState({
    readOnlyToDate: true,
    readOnlyFromDate: true,
  });
  const [fromDateValue, setFromDateValue] = React.useState(null);
  const [toDateValue, setToDateValue] = React.useState(null);
  const [transactionData, setTransactionData] = useState([]);

  // Pages
  const [tablePage, setTablePage] = React.useState(0);
  const rowsPerPage = 10;

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // Fetching Data
  useEffect(() => {
    axios
      .get("/FiatTransactionData.json")
      .then((res) => setTransactionData(res.data));
  }, []);

  return (
    <Box className={styles.mainBox}>
      <Box className={styles.filterBox}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box className={styles.searchArea}>
            <Input
              readOnly={isReadOnly}
              disableUnderline
              className="inputField"
              size="small"
              placeholder="Search"
              id="filled-adornment-password"
              startAdornment={
                <InputAdornment position="start">
                  <Box className={styles.searchBox}>
                    <IconButton edge="start">
                      <SearchIcon color="secondary" />
                    </IconButton>
                  </Box>
                </InputAdornment>
              }
              onBlur={() => setIsReadOnly(true)}
              onFocus={() => setIsReadOnly(false)}
            />
          </Box>
          <Box>
            <Stack
              direction="row"
              spacing={4}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Box className={styles.datePickerArea}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack direction="row" spacing={3}>
                    <DatePicker
                      disableFuture
                      label="From Date"
                      value={fromDateValue}
                      onChange={(newValue) => {
                        setFromDateValue(newValue);
                      }}
                      renderInput={(params) => (
                        <DatePickerTextField
                          autoComplete="off"
                          color="secondary"
                          variant="outlined"
                          size="small"
                          {...params}
                        />
                      )}
                    />
                    <DatePicker
                      disablePast
                      label="To Date"
                      value={toDateValue}
                      onChange={(newValue) => {
                        setToDateValue(newValue);
                      }}
                      renderInput={(params) => (
                        <DatePickerTextField
                          autoComplete="off"
                          color="secondary"
                          variant="outlined"
                          size="small"
                          {...params}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
              </Box>
              <Box>
                <Button sx={{ py: 1.2 }} variant="outlined" color="primary">
                  Search
                </Button>
              </Box>
            </Stack>
          </Box>
        </Stack>
        <Divider sx={{ mt: 3 }} />
      </Box>
      <Box className={styles.tableBox}>
        <Typography variant="button" color="secondary">
          Transactions
        </Typography>
        <Box className={styles.tableArea} mt={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader.map((th) => (
                    <StyledTableCell key={th.name}>{th.name}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionData
                  .slice(
                    tablePage * rowsPerPage,
                    tablePage * rowsPerPage + rowsPerPage
                  )
                  .map((td) => (
                    <StyledTableRow key={td.id}>
                      <StyledTableCell component="th" scope="row">
                        {td?.type === "deposit" ? (
                          <Typography color="text.success" variant="body2">
                            ₹ {td.amount}
                          </Typography>
                        ) : (
                          <Typography color="error" variant="body2">
                            ₹ {td.amount}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {td.paymentMethod}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {td.transactionID}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {td.timeStamp}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {td.status === "Success" && (
                          <Typography color="text.success" variant="body2">
                            {td.status}
                          </Typography>
                        )}
                        {td.status === "Pending" && (
                          <Typography color="text.tertiary" variant="body2">
                            {td.status}
                          </Typography>
                        )}
                        {td.status === "Failed" && (
                          <Typography color="error" variant="body2">
                            {td.status}
                          </Typography>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={transactionData.length}
            rowsPerPage={rowsPerPage}
            page={tablePage}
            onPageChange={handleChangePage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionDetailsArea;
