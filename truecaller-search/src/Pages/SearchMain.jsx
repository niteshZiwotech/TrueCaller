import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

import {
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { countryCodeData } from "./data";
const SearchMain = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [countryCode, setCountryCode] = React.useState(null);
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
  const handleChange = (event) => {
    console.log(event.target.value);
    setCountryCode(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (countryCode === null) {
        alert("Select Country Code");
        return
        // handleClick({ vertical: "bottom", horizontal: "right" })
      } else if(search !== null){
        const response = await api.search(search, countryCode);

        if (response.data?.result) {
          console.log("🚀 ~ handleSubmit ~ response:", response);
          setData(response.data.result);
        } else if (response.data?.error?.message) {
          alert(response.data?.error?.message);
        } else {
          alert("Something went Wrong");
        }
      }else{
        alert("Enter Phone Number");
        return
      }
    } catch (error) {
      console.log("error", error);
      alert("Something went Wrong");
    }
  };
  useEffect(() => {
    const checkInstallationId = async () => {
      try {
        const response = await api.verifyInstallation();
        if (!response.data?.result) {
          navigate("/login");
        }
      } catch (error) {
        console.log("error", error);
        alert("Something went Wrong");
        navigate("/login");
      }
    };
    checkInstallationId();
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ height: "100vh" }}>
       <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ width: "85%", display: "flex", alignItems: "center" }}>
          <FormControl sx={{ mr: 1, mt: 1, minWidth: 120, width: "25%" }}>
            <InputLabel id="demo-simple-select-error-label">
              Country Code
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="searchNumber"
            label="Search Number"
            name="searchNumber"
            autoComplete="searchNumber"
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </Box>
        <Box sx={{ width: "10%", marginLeft: "5px" }}>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2, mb: 2, p: 1.8 }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Display Number Detatils  */}
      <Box pb={5}>
        {data?.map((details, index) => {
          return (
            <Card sx={{ minWidth: 275, my: "20px", border: "1px solid grey" }}>
              <CardContent key={index}>
                <Typography sx={{ mt: "15px" }}>
                  <span className="bold">Name</span>:{" "}
                  {details?.value?.name || "-"}
                </Typography>
                <Typography sx={{ mt: "15px" }}>
                  <span className="bold">Gender</span>:{" "}
                  {details?.value?.gender || "-"}
                </Typography>
                <Typography sx={{ mt: "15px" }}>
                  <span className="bold">Access</span>:{" "}
                  {details?.value?.access || "-"}
                </Typography>
                {details?.image && (
                  <Box m={2}>
                    <img src={details?.image} alt="" height="400" width="400" />
                  </Box>
                )}

                {details?.value?.phones?.length ? (
                  <>
                    <Typography sx={{ my: "15px" }}>
                      <span className="bold">Phone Number Detatils</span>
                    </Typography>
                    <Grid container spacing={2}>
                      {details?.value?.phones?.map((value, index) => {
                        return (
                          <Grid md={6} lg={4} item key={index} maxWidth="300px">
                            <Card sx={{ border: "1px solid lightgrey" }}>
                              <CardContent>
                                <Typography sx={{ mt: "15px" }}>
                                  Phone Number: {value?.e164Format || "-"}
                                </Typography>
                                <Typography sx={{ mt: "15px" }}>
                                  NumberType: {value?.numberType || "-"}
                                </Typography>
                                <Typography sx={{ mt: "15px" }}>
                                  Carrier: {value?.carrier || "-"}
                                </Typography>
                                <Typography sx={{ mt: "15px" }}>
                                  National Format:{" "}
                                  {value?.nationalFormat || "-"}
                                </Typography>
                                <Typography sx={{ mt: "15px" }}>
                                  Dialing Code: {value?.dialingCode || "-"}
                                </Typography>
                                <Typography sx={{ mt: "15px" }}>
                                  Country Code: {value?.countryCode || "-"}
                                </Typography>
                                <Typography sx={{ mt: "15px" }}>
                                  Type: {value?.type || "-"}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </>
                ) : (
                  ""
                )}

                {details?.value?.addresses?.length ? (
                  <>
                    <Typography sx={{ my: "15px" }}>
                      <span className="bold">Address Detatils</span>
                    </Typography>
                    <Grid container spacing={2}>
                      {details?.value?.addresses?.map((value, index) => {
                        return (
                          <Grid md={6} lg={4} item key={index} maxWidth="300px">
                            <Card sx={{ border: "1px solid lightgrey" }}>
                              <CardContent>
                                <Typography sx={{ mt: "15px" }}>
                                  Address: {value?.address || "-"}
                                </Typography>
                                <Typography sx={{ mt: "15px" }}>
                                  City: {value?.city || "-"}
                                </Typography>
                                <Typography sx={{ mt: "15px" }}>
                                  TimeZone: {value?.timeZone || "-"}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </>
                ) : (
                  ""
                )}

                {details?.value?.internetAddresses?.length ? (
                  <>
                    <Typography sx={{ my: "15px" }}>
                      <span className="bold">Internet Address Detatils</span>
                    </Typography>
                    <Grid container spacing={2}>
                      {details?.value?.internetAddresses?.map(
                        (value, index) => {
                          return (
                            <Grid
                              md={6}
                              lg={4}
                              item
                              key={index}
                              maxWidth="300px"
                            >
                              <Card sx={{ border: "1px solid lightgrey" }}>
                                <CardContent>
                                  <Typography sx={{ mt: "15px" }}>
                                    Email: {value?.id || "-"}
                                  </Typography>
                                  <Typography sx={{ mt: "15px" }}>
                                    Service: {value?.service || "-"}
                                  </Typography>
                                  <Typography sx={{ mt: "15px" }}>
                                    Caption: {value?.caption || "-"}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  </>
                ) : (
                  ""
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default SearchMain;
