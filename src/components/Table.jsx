import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import { tokens } from "../theme";
import { Paper, Container, useTheme, Typography} from "@mui/material";


const getData = async () => {
    try {
      const url = `http://localhost:3003/api/v1/assets`;
      const res = await axios.get(url);

        const  data = res.data.data.map((asset) => {
           const {
            name,
            symbol,
            priceUsd,
            percentChangeLast1Month,
            percentChangeLast1Week,
            percentChangeUsdLast1Hour,
            percentChangeUsdLast24Hours,
            currentMarketcapUsd,
            realVolumeLast24Hours,
            volumeLast24Hours,
            percentChangeLast1Year

           } = asset.data;

        return {
            name,
            symbol,
            priceUsd,
            percentChangeLast1Month,
            percentChangeLast1Week,
            percentChangeUsdLast1Hour,
            percentChangeUsdLast24Hours,
            currentMarketcapUsd,
            realVolumeLast24Hours,
            volumeLast24Hours,
            percentChangeLast1Year

        }
        });
        return data;
    } catch (error) {
      console.error(error);
    }
  };

const  CryptoTable = () => {
    const [asserts, setAsserts] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const returnColor = (percent) => {
     return percent > 0 ? colors.greenAccent[400] : colors.redAccent[400]
    }


      useEffect(() => {
         getData().then((data) => {
            console.log(data)
            setAsserts(data);
            });

      }, [])
  return (
    <Container component="main" maxWidth="md" sx={{ mb: 12 }}>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ASSET</TableCell>
            <TableCell align="right">PRICE&nbsp;(USD)</TableCell>
            <TableCell align="right">CHANGE VS USD&nbsp;(1H)</TableCell>
            <TableCell align="right">CHANGE VS USD&nbsp;(24H)</TableCell>
            <TableCell align="right">REPORTED MARKETCAP</TableCell>
            <TableCell align="right">REAL VOLUME&nbsp;(24H)</TableCell>
            <TableCell align="right">CHANGE VS USD&nbsp;(7D)</TableCell>
            <TableCell align="right">CHANGE VS USD&nbsp;(30D)</TableCell>
            <TableCell align="right">CHANGE VS USD&nbsp;(1YD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asserts.map((d) => (
            <TableRow
              key={d.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {d.name}
              </TableCell>
              <TableCell align="right">
                    <Typography> {d.priceUsd} </Typography>
              </TableCell>
                <TableCell align="right">
                    <Typography sx={{ color: returnColor(d.percentChangeUsdLast1Hour) }}> {d.percentChangeUsdLast1Hour.toFixed(2)} % </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography sx={{color: returnColor(d.percentChangeUsdLast24Hours)}}> {d.percentChangeUsdLast24Hours.toFixed(2)} % </Typography>
                </TableCell>
                <TableCell align="right">
                   <Typography>{d.currentMarketcapUsd} </Typography>
                    </TableCell>
                <TableCell align="right">
                    <Typography >{d.realVolumeLast24Hours} </Typography>
                    </TableCell>
                <TableCell align="right">
                   <Typography sx={{ color: returnColor(d.percentChangeLast1Week)}}> {d.percentChangeLast1Week.toFixed(2)} %
                   </Typography>
                    </TableCell>
                <TableCell align="right">
                    <Typography sx={{ color: returnColor(d.percentChangeLast1Month) }}> {d.percentChangeLast1Month.toFixed(2)} % </Typography>
                   </TableCell>
                <TableCell align="right">
                    <Typography sx={{ color: returnColor(d.percentChangeLast1Year) }}> {d.percentChangeLast1Year.toFixed(2)} % </Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </Container>
  );
}

export default CryptoTable;