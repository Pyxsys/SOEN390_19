import React, {useState} from 'react'
import FormSignUp from '../Forms/FormSignUp'
import FormSucess from '../Forms/FormSuccess'
import FormLogin from '../Forms/FormLogin'
import '../CSSFiles/Form.css'
import {AuthContext} from '../Contexts/AuthorizationContext'



const SignUpAndSuccessPage = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoggedIn, setIsLoggingIn] = useState(false);
    const { loggedIn, setLoggedIn } = React.useContext(AuthContext);

    function submitForm(){
        setIsSubmitted(true);
    }

    function submitLogin(){
        setIsLoggingIn(true)
        setLoggedIn(prevLoggedIn => !prevLoggedIn)
        console.log("Logging in")
    }

    return (
        <>
        <div className="form-container">
            <span className = "close-btn">x
            </span>
            <FormLogin submitForm = {submitLogin}/>
            {!isSubmitted ? (
                <FormSignUp submitForm = {submitForm}/>) :
                (<FormSucess/>)}
                
                
        </div>
            
        </>
    );
}

export default SignUpAndSuccessPage
