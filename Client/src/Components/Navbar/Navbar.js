/** [Navbar.js]
* Summary.
The key components of making a NavigationBar.This bar will render the menu items.
* 
* Description.
This code is to build Navigation Bar on the left side of the screen once logged in.
*/
import React, { Component } from 'react'
import {MenuItems} from './MenuItems'
import {NavBarButton} from './NavBarButton'
import '../../CSSFiles/Navbar.css'
import {AuthContext} from '../../Contexts/AuthorizationContext'
import {Link} from "react-router-dom" 


//Navbar is React Component
class Navbar extends Component{
        state = {clicked: false}

    //This state is when one of the items is clicked    
    handleClick = () => {
        this.setState({
            clicked: !this.state.clicked
        })

    }
    
    //Navbar renders the menu items
    render(){

        return(
            <nav className = "NavbarItems">
                <h1 className = "navbar-logo"><i className="fab fa-react"></i></h1>
                <img src="https://user-images.githubusercontent.com/58408904/112918742-9f4c2980-90d3-11eb-9d2d-a94f0acaf0e5.png" alt="logo" width="80" height="80"  />
                <div className = "menu-icon" onClick={this.handleClick}>
                    <i className = {this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                <ul className = {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key = {index}>
                                <Link to = {item.path}
                                className={item.cName} >
                                <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}                    
                </ul>
                <NavBarButton >Sign Out</NavBarButton>
            </nav>
        )
    }
}

export default Navbar