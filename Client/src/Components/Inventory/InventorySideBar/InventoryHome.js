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
        <div className= "">
            <InventorySideBar/>
            <AddInventoryForm updateRows = {getData}/>
           <TableContainer component={Paper} className = "Inventory-Container">
                <Table className={classes.table} id="Edit-the-table"  size="small" aria-label="a dense table">
                    <TableHead><TableRow><TableCell colspan="5" id="The-Table-Title">Inventory</TableCell></TableRow></TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Bike ID</TableCell>
                            <TableCell align="center">Bike Price</TableCell>
                            <TableCell align="center">Provider</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{row.internalId}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.provider}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.numberOfUnits}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default InventoryHome
