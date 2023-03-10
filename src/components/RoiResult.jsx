import { Paper, Container, Grid, Typography} from "@mui/material";


const Calculator = ({ result }) => {





    return (

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            ROI at current price, after 1 year.
          </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
         <Typography variant="span">
            {result.formattedFiatAmount} USD
        </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
        <Typography variant="span">
            {result.accumulatedAsset} {result.assetType}
        </Typography>
        </Grid>

      </Grid>
      </Paper>
          </Container>
    );
    }

    export default Calculator;