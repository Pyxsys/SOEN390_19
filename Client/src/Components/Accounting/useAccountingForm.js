import axios from "axios"
import { useState } from "react"
import Inventory from "../Inventory/InventorySideBar/Inventory"
import {fetchRows} from '../../APIService'
import config from '../../config.json'

const useAccountingForm = () => {
    var addSale=false;
    var numBikeCheck = true;
    var posNumber = true;
    const [values, setValues] = useState({
        internalId:'',
        client: '',
        item: '',
        numberOfUnits: '',
        price:'',
    })
    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const fetchBikeInventory = async () => {
        var temp = await fetchRows();
return temp;
       }
      

    const handleSubmit = async () => {
        console.log("Attempting to add info")
        // addPartsInformation(values.partsList)
        try{
            var inventory= await fetchBikeInventory();
            console.log(inventory);
            inventory.forEach(e => {
                if(values.item===e.internalId){
                    addSale=true;
                    console.log(addSale);
                    values.price=e.price*values.numberOfUnits;
                    if (values.numberOfUnits > e.numberOfUnits)
                        numBikeCheck = false;
                    if (values.numberOfUnits < 0)
                        posNumber = false;
                }
                
            });
            console.log("Add sale", addSale);
            if(!addSale){
                alert("Could not identify bike " + values.item + ", please enter a valid bike ID.");
            }
            else if(!numBikeCheck)
            {
                alert("You ordered more bikes than we have in in stock, please adjust your quantity accordingly.");
            }
            else if (!posNumber)
            {
                alert("You entered a negative number of bikes, please enter a positive number.")
            }
            if(addSale && numBikeCheck && posNumber){
            const response = await axios.post(`${config.site_root_from_config}/accounting`,{
                client: values.client,
                item: values.item,
                numberOfUnits: parseInt(values.numberOfUnits),
                price:values.price
            })
            addSale=false;
           
            
            }            
            }catch(error){
            console.debug("Encountered an error tryin to add sale info")
            console.debug(error)
        }
    }

    return {handleChange, values, handleSubmit}
}

export default useAccountingForm