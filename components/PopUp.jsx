import React, { useState } from 'react'
import DragModal from '../components/DragModal';
import { Button } from '@nextui-org/react';
function PopUp({ handleOpenPopup,handleClosePopup,isPopupOpen}) {
   

  return (
    <div> 
        <Button onClick={handleOpenPopup}>Open Popup</Button> 
        {isPopupOpen && <DragModal onClose={handleClosePopup} />} 
    </div> 
  )
}

export default PopUp