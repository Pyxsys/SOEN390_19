/** [InventorySideBar.js]
* Summary.
InventorySideBar is the specific side bar that is shown when inventory is selected after logging.
React Router Link is used to pass the path.
* 
* Description.
This side bar is unique for this page. When we are on the inventory page different version
of the sidebar will be shown.
*/


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
