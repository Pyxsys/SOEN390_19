
export default function validateLogin(values){
    let accounts = new Map()
    let testAccount = {
        email: "asd@asd.com",
        password: "asdasdasd"
    }
    accounts.set("asd@asd.com", testAccount)

    let errors = {}
    let emailTest = values.email
    let passwordTest = values.password
    console.log(accounts.get(testAccount.email).password)
    console.log("You clicked the login button")

    if(!values.email){
        errors.email = "Email required"
    } else if(!accounts.has(emailTest)){
        console.log("Error in Email")
        errors.email = "Email does not exist"
    }


    if(!values.password){
        errors.password = "Password required"
    }
    else if(values.email && accounts.has(emailTest) && passwordTest !== accounts.get(emailTest).password){
        console.log("Error in password")
        errors.password = "Password does not match"
    }
    else{
        console.log("No Errors")
    }

    return errors;


}