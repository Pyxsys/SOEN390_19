/** [InventorySideBarData.js]
* Summary.
The data that is passed to the sidebar, including the path and each one having a specific icon, stored in an array.
* 
* Description.
This will store and pas the information to the side bar, including what is visible to us and backEnd components.
*/

import React from 'react'
import * as AiIcons from "react-icons/ai"
import * as VscIcons from "react-icons/vsc"
import * as BsIcons from "react-icons/bs"


export const InventorySideBarData = [
    {
        title: "Inventory Home",
        path: '/Inventory',
        icon: <BsIcons.BsCardList/>,
        className: "side-text"
    },
    {
        title: "Parts",
        path: '/Inventory/PartsNeeded',
        icon: <AiIcons.AiOutlineFileExclamation/>,
        className: "side-text"
    },
    {
        title: "Processing Inventory",
        path: '/Inventory/ProcessingInventory',
        icon: <VscIcons.VscLoading/>,
        className: "side-text"
    }
]