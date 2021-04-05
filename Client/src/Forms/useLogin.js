/** [useLogin.js]
* Summary.
Setting the Authcontext to true so that we are able to verify if the user is logged in anywhere throughout the application.
* 
* Description. 
This page will be checking the user Login details by checking it on backEnd through APICall once it is successful
it will return to next step for finishing login
*/
import React, {useState, useEffect} from 'react'
import validateLogin from './validateLogin'
import {AuthContext} from '../Contexts/AuthorizationContext'
import axios from 'axios'
import config from '../config.json'


//this callback function is used to when the user presses the log in button.  
const useLogin = callback => {
    const [values, setValues] = useState({
        email: '',
        password:''
    })
    const { loggedIn, setLoggedIn } = React.useContext(AuthContext);

    const [errors, setErrors] = useState({});
    const [isLogginIn, setIsLoggingIn] = useState(false);

    const handleChange = e => {
        const{name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    //callin axios.get to through backend and get the correct info
    const handleSubmit = e =>{
        e.preventDefault();
        setErrors(validateLogin(values))

        //API Call
        if(Object.keys(errors).length === 0){
            try{
                console.log("going to database to verify user")
                axios.get(config.site_root_from_config+`/users`+`/login`+`/${values.email}`+`/${values.password}`,{
                    email: values.email,
                    pass: values.password
                })
                .then((response) => {
                    console.log(response)
                    setLoggedIn(true)
                    setIsLoggingIn(true)
                })
    
            }catch(error){
                console.log("Error trying to log in")
                console.log(error)
            }
        }
    }

    useEffect( () => {
        if(Object.keys(errors).length === 0 && isLogginIn){
            callback()
        }
    }, [errors])

    return {handleChange, values, handleSubmit, errors}

}

export default useLogin