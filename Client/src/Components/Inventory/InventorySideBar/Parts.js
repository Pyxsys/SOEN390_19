/** [Parts.js]
* Summary.
* Parts inventory that is within the sidebar, using material UI tables.
*
* Description.
This Parts for inventory is inside the sidebar and it is utilizing the UI table.
It will also fetch info from database and show user the status.
*/

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
import axios from 'axios';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


function Parts() {
    const [rows, setRows] = useState([]);

    const fetchRows = () => {
        try{
            console.log("Fetching Rows from Database")
            axios.get(`http://localhost:5000/inventory/partinventory`,{

            }).then((response) => {
                console.log("Got bike inventory")
                console.log(response.data)
                setRows(response.data)
            })
        }catch(error){
            console.debug("Error when Fetching Bike Inventory Data")
            console.debug(error)
        }   
        
    }

    const classes = useStyles();

    console.log("fetching rows")
    useEffect(()=>{
        fetchRows()
    },[])
    return (
        <div className="Parts Needed">
            <InventorySideBar/>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Part ID</TableCell>
                            <TableCell align="right">Part Type</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Provider</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="right">{row.internalId}</TableCell>
                                <TableCell align="right">{row.partType}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.provider}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Parts
