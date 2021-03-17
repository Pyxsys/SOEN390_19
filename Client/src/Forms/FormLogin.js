/** [FormLogin.js]
* Summary. 
The purpose of this page is to show user an Interface where they can login into their account.
Front-end sends a request login form to Back-end. Back-end will approve or reject the login.
* 
* Description. 
By using FrontEnd and BackEnd sequentially, the user will login his/her account and it will be checked on the data base 
to see if it matches with any profile and if successful , the website will allow user the get inside of the page.
*/

import React from 'react'
import useLogin from './useLogin'
import validateLogin from './validateLogin'
import '../CSSFiles/Form.css'


/**
 * Displaying the form for the login
 */
const FormLogin = (props) => {
    const {handleChange, values, handleSubmit, errors} =
    useLogin(
        props.submitForm
    )
    
    return (  
    <div className ="form-content-login" >
       <form className= "form" onSubmit={handleSubmit}>
          <img src="https://user-images.githubusercontent.com/58408904/110261377-03b91480-7f7e-11eb-894d-87afe991198b.png" alt="logo" width="300" height="300"  />
              <h1>Please Login using your email and password</h1>
              <div className="form-inputs">
                  <label htmlFor="email"
                  className="form-label">
                     Email: 
                  </label>
                  <input 
                        id="email"
                        type = "email"
                        name = "email"
                        className= "form-input"
                        placeholder="Enter your email address"
                        value ={values.email}
                        onChange = {handleChange}
                        />
                         {errors.email && <p>{errors.email}</p>}
              </div>

              <div className="form-inputs">
                  <label htmlFor="password"
                  className="form-label">
                     Password: 
                  </label>
                  <input 
                        id="password"
                        type = "password"
                        name = "password"
                        className= "form-input"
                        placeholder="Enter your password"
                        value ={values.password}
                        onChange = {handleChange}
                        />
                        {errors.password && <p>{errors.password}</p>}
              </div>

              <div>
                  <button className="form-input-btn-login"
                  type="submit">Login</button>
                  </div> 
          </form>
          
      </div>
      
    );
}

export default FormLogin;
