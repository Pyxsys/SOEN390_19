import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import {Link} from "react-router-dom" 
import {InventorySideBarData} from './InventorySideBarData'
import "../../../CSSFiles/SideBars.css"
import {IconContext} from 'react-icons'


function InventorySideBar() {

    const [sideBarButton,setSideBarButton] = useState(false)
    const showSidebar = () => setSideBarButton(!sideBarButton)

    return (
        <>
        <IconContext.Provider value = {{color: "#fff"}}>
            <div className = "sidebar">
                <Link to="#" className = "menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>

            <nav className = {sideBarButton ? 'side-menu active': 'side-menu'}>
                <ul className = "side-menu-items" >
                    {InventorySideBarData.map((item, index) => {
                        return (
                            <li key = {index} className = {item.className}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default InventorySideBar
