/** [validateLogin.js]
* Summary. 
Validating that the login values are real.
*
* Description. 
Showing user that input boxes needs to be filled in order to make a successful login.
*/
import axios from 'axios'


export default function validateLogin(values){
    let errors = {}
    let emailTest = values.email
    let passwordTest = values.password
    console.log("You clicked the login button")

    if(!values.email){
        errors.email = "Email required"
    } 
    if(!values.password){
        errors.password = "Password required"
    }
    else{
        console.log("No Errors")
    }

    return errors;


}
