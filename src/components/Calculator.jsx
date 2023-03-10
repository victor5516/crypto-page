import { Paper, Container, TextField, Grid, Typography, Select, MenuItem, Button} from "@mui/material";
import { useState } from "react";
import  RoiResult from "./RoiResult";
import axios from "axios";


const Calculator = () => {
    const [assetType, setAssetType] = useState('BTC');
    const [asset, setAsset] = useState(0);
    const [fiatAmount, setFiatAmount] = useState(0);
    const [timer, setTimer] = useState(null)
    const [roi, setRoi] = useState({
        accumulatedAsset: '0',
        formattedFiatAmount: '$0',
        assetType: 'BTC'
    });
    const calculateRoi = async () => {
        const url = `http://localhost:3003/api/v1/calculate-roi`;
        const response = await axios.post(url, {
            amount: fiatAmount,
            asset: assetType
        })
        const data = response.data.data
        setRoi({
            accumulatedAsset: data.accumulatedAsset,
            formattedFiatAmount: data.formattedFiatAmount,
            assetType: assetType
        });
    }


    const getConvertedAmount = async (amount, asset) => {
        const url = `http://localhost:3003/api/v1/calculate`;
        const response = await axios.post(url, {
            amount: amount,
            asset: asset
        })
        return response.data.data.assetAmount;
    }

   const handleChangeCryptoChange = async (event) => {
    console.log(event.target.value)
    setAssetType(event.target.value);
    const convertedAmount = await getConvertedAmount(fiatAmount, event.target.value);
    console.log(convertedAmount)
    setAsset(convertedAmount);
    };

  const handleFiatInputChange = async event => {
    const amount = event.target.value;
    setFiatAmount(amount);

    clearTimeout(timer)
    const newTimer = setTimeout(async () => {
      const convertedAmount = await getConvertedAmount(amount, assetType);

    setAsset(convertedAmount);
    }, 200)

    setTimer(newTimer)


    };


    return (

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            ROI Calculator
          </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="Fiat"
            label="USD"
            fullWidth
            onChange={handleFiatInputChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField
            disabled
            id="Crypto"
            label="Crypto"
            fullWidth
            value={asset}
            variant="standard"
            />
        </Grid>
        <Grid item xs={12} md={4}>

        <Select

          id="currency-selector"
          value={assetType}
          label="Currency"
          defaultValue="BTC"
          onChange={handleChangeCryptoChange}
        >
          <MenuItem value={'BTC'}>BTC</MenuItem>
          <MenuItem value={'ADA'}>ADA</MenuItem>
          <MenuItem value={'ETH'}>ETH</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={12} md={12}>
        <Button variant="contained" color="secondary" onClick={calculateRoi}>Calculate</Button>
        </Grid>
        <Grid item xs={12} md={12}>
        <RoiResult result={roi} />
        </Grid>
      </Grid>
      </Paper>
          </Container>
    );
    }

    export default Calculator;