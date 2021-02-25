import axios from 'axios';

export const fetchRows = async () => {
    try{
        console.log("Fetching Rows from Database")
        const response = await axios.get(`http://localhost:5000/inventory/bikeinventory`)
        console.log("Got bike inventory")
        console.log(response.data)
        return response.data
    }catch(error){
        console.debug("Error when Fetching Bike Inventory Data")
        console.debug(error)
    }   
    
}