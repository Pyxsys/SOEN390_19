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
import PartsForm from './PartsForm'
import axios from 'axios';
<<<<<<< HEAD
=======

import config from '../../../config.json';

>>>>>>> BE_PreProd
const useStyles = makeStyles({
    table: {
        minWidth: 50,
        maxWidth: 1610,
    },
  });

/*
Parts inventory that is within the sidebar, using material UI tables.
*/
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
            <PartsForm updateRows={fetchRows}/>
            <TableContainer component={Paper} className = "Inventory-Container"> 
                <Table className={classes.table} size="small" id="Edit-the-table" aria-label="a dense table">
                    <TableHead><TableRow><TableCell colspan="5" id="The-Table-Title">Parts</TableCell></TableRow></TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Part ID</TableCell>
                            <TableCell align="center">Part Type</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Provider</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{row.internalId}</TableCell>
                                <TableCell align="center">{row.partType}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.provider}</TableCell>
                                <TableCell align="center">{row.numberOfUnits}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Parts
