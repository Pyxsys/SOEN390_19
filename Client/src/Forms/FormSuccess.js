/** [FormSuccess.js]
* Summary.
After user user just finished creating profile, the system will show success message.
* 
* Description. 
The success message will be shown the user after profile completion.
*/


import React from 'react'


//When the sign up wowrks, this is displayed
const FormSuccess = () => {
    return (
        <div className = "form-content-right">
            <div className="form-success">
                We have recieved your sign up request!
            </div>
        </div>
    )
}

export default FormSuccess
