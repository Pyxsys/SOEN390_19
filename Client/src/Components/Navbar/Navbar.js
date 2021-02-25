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
                <h1 className = "navbar-logo">React <i className="fab fa-react"></i></h1>
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