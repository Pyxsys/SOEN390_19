import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../../../CSSFiles/InventoryHome.css"
import InventorySideBar from './InventorySideBar';
import AddInventoryForm from './AddInventoryForm'
import {fetchRows} from '../../../APIService'

//Styling for table
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });



/*
  InventoryHome displays the Bike Inventory
  Using material UI tables to create the display we want
*/
function InventoryHome() {

    const [rows, setRows] = useState([]);

    const classes = useStyles();

    console.log("fetching rows")
    useEffect(async () => {
        await getData()
    },[])

    const getData = async () => {
        console.log("Entered getData")
        var temp = await fetchRows()
        setRows(temp)
    }

    return (
        <div className= "Inventory Home">
            <InventorySideBar/>
            <AddInventoryForm updateRows = {getData}/>
           <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Bike ID</TableCell>
                            <TableCell align="right">Bike Price</TableCell>
                            <TableCell align="right">Provider</TableCell>
                            <TableCell align="right">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="right">{row.internalId}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.provider}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default InventoryHome
