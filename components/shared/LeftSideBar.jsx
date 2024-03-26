'use client'
import Image from 'next/image'
import React from 'react'
import {Input} from "@nextui-org/react";
import Drop from '../Drop';
import Tree from '../Tree';
function LeftSideBar() {
  return (
    <div className='sticky w-[450px] overflow-x-hidden bg-white flex flex-col gap-4 justify-start items-start overflow-auto mx-1 '>
         <div className="flex border-black flex-row items-center justify-between gap-2 p-3">
            <img src={'/search.png'}  width={'auto'} height={'auto'} className='w-8 h-8 ' />
            <input type="email" label="Email" className='outline-none' placeholder='search'/>
            <Drop/>
        </div>
        <div className='w-full '>
            <Tree/>
        </div>
    </div>
  )
}

export default LeftSideBar