import React from "react";
import { Grid } from "@mui/material";
import CryptoTable from "../../components/Table";
import Calculator from "../../components/Calculator";

const Dashboard = () => {

    return (
        <Grid container >
            <Grid item xs={12} md={4}>
                <Calculator />
            </Grid>
            <Grid item xs={12} md={8}>
                <CryptoTable />
            </Grid>
        </Grid>



    );
    }

export default Dashboard;