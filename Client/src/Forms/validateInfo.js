/** [validateInfo.js]
* Summary. 
Ensuring no invalid emails, username, or passwords are given through the signup form.
* 
* Description.
Cheking user's input to make sure that they fill user register details as the website requires.
Each input box has its own rules and we are checking that we get correct/accurate input from user.
*/

export default function validateInfo(values){
    let errors ={}

    //Username
    if(!values.username){
        errors.username = "Username required"}

    //Email
    if(!values.email){
        errors.email = "Email required"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Email address is invalid"
    }

    //Password
    if(!values.password){
        errors.password = "Password required"
    } else if (values.password.length < 8){
        errors.password = "Password must be at least  8 characters"
    }

    //Password2
    if(!values.password2){
        errors.password2 = "Password must be confirmed"
    } else if (values.password2 !== values.password){
        errors.password2 = "Passwords do not match"
    }

    return errors;
}
