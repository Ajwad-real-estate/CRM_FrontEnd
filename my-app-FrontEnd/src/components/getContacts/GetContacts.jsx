import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

const GetContacts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    setLoading(true); // Start loading
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { defval: "N/A" });
      setData(parsedData);
      setLoading(false); // Stop loading
    };
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Upload Excel File
              </Typography>
              <Box
                component="input"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                sx={{
                  display: "block",
                  margin: "16px auto",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <CircularProgress />
                  <Typography sx={{ ml: 2 }}>Processing file...</Typography>
                </Box>
              )}
              {!loading && data.length === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  No data to display. Please upload a valid Excel file.
                </Alert>
              )}
              {data.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell><b>Email</b></TableCell>
                        <TableCell><b>Phone</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.Name}</TableCell>
                          <TableCell>{row.Email}</TableCell>
                          <TableCell>{row.Phone}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {data.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={() => alert("Contacts processed successfully!")}
                >
                  Process Contacts
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GetContacts;
