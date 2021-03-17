/** [FormSignUp.js]
* Summary. 
Asking user required information in order to create his/her profile.By simply typing inside input boxes ,then we will
sent this data to BackEnd in order to create profile.
* 
* Description. 
The user will simplly create his/her profile after filling their personal information and once It is done, the website
will show confirmation message to the user.
*/
import React from 'react'
import useForm from './useForm'
import validate from './validateInfo'
import '../CSSFiles/Form.css'


/**
 * Displaying the form for the Sign Up
 */

const FormSignUp = (props) => {
const {handleChange, values, handleSubmit, errors} 
= useForm(
    props.submitForm
    );

    return (
      <div className ="form-content-right">
          <form className= "form" onSubmit={handleSubmit}>
              <h1>Sign Up for your ERP Today!</h1>

              <div className="form-inputs">
                  <label htmlFor="username"
                  className="form-label">
                      Username: 
                  </label>
                  <input 
                        id="username"
                        type = "text"
                        name = "username"
                        className= "form-input"
                        placeholder="Enter your username"
                        value ={values.username}
                        onChange = {handleChange}
                        />
                        {errors.username && <p>{errors.username}</p>}
              </div>

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
                        onChange = {handleChange}/>
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
                        onChange = {handleChange}/>
                        {errors.password && <p>{errors.password}</p>}
              </div>

              <div className="form-inputs">
                  <label htmlFor="password2"
                  className="form-label">
                     Confirm Password: 
                  </label>
                  <input 
                        id="password2"
                        type = "password"
                        name = "password2"
                        className= "form-input"
                        placeholder="Verify your password"
                        value ={values.password2}
                        onChange = {handleChange}/>
                        {errors.password2 && <p>{errors.password2}</p>}
              </div>

              <div>
                  <button className="form-input-btn"
                  type="submit">Sign Up</button>
                  <span className="form-input-login">
                      Already have an account? Login on the left!
                  </span>
                  </div> 
          </form>

      </div>
    );
}

export default FormSignUp
