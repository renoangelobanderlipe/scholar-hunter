import React, { useState, useEffect, Fragment } from "react";
import { Grid, Typography, Box, Autocomplete, TextField } from "@mui/material";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import {
    adminStatus,
    allFoundations,
    testSearchFoundation,
} from "../../utils/apisauce";
import { adminAll } from "./../../utils/apisauce";
import { AutoCompleteComponent } from "../AutoCompleteComponent";

export const AdminComponent = () => {
    const [all, setAll] = useState(0);
    const [status, setStatus] = useState(0);
    const [foundations, setFoundations] = useState([]);
    const [scholars, setScholars] = useState(0);

    const handleAll = async () => {
        const res = await adminAll();

        if (res.ok) {
            setAll(res.data.data);
        }
    };

    const fetchFoundations = async () => {
        const res = await allFoundations();

        if (res.ok) {
            setFoundations(res.data.data);
        }
    };

    const handleStatus = async () => {
        const res = await adminStatus();

        if (res.ok) {
            setStatus(res.data.data);
        }
    };

    const handleTestChange = async (value) => {
        const res = await testSearchFoundation({ keyword: value });
        if (res.ok) {
            setScholars(res.data.data);
        }
    };

    useEffect(() => {
        handleAll();
        fetchFoundations();
        handleStatus();
    }, [scholars]);

    return (
        <Fragment>
            <Grid container>
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ py: "1rem" }}>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    color: "#424242",
                                }}
                            >
                                Total Users
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                height: "70%",
                                textAlign: "center",
                                border: "1px solid grey",
                                borderRadius: "10px",
                            }}
                        >
                            {/* <AutoCompleteComponent
                                fieldName={"foundation"}
                                fieldLabel={"Foundation"}
                                options={foundations ?? []}
                                handleOnChange={(field, value) =>
                                    handleOnChange(field, value)
                                }
                            /> */}
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={foundations.map(
                                    (option) => option.name
                                )}
                                onChange={(e, value) => handleTestChange(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search input"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: "search",
                                        }}
                                    />
                                )}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography fontSize="30px">
                                    {scholars}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ py: "1rem" }}>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    color: "#424242",
                                }}
                            >
                                Total Scopes
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid grey",
                                borderRadius: "10px",
                            }}
                        >
                            <PieChart width={250} height={250}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={all}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                />
                                <Tooltip />
                            </PieChart>
                        </Box>
                    </Grid>
                    {/* <Grid item xs={4} >
            <Box sx={{ py: '1rem' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: "20px", color: '#424242' }}>Total User in Scholarship</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center", border: '1px solid grey', borderRadius: '10px' }}>
              <PieChart width={250} height={250}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data02}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </Box>
          </Grid> */}
                    <Grid item xs={6}>
                        <Box sx={{ py: "1rem" }}>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    color: "#424242",
                                }}
                            >
                                User Management
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid grey",
                                borderRadius: "10px",
                            }}
                        >
                            <PieChart width={250} height={250}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={status}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                />
                                <Tooltip />
                            </PieChart>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
};
