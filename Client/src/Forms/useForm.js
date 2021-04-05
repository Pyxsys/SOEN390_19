/** [useForm.js]
* Summary. 
The webpage will be checking if the information which provided by the user is correct, and it will be added on database.
* 
* Description. 
This useForm is for the sign up page, it checks if the values entered in the form are correct, then handles the submit.
Using axios.post it is able to add the information to the database. Making sure there are no errors with what as added.
*/

import validate from './validateInfo'
import {useState, useEffect} from 'react'
import axios from 'axios'


const useForm = callback => {

    //Initial state of the form where the values are empty
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    //errors state is empty initially
    const[errors, setErrors] = useState({});
    //submitting is false initially
    const [isSubmitting, setIsSubmitting] = useState(false);

    //Change in each imput type
    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    //when the sign up button is clicked.
    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values))
        setIsSubmitting(true)
        if(Object.keys(errors).length === 0 ) {
            console.log("Registration information is good")
            console.log(values)
            try{
                axios.post('http://localhost:5000/users', { 
                    
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
    
    //callback to ensure there are no errors, only called when there are erros because it is a dependency
    useEffect( () => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback()
        }
    }, [errors])

    return {handleChange, values, handleSubmit, errors}
}

export default useForm;
