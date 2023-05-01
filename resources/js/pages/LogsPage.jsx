import React, { Fragment, useEffect, useState } from "react";
import { ContainerWrapper } from "../components/ContainerWrapper";
import { showLogs } from "../utils/apisauce";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const LogsPage = () => {
    const [logger, setLogs] = useState([]);

    const handleFetchLogs = async () => {
        const result = await showLogs();

        if (result.ok) {
            setLogs(result.data.data);
        }
    };

    useEffect(() => {
        handleFetchLogs();
    }, []);
    return (
        <Fragment>
            <ContainerWrapper>
                <Grid container  spacing={4}>
                    {logger.map((item, key) => (
                        <Fragment>
                            <Grid item xs={3}>
                                <Card key={key}>
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            Action : {item.action}
                                        </Typography>
                                        <Typography
                                            sx={{ mb: 1.5 }}
                                            color="text.secondary"
                                        >
                                            Action By : {item.full_name}
                                        </Typography>
                                        <Typography variant="body2">
                                            Created At : {item.created_at}
                                        </Typography>
                                        <Typography variant="body2">
                                            Updated At : {item.updated_at}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
            </ContainerWrapper>
        </Fragment>
    );
};

export default LogsPage;
