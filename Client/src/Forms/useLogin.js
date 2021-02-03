import React, {useState, useEffect} from 'react'
import validateLogin from './validateLogin'
import {AuthContext} from '../Contexts/AuthorizationContext'
import axios from 'axios'

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

    const handleSubmit = e =>{
        e.preventDefault();
        setErrors(validateLogin(values))
        //API Call

        if(Object.keys(errors).length === 0){
            try{
                console.log("going in")
                axios.get(`http://localhost:5000/users/login/${values.email}/${values.password}`,{
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