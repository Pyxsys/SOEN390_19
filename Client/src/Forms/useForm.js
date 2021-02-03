import validate from './validateInfo'
import {useState, useEffect} from 'react'
import axios from 'axios'


const useForm = callback => {

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const[errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values))
        setIsSubmitting(true)
        if(Object.keys(errors).length === 0 ) {
            console.log("Registration information is good")
            console.log(values)
            try{
                axios.post("http://localhost:5000/users", { 
                    
                    username: values.username,
                    password: values.password,
                    email: values.email
                
            }).then((response) => {
                console.log("Info addeed to db")
                console.log(response)
            }) 
        }catch(error){
            console.log("Got an error when trying to add to database")
            console.log(error)
        }

    }
    }
    

    useEffect( () => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback()
        }
    }, [errors])

    return {handleChange, values, handleSubmit, errors}
}

export default useForm;
