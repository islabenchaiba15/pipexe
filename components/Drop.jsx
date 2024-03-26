import React from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';import Image from 'next/image';
function Drop() {
const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  )
  return (
    <Dropdown className=''>
        <DropdownTrigger>
            <Image src={'/bas.png'} width={20} height={20} />
        </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    className='flex flex-start '
            >
                    <DropdownItem key="text">Text</DropdownItem>
                    <DropdownItem key="number">Number</DropdownItem>
                    <DropdownItem key="date">Date</DropdownItem>
                    <DropdownItem key="single_date">Single Date</DropdownItem>
                    <DropdownItem key="iteration">Iteration</DropdownItem>
                </DropdownMenu>
     </Dropdown>
  )
}

export default Drop