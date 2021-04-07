import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InventorySideBar from '../Inventory/InventorySideBar/InventorySideBar'
import AccountingForm from './AccountingForm'
import axios from 'axios';
import config from '../../config.json';

//Styling for table
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });




function AccountingHome() {

    const [rows, setRows] = useState([]);

    const fetchRowse = () => {
        try{
            console.log("Fetching Rows from Database")
            axios.get(`http://${config.site_root_from_config}:5000/accounting`,{
    
            }).then((response) => {
                console.log("Got sale transactions")
                console.log(response.data)
                setRows(response.data)
            })
        }catch(error){
            console.debug("Error when Fetching Sale Data")
            console.debug(error)
        }   
        
    }
    const classes = useStyles();

    console.log("fetching rows")
    useEffect(()=>{
        fetchRowse()
    },[])

    return (
        <div className= "">
            <InventorySideBar/>
            <AccountingForm updateRows = {fetchRowse}/>
           <TableContainer component={Paper} className = "Inventory-Container">
                <Table className={classes.table} id="Edit-the-table"  size="small" aria-label="a dense table">
                    <TableHead><TableRow><TableCell colspan="5" id="The-Table-Title">Sales</TableCell></TableRow></TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Order ID</TableCell>
                            <TableCell align="center">Client</TableCell>
                            <TableCell align="center">Bike ID</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total Cost</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{row.internalId}</TableCell>
                                <TableCell align="center">{row.client}</TableCell>
                                <TableCell align="center">{row.item}</TableCell>
                                <TableCell align="center">{row.numberOfUnits}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AccountingHome