import React, {useState, useEffect} from 'react'
import validateLogin from './validateLogin'
import {AuthContext} from '../Contexts/AuthorizationContext'

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
        setIsLoggingIn(true)
        //API Call
    }

    useEffect( () => {
        if(Object.keys(errors).length === 0 && isLogginIn){
            callback()
            setLoggedIn(true)
        }
    }, [errors])

    return {handleChange, values, handleSubmit, errors}

}

export default useLogin