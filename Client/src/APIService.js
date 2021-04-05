/** [APIService.js]
* Summary.
This API Service interfaces that provide a program with a description of how to interact with
a system in order to retrieve and/or change the data within it.It will fetch the inventory data and use it to
manipulate inventory list.
* 
* Description. 
The API Service is providing us the ability to change inventory elements to anything we want and anytime we want.
Thanks to this service the inventory could be edited.
*/

import axios from 'axios';

import config from './config.json'


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