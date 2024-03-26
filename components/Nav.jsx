'use client'
import Image from 'next/image'
import React from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
function Nav() {
  return (
    <div className='bg-blue-950 p-3 items-center justify-between flex '>
        <Image  src={'/pipexe1.png'}  width={120} height={60} />
        <div className='bg-white py-2 px-1 flex flex-row items-center rounded-md gap-2'>
          <Image  src={'/search.png'}  width={20} height={20} />
          <input type="search" placeholder="Recherche generale" className='outline-none ' />
        </div>
        <div className='flex flex-row items-center gap-2 '>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
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
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className='md:flex md:flex-col md:justify-center gap-2 hidden'>
              <h1 className='text-white font-bold text-sm '>undefined undefined</h1>
              <h1 className='text-white font-semibold text-xs '>anes13</h1>
            </div>
        </div>
    </div>
  )
}

export default Nav