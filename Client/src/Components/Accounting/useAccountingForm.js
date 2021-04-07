import axios from "axios"
import { useState } from "react"
import Inventory from "../Inventory/InventorySideBar/Inventory"
import {fetchRows} from '../../APIService'

const useAccountingForm = () => {
    var addSale=false;
    const [values, setValues] = useState({
        internalId:'',
        client: '',
        item: '',
        numerOfUnits: '',
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
                }
                 else{
                console.log("Bike ID does not exit");
            }
            });
            console.log("Add sale", addSale);
            if(addSale){
            const response = await axios.post(`http://${config.site_root_from_config}:5000/accounting/post`,{
                internalId: values.internalId,
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