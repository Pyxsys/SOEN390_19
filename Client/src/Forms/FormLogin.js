import React from 'react'
import useLogin from './useLogin'
import validateLogin from './validateLogin'
import '../CSSFiles/Form.css'



const FormLogin = (props) => {
    const {handleChange, values, handleSubmit, errors} =
    useLogin(
        props.submitForm
    )
    
    return (
    <div className ="form-content-login">
          <form className= "form" onSubmit={handleSubmit}>
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