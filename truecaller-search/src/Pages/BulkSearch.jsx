import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import Snackbar from "@mui/material/Snackbar";
import { countryCodeData } from "./data";
import * as XLSX from "xlsx";

const BulkSearch = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [status, setStatus] = useState(1);
  const [fileName, setFileName] = useState("");
  const [countryCode, setCountryCode] = useState(null);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    alert("this  is it");
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const dataToPick = [
    { item: "phoneNumber", type: "text" },
    { item: "name", type: "text" },
    { item: "gender", type: "text" },
    { item: "numberType", type: "text" },
    { item: "carrier", type: "text" },
    { item: "nationalFormat", type: "text" },
    { item: "dialingCode", type: "text" },
    { item: "countryCode", type: "text" },
    { item: "type", type: "text" },
    { item: "city", type: "text" },
    { item: "address", type: "text" },
    { item: "timeZone", type: "text" },
  ];
  const generateDifferentData = () => {
    let pdfCols = [];
    let colsDataKey = [];
    dataToPick?.forEach((item) => {
      pdfCols.push(item.item);
      colsDataKey.push(item.item);
    });
    const headers = [];
    // console.log("this is data === >",data)
    // console.log("this is colsDataKey === >",colsDataKey)
    let colsData = data.map((dataItem, index) =>
      colsDataKey.map((key, index) => dataItem[key])
    );
    // console.log({colsData})
    colsData = colsData.map((value, index) => [...value]);
    const csvData = colsData.map((value, i) => {
      let data = {};
      value.forEach((v, i) => {
        data = {
          ...data,
          [pdfCols[i]]: v,
        };
      });
      data = {
        ...data,
      };
      return data;
    });
    return { headers, colsData, csvData };
  };
  const handleDownloadExcel = () => {
    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(generateDifferentData().csvData);
    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    // Download the workbook
    XLSX.writeFile(wb, `UpdatedSheet.xlsx`);
  };
  const DemoDataToPick = [
    { item: "phoneNumber", type: "text" },
    { item: "name", type: "text" },
    { item: "gender", type: "text" },
    { item: "numberType", type: "text" },
    { item: "carrier", type: "text" },
    { item: "nationalFormat", type: "text" },
    { item: "dialingCode", type: "text" },
    { item: "countryCode", type: "text" },
    { item: "type", type: "text" },
    { item: "city", type: "text" },
    { item: "address", type: "text" },
    { item: "timeZone", type: "text" },
  ];
  const handleDemoDownloadExcel = () => {
    // Extract headers from DemoDataToPick
    const headers = DemoDataToPick.map((item) => item.item);

    // Create an empty data array
    const data = [];

    // Create a worksheet with headers only
    const ws = XLSX.utils.json_to_sheet([{}], { header: headers });

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    // Download the workbook
    XLSX.writeFile(wb, `demo_excel.xlsx`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getData = [];
      if (countryCode === null) {
        alert("Select Country Code");
        return
      }else{
      setStatus(3);
      const response = await api.search(fileData, countryCode);
      if (response.data?.result) {
        console.log("result ===>>>", response.data.result);
        response?.data?.result.map((dataIndex, index) => {
          getData.push({
            phoneNumber: dataIndex?.key || "N/A",
            name: dataIndex?.value?.name || "N/A",
            gender: dataIndex?.value?.gender || "N/A",
            numberType: dataIndex?.value?.phones[0]?.numberType || "N/A",
            carrier: dataIndex?.value?.phones[0]?.carrier || "N/A",
            nationalFormat:
              dataIndex?.value?.phones[0]?.nationalFormat || "N/A",
            dialingCode:
              (
                dataIndex?.value?.phones.find((phone) => phone.dialingCode) ||
                {}
              ).dialingCode || "N/A",
            countryCode:
              (
                dataIndex?.value?.phones.find((phone) => phone.countryCode) ||
                {}
              ).countryCode || "N/A",
            type:
              (dataIndex?.value?.phones.find((phone) => phone.type) || {})
                .type || "N/A",
            city:
              (dataIndex?.value?.addresses?.find((phone) => phone.city) || {})
                .city || "N/A",
            address:
              (dataIndex?.value?.address?.find((phone) => phone.address) || {})
                .address || "N/A",
            timeZone:
              (
                dataIndex?.value?.addresses?.find((phone) => phone.timeZone) ||
                {}
              ).timeZone || "N/A",
          });
        });
        setData(getData);
        setStatus(4);
      } else if (response.data?.error?.message) {
        alert(response.data?.error?.message);
      } else {
        alert("Something went Wrong");
      }
    }
  } catch (error) {
      console.log("error", error);
      alert("Something went Wrong");
    }
  };
  const handleChange = (event) => {
    setCountryCode(event.target.value);
  };

  const ImportFile = (e) => {
    let file = e.target.files[0];
    console.log({ file });
    if (!file?.name || !/\.(xlsx|xls)$/i.test(file?.name)) {
      setStatus(1);
      // alert("Please select a valid Excel file (.xlsx or .xls).");
      handleClick({ vertical: "bottom", horizontal: "right" });
      return; // Terminate the function if file is not Excel
    }
    setFileName(file?.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });

      // Assuming the first sheet is the relevant sheet
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

      // Convert sheet to array of objects
      const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      // Assuming the first row of the sheet contains headers
      const fileHeaders = sheetData[0];
      setHeaders(fileHeaders);

      // Remove headers from data
      sheetData.shift();

      // Flatten the array of arrays into a single array
      const flattenedData = sheetData.flat();

      // Convert the flattened array to a single string separated by commas
      const singleString = flattenedData.join(", ");

      //console.log(singleString);
      setFileData(singleString);
      setStatus(2);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
      {/* <Button
        onClick={handleClick({ vertical: "bottom", horizontal: "right" })}
      >
        Click
      </Button> */}
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          pt: 2,
          pb: 5,
          marginTop: 8,
          // flexDirection: "column",
        }}
      >
        <Grid container sx={{ pb: 5 }}>
          <Grid item xs sx={{ textAlign: "center" }}>
            <Box sx={{ fontSize: "20px", fontWeight: "bold", color: "gray" }}>
              {status === 1
                ? "Import Excel File"
                : status === 2
                ? `File Selected (${fileName})`
                : "Download File"}
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{}}>
          <Button
            variant="outlined"
            color="error"
            style={{ marginTop: "-70px", marginBottom: "20px" }}
            onClick={handleDemoDownloadExcel}
          >
            Demo Excel
          </Button>
        </Grid>
        <Box style={{ display: "flex", flexDirection: "row", alignItems:"center" }}>
          <label
            style={{
              width: "100%",
              padding: "15px",
              cursor: "pointer",
              background: "#1976D2",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
            form="file"
            component="label"
            variant="contained"
          >
            <span style={{ marginRight: "10px", fontSize: "22px" }}>
              Upload file
            </span>{" "}
            <CloudUploadIcon style={{ fontSize: "30px" }} />
            <input type="file" id="file" hidden onChange={ImportFile} />
          </label>

          {/* <Box style={{ width: "50%", display:"flex", justifyContent:"center",}}> */}
          {status === 2 || status === 3 ? (
            <FormControl sx={{ mx: 1, minWidth: 120, width: "30%", }} fullWidth>
              <InputLabel id="demo-simple-select-error-label">
                Country Code
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{p:0.3}}
                value={countryCode}
                label="Country Code"
                placeholder="Country Code"
                onChange={handleChange}
                required
              >
                {countryCodeData?.map((val) => {
                  return <MenuItem value={val.code}>{val.code}</MenuItem>;
                })}
              </Select>
            </FormControl>
          ) : null}
          {status === 2 || status === 3 ? (
            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                padding: "20px",
                // margin: "0 10px",
                border: "none",
                cursor: "pointer",
                width: "40%",
                background: "#4caf50",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <span style={{ whiteSpace: "noWrap", fontSize: "20px" }}>
                Process Data{" "}
                {status === 3 ? (
                  <CircularProgress
                    style={{
                      width: "25px",
                      height: "25px",
                      color: "white",
                      fontSize: "10px",
                    }}
                  />
                ) : null}
              </span>
            </button>
          ) : null}
          {status === 4 ? (
            <button
              type="submit"
              variant="contained"
              onClick={handleDownloadExcel}
              style={{
                padding: "20px",
                border: "none",
                width: "45%",
                margin: "0 10px",
                cursor: "pointer",
                background: "#1976D2",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <span style={{ fontSize: "20px" }}>Download File</span>
              <DownloadIcon style={{ fontSize: "25px", }} />
            </button>
          ) : null}
          {/* </Box> */}
        </Box>
      </Box>
    </Container>
  );
};

export default BulkSearch;
