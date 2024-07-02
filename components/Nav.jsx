"use client";

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { NotificationProvider, useNotifications } from '../context/NotificationContext';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
function Nav() {
  return (
    <div className='relative bg-blue-950 p-3 items-center justify-between flex'>
        <img  src={'/pipexe1.png'} alt="logo" width={150} height={100} className='ml-12'/>
        <div className="bg-white py-2 px-4 flex items-center rounded-md shadow-md gap-3">
          <Image
            src="/search.png"
            alt="search"
            width={20}
            height={20}
            className="opacity-70"
          />
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        
        <div className='flex flex-row items-center gap-2' >
          {/* <Dropdown placement="bottom-end">
            <DropdownTrigger >
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src="/anes.png"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">User Email</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          <div className='md:flex md:flex-col md:justify-center gap-2 hidden '>
              <h1 className='text-white font-bold text-sm '>Anes Saadi</h1>
              <h1 className='text-white font-semibold text-xs '>anes13</h1>
            </div>
        </div>
        {/* {showNotifications && <NotificationPopup bellIconRef={bellIconRef} setShowNotifications={setShowNotifications} />} */}
      </div>
  );
}

export default Nav;
