/** [index.js]
* Summary.
The purpose of the index is to render the application.
* 
* Description.
With the help of React we can render the application.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

