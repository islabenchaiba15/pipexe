'use client'
import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import {Button} from "@nextui-org/react";
import Image from 'next/image'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem,  cn} from "@nextui-org/react";
import PopUp from './PopUp';
import DragModal from './DragModal';
function LeftBarDropDown({totalDistance,icon,affichage,title}) {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => { 
    setPopupOpen(true); 

  };
  const handleClosePopup = () => { 
    setPopupOpen(false); 
  };  
  return (
    <>
        <Dropdown placement='left-start '>
            <DropdownTrigger className='bg-slate-400 border'>
                <div className='bg-gradient-to-r from-gray-100 to-gray-300 border p-4 '>
                    <Image src={icon} width={50} height={50} />
                </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className=''>
                <DropdownSection title={title} showDivider className='ml-4'>  
                  <DropdownItem>
                    <button onClick={handleOpenPopup}>Open Popup</button> 
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="affichage" className='ml-4'>  
                    <DropdownItem key="edit">
                        <div className="flex items-center -ml-2 -p-2">
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                {affichage}
                            </label>
                        </div>
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
        {isPopupOpen && <DragModal totalDistance={totalDistance} onClose={handleClosePopup} />}
    </>
        
  )
}

export default LeftBarDropDown