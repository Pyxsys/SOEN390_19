import validate from './validateInfo'
import {useState, useEffect} from 'react'


const useForm = callback => {

    let usersMap = new Map();

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

        if(values.username && values.email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    && values.password && values.password.length >= 8 && values.password2 && values.password2 === values.password ) {
        console.log("Information is good adding to database")
        usersMap.set(values.email, values)
        console.log(usersMap)
    }
    }
    

    useEffect( () => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback()
        }
    }, [errors])

    return {handleChange, values, handleSubmit, errors, usersMap}
}

export default useForm;
