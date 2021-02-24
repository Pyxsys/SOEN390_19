import React, {useState} from 'react';
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


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  function createData(partName, supplier, price, quantity, shipmentDate, arrivalDate, forSpecificModel) {
    return { partName, supplier, price, quantity, shipmentDate, arrivalDate, forSpecificModel };
  }
  
  const rows = [
    createData('Red Seat', "Joe's Leather Company", "$2", 200 ,"02/11/2020", "10/11/2020", "Flame Bike"),
    createData('Blue Handle Bar', "Metal Works Canada", "$5", 1000, "02/11/2020", "10/11/2020", "All Children Bikes"),
    createData('Rubber Tire Medium', "Rubber Etc.", "$12",500, "02/11/2020", "10/11/2020", "All Children Bikes"),
    createData("", 305, 3.7, 67, 4.3),
    createData('Training Wheels', 356, 16.0, 49, "Pink Children's Bike"),
  ];


  //using material ui dense tables

function InventoryHome() {

    // const [rows, setRows] = useState([]);


    const fetchRows = () => {
        
    }

    const classes = useStyles();

    return (
        <div className= "Inventory Home">
            <InventorySideBar/>
            <AddInventoryForm/>
           <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Part</TableCell>
                            <TableCell align="right">Supplier</TableCell>
                            <TableCell align="right">Price Per Unit</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Shipment Date</TableCell>
                            <TableCell align="right">Arrival Date</TableCell>
                            <TableCell align="right">For Specific Model</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                {row.partName}
                                </TableCell>
                                <TableCell align="right">{row.supplier}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.shipmentDate}</TableCell>
                                <TableCell align="right">{row.arrivalDate}</TableCell>
                                <TableCell align="right">{row.forSpecificModel}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default InventoryHome
