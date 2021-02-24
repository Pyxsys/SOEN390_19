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
        title: "Parts Needed",
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